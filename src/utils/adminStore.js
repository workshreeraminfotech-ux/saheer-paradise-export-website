// Centralized Dynamic Data & Admin Store
// Dual-Layer Storage: Reactive In-Memory State + Unlimited IndexedDB + LocalStorage

import { PRODUCTS as INITIAL_PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import { BLOGS as INITIAL_BLOGS } from '../data/blogs';
import { idbGet, idbSet } from './idbStorage';
import { 
  fetchCollectionFromCloud, 
  saveDocToCloud, 
  deleteDocFromCloud, 
  syncAllToCloud 
} from '../services/cloudService';

export { syncAllToCloud };

import apedaLogo from '../assets/certificate/apeda.png';
import spicesBoardLogo from '../assets/certificate/spices board.png';
import fdaLogo from '../assets/certificate/fda.png';
import isoLogo from '../assets/certificate/iso.png';
import fssaiLogo from '../assets/certificate/fssai.png';
import halalLogo from '../assets/certificate/halal.png';

const INITIAL_CERTS = [
  { 
    id: 'cert-1',
    name: 'APEDA Certified Exporter', 
    code: 'APEDA / GOVT', 
    tag: 'Agricultural & Processed Food Products Export Development Authority',
    logo: apedaLogo
  },
  { 
    id: 'cert-2',
    name: 'Spice Board of India', 
    code: 'SPICE BOARD', 
    tag: 'Ministry of Commerce & Industry, Govt of India',
    logo: spicesBoardLogo
  },
  { 
    id: 'cert-3',
    name: 'US FDA Registered Facility', 
    code: 'US FDA', 
    tag: 'US Food and Drug Administration Registration',
    logo: fdaLogo
  },
  { 
    id: 'cert-4',
    name: 'ISO 22000 & ISO 9001:2015', 
    code: 'ISO 22000', 
    tag: 'Food Safety Management & Quality Control System',
    logo: isoLogo
  },
  { 
    id: 'cert-5',
    name: 'FSSAI License Approved', 
    code: 'FSSAI', 
    tag: 'Food Safety and Standards Authority of India',
    logo: fssaiLogo
  },
  { 
    id: 'cert-6',
    name: 'Halal Certified Export', 
    code: 'HALAL', 
    tag: 'Global Dietary Compliance for Gulf & Middle East Markets',
    logo: halalLogo
  }
];

// In-Memory Reactive Cache (Unlimited Capacity — Never constrained by 5MB localStorage)
let memoryProducts = null;
let memoryBlogs = null;
let memoryCerts = null;
let memoryEnquiries = null;

// Helper: Broadcast store update event to all components
export function notifyStoreUpdate() {
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('priya_store_updated'));
    }
  } catch (e) {}
}

// Helper to normalize product category and subcategory safely
export function normalizeProduct(p) {
  if (!p) return null;
  let category = p.category || p.cat || 'Indian Spices';
  let subcategory = p.subcategory || '';
  
  const lowerCat = String(category).trim().toLowerCase();
  if (lowerCat.includes('ground spice') || lowerCat === 'ground spices') {
    category = 'Indian Spices';
    subcategory = subcategory || 'Ground Spices';
  } else if (lowerCat.includes('whole spice') || lowerCat === 'whole spices') {
    category = 'Indian Spices';
    subcategory = subcategory || 'Whole Spices';
  } else if (lowerCat.includes('seed spice') || lowerCat === 'seed spices') {
    category = 'Indian Spices';
    subcategory = subcategory || 'Seed Spices';
  } else if (lowerCat.includes('blend') || lowerCat === 'blended spices') {
    category = 'Indian Spices';
    subcategory = subcategory || 'Blended Spices';
  } else if (lowerCat.includes('exotic') || lowerCat.includes('premium')) {
    category = 'Indian Spices';
    subcategory = subcategory || 'Exotic & Premium';
  } else if (lowerCat.includes('spice') || lowerCat === 'spices') {
    category = 'Indian Spices';
    subcategory = subcategory || 'Ground Spices';
  } else if (lowerCat.includes('agro') || lowerCat.includes('commodit')) {
    category = 'Agro Commodities';
    subcategory = subcategory || 'Rice & Grains';
  } else if (lowerCat.includes('machin')) {
    category = 'Machinery';
    subcategory = subcategory || 'Processing Machinery';
  } else if (lowerCat.includes('pipe')) {
    category = 'Pipes';
    subcategory = subcategory || 'Stainless Steel Pipes';
  }

  if (!subcategory) {
    if (category === 'Indian Spices') subcategory = 'Ground Spices';
    else if (category === 'Agro Commodities') subcategory = 'Rice & Grains';
    else if (category === 'Machinery') subcategory = 'Processing Machinery';
    else if (category === 'Pipes') subcategory = 'Stainless Steel Pipes';
  }

  return {
    ...p,
    category,
    cat: category,
    subcategory
  };
}

