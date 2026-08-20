import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ArrowRight, Eye, Sparkles, Filter, CheckCircle2, 
  Flame, Wheat, Cog, Cylinder, LayoutGrid, Layers, Tag
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/products';
import { useStoreProducts } from '../utils/useStore';

const CATEGORY_META = {
  'All': {
    title: 'Explore Our Complete Export Catalog',
    highlight: '4 Master Product Verticals',
    eyebrow: '100% Export-Grade Indian Commodities & Equipment',
    desc: 'High-purity Indian Spices, Agro Commodities, Heavy-Duty Processing Machinery, and Certified Industrial Pipes packed for global export markets.',
    bgImg: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80',
    icon: LayoutGrid,
    color: '#38BDF8',
    badges: ['APEDA & Spices Board', 'Sortex Cleaned', 'Global Container Shipping']
  },
  'Indian Spices': {
    title: 'Pure Indian Spices & Spice Blends',
    highlight: '1st Vertical: Indian Spices',
    eyebrow: 'APEDA & Spices Board of India Certified',
    desc: 'Ultra-pure ground spices, whole bold spices, aromatic seed spices, and heritage culinary spice mixes double-sifted for maximum essential oil retention.',
    bgImg: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80',
    icon: Flame,
    color: '#F59E0B',
    badges: ['100% Pure Origin', 'High Curcumin & Oil Content', 'Custom Vacuum Packing'],
    subcategories: ['All Indian Spices', 'Ground Spices', 'Whole Spices', 'Seed Spices', 'Blended Spices', 'Exotic & Premium']
  },
  'Agro Commodities': {
    title: 'Indian Agro Commodities & Grains',
    highlight: '2nd Vertical: Agro Commodities',
    eyebrow: 'Direct Farm Procurement & Sortex Graded',
    desc: '1121 Extra Long Steam Basmati Rice, Sharbati MP Milling Wheat, Non-GMO Soybeans, Java & Bold Peanuts, Kabuli Chickpeas, and Oilseeds.',
    bgImg: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1920&q=80',
    icon: Wheat,
    color: '#10B981',
    badges: ['Phytosanitary Certified', 'Moisture < 12%', 'Bulk Liner & PP Bags'],
    subcategories: ['All Agro Commodities', 'Rice & Grains', 'Oilseeds & Meals', 'Pulses & Legumes']
  },
  'Machinery': {
    title: 'Industrial & Agricultural Machinery',
    highlight: '3rd Vertical: Machinery',
    eyebrow: 'High-Efficiency Processing & Packaging Units',
    desc: 'AI Optical RGB Color Sorters, Commercial Cool-Grinding Spice Pulverizers, Multi-Head High Speed Pouch Packaging Machines, and Tractor Rotavators.',
    bgImg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80',
    icon: Cog,
    color: '#3B82F6',
    badges: ['CE / ISO Certified', 'SS304 Food Grade', 'Seaworthy Wooden Crating'],
    subcategories: ['All Machinery', 'Processing Machinery', 'Packaging Equipment', 'Agro Machinery']
  },
  'Pipes': {
    title: 'Industrial & Agricultural Pipes Catalog',
    highlight: '4th Vertical: Industrial Pipes',
    eyebrow: 'ASTM, ASME, IS & ISO Certified Pipeline Solutions',
    desc: 'Stainless Steel SS304/SS316L Seamless Pipes, API 5L Carbon Steel Line Pipes, Virgin HDPE PE100 Water Pipes, UPVC and Precision Drip Irrigation Systems.',
    bgImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
    icon: Cylinder,
    color: '#6366F1',
    badges: ['ASTM A312 / API 5L', 'Hydrostatic Tested', 'UV Stabilized Polymers'],
    subcategories: ['All Pipes', 'Stainless Steel Pipes', 'Carbon Steel Pipes', 'Plastic & Polymer Pipes', 'Irrigation Pipes']
  }
};

