import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Layers } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="showroom-hero" id="home">
      {/* Full View Uploaded Image Temple Stage */}
      <div className="hero-bg-media" />
      
      {/* Subtle Lighting Gradients */}
      <div className="hero-vignette" />
      <div className="hero-center-aura" />

      <div className="hero-container">
        {/* Left/Bottom Cinematic Content */}
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div className="hero-badge">
            <Sparkles size={12} className="badge-spark" />
            <span>NACHIYAR KOVIL • TRADITIONAL BRASS CRAFT</span>
          </div>

          <h1 className="hero-main-title">
            <span className="title-line">HERITAGE CRAFT.</span>
            <span className="title-line gold-shimmer">MADE FOR MODERN SPACES.</span>
          </h1>

          <p className="hero-description">
            Handcrafted traditional South Indian brass Kuthu Vilakku, designed for sacred pooja rooms,
            heritage sanctuaries, grand celebrations, and bespoke custom orders.
          </p>

          <div className="hero-cta-buttons">
            <button className="btn-primary" onClick={() => scrollTo('lamps')}>
              <Compass size={15} />
              <span>EXPLORE LAMPS</span>
            </button>
            <button className="btn-outline" onClick={() => scrollTo('decode')}>
              <Layers size={15} />
              <span>DECODE THE LAMP</span>
            </button>
            <button className="btn-ghost" onClick={() => scrollTo('custom-orders')}>
              <span>CUSTOM ORDER</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Refined Scroll Hint */}
      <motion.div 
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        onClick={() => scrollTo('lamps')}
      >
        <span className="scroll-hint-text">EXPLORE SHOWROOM</span>
        <div className="scroll-indicator-line">
          <div className="scroll-dot-anim" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;