// Merge default catalog with custom / cloud catalog
function mergeWithDefaultProducts(incomingList = []) {
  const normalizedIncoming = (incomingList || []).map(normalizeProduct).filter(Boolean);
  const incomingMap = new Map();
  normalizedIncoming.forEach(p => incomingMap.set(p.id, p));

  // Overlay on INITIAL_PRODUCTS to preserve local assets if not overridden
  const merged = INITIAL_PRODUCTS.map(initial => {
    if (incomingMap.has(initial.id)) {
      const cloudItem = incomingMap.get(initial.id);
      incomingMap.delete(initial.id);
      return {
        ...initial,
        ...cloudItem,
        image: cloudItem.image || initial.image,
        category: cloudItem.category || initial.category,
        subcategory: cloudItem.subcategory || initial.subcategory
      };
    }
    return initial;
  });

  // Append any newly added custom products
  for (const [_, customProd] of incomingMap.entries()) {
    merged.push(customProd);
  }

  return merged;
}

// Initial Sync from IndexedDB & LocalStorage & Firebase Cloud on startup
if (typeof window !== 'undefined') {
  // 1. Quick load from localStorage (if any)
  try {
    const lp = localStorage.getItem('marvex_products');
    if (lp) memoryProducts = mergeWithDefaultProducts(JSON.parse(lp));
    const lb = localStorage.getItem('marvex_blogs');
    if (lb) memoryBlogs = JSON.parse(lb);
    const lc = localStorage.getItem('marvex_certs');
    if (lc) memoryCerts = JSON.parse(lc);
    const le = localStorage.getItem('marvex_enquiries');
    if (le) memoryEnquiries = JSON.parse(le);
  } catch (e) {}

  // 2. Load complete dataset from IndexedDB & Live Cloud
  (async () => {
    try {
      const [idbProds, idbBlogs, idbCerts, idbEnqs] = await Promise.all([
        idbGet('marvex_products'),
        idbGet('marvex_blogs'),
        idbGet('marvex_certs'),
        idbGet('marvex_enquiries')
      ]);

      let hasUpdate = false;
      if (idbProds && Array.isArray(idbProds) && idbProds.length > 0) {
        memoryProducts = mergeWithDefaultProducts(idbProds);
        hasUpdate = true;
      }
      if (idbBlogs && Array.isArray(idbBlogs) && idbBlogs.length > 0) {
        memoryBlogs = idbBlogs;
        hasUpdate = true;
      }
      if (idbCerts && Array.isArray(idbCerts) && idbCerts.length > 0) {
        memoryCerts = idbCerts;
        hasUpdate = true;
      }
      if (idbEnqs && Array.isArray(idbEnqs) && idbEnqs.length > 0) {
        memoryEnquiries = idbEnqs;
        hasUpdate = true;
      }

      if (hasUpdate) {
        notifyStoreUpdate();
      }

      // 3. Load latest direct live dataset from Firebase Cloud Firestore (Permanent worldwide sync)
      try {
        const [cloudProds, cloudBlogs, cloudCerts, cloudEnqs] = await Promise.all([
          fetchCollectionFromCloud('products'),
          fetchCollectionFromCloud('blogs'),
          fetchCollectionFromCloud('certificates'),
          fetchCollectionFromCloud('enquiries')
        ]);

        let hasCloudUpdate = false;
        if (cloudProds && Array.isArray(cloudProds) && cloudProds.length > 0) {
          const merged = mergeWithDefaultProducts(cloudProds);
          memoryProducts = merged;
          idbSet('marvex_products', merged);
          hasCloudUpdate = true;
        } else if (cloudProds && Array.isArray(cloudProds) && cloudProds.length === 0) {
          // Cloud is initialized fresh: auto-upload current default items to Firebase
          const prodsToSeed = memoryProducts || INITIAL_PRODUCTS;
          syncAllToCloud('products', prodsToSeed).catch(() => {});
        }

        if (cloudBlogs && Array.isArray(cloudBlogs) && cloudBlogs.length > 0) {
          memoryBlogs = cloudBlogs;
          idbSet('marvex_blogs', cloudBlogs);
          hasCloudUpdate = true;
        } else if (cloudBlogs && Array.isArray(cloudBlogs) && cloudBlogs.length === 0) {
          const blogsToSeed = memoryBlogs || INITIAL_BLOGS;
          syncAllToCloud('blogs', blogsToSeed).catch(() => {});
        }

        if (cloudCerts && Array.isArray(cloudCerts) && cloudCerts.length > 0) {
          memoryCerts = cloudCerts;
          idbSet('marvex_certs', cloudCerts);
          hasCloudUpdate = true;
        }

        if (cloudEnqs && Array.isArray(cloudEnqs) && cloudEnqs.length > 0) {
          memoryEnquiries = cloudEnqs;
          idbSet('marvex_enquiries', cloudEnqs);
          hasCloudUpdate = true;
        }

        if (hasCloudUpdate) {
          notifyStoreUpdate();
        }
      } catch (cloudErr) {
        console.warn('[Store] Live Cloud sync skipped:', cloudErr);
      }
    } catch (e) {}
  })();
}


