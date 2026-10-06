import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LandingExperience.css';

const TOTAL_FRAMES = 240;
const SCROLL_HEIGHT_VH = 600; // tall scroll area for smooth frame progression

const stages = [
  { range: [0, 15], label: '', sublabel: '' },
  { range: [15, 30], label: 'HERITAGE CRAFT,', sublabel: 'MADE FOR MODERN SPACES' },
  { range: [30, 50], label: 'HANDCRAFTED BRASS', sublabel: 'KUTHU VILAKKU' },
  { range: [50, 70], label: 'ROTATING VIEW', sublabel: 'Observe the craftsmanship from every angle' },
  { range: [70, 85], label: 'SEPARATING COMPONENTS', sublabel: 'Each piece, precision engineered' },
  { range: [85, 95], label: 'EXPLODED VIEW', sublabel: 'Traditional Brass Deepam — 8 handcrafted components' },
  { range: [95, 100], label: 'INDIVIDUAL PARTS', sublabel: 'Detailed analysis of every element' },
];

const components = [
  { name: 'Ornamental Head', detail: 'Mukha — Lotus & Flame Design', activePct: 75 },
  { name: 'Upper Screw', detail: 'Threaded brass connector', activePct: 78 },
  { name: 'Lamp Bowl', detail: 'Deepam Plate with Petal Edges', activePct: 81 },
  { name: 'Connecting Ring', detail: 'Structural joint ring', activePct: 84 },
  { name: 'Central Column', detail: 'Decorative floral carvings', activePct: 87 },
  { name: 'Lower Connector', detail: 'Column-to-base joint', activePct: 90 },
  { name: 'Base Plate', detail: 'Intricate carved foundation', activePct: 93 },
  { name: 'Lock Nut', detail: 'Threaded brass lock', activePct: 96 },
];

const LandingExperience = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const rafRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const lastDrawnFrame = useRef(-1);

  // Preload all frames
  useEffect(() => {
    let mounted = true;
    const images = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/lamps/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded >= 20 && mounted && !imagesLoaded) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
    framesRef.current = images;

    return () => { mounted = false; };
  }, []);

  // Draw frame on canvas
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[frameIdx];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();
    const cw = Math.round(rect.width * dpr);
    const ch = Math.round(rect.height * dpr);

    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }

    ctx.clearRect(0, 0, cw, ch);

    // Cover-fit the image
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;
    let drawW, drawH, drawX, drawY;

    if (imgAspect > canvasAspect) {
      drawH = ch;
      drawW = ch * imgAspect;
      drawX = (cw - drawW) / 2;
      drawY = 0;
    } else {
      drawW = cw;
      drawH = cw / imgAspect;
      drawX = 0;
      drawY = (ch - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableH = rect.height - window.innerHeight;
      if (scrollableH <= 0) return;

      const rawProgress = Math.max(0, Math.min(1, -rect.top / scrollableH));
      setProgress(rawProgress);

      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(rawProgress * TOTAL_FRAMES));
      if (frameIdx !== lastDrawnFrame.current) {
        lastDrawnFrame.current = frameIdx;
        drawFrame(frameIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, [drawFrame]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      lastDrawnFrame.current = -1; // force redraw
      if (framesRef.current.length > 0) {
        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
        drawFrame(frameIdx);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [progress, drawFrame]);

  const pct = progress * 100;
  const currentStage = stages.find(s => pct >= s.range[0] && pct < s.range[1]) || stages[stages.length - 1];
  const showHeroCTA = pct < 35;
  const showComponents = pct > 70;
  const showScrollHint = pct < 5;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="landing-experience"
      id="home"
      ref={containerRef}
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      <div className="landing-sticky">
        {/* Canvas for frame rendering */}
        <canvas ref={canvasRef} className="landing-canvas" />

        {/* Dark vignette overlay */}
        <div className="landing-vignette" />

        {/* Top gradient for nav readability */}
        <div className="landing-top-gradient" />

        {/* Stage label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.label}
            className="stage-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="stage-label">{currentStage.label}</h1>
            <p className="stage-sublabel">{currentStage.sublabel}</p>
          </motion.div>
        </AnimatePresence>

        {/* Hero CTAs - visible at start */}
        <AnimatePresence>
          {showHeroCTA && (
            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              <p className="hero-tagline">
                Handcrafted traditional brass Kuthu Vilakku designed for homes,
                pooja spaces, heritage interiors, celebrations and custom orders.
              </p>
              <div className="hero-buttons">
                <button className="cta-primary" onClick={() => scrollTo('lamps')}>EXPLORE LAMPS</button>
                <button className="cta-outline" onClick={() => {
                  // Scroll deeper into this section to show the decode experience
                  if (containerRef.current) {
                    const target = containerRef.current.offsetTop + (containerRef.current.offsetHeight * 0.5);
                    window.scrollTo({ top: target, behavior: 'smooth' });
                  }
                }}>DECODE THE LAMP</button>
                <button className="cta-outline" onClick={() => scrollTo('custom-orders')}>CUSTOM ORDER</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Component list sidebar - appears during exploded view */}
        <AnimatePresence>
          {showComponents && (
            <motion.div
              className="component-sidebar"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
            >
              <div className="component-sidebar-title">COMPONENTS</div>
              {components.map((comp, idx) => (
                <div
                  key={idx}
                  className={`component-row ${pct >= comp.activePct && pct < comp.activePct + 3 ? 'active' : ''}`}
                >
                  <span className="component-num">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="component-text">
                    <span className="component-name">{comp.name}</span>
                    <span className="component-detail">{comp.detail}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll hint */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              className="scroll-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="scroll-hint-line" />
              <span>SCROLL TO EXPLORE</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="landing-progress">
          <div className="landing-progress-fill" style={{ height: `${pct}%` }} />
        </div>

        {/* Progress dots */}
        <div className="progress-dots">
          {['FULL LAMP', 'ROTATE', 'EXPLODE', 'PARTS'].map((label, i) => {
            const dotPct = [10, 40, 70, 90][i];
            return (
              <div key={i} className={`progress-dot ${pct >= dotPct ? 'passed' : ''}`}>
                <div className="dot-circle" />
                <span className="dot-label">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingExperience;