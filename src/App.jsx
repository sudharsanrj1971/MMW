import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';

import BootSequence from './components/BootSequence';
import Navbar from './components/Navbar';
import TempleBellCharm from './components/TempleBellCharm';
import Footer from './components/Footer';

import Hero from './sections/Hero';
import CollectionSection from './sections/CollectionSection';
import DecodeSection from './sections/DecodeSection';
import CraftSection from './sections/CraftSection';
import About from './sections/About';
import CustomOrders from './sections/CustomOrders';
import Contact from './sections/Contact';

function App() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const bgRef = useRef(null);

  useEffect(() => {
    // Force replay if URL contains ?replay=true
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('replay') === 'true') {
      sessionStorage.removeItem('mmw_intro_seen');
      // Clean url parameter silently without reloading
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      // Check if intro has been viewed in this session
      const seen = sessionStorage.getItem('mmw_intro_seen');
      if (seen) {
        setBootCompleted(true);
      }
    }

    // Initialize butter-smooth Lenis scrolling with Parallax tracking
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ({ scroll }) => {
      // Subtle background parallax shift
      if (bgRef.current) {
        const yOffset = (scroll * 0.08) % 80;
        bgRef.current.style.transform = `scale(1.06) translateY(${-yOffset}px)`;
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('mmw_intro_seen', 'true');
    setBootCompleted(true);
  };

  return (
    <div className="showroom-app-root">
      {/* Global Temple Background with Dynamic Parallax */}
      <div className="global-temple-bg" ref={bgRef} />

      {/* Global Lighting Vignette Overlay */}
      <div className="global-vignette-overlay" />
      <div className="ambient-lighting" />

      {/* Cinematic Boot sequence loader */}
      {!bootCompleted && (
        <BootSequence onComplete={handleBootComplete} />
      )}

      {/* Showroom Digital Experience */}
      {bootCompleted && (
        <>
          {/* Fixed Floating South Indian Temple Bell */}
          <TempleBellCharm />

          {/* Luxury Showroom Navigation Header */}
          <Navbar />

          {/* Main Cinematic Scroll Experience */}
          <main className="showroom-main-content">
            <Hero />
            <CollectionSection />
            <DecodeSection />
            <CraftSection />
            <About />
            <CustomOrders />
            <Contact />
          </main>

          {/* Minimalist Foundry Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