// Global listener for realtime snapshot events
if (typeof window !== 'undefined') {
  window.addEventListener('priya_store_updated', (e) => {
    if (e && e.detail && e.detail.type && e.detail.items) {
      if (e.detail.type === 'products') memoryProducts = e.detail.items;
      if (e.detail.type === 'blogs') memoryBlogs = e.detail.items;
      if (e.detail.type === 'certificates') memoryCerts = e.detail.items;
      if (e.detail.type === 'enquiries') memoryEnquiries = e.detail.items;
    }
  });
}

// --- ADMIN AUTH STATE ---
const ADMIN_SESSION_KEY = 'saheer_admin_auth';
const ADMIN_PASSWORDS = ['admin123', 'saheer123', 'saheer@2026', 'saheerparadise@789', 'admin@2026'];

export function isUserAdmin() {
  try {
    if (typeof sessionStorage !== 'undefined') {
      const auth = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (auth === 'true') return true;
    }
  } catch (e) {}
  return false;
}

export const isAdminLoggedIn = isUserAdmin;

export function loginAdmin(usernameOrPass, optionalPass) {
  let user = 'admin';
  let pass = '';

  if (optionalPass !== undefined) {
    user = (usernameOrPass || '').trim().toLowerCase();
    pass = (optionalPass || '').trim();
  } else {
    pass = (usernameOrPass || '').trim();
  }

  const validUsers = ['admin', 'saheer', 'saheer paradise', 'saheerparadise', 'saheer paradise export', 'admin@saheerparadise.com'];
  const validPass = ADMIN_PASSWORDS.includes(pass) || pass === 'admin123' || pass === 'saheer123';

  if ((validUsers.includes(user) || !optionalPass) && validPass) {
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      }
    } catch (e) {}
    return { success: true };
  }

  return { success: false, message: 'Invalid username or password. Please try again.' };
}

