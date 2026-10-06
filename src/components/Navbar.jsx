import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const mainLinks = [
    { name: 'HOME', id: 'home' },
    { name: 'LAMPS', id: 'lamps' },
    { name: 'DECODE', id: 'decode' },
    { name: 'CRAFT', id: 'craft' },
    { name: 'ABOUT', id: 'about' },
  ];

  const secondaryLinks = [
    { name: 'CUSTOM ORDER', id: 'custom-orders' },
    { name: 'CONTACT', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Section tracking for active indicator
      const sections = ['home', 'lamps', 'decode', 'craft', 'about', 'custom-orders', 'contact'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`showroom-navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-container">
          {/* Brand Logo & Title */}
          <div className="nav-brand" onClick={() => scrollToSection('home')}>
            <div className="nav-logo-frame">
              <img src="/MMw-Logo.jpeg" alt="Manish Metal Works Logo" className="nav-logo-img" />
            </div>
            <div className="nav-brand-text">
              <span className="brand-title">MANISH METAL WORKS</span>
              <span className="brand-subtitle">NACHIYAR KOVIL</span>
            </div>
          </div>

          {/* Desktop Center Navigation Links */}
          <div className="nav-center-links desktop-only">
            {mainLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`nav-item-link ${activeSection === link.id ? 'is-active' : ''}`}
              >
                <span>{link.name}</span>
                {activeSection === link.id && <span className="nav-dot-active" />}
              </button>
            ))}
          </div>

          {/* Desktop Right CTA Links */}
          <div className="nav-right-actions desktop-only">
            {secondaryLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="nav-secondary-link"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="nav-enquire-cta"
            >
              <Sparkles size={13} className="cta-icon" />
              <span>ENQUIRE</span>
            </button>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            className="nav-mobile-toggle mobile-only"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} color="#C89B4A" /> : <Menu size={24} color="#C89B4A" />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Navigation Overlay */}
      <div className={`nav-mobile-overlay ${mobileOpen ? 'is-open' : ''}`}>
        <div className="mobile-overlay-header">
          <div className="nav-brand" onClick={() => scrollToSection('home')}>
            <img src="/MMw-Logo.jpeg" alt="Manish Metal Works" className="nav-logo-img" />
            <div className="nav-brand-text">
              <span className="brand-title">MANISH METAL WORKS</span>
            </div>
          </div>
          <button className="mobile-close-btn" onClick={() => setMobileOpen(false)}>
            <X size={26} color="#C89B4A" />
          </button>
        </div>

        <div className="mobile-menu-links">
          {[...mainLinks, ...secondaryLinks].map((link, idx) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="mobile-nav-item"
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <span className="mobile-item-num">0{idx + 1}</span>
              <span className="mobile-item-text">{link.name}</span>
            </button>
          ))}
          <div className="mobile-cta-wrapper">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              ENQUIRE ABOUT LAMPS
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
