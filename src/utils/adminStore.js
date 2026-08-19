// Centralized Dynamic Data & Admin Store
// Dual-Layer Storage: Reactive In-Memory State + Unlimited IndexedDB + LocalStorage

import { PRODUCTS as INITIAL_PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import { BLOGS as INITIAL_BLOGS } from '../data/blogs';
import { idbGet, idbSet } from './idbStorage';

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

// Initial Sync from IndexedDB & LocalStorage on startup
if (typeof window !== 'undefined') {
  // 1. Initial quick load from localStorage (if any)
  try {
    const lp = localStorage.getItem('marvex_products');
    if (lp) memoryProducts = JSON.parse(lp);
    const lb = localStorage.getItem('marvex_blogs');
    if (lb) memoryBlogs = JSON.parse(lb);
    const lc = localStorage.getItem('marvex_certs');
    if (lc) memoryCerts = JSON.parse(lc);
    const le = localStorage.getItem('marvex_enquiries');
    if (le) memoryEnquiries = JSON.parse(le);
  } catch (e) {}

  // 2. Load complete high-capacity dataset from IndexedDB
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
        memoryProducts = idbProds;
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
          memoryProducts = parsed;
          return parsed;
        }
      }
    }
  } catch (e) {}
  return INITIAL_PRODUCTS || [];
}

export function saveProducts(productsList) {
  memoryProducts = productsList;
  idbSet('marvex_products', productsList);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('marvex_products', JSON.stringify(productsList));
    }
  } catch (e) {}
  notifyStoreUpdate();
}

export async function addProduct(newProd) {
  const list = getProducts();
  const prodWithId = {
    ...newProd,
    id: newProd.id || `prod-${Date.now()}`
  };
  const updated = [prodWithId, ...list];
  saveProducts(updated);
  return updated;
}

export async function updateProduct(updatedProd) {
  const list = getProducts();
  const updated = list.map(p => (p.id === updatedProd.id ? { ...p, ...updatedProd } : p));
  saveProducts(updated);
  return updated;
}

export async function deleteProduct(id) {
  const list = getProducts();
  const updated = list.filter(p => p.id !== id);
  saveProducts(updated);
  return updated;
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
    id: newBlog.id || Date.now(),
    date: newBlog.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  };
  const updated = [blogWithId, ...list];
  saveBlogs(updated);
  return updated;
}

export async function updateBlog(updatedBlog) {
  const list = getBlogs();
  const updated = list.map(b => (b.id === updatedBlog.id ? { ...b, ...updatedBlog } : b));
  saveBlogs(updated);
  return updated;
}

export async function deleteBlog(id) {
  const list = getBlogs();
  const updated = list.filter(b => b.id !== id);
  saveBlogs(updated);
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
  return updated;
}

export async function updateCertificate(updatedCert) {
  const list = getCertificates();
  const updated = list.map(c => (c.id === updatedCert.id ? { ...c, ...updatedCert } : c));
  saveCertificates(updated);
  return updated;
}

export async function deleteCertificate(id) {
  const list = getCertificates();
  const updated = list.filter(c => c.id !== id);
  saveCertificates(updated);
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
  return updated;
}

export async function updateEnquiryStatus(id, status) {
  const list = getEnquiries();
  const updated = list.map(e => (e.id === id ? { ...e, status } : e));
  saveEnquiries(updated);
  return updated;
}

export async function deleteEnquiry(id) {
  const list = getEnquiries();
  const updated = list.filter(e => e.id !== id);
  saveEnquiries(updated);
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