export function logoutAdmin() {
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch (e) {}
}

// --- PRODUCTS STORE ---
export function getProducts() {
  if (memoryProducts && Array.isArray(memoryProducts) && memoryProducts.length > 0) {
    return memoryProducts;
  }
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('marvex_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = mergeWithDefaultProducts(parsed);
          memoryProducts = merged;
          return merged;
        }
      }
    }
  } catch (e) {}
  const initialMerged = mergeWithDefaultProducts(INITIAL_PRODUCTS);
  memoryProducts = initialMerged;
  return initialMerged;
}

export function saveProducts(productsList) {
  const normalized = (productsList || []).map(normalizeProduct).filter(Boolean);
  memoryProducts = normalized;
  idbSet('marvex_products', normalized);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('marvex_products', JSON.stringify(normalized));
    }
  } catch (e) {}
  notifyStoreUpdate();
}

export async function addProduct(newProd) {
  const list = getProducts();
  const normalizedNew = normalizeProduct(newProd);
  const prodWithId = {
    ...normalizedNew,
    id: normalizedNew.id || `prod-${Date.now()}`
  };
  const updated = [prodWithId, ...list.filter(p => p.id !== prodWithId.id)];
  saveProducts(updated);
  saveDocToCloud('products', prodWithId.id, prodWithId).catch(() => {});
  return updated;
}

export async function updateProduct(updatedProd) {
  const list = getProducts();
  const normalizedUpdated = normalizeProduct(updatedProd);
  const updated = list.map(p => (p.id === normalizedUpdated.id ? { ...p, ...normalizedUpdated } : p));
  saveProducts(updated);
  saveDocToCloud('products', normalizedUpdated.id, normalizedUpdated).catch(() => {});
  return updated;
}

export async function deleteProduct(id) {
  const list = getProducts();
  const updated = list.filter(p => p.id !== id);
  saveProducts(updated);
  deleteDocFromCloud('products', id).catch(() => {});
  return updated;
}

// Force re-fetch from Firebase live database
export async function reloadFromCloud() {
  try {
    const [cloudProds, cloudBlogs, cloudCerts, cloudEnqs] = await Promise.all([
      fetchCollectionFromCloud('products'),
      fetchCollectionFromCloud('blogs'),
      fetchCollectionFromCloud('certificates'),
      fetchCollectionFromCloud('enquiries')
    ]);

    if (cloudProds && Array.isArray(cloudProds)) {
      const merged = mergeWithDefaultProducts(cloudProds);
      memoryProducts = merged;
      idbSet('marvex_products', merged);
    }
    if (cloudBlogs && Array.isArray(cloudBlogs)) {
      memoryBlogs = cloudBlogs;
      idbSet('marvex_blogs', cloudBlogs);
    }
    if (cloudCerts && Array.isArray(cloudCerts)) {
      memoryCerts = cloudCerts;
      idbSet('marvex_certs', cloudCerts);
    }
    if (cloudEnqs && Array.isArray(cloudEnqs)) {
      memoryEnquiries = cloudEnqs;
      idbSet('marvex_enquiries', cloudEnqs);
    }
    notifyStoreUpdate();
    return { success: true, count: memoryProducts.length };
  } catch (err) {
    console.error('Failed to reload from cloud:', err);
    return { success: false, error: err.message };
  }
}

// 1-Click Sync All Master Products to Firebase
export async function syncAllMasterProductsToCloud() {
  const allProds = getProducts();
  let successCount = 0;
  for (const prod of allProds) {
    const normalized = normalizeProduct(prod);
    const ok = await saveDocToCloud('products', normalized.id, normalized);
    if (ok) successCount++;
  }
  return { success: true, count: successCount, total: allProds.length };
}

