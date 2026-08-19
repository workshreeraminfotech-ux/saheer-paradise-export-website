import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import aboutUsImg from '../assets/about us.png';

export default function AboutUs() {
  return (
    <section className="about-section py-50" id="about" style={{ backgroundColor: '#FFFFFF', padding: '54px 0' }}>
      <div className="container">
        <div className="about-grid-wrapper">
          
          {/* Photo Column (Left on Laptop, Appears right after Intro on Phone) */}
          <motion.div
            className="about-image-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative', width: '100%' }}
          >
            {/* Floating Experience Badge */}
            <div style={{
              position: 'absolute',
              top: '-18px',
              left: '18px',
              background: 'linear-gradient(135deg, #0A2240 0%, #1B4B7A 100%)',
              color: '#FFFFFF',
              padding: '14px 22px',
              borderRadius: '18px',
              boxShadow: '0 16px 36px rgba(27, 75, 122, 0.3)',
              border: '2px solid #38BDF8',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backdropFilter: 'blur(8px)',
              maxWidth: 'calc(100% - 36px)'
            }}>
              <span style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-h, Outfit, sans-serif)', color: '#38BDF8', lineHeight: 1 }}>
                2021
              </span>
              <span style={{ fontSize: '12px', fontWeight: 800, lineHeight: 1.3, color: '#F0F9FF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Established & Serving<br />Global Markets
              </span>
            </div>

            {/* Main About Us Photo Frame */}
            <div style={{
              position: 'relative',
              borderRadius: '26px',
              overflow: 'hidden',
              border: '2px solid var(--border)',
              boxShadow: '0 18px 40px rgba(27, 75, 122, 0.12)',
              backgroundColor: '#F0F9FF',
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              width: '100%'
            }}>
              <img
                src={aboutUsImg}
                alt="About Saheer Paradise Export Facility"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '460px',
                  objectFit: 'contain',
                  borderRadius: '18px',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
              />
            </div>
          </motion.div>

          {/* Content Column (Right on Laptop, Flow on Phone) */}
          <motion.div
            className="about-content-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Intro Lead Block */}
            <div className="about-intro-lead-block">
              <span className="eyebrow" style={{ marginBottom: '14px' }}>
                SAHEER PARADISE EXPORT • PREMIER AGRO EXPORTS
              </span>

              <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 38px)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.2, margin: '12px 0 16px', fontFamily: 'var(--font-h, Outfit, sans-serif)' }}>
                Delivering Trust, <span style={{ color: 'var(--gold)' }}>Exporting Excellence</span>
              </h2>

              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.65, marginBottom: '16px', fontWeight: 500 }}>
                <strong>Saheer Paradise Export</strong> is a premier Indian merchant exporter established in <strong>2021</strong>, based in <strong>Gujarat, India</strong>. We specialize in end-to-end sourcing, premium quality grading, Sortex cleaning, and international maritime logistics.
              </p>

              <p style={{ fontSize: '15px', color: 'var(--gray)', lineHeight: 1.65, marginBottom: '28px' }}>
                With our dedicated export management and direct farm-level supply chain network, our global clients benefit from rapid decision-making, direct accountability, transparent pricing, and seamless sea freight execution.
              </p>
            </div>

            {/* Mobile Injected Photo Slot (Visible only on phone) */}
            <div className="about-mobile-photo-placement" />

            {/* Action CTA */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="#products-section" className="btn btn-primary" style={{ padding: '13px 32px', fontSize: '14.5px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>Explore Products</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
