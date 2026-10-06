import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Sparkles, X, ZoomIn } from 'lucide-react';
import './CraftSection.css';

const craftSteps = [
  {
    num: '01',
    title: 'Alluvial Sand Moulding',
    image: '/craft/craft-1.jpg',
    desc: 'Artisans blend unique fine-grain silt from the Cauvery river basin to construct high-precision two-piece mould matrices that capture microscopic detail.',
    detail: 'The distinctive mineral density of Nachiyar Kovil sand prevents thermal warping, creating crisp agamic curves without air pocket deformities.'
  },
  {
    num: '02',
    title: 'Sacred Alloy Metallurgy',
    image: '/craft/craft-2.jpg',
    desc: 'High-copper brass is heated in traditional graphite crucibles to over 1050°C, achieving the ideal viscosity for flawless molten flow.',
    detail: 'Our proprietary alloy ratio produces the deep, resonant tone and lustrous amber-gold hue sacred to South Indian pooja rituals.'
  },
  {
    num: '03',
    title: 'Sectional Gravity Casting',
    image: '/craft/craft-3.jpg',
    desc: 'Molten brass is poured into preheated clay-bound moulds, allowing the alloy to solidify uniformly from the core outwards.',
    detail: 'Each lamp component—from the heavy base plate to the slender column—is cast separately to guarantee structural integrity and balance.'
  },
  {
    num: '04',
    title: 'Hand Chiseling & Embossing',
    image: '/craft/craft-4.jpg',
    desc: 'Master engravers spend days hand-chiseling intricate lotus petals, swan plumage, and flame motifs onto the raw cast surface.',
    detail: 'Every single stroke is executed with hardened steel chisels, carrying forward ancestral motifs preserved over five generations.'
  },
  {
    num: '05',
    title: 'Mirror Buffing & Annealing',
    image: '/craft/craft-5.jpg',
    desc: 'The finished lamp undergoes multi-tier lathe polishing and protective hand buffing to seal the radiant golden luster.',
    detail: 'Natural organic polishing compounds are applied to prevent premature oxidation while enhancing the tactile metallic warmth.'
  }
];

const CraftSection = () => {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="showroom-craft" id="craft">
      <div className="craft-container">
        {/* Header */}
        <div className="section-header-centered">
          <div className="header-badge">
            <Hammer size={12} />
            <span>ANCESTRAL FOUNDRY NOTES</span>
          </div>
          <h2 className="section-main-heading">The Craft Behind the Form</h2>
          <p className="section-sub-heading">
            Field notes from the master moulders, engravers, and polishers in Nachiyar Kovil.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Craft Process Grid */}
        <div className="craft-process-grid">
          {craftSteps.map((step, idx) => (
            <motion.div
              key={step.num}
              className="craft-card-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
            >
              <div 
                className="craft-image-frame"
                onClick={() => setActiveImage(step)}
              >
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="craft-photo"
                  onError={(e) => {
                    e.currentTarget.src = `/lamps/ezgif-frame-0${(idx + 1) * 30}.jpg`;
                  }}
                />
                <div className="craft-img-overlay">
                  <ZoomIn size={20} color="#DFB56C" />
                  <span>VIEW DETAIL</span>
                </div>
                <div className="craft-step-badge">{step.num}</div>
              </div>

              <div className="craft-text-body">
                <h3 className="craft-step-title">{step.title}</h3>
                <p className="craft-step-desc">{step.desc}</p>
                <div className="craft-detail-callout">
                  <Sparkles size={13} className="sparkle-icon" />
                  <span>{step.detail}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <div className="lightbox-backdrop" onClick={() => setActiveImage(null)}>
            <motion.div
              className="lightbox-dialog"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="lightbox-close-btn"
                onClick={() => setActiveImage(null)}
                aria-label="Close image"
              >
                <X size={22} color="#C89B4A" />
              </button>
              <img 
                src={activeImage.image} 
                alt={activeImage.title} 
                className="lightbox-img" 
                onError={(e) => {
                  e.currentTarget.src = '/lamps/ezgif-frame-001.jpg';
                }}
              />
              <div className="lightbox-caption">
                <span className="caption-num">{activeImage.num}</span>
                <span className="caption-title">{activeImage.title}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CraftSection;