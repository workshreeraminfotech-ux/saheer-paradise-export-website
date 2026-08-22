import React, { useState, useEffect, useMemo } from 'react';
import { 
  Package, FileText, Award, LogOut, Plus, Trash2, Edit3, Search, 
  CheckCircle2, X, Upload, ShieldCheck, ExternalLink, RefreshCw,
  Inbox, MessageSquare, Mail, Phone, Clock, Globe, AlertCircle, Download,
  Check, ArrowRight, Eye, Flame, Wheat, Cog, Cylinder, Filter
} from 'lucide-react';
import AdminLogin from './AdminLogin';
import { 
  isAdminLoggedIn, logoutAdmin, 
  getProducts, addProduct, updateProduct, deleteProduct,
  getBlogs, addBlog, updateBlog, deleteBlog,
  getCertificates, addCertificate, updateCertificate, deleteCertificate,
  getEnquiries, updateEnquiryStatus, deleteEnquiry, exportEnquiriesCSV,
  reloadFromCloud, normalizeProduct
} from '../utils/adminStore';
import { PRODUCT_CATEGORIES } from '../data/products';

export const CATEGORY_SUBCATEGORIES = {
  'Indian Spices': [
    'Ground Spices',
    'Whole Spices',
    'Seed Spices',
    'Blended Spices',
    'Exotic & Premium'
  ],
  'Agro Commodities': [
    'Rice & Grains',
    'Oilseeds & Meals',
    'Pulses & Legumes'
  ],
  'Machinery': [
    'Processing Machinery',
    'Packaging Equipment',
    'Agro Machinery'
  ],
  'Pipes': [
    'Stainless Steel Pipes',
    'Carbon Steel Pipes',
    'Plastic & Polymer Pipes',
    'Irrigation Pipes'
  ]
};

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(isAdminLoggedIn());
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'product_enquiries' | 'contact_enquiries' | 'blogs' | 'certs'
  const [toast, setToast] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  // Stores
  const [products, setProductsState] = useState(getProducts());
  const [blogs, setBlogsState] = useState(getBlogs());
  const [certs, setCertsState] = useState(getCertificates());
  const [enquiries, setEnquiriesState] = useState(getEnquiries());
  const [enquiryFilter, setEnquiryFilter] = useState('all'); // 'all' | 'product_quote' | 'contact_form'

  // Search & Filter State for Products
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedSubCat, setSelectedSubCat] = useState('All');
  const [previewImage, setPreviewImage] = useState(null);

  // Modal States
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [showCertModal, setShowCertModal] = useState(false);
  const [editingCert, setEditingCert] = useState(null);

  // Form States
  const [prodForm, setProdForm] = useState({
    title: '', category: 'Indian Spices', subcategory: 'Ground Spices', packaging: '25kg PP Bags / Custom', specs: '', description: '', image: '', hsCode: 'HS 0910', isFeatured: false
  });

  const [blogForm, setBlogForm] = useState({
    title: '', cat: 'Product Guide', read: '5 min read', excerpt: '', body: '', image: ''
  });

  const [certForm, setCertForm] = useState({
    name: '', code: 'CERTIFIED', tag: '', logo: ''
  });

  // Re-fetch data on activeTab change or mount
  const refreshLocalState = () => {
    setProductsState(getProducts());
    setBlogsState(getBlogs());
    setCertsState(getCertificates());
    setEnquiriesState(getEnquiries());
  };

  useEffect(() => {
    if (authenticated) {
      refreshLocalState();
    }
    const handleGlobalUpdate = () => refreshLocalState();
    window.addEventListener('priya_store_updated', handleGlobalUpdate);
    return () => window.removeEventListener('priya_store_updated', handleGlobalUpdate);
  }, [authenticated, activeTab]);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const handleLoginSuccess = () => {
    setAuthenticated(true);
    refreshLocalState();
    showNotification('Welcome back, Admin!');
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthenticated(false);
  };

  // Image Upload Handler with High-Ratio Browser Compression
  const handleImageFileChange = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 750;
        const MAX_HEIGHT = 750;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Ultra-lightweight JPEG (~25KB - 35KB) for instant Firestore writes & unlimited storage
        const compressedUrl = canvas.toDataURL('image/jpeg', 0.68);
        callback(compressedUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // --- PRODUCT ACTIONS ---
  const openAddProduct = () => {
    setEditingProduct(null);
    setProdForm({
      title: '', 
      category: 'Indian Spices', 
      subcategory: 'Ground Spices', 
      packaging: '25kg PP Bags / Custom', 
      specs: '', 
      description: '', 
      image: '', 
      hsCode: 'HS 0910', 
      isFeatured: false
    });
    setShowProductModal(true);
  };

  const openEditProduct = (prod) => {
    setEditingProduct(prod);
    const cat = prod.category || prod.cat || 'Indian Spices';
    const subOptions = CATEGORY_SUBCATEGORIES[cat] || [];
    setProdForm({
      title: prod.title || '',
      category: cat,
      subcategory: prod.subcategory || subOptions[0] || 'Ground Spices',
      packaging: prod.packaging || '',
      specs: prod.specs || '',
      description: prod.description || prod.desc || '',
      image: prod.image || '',
      hsCode: prod.hsCode || '',
      isFeatured: prod.isFeatured || false
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!prodForm.title.trim()) return alert('Please enter product title');

    if (editingProduct) {
      const updated = await updateProduct({ 
        ...editingProduct, 
        ...prodForm, 
        cat: prodForm.category, 
        desc: prodForm.description,
        subcategory: prodForm.subcategory
      });
      setProductsState(updated);
      showNotification(`Product "${prodForm.title}" saved & synced to live Firebase!`);
    } else {
      const updated = await addProduct({ 
        ...prodForm, 
        cat: prodForm.category, 
        desc: prodForm.description,
        subcategory: prodForm.subcategory
      });
      setProductsState(updated);
      showNotification(`New Product "${prodForm.title}" created & synced to live Firebase!`);
    }
    setShowProductModal(false);
  };

  const handleDeleteProduct = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = await deleteProduct(id);
      setProductsState(updated);
      showNotification(`Product "${title}" removed from live database.`);
    }
  };

  // --- BLOG ACTIONS ---
  const openAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '', cat: 'Product Guide', read: '5 min read', excerpt: '', body: '', image: ''
    });
    setShowBlogModal(true);
  };

  const openEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || '',
      cat: blog.cat || 'Product Guide',
      read: blog.read || '5 min read',
      excerpt: blog.excerpt || '',
      body: blog.body || '',
      image: blog.image || ''
    });
    setShowBlogModal(true);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title.trim()) return alert('Please enter blog title');

    if (editingBlog) {
      const updated = await updateBlog({ ...editingBlog, ...blogForm });
      setBlogsState(updated);
      showNotification(`Article "${blogForm.title}" saved & synced to live Firebase!`);
    } else {
      const updated = await addBlog(blogForm);
      setBlogsState(updated);
      showNotification(`New Article "${blogForm.title}" published & synced to live Firebase!`);
    }
    setShowBlogModal(false);
  };

  const handleDeleteBlog = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete article "${title}"?`)) {
      const updated = await deleteBlog(id);
      setBlogsState(updated);
      showNotification(`Article "${title}" deleted.`);
    }
  };

  // --- CERTIFICATE ACTIONS ---
  const openAddCert = () => {
    setEditingCert(null);
    setCertForm({
      name: '', code: 'CERTIFIED', tag: '', logo: ''
    });
    setShowCertModal(true);
  };

  const openEditCert = (cert) => {
    setEditingCert(cert);
    setCertForm({
      name: cert.name || '',
      code: cert.code || '',
      tag: cert.tag || '',
      logo: cert.logo || ''
    });
    setShowCertModal(true);
  };

  const handleSaveCert = async (e) => {
    e.preventDefault();
    if (!certForm.name.trim()) return alert('Please enter certificate name');

    if (editingCert) {
      const updated = await updateCertificate({ ...editingCert, ...certForm });
      setCertsState(updated);
      showNotification(`Certificate "${certForm.name}" saved & synced to live Firebase!`);
    } else {
      const updated = await addCertificate(certForm);
      setCertsState(updated);
      showNotification(`New Certificate "${certForm.name}" added & synced to live Firebase!`);
    }
    setShowCertModal(false);
  };

  const handleDeleteCert = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete certificate "${name}"?`)) {
      const updated = await deleteCertificate(id);
      setCertsState(updated);
      showNotification(`Certificate "${name}" removed.`);
    }
  };

  // --- ENQUIRY ACTIONS ---
  const handleToggleEnquiryStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'New' ? 'Replied' : 'New';
    const updated = await updateEnquiryStatus(id, newStatus);
    setEnquiriesState(Array.isArray(updated) ? updated : getEnquiries());
    showNotification(`Enquiry status updated to ${newStatus}.`);
  };

  const handleDeleteEnquiry = async (id, name) => {
    if (window.confirm(`Delete enquiry from "${name}"?`)) {
      const updated = await deleteEnquiry(id);
      setEnquiriesState(Array.isArray(updated) ? updated : getEnquiries());
      showNotification(`Enquiry deleted.`);
    }
  };

  // Calculate Real-Time Product Counts
  const categoryCounts = useMemo(() => {
    const counts = { 'All': products.length, 'Indian Spices': 0, 'Agro Commodities': 0, 'Machinery': 0, 'Pipes': 0 };
    products.forEach(p => {
      const normalized = normalizeProduct(p);
      const cat = normalized.category;
      if (counts[cat] !== undefined) counts[cat]++;
    });
    return counts;
  }, [products]);

  // Filtered Products for Display
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (!p) return false;
      const normalized = normalizeProduct(p);
      const cat = normalized.category;
      const subcat = normalized.subcategory || '';
      
      const matchesCat = selectedCat === 'All' || cat.toLowerCase() === selectedCat.toLowerCase();
      const matchesSubCat = selectedSubCat === 'All' || subcat.toLowerCase() === selectedSubCat.toLowerCase();
      
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery = q === '' || 
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.hsCode && p.hsCode.toLowerCase().includes(q)) ||
        (p.specs && p.specs.toLowerCase().includes(q)) ||
        (subcat.toLowerCase().includes(q));
        
      return matchesCat && matchesSubCat && matchesQuery;
    });
  }, [products, selectedCat, selectedSubCat, searchQuery]);

  // Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    const list = Array.isArray(enquiries) ? enquiries : [];
    if (enquiryFilter === 'all') return list;
    if (enquiryFilter === 'product_quote') return list.filter(e => e.type === 'product_quote');
    if (enquiryFilter === 'contact_form') return list.filter(e => e.type === 'contact_form' || !e.type);
    if (enquiryFilter === 'new') return list.filter(e => e.status === 'New');
    if (enquiryFilter === 'replied') return list.filter(e => e.status === 'Replied');
    return list;
  }, [enquiries, enquiryFilter]);

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;

  if (!authenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ backgroundColor: '#F1F5F9', minHeight: '100vh', fontFamily: 'var(--font-b, Inter, sans-serif)', color: '#0F172A' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          backgroundColor: '#002147',
          color: '#FFFFFF',
          padding: '16px 26px',
          borderRadius: '16px',
          boxShadow: '0 16px 36px rgba(0, 33, 71, 0.35)',
          zIndex: 3500,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '14.5px',
          fontWeight: 700,
          border: '1.5px solid #38BDF8'
        }}>
          <CheckCircle2 size={20} style={{ color: '#38BDF8' }} />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Admin Header Navbar */}
      <header style={{ 
        background: 'linear-gradient(135deg, #07172C 0%, #002147 60%, #0A3266 100%)', 
        color: '#FFFFFF', 
        padding: '16px 0', 
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid rgba(255,255,255,0.25)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              <ShieldCheck size={26} style={{ color: '#38BDF8' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '19px', fontWeight: 900, margin: 0, letterSpacing: '-0.3px', fontFamily: 'var(--font-h, Outfit, sans-serif)' }}>
                  Saheer Paradise Export
                </h1>
                <span style={{ fontSize: '11px', backgroundColor: '#0284C7', color: '#FFFFFF', padding: '2px 8px', borderRadius: '6px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Admin Portal
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>Master Executive Control</span>
                <span style={{ fontSize: '11px', backgroundColor: 'rgba(34, 197, 94, 0.18)', color: '#86EFAC', padding: '2px 10px', borderRadius: '100px', fontWeight: 800, border: '1px solid rgba(34, 197, 94, 0.4)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ADE80', display: 'inline-block' }}></span>
                  Live Firebase Cloud Connected
                </span>
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: '#D97706',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '9px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
              }}
            >
              <ExternalLink size={14} />
              <span>View Website</span>
            </a>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#EF4444',
                color: '#FFFFFF',
                border: 'none',
                padding: '9px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="container" style={{ padding: '28px 20px 80px' }}>
        
        {/* KPI Stats Summary Dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          
          <div 
            onClick={() => { setActiveTab('products'); setSelectedCat('All'); setSelectedSubCat('All'); }}
            style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '20px', border: '1.5px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 16px rgba(0,33,71,0.04)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Products</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                <Package size={18} />
              </div>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#002147', marginTop: '10px' }}>{products.length}</div>
            <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 700 }}>🟢 All Active in Firestore</span>
          </div>

          <div 
            onClick={() => { setActiveTab('products'); setSelectedCat('Indian Spices'); setSelectedSubCat('All'); }}
            style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '20px', border: selectedCat === 'Indian Spices' && activeTab === 'products' ? '1.5px solid #EA580C' : '1.5px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 16px rgba(0,33,71,0.04)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Indian Spices</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA580C' }}>
                <Flame size={18} />
              </div>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#C2410C', marginTop: '10px' }}>{categoryCounts['Indian Spices']}</div>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Ground, Whole, Seed, Blends</span>
          </div>

          <div 
            onClick={() => { setActiveTab('products'); setSelectedCat('Agro Commodities'); setSelectedSubCat('All'); }}
            style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '20px', border: selectedCat === 'Agro Commodities' && activeTab === 'products' ? '1.5px solid #16A34A' : '1.5px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 16px rgba(0,33,71,0.04)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Agro Commodities</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
                <Wheat size={18} />
              </div>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#15803D', marginTop: '10px' }}>{categoryCounts['Agro Commodities']}</div>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Rice, Wheat, Soy, Peanuts</span>
          </div>

          <div 
            onClick={() => { setActiveTab('products'); setSelectedCat('Machinery'); setSelectedSubCat('All'); }}
            style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '20px', border: selectedCat === 'Machinery' && activeTab === 'products' ? '1.5px solid #0284C7' : '1.5px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 16px rgba(0,33,71,0.04)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Machinery</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                <Cog size={18} />
              </div>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#0369A1', marginTop: '10px' }}>{categoryCounts['Machinery']}</div>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Color Sorter, Pulverizers</span>
          </div>

          <div 
            onClick={() => { setActiveTab('products'); setSelectedCat('Pipes'); setSelectedSubCat('All'); }}
            style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '20px', border: selectedCat === 'Pipes' && activeTab === 'products' ? '1.5px solid #6366F1' : '1.5px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 16px rgba(0,33,71,0.04)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pipes</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366F1' }}>
                <Cylinder size={18} />
              </div>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#4338CA', marginTop: '10px' }}>{categoryCounts['Pipes']}</div>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>SS, Carbon, HDPE, UPVC</span>
          </div>

          <div 
            onClick={() => setActiveTab('product_enquiries')}
            style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '20px', border: '1.5px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 16px rgba(0,33,71,0.04)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Client Inquiries</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                <Inbox size={18} />
              </div>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#002147', marginTop: '10px' }}>{enquiries.length}</div>
            <span style={{ fontSize: '12px', color: newEnquiriesCount > 0 ? '#DC2626' : '#16A34A', fontWeight: 800 }}>
              {newEnquiriesCount > 0 ? `🚨 ${newEnquiriesCount} New RFQs Pending` : '✓ All Answered'}
            </span>
          </div>

        </div>

        {/* Primary Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          backgroundColor: '#FFFFFF', 
          padding: '8px', 
          borderRadius: '18px', 
          border: '1.5px solid #E2E8F0', 
          marginBottom: '28px',
          overflowX: 'auto',
          boxShadow: '0 4px 14px rgba(0,33,71,0.03)'
        }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '12px 22px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'products' ? '#002147' : 'transparent',
              color: activeTab === 'products' ? '#FFFFFF' : '#475569',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <Package size={16} />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('product_enquiries')}
            style={{
              padding: '12px 22px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'product_enquiries' ? '#002147' : 'transparent',
              color: activeTab === 'product_enquiries' ? '#FFFFFF' : '#475569',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <Inbox size={16} />
            <span>Product Quote RFQs ({enquiries.filter(e => e.type === 'product_quote').length})</span>
            {enquiries.filter(e => e.type === 'product_quote' && e.status === 'New').length > 0 && (
              <span style={{ backgroundColor: '#EF4444', color: '#FFF', fontSize: '10.5px', padding: '1px 6px', borderRadius: '100px', fontWeight: 900 }}>
                {enquiries.filter(e => e.type === 'product_quote' && e.status === 'New').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('contact_enquiries')}
            style={{
              padding: '12px 22px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'contact_enquiries' ? '#002147' : 'transparent',
              color: activeTab === 'contact_enquiries' ? '#FFFFFF' : '#475569',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <MessageSquare size={16} />
            <span>Contact Messages ({enquiries.filter(e => e.type === 'contact_form' || !e.type).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            style={{
              padding: '12px 22px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'blogs' ? '#002147' : 'transparent',
              color: activeTab === 'blogs' ? '#FFFFFF' : '#475569',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <FileText size={16} />
            <span>Articles & Blogs ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certs')}
            style={{
              padding: '12px 22px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'certs' ? '#002147' : 'transparent',
              color: activeTab === 'certs' ? '#FFFFFF' : '#475569',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <Award size={16} />
            <span>Certifications ({certs.length})</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: PRODUCTS MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div>
            {/* Products Toolbar */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '24px', 
              padding: '24px', 
              border: '1.5px solid #E2E8F0', 
              marginBottom: '24px',
              boxShadow: '0 6px 20px rgba(0,33,71,0.04)'
            }}>
              
              {/* Row 1: Search & Add Product CTA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                
                <div style={{ position: 'relative', flex: 1, minWidth: '280px', maxWidth: '540px' }}>
                  <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input
                    type="text"
                    placeholder="Search by product title, HS code, or specifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 18px 12px 46px',
                      borderRadius: '100px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      backgroundColor: '#F8FAFC'
                    }}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div>
                  <button
                    onClick={openAddProduct}
                    style={{
                      backgroundColor: '#002147',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '100px',
                      fontWeight: 800,
                      fontSize: '14.5px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(0, 33, 71, 0.2)'
                    }}
                  >
                    <Plus size={18} />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Row 2: 4 Master Category Filter Tabs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#002147', textTransform: 'uppercase', letterSpacing: '0.6px', marginRight: '4px' }}>
                  Category:
                </span>

                <button
                  onClick={() => { setSelectedCat('All'); setSelectedSubCat('All'); }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '100px',
                    border: selectedCat === 'All' ? '1.5px solid #002147' : '1px solid #CBD5E1',
                    backgroundColor: selectedCat === 'All' ? '#002147' : '#F8FAFC',
                    color: selectedCat === 'All' ? '#FFFFFF' : '#475569',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  All Categories ({products.length})
                </button>

                {PRODUCT_CATEGORIES.map(cat => {
                  const isActive = selectedCat === cat;
                  const count = categoryCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCat(cat); setSelectedSubCat('All'); }}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '100px',
                        border: isActive ? '1.5px solid #002147' : '1px solid #CBD5E1',
                        backgroundColor: isActive ? '#002147' : '#F8FAFC',
                        color: isActive ? '#FFFFFF' : '#475569',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {cat === 'Indian Spices' && '🌶️'}
                      {cat === 'Agro Commodities' && '🌾'}
                      {cat === 'Machinery' && '⚙️'}
                      {cat === 'Pipes' && '🏗️'}
                      <span>{cat}</span>
                      <span style={{ 
                        backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#E2E8F0', 
                        color: isActive ? '#FFF' : '#475569',
                        fontSize: '11px', 
                        padding: '1px 6px', 
                        borderRadius: '100px' 
                      }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Row 3: Subcategory Filter Pills (e.g. Ground Spices, Whole Spices, Seed Spices for Indian Spices) */}
              {selectedCat !== 'All' && CATEGORY_SUBCATEGORIES[selectedCat] && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed #E2E8F0' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.6px', marginRight: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Filter size={12} /> Sub-Types:
                  </span>

                  <button
                    onClick={() => setSelectedSubCat('All')}
                    style={{
                      padding: '5px 14px',
                      borderRadius: '100px',
                      border: selectedSubCat === 'All' ? '1.5px solid #002147' : '1px solid #CBD5E1',
                      backgroundColor: selectedSubCat === 'All' ? '#002147' : '#FFFFFF',
                      color: selectedSubCat === 'All' ? '#FFFFFF' : '#64748B',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    All {selectedCat}
                  </button>

                  {CATEGORY_SUBCATEGORIES[selectedCat].map(subcat => {
                    const isSubActive = selectedSubCat === subcat;
                    return (
                      <button
                        key={subcat}
                        onClick={() => setSelectedSubCat(subcat)}
                        style={{
                          padding: '5px 14px',
                          borderRadius: '100px',
                          border: isSubActive ? '1.5px solid #D97706' : '1px solid #CBD5E1',
                          backgroundColor: isSubActive ? '#FEF3C7' : '#FFFFFF',
                          color: isSubActive ? '#B45309' : '#475569',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {subcat}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Results Count Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 6px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#475569' }}>
                Showing <strong style={{ color: '#002147' }}>{filteredProducts.length}</strong> items in database
                {selectedCat !== 'All' && <span> (Category: <strong style={{ color: '#0284C7' }}>{selectedCat}</strong>)</span>}
                {selectedSubCat !== 'All' && <span> (Sub: <strong style={{ color: '#D97706' }}>{selectedSubCat}</strong>)</span>}
              </span>

              {(searchQuery || selectedCat !== 'All' || selectedSubCat !== 'All') && (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCat('All'); setSelectedSubCat('All'); }}
                  style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '13px', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {/* Products Table (Without Location/Origin Column) */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1.5px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,33,71,0.04)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1.5px solid #CBD5E1', color: '#002147', fontWeight: 800 }}>
                      <th style={{ padding: '16px 20px', width: '380px' }}>Product Title & Image</th>
                      <th style={{ padding: '16px 20px', width: '200px' }}>Category & Sub-Type</th>
                      <th style={{ padding: '16px 20px', width: '150px' }}>HS Code</th>
                      <th style={{ padding: '16px 20px', width: '280px' }}>Specifications & Packaging</th>
                      <th style={{ padding: '16px 20px', textAlign: 'right', width: '140px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p, idx) => {
                      const normalized = normalizeProduct(p);
                      return (
                        <tr key={p.id || idx} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s ease' }}>
                          
                          {/* Title & Thumbnail */}
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <div 
                                onClick={() => setPreviewImage(p.image)}
                                title="Click to view full image"
                                style={{ 
                                  width: '52px', 
                                  height: '52px', 
                                  borderRadius: '12px', 
                                  backgroundColor: '#F8FAFC', 
                                  padding: '4px', 
                                  border: '1.5px solid #E2E8F0',
                                  cursor: 'pointer',
                                  overflow: 'hidden',
                                  flexShrink: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </div>
                              <div>
                                <strong style={{ fontSize: '14.5px', color: '#002147', display: 'block', lineHeight: 1.3 }}>
                                  {p.title}
                                </strong>
                                <span style={{ fontSize: '12px', color: '#64748B', marginTop: '3px', display: 'block', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {p.description || p.desc}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Category & Subtype */}
                          <td style={{ padding: '16px 20px' }}>
                            <span style={{ fontWeight: 800, color: '#002147', display: 'block', fontSize: '13px' }}>
                              {normalized.category}
                            </span>
                            {normalized.subcategory && (
                              <span style={{
                                display: 'inline-block',
                                backgroundColor: '#FEF3C7',
                                color: '#B45309',
                                fontSize: '11px',
                                fontWeight: 800,
                                padding: '2px 8px',
                                borderRadius: '100px',
                                marginTop: '4px',
                                border: '1px solid #FDE68A'
                              }}>
                                {normalized.subcategory}
                              </span>
                            )}
                          </td>

                          {/* HS Code */}
                          <td style={{ padding: '16px 20px', color: '#002147', fontWeight: 700, fontSize: '13px' }}>
                            <span style={{ backgroundColor: '#F1F5F9', padding: '3px 8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                              {p.hsCode || 'HS 0910'}
                            </span>
                          </td>

                          {/* Specs & Packaging */}
                          <td style={{ padding: '16px 20px', color: '#64748B', fontSize: '12.5px', maxWidth: '280px' }}>
                            <div style={{ fontWeight: 600, color: '#334155' }}>{p.specs || 'Export Grade Standard'}</div>
                            {p.packaging && <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>📦 {p.packaging}</div>}
                          </td>

                          {/* Actions */}
                          <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <button 
                                onClick={() => openEditProduct(p)} 
                                title="Edit Product Details"
                                style={{ 
                                  backgroundColor: '#F1F5F9', 
                                  border: '1.5px solid #CBD5E1', 
                                  color: '#002147', 
                                  padding: '8px 12px', 
                                  borderRadius: '10px', 
                                  cursor: 'pointer', 
                                  display: 'inline-flex', 
                                  alignItems: 'center', 
                                  gap: '4px', 
                                  fontWeight: 800, 
                                  fontSize: '12.5px' 
                                }}
                              >
                                <Edit3 size={14} /> Edit
                              </button>
                              
                              <button 
                                onClick={() => handleDeleteProduct(p.id, p.title)} 
                                title="Delete Product"
                                style={{ 
                                  backgroundColor: '#FEF2F2', 
                                  border: '1.5px solid #FCA5A5', 
                                  color: '#991B1B', 
                                  padding: '8px 12px', 
                                  borderRadius: '10px', 
                                  cursor: 'pointer', 
                                  display: 'inline-flex', 
                                  alignItems: 'center', 
                                  gap: '4px', 
                                  fontWeight: 800, 
                                  fontSize: '12.5px' 
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
                          <AlertCircle size={36} style={{ color: '#94A3B8', marginBottom: '12px' }} />
                          <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#002147', margin: '0 0 6px' }}>No Products Found</h4>
                          <p style={{ fontSize: '13.5px', margin: 0 }}>Try clearing the search query or resetting the category filters.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2 & 3: CLIENT ENQUIRIES & QUOTE RFQS */}
        {/* ========================================================= */}
        {(activeTab === 'product_enquiries' || activeTab === 'contact_enquiries') && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#002147', margin: 0, fontFamily: 'var(--font-h, Outfit, sans-serif)' }}>
                  {activeTab === 'product_enquiries' ? 'Product Quotation RFQ Enquiries' : 'General Contact Form Inquiries'}
                </h3>
                <span style={{ fontSize: '13px', color: '#64748B' }}>
                  Live incoming export requirements and buyer quotation submissions
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={exportEnquiriesCSV}
                  style={{ backgroundColor: '#10B981', color: '#FFFFFF', border: 'none', padding: '10px 18px', borderRadius: '100px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Download size={15} /> Export CSV
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {filteredEnquiries
                .filter(e => activeTab === 'product_enquiries' ? e.type === 'product_quote' : (e.type === 'contact_form' || !e.type))
                .map((enq, idx) => (
                  <div 
                    key={enq.id || idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      border: enq.status === 'New' ? '2px solid #38BDF8' : '1.5px solid #E2E8F0',
                      padding: '24px',
                      boxShadow: '0 4px 16px rgba(0,33,71,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#002147', margin: 0 }}>{enq.name || 'Anonymous Buyer'}</h4>
                          <span style={{ 
                            backgroundColor: enq.status === 'New' ? '#FEF2F2' : '#F0FDF4', 
                            color: enq.status === 'New' ? '#DC2626' : '#16A34A',
                            border: enq.status === 'New' ? '1px solid #FECACA' : '1px solid #BBF7D0',
                            fontSize: '11.5px',
                            fontWeight: 800,
                            padding: '3px 10px',
                            borderRadius: '100px'
                          }}>
                            {enq.status || 'New'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px', fontSize: '13px', color: '#64748B', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={14} /> {enq.email || '—'}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14} /> {enq.phone || '—'}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={14} /> {enq.country || 'Global Market'}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {enq.timestamp ? new Date(enq.timestamp).toLocaleString() : 'Recent'}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleToggleEnquiryStatus(enq.id, enq.status)}
                          style={{
                            backgroundColor: enq.status === 'New' ? '#F0FDF4' : '#F8FAFC',
                            border: enq.status === 'New' ? '1.5px solid #86EFAC' : '1px solid #CBD5E1',
                            color: enq.status === 'New' ? '#16A34A' : '#475569',
                            padding: '7px 14px',
                            borderRadius: '8px',
                            fontSize: '12.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Check size={14} /> {enq.status === 'New' ? 'Mark as Replied' : 'Mark as New'}
                        </button>

                        <button
                          onClick={() => handleDeleteEnquiry(enq.id, enq.name)}
                          style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '7px 12px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#F8FAFC', padding: '14px 18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      {enq.product && (
                        <div style={{ marginBottom: '6px' }}>
                          <strong style={{ fontSize: '13px', color: '#002147' }}>Requested Product: </strong>
                          <span style={{ fontSize: '13px', color: '#0284C7', fontWeight: 700 }}>{enq.product}</span>
                          {enq.quantity && <span style={{ fontSize: '12.5px', color: '#64748B', marginLeft: '10px' }}>(Quantity: {enq.quantity})</span>}
                        </div>
                      )}
                      <p style={{ fontSize: '13.5px', color: '#334155', margin: 0, lineHeight: 1.5 }}>
                        {enq.message || enq.requirement || enq.notes || 'No specific notes provided.'}
                      </p>
                    </div>
                  </div>
                ))}

              {filteredEnquiries.filter(e => activeTab === 'product_enquiries' ? e.type === 'product_quote' : (e.type === 'contact_form' || !e.type)).length === 0 && (
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '60px 20px', textAlign: 'center', border: '1.5px dashed #CBD5E1' }}>
                  <Inbox size={40} style={{ color: '#94A3B8', marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#002147', margin: '0 0 6px' }}>No Enquiries in this View</h4>
                  <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>New quote requests and contact messages from website visitors will appear here.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: BLOGS & ARTICLES */}
        {/* ========================================================= */}
        {activeTab === 'blogs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#002147', margin: 0, fontFamily: 'var(--font-h, Outfit, sans-serif)' }}>
                  Knowledge Hub & Blog Articles
                </h3>
                <span style={{ fontSize: '13px', color: '#64748B' }}>Manage industry export guides, spice market insights, and technical articles</span>
              </div>

              <button
                onClick={openAddBlog}
                style={{ backgroundColor: '#002147', color: '#FFFFFF', border: 'none', padding: '12px 24px', borderRadius: '100px', fontWeight: 800, fontSize: '14.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(0, 33, 71, 0.15)' }}
              >
                <Plus size={18} />
                <span>Add New Blog</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {blogs.map((b, idx) => (
                <div key={b.id || idx} style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1.5px solid #CBD5E1', overflow: 'hidden', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {b.image && (
                    <img src={b.image} alt={b.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '14px' }} />
                  )}
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#002147', backgroundColor: '#F1F5F9', padding: '4px 12px', borderRadius: '100px' }}>{b.cat}</span>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#002147', margin: '10px 0 6px' }}>{b.title}</h4>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>{b.excerpt}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>⏱️ {b.read}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openEditBlog(b)} style={{ backgroundColor: '#F1F5F9', border: '1px solid #CBD5E1', color: '#002147', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '12px' }}>
                        <Edit3 size={13} /> Edit
                      </button>
                      <button onClick={() => handleDeleteBlog(b.id, b.title)} style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '12px' }}>
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: CERTIFICATES */}
        {/* ========================================================= */}
        {activeTab === 'certs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#002147', margin: 0, fontFamily: 'var(--font-h, Outfit, sans-serif)' }}>
                  Global Accreditation Badges
                </h3>
                <span style={{ fontSize: '13px', color: '#64748B' }}>Authorized certification bodies, APEDA, Spice Board, FDA, ISO credentials</span>
              </div>

              <button
                onClick={openAddCert}
                style={{ backgroundColor: '#002147', color: '#FFFFFF', border: 'none', padding: '12px 24px', borderRadius: '100px', fontWeight: 800, fontSize: '14.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(0, 33, 71, 0.15)' }}
              >
                <Plus size={18} />
                <span>Add Certificate</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {certs.map((c, idx) => (
                <div key={c.id || idx} style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1.5px solid #CBD5E1', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {c.logo && (
                    <img src={c.logo} alt={c.name} style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: '12px', backgroundColor: '#F8FAFC', padding: '6px', border: '1px solid #E2E8F0' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', backgroundColor: '#FEF3C7', padding: '2px 8px', borderRadius: '100px' }}>{c.code}</span>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#002147', margin: '6px 0 2px' }}>{c.name}</h4>
                    <span style={{ fontSize: '12px', color: '#475569' }}>{c.tag}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <button onClick={() => openEditCert(c)} style={{ backgroundColor: '#F1F5F9', border: '1px solid #CBD5E1', color: '#002147', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}>
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => handleDeleteCert(c.id, c.name)} style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* MODAL 1: ADD / EDIT PRODUCT (Without Location/Origin box) */}
      {/* ========================================================= */}
      {showProductModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(7,23,44,0.75)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '28px', padding: '32px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', border: '1.5px solid #CBD5E1', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1.5px solid #F1F5F9', paddingBottom: '16px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#002147', margin: 0, fontFamily: 'var(--font-h, Outfit, sans-serif)' }}>
                {editingProduct ? 'Edit Product Details' : 'Add New Export Product'}
              </h3>
              <button onClick={() => setShowProductModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Turmeric Powder"
                  value={prodForm.title}
                  onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Category *</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => {
                      const newCat = e.target.value;
                      const subOptions = CATEGORY_SUBCATEGORIES[newCat] || [];
                      setProdForm({ 
                        ...prodForm, 
                        category: newCat, 
                        subcategory: subOptions[0] || 'General' 
                      });
                    }}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}
                  >
                    {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Sub-Category (e.g. Ground Spices) *</label>
                  <select
                    value={prodForm.subcategory}
                    onChange={(e) => setProdForm({ ...prodForm, subcategory: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}
                  >
                    {(CATEGORY_SUBCATEGORIES[prodForm.category] || ['General']).map(sc => (
                      <option key={sc} value={sc}>{sc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>HS Code</label>
                <input
                  type="text"
                  placeholder="e.g. HS 09103020"
                  value={prodForm.hsCode}
                  onChange={(e) => setProdForm({ ...prodForm, hsCode: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Product Image (URL or Upload File)</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Paste Image URL or select file below"
                    value={prodForm.image}
                    onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                  />
                  <label style={{ backgroundColor: '#F1F5F9', border: '1.5px solid #CBD5E1', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: '#002147', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                    <Upload size={15} /> Upload File
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageFileChange(e, (url) => setProdForm({ ...prodForm, image: url }))} />
                  </label>
                </div>
                {prodForm.image && (
                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={prodForm.image} alt="Preview" style={{ height: '60px', width: '60px', borderRadius: '10px', objectFit: 'contain', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC' }} />
                    <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 700 }}>✓ Image preview active</span>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Specifications</label>
                <input
                  type="text"
                  placeholder="e.g. Curcumin > 3.5% | Moisture < 10%"
                  value={prodForm.specs}
                  onChange={(e) => setProdForm({ ...prodForm, specs: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Packaging Details</label>
                <input
                  type="text"
                  placeholder="e.g. 25kg / 50kg PP Bags / Custom Vacuum"
                  value={prodForm.packaging}
                  onChange={(e) => setProdForm({ ...prodForm, packaging: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Full export product description..."
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="prod-featured"
                  checked={prodForm.isFeatured}
                  onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                  style={{ width: '16px', height: '16px' }}
                />
                <label htmlFor="prod-featured" style={{ fontSize: '13px', fontWeight: 700, color: '#002147', cursor: 'pointer' }}>
                  Feature this product on Homepage
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1.5px solid #F1F5F9', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  style={{ backgroundColor: '#F1F5F9', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', color: '#475569' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#002147', border: 'none', padding: '10px 24px', borderRadius: '10px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(0, 33, 71, 0.2)' }}
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD / EDIT BLOG (With Photo Upload button) */}
      {/* ========================================================= */}
      {showBlogModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(7,23,44,0.75)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '28px', padding: '32px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', border: '1.5px solid #CBD5E1', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1.5px solid #F1F5F9', paddingBottom: '16px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#002147', margin: 0, fontFamily: 'var(--font-h, Outfit, sans-serif)' }}>
                {editingBlog ? 'Edit Blog Article' : 'Publish New Blog Article'}
              </h3>
              <button onClick={() => setShowBlogModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navigating Indian Spice Export Standards"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Category Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Export Guide"
                    value={blogForm.cat}
                    onChange={(e) => setBlogForm({ ...blogForm, cat: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={blogForm.read}
                    onChange={(e) => setBlogForm({ ...blogForm, read: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Cover Image (URL or Upload File)</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Paste Cover Image URL or select file below"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                  />
                  <label style={{ backgroundColor: '#F1F5F9', border: '1.5px solid #CBD5E1', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: '#002147', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                    <Upload size={15} /> Upload File
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageFileChange(e, (url) => setBlogForm({ ...blogForm, image: url }))} />
                  </label>
                </div>
                {blogForm.image && (
                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={blogForm.image} alt="Blog Preview" style={{ height: '60px', width: '90px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #CBD5E1' }} />
                    <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 700 }}>✓ Image uploaded & preview ready</span>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Short Summary / Excerpt</label>
                <textarea
                  rows={2}
                  placeholder="Brief 1-2 sentence preview for cards..."
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Article Content</label>
                <textarea
                  rows={5}
                  placeholder="Full article body content..."
                  value={blogForm.body}
                  onChange={(e) => setBlogForm({ ...blogForm, body: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1.5px solid #F1F5F9', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  style={{ backgroundColor: '#F1F5F9', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', color: '#475569' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#002147', border: 'none', padding: '10px 24px', borderRadius: '10px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(0, 33, 71, 0.2)' }}
                >
                  {editingBlog ? 'Save Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: ADD / EDIT CERTIFICATE (With Logo Upload button) */}
      {/* ========================================================= */}
      {showCertModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(7,23,44,0.75)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '28px', padding: '32px', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto', border: '1.5px solid #CBD5E1', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1.5px solid #F1F5F9', paddingBottom: '16px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#002147', margin: 0, fontFamily: 'var(--font-h, Outfit, sans-serif)' }}>
                {editingCert ? 'Edit Certificate' : 'Add New Accreditation'}
              </h3>
              <button onClick={() => setShowCertModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveCert} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Certificate Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. APEDA Certified Exporter"
                  value={certForm.name}
                  onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Short Badge Code</label>
                <input
                  type="text"
                  placeholder="e.g. APEDA / GOVT"
                  value={certForm.code}
                  onChange={(e) => setCertForm({ ...certForm, code: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Authority Description Tag</label>
                <input
                  type="text"
                  placeholder="e.g. Ministry of Commerce & Industry, Govt of India"
                  value={certForm.tag}
                  onChange={(e) => setCertForm({ ...certForm, tag: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#002147', marginBottom: '6px' }}>Certificate Logo (URL or Upload File)</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Paste Logo URL or select file below"
                    value={certForm.logo}
                    onChange={(e) => setCertForm({ ...certForm, logo: e.target.value })}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                  />
                  <label style={{ backgroundColor: '#F1F5F9', border: '1.5px solid #CBD5E1', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: '#002147', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                    <Upload size={15} /> Upload File
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageFileChange(e, (url) => setCertForm({ ...certForm, logo: url }))} />
                  </label>
                </div>
                {certForm.logo && (
                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={certForm.logo} alt="Cert Preview" style={{ height: '50px', width: '50px', borderRadius: '10px', objectFit: 'contain', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', padding: '4px' }} />
                    <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 700 }}>✓ Logo preview ready</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1.5px solid #F1F5F9', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  style={{ backgroundColor: '#F1F5F9', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', color: '#475569' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#002147', border: 'none', padding: '10px 24px', borderRadius: '10px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', color: '#FFFFFF' }}
                >
                  {editingCert ? 'Save Certificate' : 'Add Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: IMAGE FULL PREVIEW */}
      {/* ========================================================= */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(6px)', cursor: 'zoom-out' }}
        >
          <div style={{ position: 'relative', maxWidth: '800px', maxHeight: '85vh', backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '16px', overflow: 'hidden' }}>
            <button 
              onClick={() => setPreviewImage(null)}
              style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: '#002147', color: '#FFFFFF', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
            <img src={previewImage} alt="Full Preview" style={{ width: '100%', height: 'auto', maxHeight: '75vh', objectFit: 'contain', borderRadius: '16px' }} />
          </div>
        </div>
      )}

    </div>
  );
}
