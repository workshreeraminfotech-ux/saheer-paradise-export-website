import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, ShieldCheck, MapPin, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStoreProducts } from '../utils/useStore';

export default function MainSeedsShowcase({ onSelectProduct, onOpenQuote, onNavigate }) {
  const storeProds = useStoreProducts();
  const allProducts = Array.isArray(storeProds) ? storeProds : [];
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // All seed products & seed spices
  const seedProducts = allProducts.filter(p => {
    if (!p) return false;
    const title = String(p.title || '').toLowerCase();
    const cat = String(p.category || p.cat || '').toLowerCase();
    const id = String(p.id || '').toLowerCase();
    return (
      cat.includes('seed') || 
      title.includes('seed') || 
      title.includes('cumin') || 
      title.includes('coriander') || 
      title.includes('fennel') || 
      title.includes('pepper') || 
      title.includes('cardamom') || 
      id.includes('seeds') ||
      id.includes('cumin') ||
      id.includes('coriander') ||
      id.includes('fennel')
    );
  });

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardEl = scrollContainerRef.current.querySelector('.seeds-showcase-card');
      const scrollAmount = cardEl ? cardEl.offsetWidth + 18 : 310;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Automatic Horizontal Scrolling
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const cardEl = scrollContainerRef.current.querySelector('.seeds-showcase-card');
        const scrollAmount = cardEl ? cardEl.offsetWidth + 18 : 310;

        // If reached end, scroll smoothly back to start, else scroll next card
        if (scrollLeft + clientWidth >= scrollWidth - 25) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      className="main-seeds-showcase-section" 
      style={{ 
        background: 'var(--cream)', 
        color: 'var(--navy)',
        padding: '54px 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
        borderTop: '1px solid var(--border)'
      }}
    >
      <div className="container">
        
        {/* Centered Header Section */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
          
          {/* Eyebrow Badge */}
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Sparkles size={14} style={{ color: 'var(--gold)' }} />
            <span>OUR SIGNATURE COMMODITIES • 100% SORTEX CLEANED</span>
          </span>

          {/* Centered Main Title */}
          <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(28px, 4.2vw, 42px)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.2, margin: '0 0 14px' }}>
            Our Main Export Products — <span style={{ color: 'var(--gold)' }}>Premium Seeds</span>
          </h2>

          {/* Centered Subtitle */}
          <p style={{ fontSize: '15.5px', color: '#57534E', lineHeight: 1.6, margin: '0 auto', maxWidth: '640px' }}>
            Specialized farm sourcing from Unjha (Gujarat) & major Mandis with guaranteed high essential oil, sortex grading & international export packing.
          </p>
        </div>

        {/* Horizontal Auto-Scrolling Track (No visible scrollbar line) */}
        <div
          ref={scrollContainerRef}
          className="seeds-horizontal-scroll-track"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            paddingBottom: '8px',
            paddingTop: '6px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {seedProducts.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              className="seeds-showcase-card"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (idx % 4) * 0.05 }}
              style={{
                borderRadius: '22px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(27, 75, 122, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                border: '1.5px solid var(--border)',
                background: '#FFFFFF',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(2, 132, 199, 0.2)', borderColor: 'var(--gold)' }}
            >
              {/* Product Image Box */}
              <div
                style={{
                  height: '230px',
                  background: 'radial-gradient(circle, #FFFFFF 50%, #F9F7F2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px',
                  position: 'relative',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border)'
                }}
                onClick={() => onSelectProduct ? onSelectProduct(item) : null}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'contain',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              {/* Product Info Body */}
              <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 
                  style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px', lineHeight: 1.3, cursor: 'pointer' }}
                  onClick={() => onSelectProduct ? onSelectProduct(item) : null}
                >
                  {item.title}
                </h3>

                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.55, marginBottom: '22px', flex: 1, fontWeight: 500 }}>
                  {item.desc || item.description}
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button
                    onClick={() => onOpenQuote ? onOpenQuote(item.title) : null}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '10px 14px', fontSize: '13.5px', fontWeight: 700, justifyContent: 'center', borderRadius: '8px' }}
                  >
                    <span>Quote</span>
                    <ArrowRight size={15} />
                  </button>
                  
                  <button
                    onClick={() => onSelectProduct ? onSelectProduct(item) : null}
                    className="btn btn-outline"
                    style={{ padding: '10px 14px', fontSize: '13.5px', borderRadius: '8px', background: '#FFFFFF' }}
                    title="Quick View Details"
                  >
                    <Eye size={15} />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
