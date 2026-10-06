import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Layers, MessageSquare, X, Check } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';
import './CollectionSection.css';

const products = [
  {
    id: 'model-01',
    name: 'Model 01 — Lotus Crown',
    subtitle: 'Traditional 5-Flame Lotus Kuthu Vilakku',
    image: '/model-01.png',
    frameFallback: '/lamps/ezgif-frame-001.jpg',
    origin: 'Nachiyar Kovil, Kumbakonam',
    alloy: 'Sacred Temple Grade High-Copper Brass',
    finish: 'Hand-Buffed Mirror Gold / Heritage Antique',
    sizes: ['2.5 Feet', '3.5 Feet', '4.5 Feet', '5.5 Feet', '7.0 Feet+'],
    desc: 'The quintessential South Indian pooja centerpiece. Cast with traditional bell-metal core proportions, featuring an agamic floral lotus crown, 5-wick circular oil bowl, and a weighted stability foundation.',
    specs: [
      'Authentic Nachiyar Kovil bell-metal mould casting',
      'Threaded modular assembly for ease of cleansing & storage',
      'Engineered oil-groove lip for flame stability',
      'Custom artisan engraving available upon order'
    ]
  },
  {
    id: 'model-02',
    name: 'Model 02 — Annam Swan Pair',
    subtitle: 'Heritage Divine Swan Crown Lamp',
    image: '/model-02.png',
    frameFallback: '/lamps/ezgif-frame-030.jpg',
    origin: 'Nachiyar Kovil, Kumbakonam',
    alloy: 'Sacred Temple Grade High-Copper Brass',
    finish: 'Hand-Polished Brilliant Brass',
    sizes: ['3.0 Feet', '4.0 Feet', '5.0 Feet', '6.0 Feet', 'Custom'],
    desc: 'Adorned with the mythical Hamsa (Annam) bird symbolizing divine discernment and purity. Painstakingly hand-carved feathers with deeply engraved column tiers, favored for temples and auspicious inaugurations.',
    specs: [
      'Sculpted Annam (Swan) crown with intricate plumage',
      'Heavy cast base plate ensuring unshakeable stability',
      'Rich golden tone developed through authentic river-sand annealing',
      'Supplied in pairs or standalone ceremonial formats'
    ]
  }
];

const CollectionSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const scrollToDecode = () => {
    setSelectedProduct(null);
    const el = document.getElementById('decode');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCustomOrders = () => {
    setSelectedProduct(null);
    const el = document.getElementById('custom-orders');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="showroom-collection" id="lamps">
      <div className="collection-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="header-badge">
            <Sparkles size={12} />
            <span>AUTHENTIC MASTER ARCHIVE</span>
          </div>
          <h2 className="section-main-heading">THE COLLECTION</h2>
          <p className="section-sub-heading">
            Two timeless models. Handcrafted in Nachiyar Kovil. Built strictly to sacred proportions.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Exactly TWO Luxury Cards */}
        <div className="collection-dual-grid">
          {products.map((prod, idx) => (
            <motion.div
              key={prod.id}
              className="luxury-lamp-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              onClick={() => setSelectedProduct(prod)}
            >
              <div className="card-perspective-inner">
                {/* Ambient Temple Card Background */}
                <div className="card-temple-bg" />
                <div className="card-ambient-glow" />

                {/* Central Lamp Visual */}
                <div className="card-lamp-visual">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="card-lamp-img"
                    onError={(e) => {
                      e.currentTarget.src = prod.frameFallback;
                    }}
                  />
                  <div className="card-lamp-reflection" />
                </div>

                {/* Card Meta Content */}
                <div className="card-meta-footer">
                  <div className="card-tag">HANDCRAFTED BRASS</div>
                  <h3 className="card-model-title">{prod.name}</h3>
                  <p className="card-model-sub">{prod.subtitle}</p>

                  {/* Card Actions */}
                  <div className="card-hover-actions">
                    <button
                      className="card-btn-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(prod);
                      }}
                    >
                      <Eye size={13} />
                      <span>SPECIFICATIONS</span>
                    </button>
                    <button
                      className="card-btn-enquire"
                      onClick={(e) => {
                        e.stopPropagation();
                        openWhatsApp({ model: prod.name });
                      }}
                    >
                      <MessageSquare size={13} />
                      <span>ENQUIRE</span>
                    </button>
                  </div>
                </div>

                <div className="card-corner-accent top-left" />
                <div className="card-corner-accent top-right" />
                <div className="card-corner-accent bottom-left" />
                <div className="card-corner-accent bottom-right" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Order Teaser Callout */}
        <div className="custom-order-teaser">
          <div className="teaser-content">
            <h4 className="teaser-title">Require Bespoke Proportions or Deities?</h4>
            <p className="teaser-desc">
              From compact 2-foot pooja lamps to monumental 7-foot temple deepams with custom family crests or deity crowns.
            </p>
          </div>
          <button className="btn-outline" onClick={scrollToCustomOrders}>
            <span>COMMISSION CUSTOM LAMP</span>
          </button>
        </div>
      </div>

      {/* Product Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
            <motion.div
              className="product-detail-modal"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close modal"
              >
                <X size={20} color="#C89B4A" />
              </button>

              <div className="modal-inner-grid">
                {/* Left: Lamp Presentation */}
                <div className="modal-lamp-column">
                  <div className="modal-lamp-aura" />
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="modal-lamp-img"
                    onError={(e) => {
                      e.currentTarget.src = selectedProduct.frameFallback;
                    }}
                  />
                </div>

                {/* Right: Detailed Specifications */}
                <div className="modal-info-column">
                  <div className="modal-badge">{selectedProduct.origin}</div>
                  <h3 className="modal-product-title">{selectedProduct.name}</h3>
                  <p className="modal-product-sub">{selectedProduct.subtitle}</p>
                  
                  <div className="modal-divider" />

                  <p className="modal-description">{selectedProduct.desc}</p>

                  <div className="specs-list-block">
                    <h4 className="specs-header-title">ARCHITECTURAL FEATURES</h4>
                    <ul>
                      {selectedProduct.specs.map((spec, i) => (
                        <li key={i}>
                          <Check size={14} className="check-icon" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sizes-block">
                    <span className="sizes-label">STANDARD HEIGHTS:</span>
                    <div className="sizes-tags">
                      {selectedProduct.sizes.map((sz, i) => (
                        <span key={i} className="size-pill">{sz}</span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions-bar">
                    <button
                      className="btn-primary"
                      onClick={() => openWhatsApp({ model: selectedProduct.name })}
                    >
                      <MessageSquare size={14} />
                      <span>ENQUIRE ON WHATSAPP</span>
                    </button>
                    <button className="btn-outline" onClick={scrollToDecode}>
                      <Layers size={14} />
                      <span>DECODE 3D ANATOMY</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CollectionSection;