import React from 'react';
import { Globe, Truck, Anchor, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUs({ onNavigate }) {
  const services = [
    {
      title: 'Global Sourcing',
      desc: 'Procuring premium spices, herbs, seeds & agricultural commodities directly from certified Indian farms and verified origins.',
      img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      icon: Globe,
      tag: 'Farm Sourcing',
      points: ['Direct Farm Procurement', 'Multi-level Quality Audits']
    },
    {
      title: 'Supply Chain Management',
      desc: 'Complete control from farm to port including automated sorting, export-grade packaging, and climate-controlled storage.',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      icon: Truck,
      tag: 'End-to-End Control',
      points: ['Export Grade Packaging', 'Humidity & Climate Control']
    },
    {
      title: 'Import & Export Compliance',
      desc: 'Expert handling of international trade regulations, customs documentation, phytosanitary certifications, and ocean shipping.',
      img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
      icon: Anchor,
      tag: 'Global Logistics',
      points: ['Phytosanitary Certificates', 'Worldwide Port Delivery']
    }
  ];

  return (
    <section className="services-redesign-section" id="services">
      <div className="container">
        <div className="section-title">
          <span className="eyebrow">OUR SERVICES</span>
          <h2>
            Agro Expertise Driving <span>Global Nourishment</span>
          </h2>
          <p>
            Delivering world-class sourcing, supply management, and international export solutions tailored for global buyers.
          </p>
        </div>

        <div className="services-card-grid">
          {services.map((item, idx) => {
            return (
              <motion.div
                key={idx}
                className="service-card-v2"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <div className="service-card-image">
                  <img src={item.img} alt={item.title} />
                </div>

                <div className="service-card-body">
                  <span className="service-card-tag-inline">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>

                  <ul className="service-card-points" style={{ marginBottom: 0 }}>
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx}>
                        <CheckCircle2 size={15} color="var(--gold)" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


