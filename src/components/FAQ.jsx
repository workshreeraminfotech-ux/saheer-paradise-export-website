import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "Are your agro products certified and quality tested?",
    a: "Yes, all our products undergo multi-stage laboratory testing and come with necessary export certifications (FSSAI, APEDA, ISO, Phytosanitary) to guarantee compliance with international food safety standards."
  },
  {
    q: "What is the typical delivery timeframe for international shipments?",
    a: "Delivery timelines depend on the destination port and shipment size. Standard containerized ocean shipments are typically dispatched within 7–12 business days after order confirmation and customs clearance."
  },
  {
    q: "Can I request product samples before placing a bulk order?",
    a: "Absolutely! We provide product samples for bulk commercial buyers upon request so you can verify our quality, color, aroma, and grading firsthand."
  },
  {
    q: "How do you ensure product freshness and aroma during long transit?",
    a: "We utilize multi-layer food-grade eco packaging, vacuum sealing, and humidity-controlled storage to protect commodities against moisture, pests, and ambient degradation during sea voyages."
  },
  {
    q: "Do you offer private labeling and custom packaging sizes?",
    a: "Yes, we provide customized bulk packaging (10kg, 25kg, 50kg PP/Jute bags) as well as retail-ready private label packaging per buyer specifications."
  }
];

export default function FAQ({ onNavigate }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq-redesign-section" id="faq">
      <div className="container">
        <div className="faq-grid">
          {/* Left Title & Help Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-title left-align" style={{ marginBottom: '28px' }}>
              <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
              <h2>
                Got Questions? <span>We Have Answers</span>
              </h2>
              <p>
                Find answers to common questions about our agro product certifications, bulk export shipping, packaging, and quality guarantees.
              </p>
            </div>

            {/* Quick Support Card */}
            <div className="faq-support-card">
              <div className="faq-support-icon">
                <HelpCircle size={26} />
              </div>
              <div className="faq-support-content">
                <h4>Have more specific questions?</h4>
                <p>Our export specialists are available to assist with quotes and custom specifications.</p>
                <button
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="btn btn-primary"
                  style={{ padding: '10px 20px', fontSize: '13.5px', marginTop: '12px' }}
                >
                  <span>Contact Export Desk</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Accordion List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="faq-accordion-list">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={idx} className={`faq-card-item ${isOpen ? 'active' : ''}`}>
                    <button
                      className="faq-accordion-btn"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      type="button"
                    >
                      <span className="faq-q-text">{faq.q}</span>
                      <span className="faq-toggle-icon">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="faq-answer-body">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


