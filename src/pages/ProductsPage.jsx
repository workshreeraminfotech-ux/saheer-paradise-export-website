import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ArrowRight, Eye, Sparkles, Filter, CheckCircle2, 
  Flame, Wheat, Cog, Cylinder, LayoutGrid, Layers, Tag
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/products';
import { useStoreProducts } from '../utils/useStore';

const CATEGORY_META = {
  'Ground Spices': {
    title: 'Pure Ground Spices & Powders',
    highlight: 'Ultra-Fine Milling & Cryogenic Grinding',
    eyebrow: 'APEDA & Spices Board of India Certified',
    desc: 'Pure ground spices milled from handpicked raw roots and seeds. Double-sifted for rich natural color, maximum essential oil retention, and aroma.',
    bgImg: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80',
    icon: Flame,
    color: '#F59E0B',
    badges: ['High Curcumin & Oil', 'Zero Artificial Colors', 'Custom Vacuum Packing']
  },
  'Whole Spices': {
    title: 'Natural Whole Spices & Bold Pods',
    highlight: 'Sun-Cured & Machine Cleaned',
    eyebrow: 'Direct Farm Harvest from Kerala & Andhra',
    desc: 'Premium whole spices including bold black pepper, sun-dried red chillies, cinnamon quills, whole cloves, green cardamom, and mother turmeric roots.',
    bgImg: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80',
    icon: Flame,
    color: '#EA580C',
    badges: ['Grade-A Bold Pods', 'Sortex Machine Cleaned', 'Jute & Vacuum Packing']
  },
  'Seed Spices': {
    title: 'Aromatic Whole Seed Spices',
    highlight: '99.5% Purity Singapore / Europe Quality',
    eyebrow: 'Sourced from Gujarat (Unjha) & Rajasthan',
    desc: 'Sortex cleaned Cumin Seeds (Jeera), Coriander Seeds (Dhana), and Green Fennel Seeds (Saunf) with high natural volatile oil content.',
    bgImg: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80',
    icon: Wheat,
    color: '#84CC16',
    badges: ['99.5% Sortex Cleaned', 'High Volatile Oil', 'PP Woven Bags']
  },
  'Blended Spices': {
    title: 'Heritage Indian Blended Seasonings & Masalas',
    highlight: 'Authentic Traditional Formulations',
    eyebrow: 'Chef-Grade Export Masala Blends',
    desc: 'Masterfully balanced Garam Masala, Chaat Masala, Biryani Masala, Kitchen King, and Madras Curry Powder prepared from secret heritage recipes.',
    bgImg: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80',
    icon: Flame,
    color: '#D97706',
    badges: ['100% Pure Spices', 'No Added Preservatives', 'Private Label & Bulk']
  },
  'Exotic & Premium Spices': {
    title: 'Exotic & Luxury Spices',
    highlight: 'World-Prized Kashmiri Saffron & Vanilla',
    eyebrow: 'Gourmet Grade-A Certified Origin',
    desc: '100% pure Kashmiri Mongra Saffron stigmas and plump Gourmet Grade-A Vanilla Beans with intense floral sweetness and crocin purity.',
    bgImg: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80',
    icon: Sparkles,
    color: '#E11D48',
    badges: ['Mongra Grade-1 Red Stigmas', 'Vanillin > 2.0%', 'Air-Tight Tins & Packs']
  },
  'Agro Commodities': {
    title: 'Indian Agro Commodities & Grains',
    highlight: 'Direct Farm Procurement & Sortex Graded',
    eyebrow: '1121 Basmati, MP Wheat, Soybeans, Peanuts & Pulses',
    desc: '1121 Extra Long Steam Basmati Rice, Sharbati MP Milling Wheat, Non-GMO Soybeans, Java & Bold Peanuts, Kabuli Chickpeas, and Oilseeds.',
    bgImg: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1920&q=80',
    icon: Wheat,
    color: '#10B981',
    badges: ['Phytosanitary Certified', 'Moisture < 12%', 'Bulk Liner & PP Bags']
  },
  'Machinery': {
    title: 'Industrial & Agricultural Machinery',
    highlight: 'High-Efficiency Processing & Packaging Units',
    eyebrow: 'CE & ISO Certified Food Grade Equipment',
    desc: 'AI Optical RGB Color Sorters, Commercial Cool-Grinding Spice Pulverizers, Multi-Head High Speed Pouch Packaging Machines, and Tractor Rotavators.',
    bgImg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80',
    icon: Cog,
    color: '#3B82F6',
    badges: ['CE / ISO Certified', 'SS304 Food Grade', 'Seaworthy Wooden Crating']
  },
  'Pipes': {
    title: 'Industrial & Agricultural Pipes Catalog',
    highlight: 'ASTM, ASME, IS & ISO Certified Pipeline Solutions',
    eyebrow: 'Stainless Steel, Carbon Steel, HDPE & PVC Systems',
    desc: 'Stainless Steel SS304/SS316L Seamless Pipes, API 5L Carbon Steel Line Pipes, Virgin HDPE PE100 Water Pipes, UPVC and Precision Drip Irrigation Systems.',
    bgImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
    icon: Cylinder,
    color: '#6366F1',
    badges: ['ASTM A312 / API 5L', 'Hydrostatic Tested', 'UV Stabilized Polymers']
  }
};

export default function ProductsPage({ initialCategory = 'Ground Spices', onSelectProduct, onOpenQuote }) {
  const defaultCategory = (initialCategory && initialCategory !== 'All' && CATEGORY_META[initialCategory]) ? initialCategory : 'Ground Spices';
  const [activeTab, setActiveTab] = useState(defaultCategory);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync if initialCategory prop changes from navbar click
  useEffect(() => {
    if (initialCategory) {
      const target = (initialCategory !== 'All' && CATEGORY_META[initialCategory]) ? initialCategory : 'Ground Spices';
      setActiveTab(target);
    }
  }, [initialCategory]);

  const productsList = useStoreProducts();

  const currentMeta = CATEGORY_META[activeTab] || CATEGORY_META['Ground Spices'];
  const HeaderIcon = currentMeta.icon || Flame;

  // Filter logic safely
  const filteredProducts = useMemo(() => {
    const list = Array.isArray(productsList) ? productsList : [];
    const q = searchTerm.trim().toLowerCase();

    return list.filter(product => {
      if (!product) return false;
      const title = String(product.title || product.name || '');
      const desc = String(product.description || product.desc || '');
      const cat = String(product.category || product.cat || '');
      const subcat = String(product.subcategory || '');
      const origin = String(product.origin || '');
      const hs = String(product.hsCode || '');

      // Check category match
      const matchesCategory = q ? true : (
        cat.toLowerCase() === activeTab.toLowerCase() || 
        subcat.toLowerCase() === activeTab.toLowerCase() ||
        (activeTab === 'Ground Spices' && (cat.toLowerCase().includes('ground') || cat.toLowerCase().includes('powder'))) ||
        (activeTab === 'Whole Spices' && cat.toLowerCase().includes('whole')) ||
        (activeTab === 'Seed Spices' && cat.toLowerCase().includes('seed')) ||
        (activeTab === 'Blended Spices' && (cat.toLowerCase().includes('blend') || cat.toLowerCase().includes('masala'))) ||
        (activeTab === 'Exotic & Premium Spices' && (cat.toLowerCase().includes('exotic') || cat.toLowerCase().includes('saffron') || cat.toLowerCase().includes('vanilla')))
      );

      // Search match
      const matchesSearch = q === '' || 
        title.toLowerCase().includes(q) || 
        desc.toLowerCase().includes(q) ||
        origin.toLowerCase().includes(q) ||
        hs.toLowerCase().includes(q) ||
        cat.toLowerCase().includes(q) ||
        subcat.toLowerCase().includes(q);
      
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchTerm, productsList]);

  // Counts for master tabs safely
  const categoryCounts = useMemo(() => {
    const counts = {};
    PRODUCT_CATEGORIES.forEach(c => {
      counts[c] = 0;
    });

    (productsList || []).forEach(p => {
      if (!p) return;
      const cat = String(p.category || p.cat || '');
      const subcat = String(p.subcategory || '');
      
      PRODUCT_CATEGORIES.forEach(c => {
        if (cat.toLowerCase() === c.toLowerCase() || subcat.toLowerCase() === c.toLowerCase() ||
            (c === 'Ground Spices' && (cat.toLowerCase().includes('ground') || cat.toLowerCase().includes('powder'))) ||
            (c === 'Whole Spices' && cat.toLowerCase().includes('whole')) ||
            (c === 'Seed Spices' && cat.toLowerCase().includes('seed')) ||
            (c === 'Blended Spices' && (cat.toLowerCase().includes('blend') || cat.toLowerCase().includes('masala'))) ||
            (c === 'Exotic & Premium Spices' && (cat.toLowerCase().includes('exotic') || cat.toLowerCase().includes('saffron') || cat.toLowerCase().includes('vanilla')))
        ) {
          counts[c] = (counts[c] || 0) + 1;
        }
      });
    });
    return counts;
  }, [productsList]);

  const handleTabChange = (cat) => {
    setActiveTab(cat);
    setSearchTerm('');
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
                placeholder={`Search in ${activeTab} or all products (e.g. Turmeric, Black Pepper, Cumin, Garam Masala, Saffron...)`}
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

            {/* Master Category Tabs (Indian Spices Verticals & Commodities) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Filter size={15} style={{ color: 'var(--gold)' }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Select Category:
                </span>
              </div>
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                {PRODUCT_CATEGORIES.map((cat) => {
                  const isActive = activeTab === cat;
                  const count = categoryCounts[cat] || 0;
                  const itemMeta = CATEGORY_META[cat];
                  const TabIcon = itemMeta?.icon || Flame;

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
            <span> in <strong style={{ color: 'var(--gold-deep)' }}>{activeTab}</strong></span>
            {searchTerm && <span> (Matching "<em>{searchTerm}</em>")</span>}
          </p>

          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
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
              Clear Search
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
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

                  {/* Category Badge */}
                  <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                    <span style={{
                      backgroundColor: 'var(--navy)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '100px'
                    }}>
                      {product.category || product.cat || activeTab}
                    </span>
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
              No products found in this category
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '20px' }}>
              Try adjusting your search keyword or selecting another spice category tab.
            </p>
            <button
              onClick={() => { setActiveTab('Ground Spices'); setSearchTerm(''); }}
              className="btn btn-primary"
              style={{
                padding: '10px 24px',
                fontSize: '14px'
              }}
            >
              Explore Ground Spices
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
