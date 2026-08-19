import React, { useState } from 'react';
import { X, Send, CheckCircle2, Ship, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addEnquiry } from '../utils/adminStore';

export default function QuoteModal({ isOpen, onClose, initialProduct = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: initialProduct || 'Whole Spices',
    quantity: '20 MT (1x20ft Container)',
    incoterm: 'FOB (Free On Board)',
    destinationPort: '',
    packaging: 'Multi-wall PP Woven Bags (25/50 Kg)',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEnquiry({
      source: 'Product Quote Request',
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      product: formData.product,
      quantity: formData.quantity,
      destinationPort: formData.destinationPort,
      notes: formData.notes
    });
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="rfq-modal-overlay">
        <motion.div 
          className="rfq-modal-card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rfq-modal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="cyan-badge" style={{ background: 'rgba(255, 255, 255, 0.12)', color: '#CBD5E1', border: '1px solid rgba(140,150,160,0.3)' }}>
                <Ship size={14} /> International B2B Export Desk
              </span>
            </div>
            <h3>Request Product Export Quote</h3>
            <p style={{ fontSize: '13px', opacity: 0.85, margin: 0 }}>
              Get instant FOB/CIF export pricing, phytosanitary specs, and shipping timelines.
            </p>
            <button className="rfq-modal-close" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>

          {submitted ? (
            <div style={{ padding: '48px 32px', textAlign: 'center' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                style={{ width: 64, height: 64, borderRadius: '50%', background: '#DEF7EC', color: '#03543F', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}
              >
                <CheckCircle2 size={36} />
              </motion.div>
              <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
                Quote Request Received!
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--gray)', maxWidth: '440px', margin: '0 auto 24px' }}>
                Thank you! Your quote enquiry has been sent to our Export Desk. Our team will verify port rates and email your detailed proforma quotation within 4 business hours.
              </p>
              <button 
                className="btn btn-silver"
                onClick={() => { setSubmitted(false); onClose(); }}
                style={{ padding: '10px 24px' }}
              >
                Back to Website
              </button>
            </div>
          ) : (
            <form className="rfq-form" onSubmit={handleSubmit}>
              <div className="rfq-field-group">
                <div>
                  <label className="rfq-label">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Alexander Vance"
                    className="rfq-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="rfq-label">Company Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Global Foods Trading Ltd"
                    className="rfq-input"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <div className="rfq-field-group">
                <div>
                  <label className="rfq-label">Business Email *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="importer@company.com"
                    className="rfq-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="rfq-label">Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+1 (555) 000-0000"
                    className="rfq-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="rfq-field-group">
                <div>
                  <label className="rfq-label">Required Spice Commodity *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Turmeric Powder / Cumin Seeds"
                    className="rfq-input"
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                  />
                </div>
                <div>
                  <label className="rfq-label">Target Quantity / Volume *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 20 MT (1x20ft Container)"
                    className="rfq-input"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="rfq-label">Destination Overseas Port & Country *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Jebel Ali (Dubai) / Hamburg / New York"
                  className="rfq-input"
                  value={formData.destinationPort}
                  onChange={(e) => setFormData({...formData, destinationPort: e.target.value})}
                />
              </div>

              <div>
                <label className="rfq-label">Additional Message / Requirements</label>
                <textarea 
                  rows={2} 
                  placeholder="e.g. Moisture < 8%, ASTA color rating, Phytosanitary certification required..."
                  className="rfq-textarea"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--gray)' }}>
                  <Shield size={14} style={{ color: 'var(--navy)' }} /> 100% Verified B2B Export Desk
                </div>
                <button type="submit" className="btn btn-silver" style={{ padding: '12px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Submit Quote Request <Send size={16} />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
