import React from 'react';
import { ShieldCheck, Layers, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const items = [
  { icon: ShieldCheck, title: 'Uncompromising Quality', sub: 'Premium grade in every batch' },
  { icon: Layers, title: 'Exceptional Variety', sub: 'Whole, ground & herbal powders' },
  { icon: Award, title: 'Expertly Selected', sub: 'Sourced from trusted regions' },
  { icon: Sparkles, title: 'Freshness Guaranteed', sub: 'Sealed for export-ready shelf life' },
];

export default function PromiseStrip() {
  return (
    <div className="container">
      <motion.div
        className="promise-grid"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="promise-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="promise-icon">
              <item.icon size={26} />
            </div>
            <div className="promise-text">
              <strong>{item.title}</strong>
              <span>{item.sub}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