export default function ProductsPage({ initialCategory = 'All', onSelectProduct, onOpenQuote }) {
  const [activeTab, setActiveTab] = useState(initialCategory || 'All');
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Sync if initialCategory prop changes from navbar click
  useEffect(() => {
    if (initialCategory) {
      setActiveTab(initialCategory);
      setActiveSubcategory('All');
    }
  }, [initialCategory]);

  const productsList = useStoreProducts();

  const currentMeta = CATEGORY_META[activeTab] || CATEGORY_META['All'];
  const HeaderIcon = currentMeta.icon || LayoutGrid;

  // Filter logic safely
  const filteredProducts = useMemo(() => {
    return (productsList || []).filter(product => {
      if (!product) return false;
      const title = String(product.title || product.name || '');
      const desc = String(product.description || product.desc || '');
      const cat = String(product.category || product.cat || '');
      const subcat = String(product.subcategory || '');
      const origin = String(product.origin || '');
      const hs = String(product.hsCode || '');

      // Check main category match
      let matchesCategory = false;
      if (activeTab === 'All') {
        matchesCategory = true;
      } else {
        matchesCategory = cat.toLowerCase() === activeTab.toLowerCase() || 
          subcat.toLowerCase() === activeTab.toLowerCase();
      }

      // Check subcategory filter match if active
      let matchesSubcategory = true;
      if (activeSubcategory && activeSubcategory !== 'All' && !activeSubcategory.startsWith('All ')) {
        matchesSubcategory = subcat.toLowerCase() === activeSubcategory.toLowerCase();
      }

      // Search match
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch = q === '' || 
        title.toLowerCase().includes(q) || 
        desc.toLowerCase().includes(q) ||
        origin.toLowerCase().includes(q) ||
        hs.toLowerCase().includes(q) ||
        subcat.toLowerCase().includes(q);
      
      return matchesCategory && matchesSubcategory && matchesSearch;
    });
  }, [activeTab, activeSubcategory, searchTerm, productsList]);

  // Counts for master tabs safely
  const categoryCounts = useMemo(() => {
    const counts = { All: (productsList || []).length };
    PRODUCT_CATEGORIES.forEach(c => {
      if (c !== 'All') counts[c] = 0;
    });

    (productsList || []).forEach(p => {
      if (!p) return;
      const cat = p.category || p.cat || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [productsList]);

  const handleTabChange = (cat) => {
    setActiveTab(cat);
    setActiveSubcategory('All');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Dynamic Hero Section */}
      <section style={{
        position: 'relative',
        color: '#FFFFFF',
        padding: '75px 0 65px',
        overflow: 'hidden',
        backgroundColor: '#1C1917'
      }}>
        {/* Background Image */}
        <img 
          src={currentMeta.bgImg} 
          alt="Category Catalogue Background" 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
            filter: 'brightness(0.95) contrast(1.05)'
          }}
        />
        {/* Ocean Maritime Radiant Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10, 34, 64, 0.58) 0%, rgba(7, 23, 44, 0.78) 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: `1.5px solid ${currentMeta.color || '#38BDF8'}`,
              color: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              padding: '7px 22px',
              borderRadius: '100px',
              marginBottom: '20px',
              backdropFilter: 'blur(8px)'
            }}>
              <HeaderIcon size={16} style={{ color: currentMeta.color || '#38BDF8' }} />
              {currentMeta.eyebrow}
            </span>

            <h1 style={{
              fontFamily: 'var(--font-h, Outfit, sans-serif)',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.18,
              marginBottom: '18px',
              letterSpacing: '-0.5px',
              color: '#FFFFFF'
            }}>
              {currentMeta.title} <br />
              <span style={{ color: currentMeta.color || '#38BDF8' }}>
                {activeTab === 'All' ? 'Catalog & Global Supply' : currentMeta.highlight}
              </span>
            </h1>

            <p style={{
              fontSize: '16.5px',
              color: 'rgba(255, 255, 255, 0.92)',
              lineHeight: 1.65,
              maxWidth: '740px',
              margin: '0 auto 34px',
              fontWeight: 500
            }}>
              {currentMeta.desc}
            </p>

            {/* Quick Stats Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '18px',
              flexWrap: 'wrap',
              fontSize: '13.5px',
              color: '#FFFFFF',
              fontWeight: 700
            }}>
              {currentMeta.badges.map((badge, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  padding: '8px 18px', 
                  borderRadius: '100px', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(6px)'
                }}>
                  <CheckCircle2 size={15} style={{ color: '#F5C542' }} />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Catalog Content */}
      <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        
        {/* Search & Category Filter Controls */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(10, 34, 64, 0.08)',
          border: '1.5px solid var(--border)',
          marginBottom: '36px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Search Input Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FFFDF7',
              border: '1.5px solid var(--border)',
              borderRadius: '16px',
              padding: '12px 20px'
            }}>
              <Search size={20} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder={`Search in ${activeTab === 'All' ? 'all 4 categories' : activeTab} (e.g. Basmati, Turmeric, Pulverizer, Seamless Pipe, Cumin...)`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  width: '100%',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--navy)'
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    border: 'none',
                    background: 'var(--gold-pale)',
                    color: 'var(--gold-deep)',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Master Category Tabs (4 Core Verticals) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Filter size={15} style={{ color: 'var(--gold)' }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Select Category Vertical:
                </span>
              </div>
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                {PRODUCT_CATEGORIES.map((cat, index) => {
                  const isActive = activeTab === cat;
                  const count = categoryCounts[cat] || 0;
                  const itemMeta = CATEGORY_META[cat];
                  const TabIcon = itemMeta?.icon || LayoutGrid;

                  return (
                    <button
                      key={cat}
                      onClick={() => handleTabChange(cat)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '100px',
                        fontSize: '14px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        border: isActive ? '1.5px solid var(--gold)' : '1.5px solid var(--border)',
                        background: isActive ? 'linear-gradient(135deg, #C8940A 0%, #D4AF37 100%)' : '#FFFFFF',
                        color: isActive ? '#1C1917' : 'var(--navy)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.25s ease',
                        boxShadow: isActive ? '0 6px 18px rgba(200, 148, 10, 0.3)' : 'none'
                      }}
                    >
                      <TabIcon size={16} />
                      <span>{cat}</span>
                      <span style={{
                        backgroundColor: isActive ? 'rgba(28, 25, 23, 0.15)' : 'var(--gold-pale)',
                        color: isActive ? '#1C1917' : 'var(--gold-deep)',
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '100px',
                        fontWeight: 800
                      }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subcategories Filter Pills (If available for current category) */}
            {currentMeta.subcategories && currentMeta.subcategories.length > 0 && (
              <div style={{ paddingTop: '10px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Tag size={13} /> Sub-filters:
                </span>
                {currentMeta.subcategories.map((subcat) => {
                  const isSubActive = activeSubcategory === subcat || (subcat.startsWith('All ') && activeSubcategory === 'All');
                  return (
                    <button
                      key={subcat}
                      onClick={() => setActiveSubcategory(subcat.startsWith('All ') ? 'All' : subcat)}
                      style={{
                        padding: '5px 14px',
                        borderRadius: '20px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: isSubActive ? '1.5px solid var(--navy)' : '1px solid #CBD5E1',
                        backgroundColor: isSubActive ? 'var(--navy)' : '#F8FAFC',
                        color: isSubActive ? '#FFFFFF' : '#475569',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {subcat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Counter Info & Reset Filter */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '26px',
          padding: '0 4px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{ fontSize: '14.5px', color: 'var(--gray)', fontWeight: 600, margin: 0 }}>
            Showing <strong style={{ color: 'var(--navy)' }}>{filteredProducts.length}</strong> products
            {activeTab !== 'All' && <span> in <strong style={{ color: 'var(--gold-deep)' }}>{activeTab}</strong></span>}
            {activeSubcategory !== 'All' && <span> (Filtered by <em>{activeSubcategory}</em>)</span>}
          </p>

          {(searchTerm || activeTab !== 'All' || activeSubcategory !== 'All') && (
            <button
              onClick={() => { setActiveTab('All'); setActiveSubcategory('All'); setSearchTerm(''); }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--gold-deep)',
                fontSize: '13.5px',
                fontWeight: 800,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* --- VIEW 1: CATEGORY-WISE GROUPED VIEW (When on 'All' Tab without search) --- */}
        {activeTab === 'All' && !searchTerm.trim() ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {PRODUCT_CATEGORIES.filter(c => c !== 'All').map((catName) => {
              const catItems = (productsList || []).filter(p => {
                if (!p) return false;
                const cat = String(p.category || p.cat || '');
                return cat.toLowerCase() === catName.toLowerCase();
              });

              if (catItems.length === 0) return null;

              const meta = CATEGORY_META[catName] || {};
              const CatIcon = meta.icon || LayoutGrid;

              return (
                <div key={catName} style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '28px',
                  padding: '36px 28px',
                  border: '1.5px solid var(--border)',
                  boxShadow: '0 10px 36px rgba(10, 34, 64, 0.04)'
                }}>
                  {/* Category Section Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '28px',
                    paddingBottom: '18px',
                    borderBottom: '2px solid #F1F5F9',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #002147 0%, #0A3A6B 100%)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 33, 71, 0.2)'
                      }}>
                        <CatIcon size={22} style={{ color: meta.color || '#38BDF8' }} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h2 style={{
                            fontFamily: 'var(--font-h, Outfit, sans-serif)',
                            fontSize: '24px',
                            fontWeight: 900,
                            color: 'var(--navy)',
                            margin: 0
                          }}>
                            {catName}
                          </h2>
                          <span style={{
                            backgroundColor: 'var(--gold-pale)',
                            color: 'var(--gold-deep)',
                            fontSize: '12px',
                            padding: '3px 10px',
                            borderRadius: '100px',
                            fontWeight: 800,
                            border: '1px solid var(--gold-light)'
                          }}>
                            {catItems.length} Products
                          </span>
                        </div>
                        <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
                          {meta.desc ? meta.desc.slice(0, 95) + '...' : `Certified export quality ${catName}`}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleTabChange(catName)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '100px',
                        fontSize: '13.5px',
                        fontWeight: 800,
                        backgroundColor: '#F8FAFC',
                        color: 'var(--navy)',
                        border: '1.5px solid var(--border)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--navy)';
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.color = 'var(--navy)';
                      }}
                    >
                      <span>Explore All {catName}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Category Products Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px'
                  }}>
                    {catItems.map((product, idx) => (
                      <motion.div
                        key={product.id || idx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '20px',
                          overflow: 'hidden',
                          border: '1.5px solid var(--border)',
                          boxShadow: '0 4px 20px rgba(10, 34, 64, 0.04)',
                          display: 'flex',
                          flexDirection: 'column',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                        }}
                        whileHover={{ y: -6, boxShadow: '0 18px 40px rgba(200, 148, 10, 0.18)', borderColor: 'var(--gold)' }}
                        onClick={() => onSelectProduct ? onSelectProduct(product) : null}
                      >
                        {/* Image */}
                        <div style={{
                          position: 'relative',
                          height: '210px',
                          backgroundColor: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '16px',
                          borderBottom: '1px solid var(--border)'
                        }}>
                          <img
                            src={product.image}
                            alt={product.title}
                            loading="lazy"
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain',
                              transition: 'transform 0.4s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          />

                          {product.subcategory && (
                            <span style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              backgroundColor: 'var(--gold-pale)',
                              color: 'var(--gold-deep)',
                              fontSize: '10px',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '100px',
                              border: '1px solid var(--gold-light)'
                            }}>
                              {product.subcategory}
                            </span>
                          )}
                        </div>

                        {/* Body */}
                        <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <h3 style={{
                            fontFamily: 'var(--font-h, Outfit, sans-serif)',
                            fontSize: '17px',
                            fontWeight: 800,
                            color: 'var(--navy)',
                            marginBottom: '6px',
                            lineHeight: 1.3
                          }}>
                            {product.title}
                          </h3>

                          {product.origin && (
                            <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                              📍 {product.origin}
                            </span>
                          )}

                          <p style={{
                            fontSize: '13px',
                            color: 'var(--gray)',
                            lineHeight: 1.55,
                            marginBottom: '16px',
                            flex: 1,
                            fontWeight: 500,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {product.description || product.desc}
                          </p>

                          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenQuote) onOpenQuote(product.title);
                              }}
                              className="btn btn-primary"
                              style={{
                                flex: 1,
                                padding: '9px 12px',
                                fontSize: '12.5px',
                                justifyContent: 'center'
                              }}
                            >
                              <span>Quote</span>
                              <ArrowRight size={13} />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectProduct) onSelectProduct(product);
                              }}
                              className="btn btn-outline"
                              style={{
                                padding: '9px 12px',
                                fontSize: '12.5px',
                                justifyContent: 'center'
                              }}
                            >
                              <Eye size={13} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* --- VIEW 2: SINGLE CATEGORY / SEARCH FILTERED GRID --- */
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '28px'
            }}
          >
            <AnimatePresence>
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id || idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: (idx % 6) * 0.04 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '22px',
                    overflow: 'hidden',
                    border: '1.5px solid var(--border)',
                    boxShadow: '0 8px 30px rgba(10, 34, 64, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                    cursor: 'pointer'
                  }}
                  whileHover={{ y: -6, boxShadow: '0 18px 40px rgba(200, 148, 10, 0.18)', borderColor: 'var(--gold)' }}
                  onClick={() => onSelectProduct ? onSelectProduct(product) : null}
                >
                  {/* Product Image — Object-Fit Contain (Uncropped) */}
                  <div style={{
                    position: 'relative',
                    height: '240px',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    borderBottom: '1px solid var(--border)'
                  }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />

                    {/* Category & Subcategory Badges */}
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                      <span style={{
                        backgroundColor: 'var(--navy)',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '3px 10px',
                        borderRadius: '100px'
                      }}>
                        {product.category || product.cat}
                      </span>
                      {product.subcategory && (
                        <span style={{
                          backgroundColor: 'var(--gold-pale)',
                          color: 'var(--gold-deep)',
                          fontSize: '10.5px',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '100px',
                          border: '1px solid var(--gold-light)'
                        }}>
                          {product.subcategory}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-h, Outfit, sans-serif)',
                      fontSize: '18.5px',
                      fontWeight: 800,
                      color: 'var(--navy)',
                      marginBottom: '8px',
                      lineHeight: 1.3
                    }}>
                      {product.title}
                    </h3>

                    {product.origin && (
                      <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '10px', display: 'block' }}>
                        📍 {product.origin}
                      </span>
                    )}

                    <p style={{
                      fontSize: '13.5px',
                      color: 'var(--gray)',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                      flex: 1,
                      fontWeight: 500
                    }}>
                      {product.description || product.desc}
                    </p>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenQuote) onOpenQuote(product.title);
                        }}
                        className="btn btn-primary"
                        style={{
                          flex: 1,
                          padding: '11px 16px',
                          fontSize: '13.5px',
                          justifyContent: 'center'
                        }}
                      >
                        <span>Request Quote</span>
                        <ArrowRight size={14} />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectProduct) onSelectProduct(product);
                        }}
                        className="btn btn-outline"
                        style={{
                          padding: '11px 16px',
                          fontSize: '13.5px',
                          justifyContent: 'center'
                        }}
                      >
                        <Eye size={14} />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '60px 20px',
            textAlign: 'center',
            border: '1.5px dashed var(--border)',
            marginTop: '20px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
              No products found in this selection
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '20px' }}>
              Try adjusting your search keyword or switching category tabs.
            </p>
            <button
              onClick={() => { setActiveTab('All'); setActiveSubcategory('All'); setSearchTerm(''); }}
              className="btn btn-primary"
              style={{
                padding: '10px 24px',
                fontSize: '14px'
              }}
            >
              View Complete Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
