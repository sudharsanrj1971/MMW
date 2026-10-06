import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section className="showroom-about" id="about">
      <div className="about-container">
        <div className="about-grid">
          {/* Left: Editorial Narrative */}
          <motion.div 
            className="about-narrative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-badge">
              <span>OUR HERITAGE & FOUNDRY ROOTS</span>
            </div>

            <h2 className="about-heading">
              SACRED BRASS FORGED WITH ANCESTRAL DEVOTION
            </h2>

            <div className="gold-divider-left" />

            <p className="about-lead-paragraph">
              Manish Metal Works is rooted in Nachiyar Kovil—the legendary brass craftsmanship capital near Kumbakonam, Tamil Nadu. For generations, our master foundry has preserved the sacred science of Kuthu Vilakku fabrication.
            </p>

            <p className="about-body-paragraph">
              Every lamp is crafted strictly in accordance with traditional agamic proportions, balancing structural stability with spiritual geometry. Utilizing the distinctive alluvial river sand of the Cauvery delta, our moulds produce crisp ornamental detailing and enduring metallic resonance.
            </p>

            {/* Three Visual Anchor Pillars */}
            <div className="about-pillars">
              <div className="pillar-item">
                <ShieldCheck size={20} className="pillar-icon" />
                <div className="pillar-text">
                  <h3 className="pillar-title">TRADITION</h3>
                  <p className="pillar-desc">Preserving agamic geometry and sacred proportions.</p>
                </div>
              </div>

              <div className="pillar-item">
                <Award size={20} className="pillar-icon" />
                <div className="pillar-text">
                  <h3 className="pillar-title">CRAFT</h3>
                  <p className="pillar-desc">Hand-chiseled detailing by master generational artisans.</p>
                </div>
              </div>

              <div className="pillar-item">
                <HeartHandshake size={20} className="pillar-icon" />
                <div className="pillar-text">
                  <h3 className="pillar-title">PURPOSE</h3>
                  <p className="pillar-desc">Made to order for pooja sanctuaries, temples, and celebrations.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Atmospheric Craft Portrait */}
          <motion.div 
            className="about-visual-column"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="about-image-frame">
              <div className="about-gold-border-decor" />
              <img 
                src="/craft/craft-1.jpg" 
                alt="Manish Metal Works Foundry Artisan" 
                className="about-feature-img" 
                onError={(e) => {
                  e.currentTarget.src = '/lamps/ezgif-frame-001.jpg';
                }}
              />
              <div className="about-image-caption">
                <span className="caption-tag">FOUNDRY AT NACHIYAR KOVIL</span>
                <span className="caption-sub">Hand-moulding sacred brass alloys</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;