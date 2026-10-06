import React from 'react';
import { Sparkles, Phone, MessageSquare } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';
import './Footer.css';

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="showroom-footer">
      <div className="footer-top-container">
        {/* Brand Column */}
        <div className="footer-brand-column">
          <div className="footer-brand-identity" onClick={() => scrollTo('home')}>
            <img src="/MMw-Logo.jpeg" alt="Manish Metal Works" className="footer-logo" />
            <div className="footer-brand-title">
              <span className="brand-primary">MANISH METAL WORKS</span>
              <span className="brand-location">NACHIYAR KOVIL</span>
            </div>
          </div>
          <p className="footer-tagline">
            Custom Light Lamps (Kuthu Vilakku) As Per Orders
          </p>
          <p className="footer-description">
            Generations of master foundry craftsmanship delivering sacred South Indian brass lamps to pooja rooms, temples, and celebrations across the globe.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="footer-nav-column">
          <h4 className="footer-col-heading">SHOWROOM ARCHIVE</h4>
          <ul className="footer-nav-links">
            <li><button onClick={() => scrollTo('home')}>HOME</button></li>
            <li><button onClick={() => scrollTo('lamps')}>THE COLLECTION</button></li>
            <li><button onClick={() => scrollTo('decode')}>DECODE 3D ANATOMY</button></li>
            <li><button onClick={() => scrollTo('craft')}>FOUNDRY FIELD NOTES</button></li>
            <li><button onClick={() => scrollTo('about')}>ABOUT OUR HERITAGE</button></li>
            <li><button onClick={() => scrollTo('custom-orders')}>CUSTOM ORDERS</button></li>
            <li><button onClick={() => scrollTo('contact')}>CONTACT US</button></li>
          </ul>
        </div>

        {/* Foundry Liaison Column */}
        <div className="footer-liaison-column">
          <h4 className="footer-col-heading">FOUNDRY & SHOWROOM</h4>
          <p className="liaison-address">
            Nadukammala Theru, Natchiyarkovil,<br />
            Kumbakonam, Thanjavur District,<br />
            Tamil Nadu, India
          </p>
          <div className="liaison-phones">
            <a href="tel:+919585123459">+91 9585123459</a>
            <a href="tel:+919952576916">+91 9952576916</a>
          </div>
          <div className="footer-actions">
            <button 
              className="btn-outline" 
              onClick={() => openWhatsApp('Showroom Footer Contact')}
            >
              <MessageSquare size={13} />
              <span>WHATSAPP LIAISON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="gold-divider" style={{ maxWidth: '100%', opacity: 0.15, marginBottom: '1.5rem' }} />
        <div className="bottom-bar-content">
          <p className="copyright-text">
            © {new Date().getFullYear()} Manish Metal Works. All Rights Reserved. Handcrafted in Nachiyar Kovil.
          </p>
          <div className="bottom-craft-badge">
            <Sparkles size={11} color="#C89B4A" />
            <span>SACRED BRASS HERITAGE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
