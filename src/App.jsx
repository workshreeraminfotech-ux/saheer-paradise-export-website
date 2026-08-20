import React, { useState, useEffect } from 'react';

import HeaderTop from './components/HeaderTop';
import Navbar from './components/Navbar';
import FooterSection from './components/FooterSection';
import QuickViewModal from './components/QuickViewModal';
import QuoteModal from './components/QuoteModal';
import WhatsAppFloat from './components/WhatsAppFloat';
import Preloader from './components/Preloader';

import AdminPanel from './admin/AdminPanel';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Ground Spices');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteProduct, setQuoteProduct] = useState('');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    const checkAdminRoute = () => {
      const hostname = window.location.hostname.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      const isSubdomainAdmin = hostname.startsWith('admin.') || hostname.includes('admin.') || hostname === 'admin';
      const isPathAdmin = pathname.includes('admin') || hash.includes('admin') || search.includes('admin');

      if (isSubdomainAdmin || isPathAdmin) {
        setIsAdmin(true);
      }
    };

    const handleKeyDown = (e) => {
      // Shortcut: Ctrl + Shift + A or Cmd + Shift + A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdmin(prev => !prev);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  const handleNavigate = (pageId, category = null) => {
    if (category) {
      setActivePage('products');
      setSelectedCategory(category);
    } else if (pageId.startsWith('category-')) {
      setActivePage('products');
      const catMap = {
        'category-ground-spices': 'Ground Spices',
        'category-whole-spices': 'Whole Spices',
        'category-seed-spices': 'Seed Spices',
        'category-blended-spices': 'Blended Spices',
        'category-exotic-spices': 'Exotic & Premium Spices',
        'category-agro-commodities': 'Agro Commodities',
        'category-machinery': 'Machinery',
        'category-pipes': 'Pipes'
      };
      setSelectedCategory(catMap[pageId] || 'Ground Spices');
    } else if (pageId === 'products') {
      setActivePage('products');
      setSelectedCategory(category || 'Ground Spices');
    } else {
      setActivePage(pageId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (productName = '') => {
    setQuoteProduct(productName);
    setIsQuoteOpen(true);
  };

  return (
    <div>
      <HeaderTop />
      <Navbar 
        activePage={activePage} 
        onNavigate={handleNavigate} 
        onOpenQuote={() => handleOpenQuote()} 
      />

      <main>
        {(activePage === 'home' || activePage === 'faq') && (
          <Home 
            onSelectProduct={setSelectedProduct} 
            onNavigate={handleNavigate} 
            onOpenQuote={(prod) => handleOpenQuote(prod)} 
          />
        )}
        {activePage === 'about' && (
          <AboutPage 
            onNavigate={handleNavigate} 
            onOpenQuote={() => handleOpenQuote()} 
          />
        )}
        {activePage === 'products' && (
          <ProductsPage 
            initialCategory={selectedCategory}
            onSelectProduct={setSelectedProduct} 
            onOpenQuote={(prod) => handleOpenQuote(prod)} 
          />
        )}
        {activePage === 'blog' && (
          <BlogPage />
        )}
        {activePage === 'contact' && (
          <ContactPage 
            onOpenQuote={() => handleOpenQuote()} 
          />
        )}
      </main>

      <FooterSection onNavigate={handleNavigate} />

      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onOpenQuote={(prod) => handleOpenQuote(prod)} />
      )}

      <QuoteModal 
        isOpen={isQuoteOpen} 
        initialProduct={quoteProduct} 
        onClose={() => setIsQuoteOpen(false)} 
      />

      <WhatsAppFloat />
      <Preloader />
    </div>
  );
}
