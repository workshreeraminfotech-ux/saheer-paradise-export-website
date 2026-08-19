import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import heroBgVideo from '../assets/hero-bg.MOV';

export default function HeroBannerSlider({ onOpenQuote, onNavigate }) {
  return (
    <section 
      className="jrp-hero-section" 
      style={{ 
        position: 'relative', 
        minHeight: '580px', 
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden', 
        background: '#07172C',
        marginTop: 0,
        clear: 'both',
        padding: '78px 0 82px'
      }}
    >
      {/* Background Video — Bright, Vibrant & Crystal Clear */}
      <video 
        className="hero-video-bg" 
        autoPlay 
        loop 
        muted 
        playsInline
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          opacity: 1,
          filter: 'brightness(1.24) contrast(1.08) saturate(1.20)',
          zIndex: 1 
        }}
      >
        <source src={heroBgVideo} type="video/mp4" />
        <source src={heroBgVideo} type="video/quicktime" />
      </video>

      {/* Clean Subtle Lighter Gradient Overlay with Radiant Glow */}
      <div 
        className="hero-video-overlay" 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(180deg, rgba(10, 34, 64, 0.22) 0%, rgba(7, 23, 44, 0.38) 50%, rgba(5, 17, 34, 0.65) 100%)', 
          zIndex: 2 
        }}
      ></div>

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div style={{ maxWidth: '820px' }}>
          
          {/* Top Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '20px' }}
          >
            <span 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(10, 34, 64, 0.85)', 
                border: '1px solid rgba(56, 189, 248, 0.65)', 
                backdropFilter: 'blur(10px)', 
                padding: '6px 16px', 
                borderRadius: '100px', 
                fontSize: '13px', 
                fontWeight: 700, 
                color: '#BAE6FD',
                boxShadow: '0 4px 15px rgba(0,0,0,0.25)'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8', display: 'inline-block', boxShadow: '0 0 8px #38BDF8' }}></span>
              <span>Delivering Trust, Exporting Excellence</span>
            </span>
          </motion.div>

          {/* Main Hero Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
              fontFamily: 'var(--font-h)', 
              fontSize: 'clamp(34px, 5.2vw, 50px)', 
              fontWeight: 900, 
              color: '#ffffff', 
              lineHeight: 1.16, 
              marginBottom: '18px', 
              letterSpacing: '-0.5px',
              textShadow: '0 4px 24px rgba(0,0,0,0.6)' 
            }}
          >
            Premium Indian Spices & <br />
            <span style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #38BDF8 50%, #0284C7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Agro Commodities Exporter
            </span>
          </motion.h1>

          {/* Subtitle / Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              fontSize: 'clamp(15px, 1.8vw, 17.5px)', 
              color: 'rgba(255,255,255,0.92)', 
              lineHeight: 1.62, 
              marginBottom: '32px', 
              maxWidth: '680px', 
              textShadow: '0 2px 10px rgba(0,0,0,0.45)' 
            }}
          >
            Direct sourcing from Gujarat & India's premier fertile regions. Supplying premium whole spices, ground powders, oil seeds, and agro commodities with 100% purity and fast worldwide maritime port dispatch.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}
          >
            <button 
              className="btn btn-primary" 
              onClick={() => onNavigate ? onNavigate('contact') : null}
              style={{ 
                padding: '14px 28px', 
                fontSize: '15px', 
                fontWeight: 700,
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                boxShadow: '0 8px 24px rgba(2, 132, 199, 0.4)',
                borderRadius: '8px'
              }}
            >
              <span>Request Quote / CIF Price</span>
              <ArrowRight size={18} />
            </button>

            <button 
              className="btn-outline" 
              onClick={() => onNavigate ? onNavigate('products') : null}
              style={{ 
                color: '#ffffff', 
                borderColor: 'rgba(255,255,255,0.35)', 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(8px)',
                padding: '13px 24px', 
                fontSize: '15px', 
                fontWeight: 600,
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FileText size={16} color="var(--gold-light)" />
              <span>Explore Products</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