// --- BLOGS STORE ---
export function getBlogs() {
  if (memoryBlogs && Array.isArray(memoryBlogs) && memoryBlogs.length > 0) {
    return memoryBlogs;
  }
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('marvex_blogs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryBlogs = parsed;
          return parsed;
        }
      }
    }
  } catch (e) {}
  return INITIAL_BLOGS || [];
}

export function saveBlogs(blogsList) {
  memoryBlogs = blogsList;
  idbSet('marvex_blogs', blogsList);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('marvex_blogs', JSON.stringify(blogsList));
    }
  } catch (e) {}
  notifyStoreUpdate();
}

export async function addBlog(newBlog) {
  const list = getBlogs();
  const blogWithId = {
    ...newBlog,
    id: newBlog.id || `blog-${Date.now()}`,
    date: newBlog.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  };
  const updated = [blogWithId, ...list];
  saveBlogs(updated);
  saveDocToCloud('blogs', blogWithId.id, blogWithId).catch(() => {});
  return updated;
}

export async function updateBlog(updatedBlog) {
  const list = getBlogs();
  const updated = list.map(b => (b.id === updatedBlog.id ? { ...b, ...updatedBlog } : b));
  saveBlogs(updated);
  saveDocToCloud('blogs', updatedBlog.id, updatedBlog).catch(() => {});
  return updated;
}

export async function deleteBlog(id) {
  const list = getBlogs();
  const updated = list.filter(b => b.id !== id);
  saveBlogs(updated);
  deleteDocFromCloud('blogs', id).catch(() => {});
  return updated;
}

// --- CERTIFICATES STORE ---
export function getCertificates() {
  if (memoryCerts && Array.isArray(memoryCerts) && memoryCerts.length > 0) {
    return memoryCerts;
  }
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('marvex_certs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryCerts = parsed;
          return parsed;
        }
      }
    }
  } catch (e) {}
  return INITIAL_CERTS || [];
}

export function saveCertificates(certsList) {
  memoryCerts = certsList;
  idbSet('marvex_certs', certsList);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('marvex_certs', JSON.stringify(certsList));
    }
  } catch (e) {}
  notifyStoreUpdate();
}

export async function addCertificate(newCert) {
  const list = getCertificates();
  const certWithId = {
    ...newCert,
    id: newCert.id || `cert-${Date.now()}`
  };
  const updated = [...list, certWithId];
  saveCertificates(updated);
  saveDocToCloud('certificates', certWithId.id, certWithId).catch(() => {});
  return updated;
}

export async function updateCertificate(updatedCert) {
  const list = getCertificates();
  const updated = list.map(c => (c.id === updatedCert.id ? { ...c, ...updatedCert } : c));
  saveCertificates(updated);
  saveDocToCloud('certificates', updatedCert.id, updatedCert).catch(() => {});
  return updated;
}

export async function deleteCertificate(id) {
  const list = getCertificates();
  const updated = list.filter(c => c.id !== id);
  saveCertificates(updated);
  deleteDocFromCloud('certificates', id).catch(() => {});
  return updated;
}

// --- ENQUIRIES STORE ---
const INITIAL_ENQUIRIES = [
  {
    id: 'enq-101',
    source: 'Product Quote Request',
    name: 'Hans Weber',
    company: 'EuroSpices GmbH',
    email: 'h.weber@eurospices.de',
    phone: '+49 171 5550192',
    product: 'Turmeric Powder (Curcumin > 3.5%)',
    quantity: '20 MT (1x20ft FCL)',
    destinationPort: 'Hamburg Port, Germany',
    notes: 'Please quote CIF Hamburg rates with phytosanitary & lab COA test certificates.',
    status: 'New',
    date: 'Aug 08, 2026 10:15 AM'
  },
  {
    id: 'enq-102',
    source: 'Contact Us Form',
    name: 'Tariq Al-Mansoor',
    company: 'Gulf General Trading Co.',
    email: 'tariq@gulfgeneral.ae',
    phone: '+971 50 1234567',
    product: 'Guntur S17 Red Chilli & Cumin Seeds',
    quantity: '40 MT (2x40ft FCL)',
    destinationPort: 'Jebel Ali Port, Dubai',
    notes: 'Urgent container requirement for Ramadan shipment. Halal certification required.',
    status: 'New',
    date: 'Aug 07, 2026 04:30 PM'
  }
];

export function getEnquiries() {
  if (memoryEnquiries && Array.isArray(memoryEnquiries) && memoryEnquiries.length > 0) {
    return memoryEnquiries;
  }
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('marvex_enquiries');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          memoryEnquiries = parsed;
          return parsed;
        }
      }
    }
  } catch (e) {}
  return INITIAL_ENQUIRIES || [];
}

export function saveEnquiries(enquiriesList) {
  memoryEnquiries = enquiriesList;
  idbSet('marvex_enquiries', enquiriesList);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('marvex_enquiries', JSON.stringify(enquiriesList));
    }
  } catch (e) {}
  notifyStoreUpdate();
}

export async function addEnquiry(enquiryData) {
  const list = getEnquiries();
  const newEnquiry = {
    id: `enq-${Date.now()}`,
    source: enquiryData.source || 'Website Form',
    name: enquiryData.name || 'Anonymous Buyer',
    company: enquiryData.company || 'Private Buyer',
    email: enquiryData.email || 'N/A',
    phone: enquiryData.phone || 'N/A',
    product: enquiryData.product || enquiryData.title || 'General Commodity Enquiry',
    quantity: enquiryData.quantity || 'N/A',
    destinationPort: enquiryData.destinationPort || 'Overseas Port',
    notes: enquiryData.notes || enquiryData.message || 'Product quote request submitted.',
    status: 'New',
    date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
  };
  const updated = [newEnquiry, ...list];
  saveEnquiries(updated);
  saveDocToCloud('enquiries', newEnquiry.id, newEnquiry).catch(() => {});
  return updated;
}

export async function updateEnquiryStatus(id, status) {
  const list = getEnquiries();
  const updated = list.map(e => (e.id === id ? { ...e, status } : e));
  saveEnquiries(updated);
  const found = updated.find(e => e.id === id);
  if (found) saveDocToCloud('enquiries', id, found).catch(() => {});
  return updated;
}

export async function deleteEnquiry(id) {
  const list = getEnquiries();
  const updated = list.filter(e => e.id !== id);
  saveEnquiries(updated);
  deleteDocFromCloud('enquiries', id).catch(() => {});
  return updated;
}

export function exportEnquiriesCSV(enquiriesList) {
  const list = enquiriesList || getEnquiries();
  if (!list || list.length === 0) {
    alert('No enquiries to export.');
    return;
  }
  const headers = ['ID', 'Date', 'Source', 'Buyer Name', 'Company', 'Email', 'Phone', 'Commodity', 'Quantity', 'Destination Port', 'Status', 'Notes'];
  const rows = list.map(e => [
    `"${e.id || ''}"`,
    `"${e.date || ''}"`,
    `"${e.source || ''}"`,
    `"${(e.name || '').replace(/"/g, '""')}"`,
    `"${(e.company || '').replace(/"/g, '""')}"`,
    `"${e.email || ''}"`,
    `"${e.phone || ''}"`,
    `"${(e.product || '').replace(/"/g, '""')}"`,
    `"${(e.quantity || '').replace(/"/g, '""')}"`,
    `"${(e.destinationPort || '').replace(/"/g, '""')}"`,
    `"${e.status || ''}"`,
    `"${(e.notes || '').replace(/"/g, '""')}"`
  ]);
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Saheer_Paradise_Export_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
