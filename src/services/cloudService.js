// Firebase Firestore Cloud Sync Service (Zero-Dependency REST Engine)
// Provides instant cloud persistence for Saheer Paradise Exports admin changes across all devices & users worldwide.

const CLOUD_CONFIG_KEY = 'saheer_cloud_config';

// Official Web App Firebase Config
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDvf2-g190T5HapAl2lyy1aunVGmXq78sE",
  authDomain: "saheer-paradise-export.firebaseapp.com",
  projectId: "saheer-paradise-export",
  storageBucket: "saheer-paradise-export.firebasestorage.app",
  messagingSenderId: "99309249757",
  appId: "1:99309249757:web:3a3e020a7e430b8641a734",
  measurementId: "G-T5DTS5VJN5"
};

// Default / fallback cloud settings
const DEFAULT_CONFIG = {
  projectId: 'saheer-paradise-export',
  apiKey: 'AIzaSyDvf2-g190T5HapAl2lyy1aunVGmXq78sE',
  enabled: true
};

// Retrieve saved cloud configuration
export function getCloudConfig() {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(CLOUD_CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CONFIG, ...parsed, projectId: parsed.projectId || DEFAULT_CONFIG.projectId, apiKey: parsed.apiKey || DEFAULT_CONFIG.apiKey };
      }
    }
  } catch (e) {}
  return DEFAULT_CONFIG;
}

// Save cloud configuration
export function saveCloudConfig(config) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(config));
    }
  } catch (e) {}
}

// --- FIRESTORE VALUE CONVERTERS ---
// Helper: Convert JS object to Firestore Document fields structure
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

// Helper: Convert Firestore Document fields back to standard JS object
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

// --- CLOUD API CALLS ---

// Test Firebase Connection
export async function testCloudConnection(config = null) {
  const cfg = config || getCloudConfig();
  if (!cfg.projectId || !cfg.projectId.trim()) {
    return { success: false, message: 'Firebase Project ID is required.' };
  }

  const projectId = cfg.projectId.trim();
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/_healthcheck`;

  try {
    const res = await fetch(url);
    // 404 is okay (means database exists but document doesn't), 200 is okay
    if (res.status === 200 || res.status === 404) {
      return { success: true, message: 'Connected successfully to Firebase Cloud Firestore!' };
    }
    const errData = await res.json().catch(() => ({}));
    return { 
      success: false, 
      message: errData.error?.message || `Firebase response error (${res.status}). Check Firestore database rules.` 
    };
  } catch (err) {
    return { success: false, message: err.message || 'Network error connecting to Firebase.' };
  }
}

// Fetch all documents from a Firestore collection
export async function fetchCollectionFromCloud(collectionName, customConfig = null) {
  const cfg = customConfig || getCloudConfig();
  if (!cfg.projectId || !cfg.enabled) {
    return null;
  }

  const projectId = cfg.projectId.trim();
  // Fetch up to 300 documents from the collection
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}?pageSize=300`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.documents || !Array.isArray(data.documents)) return [];

    return data.documents.map(doc => {
      const parsed = fromFirestoreFields(doc.fields);
      // Extract document ID from path if missing
      if (!parsed.id) {
        const parts = doc.name.split('/');
        parsed.id = parts[parts.length - 1];
      }
      return parsed;
    });
  } catch (err) {
    console.warn(`[CloudService] Fetch failed for ${collectionName}:`, err);
    return null;
  }
}

// Save / Update a single document in Firestore
export async function saveDocToCloud(collectionName, docId, data, customConfig = null) {
  const cfg = customConfig || getCloudConfig();
  if (!cfg.projectId || !cfg.enabled) return false;

  const projectId = cfg.projectId.trim();
  const cleanId = encodeURIComponent(String(docId || data.id));
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}/${cleanId}`;

  const payload = {
    fields: toFirestoreFields(data)
  };

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.error(`[CloudService] Save error for ${collectionName}/${docId}:`, err);
    return false;
  }
}

// Delete a document from Firestore
export async function deleteDocFromCloud(collectionName, docId, customConfig = null) {
  const cfg = customConfig || getCloudConfig();
  if (!cfg.projectId || !cfg.enabled) return false;

  const projectId = cfg.projectId.trim();
  const cleanId = encodeURIComponent(String(docId));
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}/${cleanId}`;

  try {
    const res = await fetch(url, { method: 'DELETE' });
    return res.ok;
  } catch (err) {
    console.error(`[CloudService] Delete error for ${collectionName}/${docId}:`, err);
    return false;
  }
}

// Sync all local items to Cloud (Batch sync)
export async function syncAllToCloud(type, items, customConfig = null) {
  const cfg = customConfig || getCloudConfig();
  if (!cfg.projectId) return { success: false, message: 'Firebase Project ID is required.' };

  let successCount = 0;
  let failCount = 0;

  for (const item of items) {
    const id = item.id || `${type}-${Date.now()}`;
    const ok = await saveDocToCloud(type, id, item, { ...cfg, enabled: true });
    if (ok) successCount++;
    else failCount++;
  }

  return {
    success: successCount > 0,
    successCount,
    failCount,
    message: `Synced ${successCount} ${type} to Firebase Cloud.`
  };
}
