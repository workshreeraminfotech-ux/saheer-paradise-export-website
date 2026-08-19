import React from 'react';
import { X, Send } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onOpenQuote }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: 640 }}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        {/* Image — Uncropped */}
        <div className="modal-img" style={{ backgroundColor: '#FFFFFF', padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>

        {/* Details — Simplified */}
        <div className="modal-body">
          <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--gold-deep)', background: 'var(--gold-pale)', border: '1px solid var(--gold-light)', padding: '4px 12px', borderRadius: 100, display: 'inline-block', marginBottom: 10 }}>
            {product.category || product.cat}
          </span>
          <h3 style={{ fontFamily: 'var(--font-h, Outfit, sans-serif)', fontSize: 22, fontWeight: 800, marginBottom: 10, color: 'var(--navy)' }}>{product.title}</h3>
          <p style={{ fontSize: 14, color: 'var(--gray)', marginBottom: 24, lineHeight: 1.6 }}>{product.description || product.desc}</p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto' }}>
            <button
              onClick={() => {
                onClose();
                if (onOpenQuote) onOpenQuote(product.title);
              }}
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Send size={16} />
              <span>Request Export Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
