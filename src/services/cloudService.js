// Firebase Firestore Cloud Sync Engine (Zero-Dependency Direct REST Client)
// Direct, seamless, real-time live synchronization for Saheer Paradise Exports

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDvf2-g190T5HapAl2lyy1aunVGmXq78sE",
  authDomain: "saheer-paradise-export.firebaseapp.com",
  projectId: "saheer-paradise-export",
  storageBucket: "saheer-paradise-export.firebasestorage.app",
  messagingSenderId: "99309249757",
  appId: "1:99309249757:web:3a3e020a7e430b8641a734",
  measurementId: "G-T5DTS5VJN5"
};

const PROJECT_ID = FIREBASE_CONFIG.projectId;
const API_KEY = FIREBASE_CONFIG.apiKey;

// Helper to construct authenticated Firestore URL
function getFirestoreUrl(path, queryParams = '') {
  let url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${path}`;
  const params = new URLSearchParams();
  if (API_KEY) params.append('key', API_KEY);
  if (queryParams) {
    const extra = new URLSearchParams(queryParams);
    for (const [k, v] of extra.entries()) params.append(k, v);
  }
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

// --- FIRESTORE VALUE CONVERTERS ---
function toFirestoreFields(obj) {
  const fields = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (val === undefined || val === null) {
      fields[key] = { nullValue: null };
    } else if (typeof val === 'boolean') {
      fields[key] = { booleanValue: val };
    } else if (typeof val === 'number') {
      if (Number.isInteger(val)) {
        fields[key] = { integerValue: val.toString() };
      } else {
        fields[key] = { doubleValue: val };
      }
    } else if (typeof val === 'string') {
      fields[key] = { stringValue: val };
    } else if (Array.isArray(val)) {
      fields[key] = {
        arrayValue: {
          values: val.map(item => {
            if (typeof item === 'object' && item !== null) {
              return { mapValue: { fields: toFirestoreFields(item) } };
            }
            return { stringValue: String(item) };
          })
        }
      };
    } else if (typeof val === 'object') {
      fields[key] = {
        mapValue: { fields: toFirestoreFields(val) }
      };
    }
  }
  return fields;
}

function fromFirestoreFields(fields) {
  if (!fields) return {};
  const obj = {};
  for (const key of Object.keys(fields)) {
    const valObj = fields[key];
    if (valObj.stringValue !== undefined) {
      obj[key] = valObj.stringValue;
    } else if (valObj.booleanValue !== undefined) {
      obj[key] = valObj.booleanValue;
    } else if (valObj.integerValue !== undefined) {
      obj[key] = parseInt(valObj.integerValue, 10);
    } else if (valObj.doubleValue !== undefined) {
      obj[key] = parseFloat(valObj.doubleValue);
    } else if (valObj.nullValue !== undefined) {
      obj[key] = null;
    } else if (valObj.arrayValue !== undefined) {
      const vals = valObj.arrayValue.values || [];
      obj[key] = vals.map(v => {
        if (v.mapValue) return fromFirestoreFields(v.mapValue.fields);
        if (v.stringValue !== undefined) return v.stringValue;
        if (v.integerValue !== undefined) return parseInt(v.integerValue, 10);
        if (v.booleanValue !== undefined) return v.booleanValue;
        return v;
      });
    } else if (valObj.mapValue !== undefined) {
      obj[key] = fromFirestoreFields(valObj.mapValue.fields);
    }
  }
  return obj;
}

// --- DIRECT CLOUD DATABASE OPERATIONS ---

// 1. Fetch All Documents from a Collection
export async function fetchCollectionFromCloud(collectionName) {
  const url = getFirestoreUrl(collectionName, 'pageSize=1000');
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[Firebase] Fetch returned status ${res.status} for collection "${collectionName}"`);
      return null;
    }
    const data = await res.json();
    if (!data.documents || !Array.isArray(data.documents)) {
      return [];
    }

    return data.documents.map(doc => {
      const parsed = fromFirestoreFields(doc.fields);
      if (!parsed.id) {
        const parts = doc.name.split('/');
        parsed.id = parts[parts.length - 1];
      }
      return parsed;
    });
  } catch (err) {
    console.warn(`[Firebase] Network fetch error for ${collectionName}:`, err);
    return null;
  }
}

// 2. Save or Update a Document in Firestore (Direct Live Write)
export async function saveDocToCloud(collectionName, docId, data) {
  const cleanId = encodeURIComponent(String(docId || data.id));
  const url = getFirestoreUrl(`${collectionName}/${cleanId}`);

  const payload = {
    fields: toFirestoreFields(data)
  };

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[Firebase] Write failed for ${collectionName}/${cleanId}:`, errText);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[Firebase] Write exception for ${collectionName}/${cleanId}:`, err);
    return false;
  }
}

// 3. Delete a Document from Firestore (Direct Live Delete)
export async function deleteDocFromCloud(collectionName, docId) {
  const cleanId = encodeURIComponent(String(docId));
  const url = getFirestoreUrl(`${collectionName}/${cleanId}`);

  try {
    const res = await fetch(url, { method: 'DELETE' });
    return res.ok;
  } catch (err) {
    console.error(`[Firebase] Delete exception for ${collectionName}/${cleanId}:`, err);
    return false;
  }
}

// 4. Batch Auto-Seed / Sync
export async function syncAllToCloud(collectionName, items) {
  let successCount = 0;
  for (const item of items) {
    const id = item.id || `${collectionName}-${Date.now()}`;
    const ok = await saveDocToCloud(collectionName, id, item);
    if (ok) successCount++;
  }
  return { success: true, count: successCount };
}
