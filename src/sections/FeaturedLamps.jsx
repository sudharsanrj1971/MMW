import React from 'react';
import { motion } from 'framer-motion';
import './FeaturedLamps.css';

const products = [
  { id: 1, name: 'Traditional 5-Lamp Kuthu Vilakku', frame: '001', desc: 'Classic 5-tier design perfect for traditional pooja rooms.' },
  { id: 2, name: 'Heritage Brass Deepam', frame: '030', desc: 'Intricately carved deepam for daily rituals.' },
  { id: 3, name: 'Ornamental Pooja Lamp', frame: '060', desc: 'Features detailed ornamentation on the base and head.' },
  { id: 4, name: 'Temple Style Vilakku', frame: '090', desc: 'Large scale lamp replicating ancient temple designs.' },
  { id: 5, name: 'Decorative Brass Stand', frame: '001', desc: 'Minimalist approach to the traditional structure.' },
  { id: 6, name: 'Premium Custom Deepam', frame: '030', desc: 'Made to order with personalized engravings.' },
];

const FeaturedLamps = () => {
  return (
    <section className="featured-lamps" id="lamps">
      <div className="lamps-header">
        <motion.h2 
          className="lamps-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          OUR COLLECTION
        </motion.h2>
        <motion.p 
          className="lamps-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Traditional Brass Kuthu Vilakku
        </motion.p>
      </div>

      <div className="lamps-grid">
        {products.map((product, index) => (
          <motion.div 
            className="lamp-card" 
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="lamp-card-image">
              <img src={`/lamps/ezgif-frame-${product.frame}.jpg`} alt={product.name} />
            </div>
            <div className="lamp-card-content">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <div className="lamp-card-actions">
                <button className="btn-view">VIEW DETAILS</button>
                <button className="btn-enquire">ENQUIRE</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedLamps;