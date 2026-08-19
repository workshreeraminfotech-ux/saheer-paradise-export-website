import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, MapPin, Mail, Phone, ChevronDown, 
  Flame, Wheat, Cog, Cylinder, LayoutGrid, ChevronRight, Sparkles 
} from 'lucide-react';
import logoImg from '../assets/logo.png';

const CATEGORIES_MENU = [
  {
    id: 'category-indian-spices',
    categoryKey: 'Indian Spices',
    number: '01',
    title: 'Indian Spices',
    subtitle: 'Pure Ground, Whole, Seed & Blended Spices',
    icon: Flame,
    color: '#D97706',
    bg: '#FEF3C7',
    badge: '38+ Products'
  },
  {
    id: 'category-agro-commodities',
    categoryKey: 'Agro Commodities',
    number: '02',
    title: 'Agro Commodities',
    subtitle: 'Basmati Rice, Wheat, Soybeans, Pulses & Seeds',
    icon: Wheat,
    color: '#059669',
    bg: '#D1FAE5',
    badge: 'Export Grade'
  },
  {
    id: 'category-machinery',
    categoryKey: 'Machinery',
    number: '03',
    title: 'Machinery',
    subtitle: 'Sortex Sorters, Pulverizers & Packaging Units',
    icon: Cog,
    color: '#2563EB',
    bg: '#DBEAFE',
    badge: 'Industrial'
  },
  {
    id: 'category-pipes',
    categoryKey: 'Pipes',
    number: '04',
    title: 'Pipes',
    subtitle: 'Stainless Steel, Carbon Steel, HDPE & PVC Pipes',
    icon: Cylinder,
    color: '#4F46E5',
    bg: '#E0E7FF',
    badge: 'ASTM / ISO'
  }
];

export default function Navbar({ activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(true);
  const dropdownTimeoutRef = useRef(null);

  const handleNav = (id, categoryKey = null) => {
    if (onNavigate) {
      if (categoryKey) {
        onNavigate(id, categoryKey);
      } else {
        onNavigate(id);
      }
    }
    setDropdownOpen(false);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const heroEl = document.getElementById('home') || document.querySelector('.hero-redesign-section') || document.querySelector('.hero-section') || document.querySelector('.jrp-hero');
      if (heroEl && id === 'home') {
        heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate('home');
    setDropdownOpen(false);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const heroEl = document.getElementById('home') || document.querySelector('.hero-redesign-section') || document.querySelector('.hero-section') || document.querySelector('.jrp-hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const isCategoryActive = activePage === 'products' || 
    activePage.startsWith('category-') || 
    activePage === 'products-indian-spices' ||
    activePage === 'products-agro-commodities' ||
    activePage === 'products-machinery' ||
    activePage === 'products-pipes';

  return (
    <>
      <header className="jrp-header" style={{ position: 'sticky', top: 0, zIndex: 9999, background: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div className="container">
          <div className="jrp-header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '88px' }}>
            
            {/* Logo */}
            <a href="#" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }} title="Saheer Paradise Export — Go to Home">
              <img 
                src={logoImg} 
                alt="Saheer Paradise Export" 
                className="jrp-header-logo-img" 
                style={{ 
                  height: '74px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  filter: 'contrast(1.08) drop-shadow(0 2px 8px rgba(0,0,0,0.06))',
                  display: 'block'
                }} 
              />
            </a>

            {/* Desktop Navigation Menu */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="d-none-mobile">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('home'); }}
                style={{ fontWeight: 700, fontSize: '17px', color: activePage === 'home' ? 'var(--gold)' : 'var(--navy)', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Home
              </a>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('about'); }}
                style={{ fontWeight: 700, fontSize: '17px', color: activePage === 'about' ? 'var(--gold)' : 'var(--navy)', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                About Us
              </a>

              {/* Product Categories Dropdown */}
              <div 
                className="nav-dropdown-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={(e) => { 
                    e.preventDefault(); 
                    handleNav('products'); 
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '17px',
                    color: isCategoryActive ? 'var(--gold)' : 'var(--navy)',
                    padding: '12px 0',
                    transition: 'color 0.2s'
                  }}
                  aria-expanded={dropdownOpen}
                >
                  <span>Product Categories</span>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                      transition: 'transform 0.25s ease', 
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      color: isCategoryActive ? 'var(--gold)' : 'var(--navy)'
                    }} 
                  />
                </button>

                {/* Dropdown Popup */}
                <div 
                  className="nav-dropdown-menu"
                  style={{
                    width: '480px',
                    minWidth: '480px',
                    maxWidth: '90vw',
                    boxSizing: 'border-box',
                    display: dropdownOpen ? 'block' : undefined,
                    opacity: dropdownOpen ? 1 : undefined,
                    visibility: dropdownOpen ? 'visible' : undefined,
                    transform: dropdownOpen ? 'translateX(-50%) translateY(0) scale(1)' : undefined,
                    pointerEvents: dropdownOpen ? 'auto' : undefined
                  }}
                >
                  {/* Dropdown Top Bar */}
                  <div style={{ padding: '8px 14px 10px', borderBottom: '1px solid #F1F5F9', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--gold-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={13} /> Export Product Verticals
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '100px' }}>
                      4 Categories
                    </span>
                  </div>

                  {/* Category Items (1st Indian Spices, 2nd Agro Commodities, 3rd Machinery, 4th Pipes) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {CATEGORIES_MENU.map((item) => {
                      const Icon = item.icon;
                      const isCurrentActive = activePage === item.id;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNav(item.id, item.categoryKey);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '12px 14px',
                            borderRadius: '14px',
                            textDecoration: 'none',
                            color: 'var(--navy)',
                            transition: 'all 0.2s ease',
                            backgroundColor: isCurrentActive ? '#FFFBEB' : '#FFFFFF',
                            border: isCurrentActive ? '1.5px solid var(--gold)' : '1px solid #F1F5F9',
                            boxShadow: isCurrentActive ? '0 2px 10px rgba(200, 148, 10, 0.12)' : 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#F8FAFC';
                            e.currentTarget.style.borderColor = '#CBD5E1';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isCurrentActive ? '#FFFBEB' : '#FFFFFF';
                            e.currentTarget.style.borderColor = isCurrentActive ? 'var(--gold)' : '#F1F5F9';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <div style={{
                            width: '46px',
                            height: '46px',
                            minWidth: '46px',
                            borderRadius: '12px',
                            backgroundColor: item.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: item.color,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                          }}>
                            <Icon size={24} />
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                              <span style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--navy)' }}>
                                {item.title}
                              </span>
                              <span style={{ 
                                fontSize: '11px', 
                                fontWeight: 800, 
                                color: item.color, 
                                backgroundColor: item.bg, 
                                padding: '2px 8px', 
                                borderRadius: '6px',
                                border: `1px solid ${item.color}30`
                              }}>
                                {item.number}
                              </span>
                            </div>
                            <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, fontWeight: 500, lineHeight: 1.35 }}>
                              {item.subtitle}
                            </p>
                          </div>

                          <ChevronRight size={18} style={{ color: '#94A3B8', flexShrink: 0, marginLeft: '4px' }} />
                        </a>
                      );
                    })}
                  </div>

                  {/* Dropdown Footer CTA */}
                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #F1F5F9' }}>
                    <a
                      href="#all-products"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav('products', 'All');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '11px',
                        borderRadius: '12px',
                        backgroundColor: '#FFFDF7',
                        border: '1.5px dashed var(--gold)',
                        color: 'var(--gold-deep)',
                        fontSize: '13.5px',
                        fontWeight: 800,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--gold)';
                        e.currentTarget.style.color = '#1C1917';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFDF7';
                        e.currentTarget.style.color = 'var(--gold-deep)';
                      }}
                    >
                      <LayoutGrid size={16} />
                      <span>Explore All 4 Categories Catalog</span>
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('blog'); }}
                style={{ fontWeight: 700, fontSize: '17px', color: activePage === 'blog' ? 'var(--gold)' : 'var(--navy)', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Blogs
              </a>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('contact'); }}
                style={{ fontWeight: 700, fontSize: '17px', color: activePage === 'contact' ? 'var(--gold)' : 'var(--navy)', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Contact Us
              </a>
            </nav>

            {/* Actions: Freight Quote CTA + Mobile Hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                className="btn btn-primary d-none-mobile"
                onClick={() => handleNav('contact')}
                style={{ fontSize: '15px', padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Freight Quote</span>
                <ArrowRight size={16} />
              </button>

              <button
                className="mobile-menu-toggle-btn"
                onClick={() => setMobileOpen(true)}
                style={{ 
                  background: '#F8FAFC', 
                  border: '1.5px solid var(--border)', 
                  borderRadius: '12px', 
                  cursor: 'pointer', 
                  color: 'var(--navy)', 
                  padding: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
                aria-label="Open Navigation Menu"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div className="jrp-offcanvas-overlay" onClick={() => setMobileOpen(false)} />
          <div className="jrp-offcanvas">
            
            {/* Drawer Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', borderBottom: '1px solid #F1F5F9', paddingBottom: '16px' }}>
              <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                <img src={logoImg} alt="Saheer Paradise Export" style={{ height: '52px', width: 'auto', objectFit: 'contain', filter: 'contrast(1.08)' }} />
              </div>
              <button 
                onClick={() => setMobileOpen(false)} 
                style={{ 
                  background: '#F1F5F9', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: 'var(--navy)', 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
                aria-label="Close Navigation"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); handleNav('home'); }} 
                style={{ 
                  fontWeight: 800, 
                  fontSize: '16px', 
                  color: activePage === 'home' ? 'var(--gold-deep)' : 'var(--navy)', 
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: activePage === 'home' ? '#FFFBEB' : 'transparent'
                }}
              >
                Home
              </a>

              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); handleNav('about'); }} 
                style={{ 
                  fontWeight: 800, 
                  fontSize: '16px', 
                  color: activePage === 'about' ? 'var(--gold-deep)' : 'var(--navy)', 
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: activePage === 'about' ? '#FFFBEB' : 'transparent'
                }}
              >
                About Us
              </a>
              
              {/* Mobile Product Categories Box */}
              <div style={{ 
                border: '1.5px solid var(--border)', 
                borderRadius: '18px', 
                padding: '14px', 
                backgroundColor: '#FFFDF7',
                boxShadow: '0 4px 14px rgba(200, 148, 10, 0.06)'
              }}>
                <div 
                  onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    cursor: 'pointer', 
                    fontWeight: 800, 
                    fontSize: '16px', 
                    color: 'var(--navy)'
                  }}
                >
                  <span style={{ color: 'var(--gold-deep)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} /> Product Categories
                  </span>
                  <div style={{ 
                    width: '26px', 
                    height: '26px', 
                    borderRadius: '50%', 
                    backgroundColor: '#FEF3C7', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <ChevronDown size={16} style={{ transform: mobileCategoriesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: '#D97706' }} />
                  </div>
                </div>

                {mobileCategoriesOpen && (
                  <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {CATEGORIES_MENU.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNav(item.id, item.categoryKey);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 12px',
                            borderRadius: '12px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            textDecoration: 'none',
                            color: 'var(--navy)',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                          }}
                        >
                          <div style={{ 
                            width: '34px', 
                            height: '34px', 
                            borderRadius: '10px', 
                            backgroundColor: item.bg, 
                            color: item.color, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <Icon size={18} />
                          </div>
                          
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--navy)' }}>
                                {item.title}
                              </span>
                              <span style={{ fontSize: '10px', fontWeight: 800, color: item.color, backgroundColor: item.bg, padding: '1px 5px', borderRadius: '4px' }}>
                                {item.number}
                              </span>
                            </div>
                            <span style={{ fontSize: '11.5px', color: '#64748B', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.subtitle}
                            </span>
                          </div>

                          <ChevronRight size={16} style={{ color: '#94A3B8', flexShrink: 0 }} />
                        </a>
                      );
                    })}

                    <a
                      href="#all-products"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav('products', 'All');
                      }}
                      style={{
                        textAlign: 'center',
                        padding: '10px',
                        fontSize: '13px',
                        fontWeight: 800,
                        color: 'var(--gold-deep)',
                        backgroundColor: '#FEF3C7',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        marginTop: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <LayoutGrid size={14} />
                      <span>View All 4 Categories</span>
                    </a>
                  </div>
                )}
              </div>

              <a 
                href="#blog" 
                onClick={(e) => { e.preventDefault(); handleNav('blog'); }} 
                style={{ 
                  fontWeight: 800, 
                  fontSize: '16px', 
                  color: activePage === 'blog' ? 'var(--gold-deep)' : 'var(--navy)', 
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: activePage === 'blog' ? '#FFFBEB' : 'transparent'
                }}
              >
                Blogs
              </a>

              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); handleNav('contact'); }} 
                style={{ 
                  fontWeight: 800, 
                  fontSize: '16px', 
                  color: activePage === 'contact' ? 'var(--gold-deep)' : 'var(--navy)', 
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: activePage === 'contact' ? '#FFFBEB' : 'transparent'
                }}
              >
                Contact Us
              </a>
            </div>

            {/* Offcanvas Contact Info & Quote Button */}
            <div style={{ marginTop: 'auto', borderTop: '1px solid #F1F5F9', paddingTop: '18px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '12px', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Export Inquiries</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--gray)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <MapPin size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ lineHeight: 1.4 }}>5th Floor, 501, Shashwat World, 80 Ft Rd Rolex, Sardar Chowk, Kothariya Main Rd, Rajkot - Gujarat - 360022</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <a href="mailto:saheerparadiseexport@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>saheerparadiseexport@gmail.com</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <a href="tel:+919377988770" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}>+91 93779 88770 (Sahil Sorathiya)</a>
                </div>
              </div>

              <div style={{ marginTop: '18px' }}>
                <button className="btn btn-primary" onClick={() => handleNav('contact')} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                  <span>Get A Freight Quote</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
