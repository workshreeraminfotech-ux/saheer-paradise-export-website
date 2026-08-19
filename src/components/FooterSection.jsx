import React from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle, ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function FooterSection({ onNavigate }) {
  return (
    <footer className="footer-redesign-section">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col-brand">
            <div 
              className="footer-logo-wrap" 
              onClick={() => { if (onNavigate) onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <img src={logoImg} alt="Saheer Paradise Export" />
            </div>
            <p className="footer-bio-text">
              Saheer Paradise Export is a premier Indian exporter of high-grade food & agricultural commodities. Delivering trust, exporting excellence directly to global markets.
            </p>
            <div className="footer-social-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links-list">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Home
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('about'); }}>
                  <ChevronRight size={14} className="link-arrow" /> About Us
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('products'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Products
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('blog'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Blogs
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('contact'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div className="footer-col">
            <h3>Product Categories</h3>
            <ul className="footer-links-list">
              <li>
                <a href="#indian-spices" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('category-indian-spices'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Indian Spices
                </a>
              </li>
              <li>
                <a href="#agro-commodities" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('category-agro-commodities'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Agro Commodities
                </a>
              </li>
              <li>
                <a href="#machinery" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('category-machinery'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Machinery
                </a>
              </li>
              <li>
                <a href="#pipes" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('category-pipes'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Pipes & Tubes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="footer-col">
            <h3>Contact Us</h3>
            <div className="footer-contact-list">
              <div className="footer-contact-item" style={{ alignItems: 'flex-start' }}>
                <MapPin size={18} className="contact-icon" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>Fifth Floor, 501, Shashwat World, 80 Ft Road Rolex, Sardar Chowk, Kothariya Main Road, Rajkot - Gujarat - 360022</span>
              </div>
              <a href="tel:+919377988770" className="footer-contact-item item-link">
                <Phone size={18} className="contact-icon" />
                <span>+91 93779 88770 (Sahil Sorathiya)</span>
              </a>
              <a href="mailto:saheerparadiseexport@gmail.com" className="footer-contact-item item-link">
                <Mail size={18} className="contact-icon" />
                <span>saheerparadiseexport@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Saheer Paradise Export. All Rights Reserved.</p>
          <div className="footer-bottom-right">
            <span>
              Developed by{' '}
              <a 
                href="https://www.matrixtechx.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: '#38BDF8', fontWeight: 800, textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                MatrixTechX
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
