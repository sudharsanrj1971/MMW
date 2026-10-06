import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, MessageSquare, Send, CheckCircle2, Navigation, ExternalLink, User } from 'lucide-react';
import { openWhatsApp, normalizeIndianPhone } from '../lib/whatsapp';
import './Contact.css';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = () => {
    if (!formState.phone) {
      setPhoneError('Phone number is required');
      return false;
    }
    if (formState.phone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePhone()) return;

    setSent(true);

    // Automatically transmit enquiry via WhatsApp
    openWhatsApp({
      type: 'contact',
      message: formState.message || 'Showroom Inquiry'
    });

    setTimeout(() => {
      setSent(false);
      setFormState({ name: '', phone: '', message: '' });
      setPhoneError('');
    }, 6000);
  };

  const openGoogleMaps = () => {
    const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Nadukammala+theru+Natchiyarkovil+Kumbakonam+Thanjavur';
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="showroom-contact" id="contact">
      <div className="contact-container">
        {/* Header */}
        <div className="section-header-centered">
          <div className="header-badge">
            <Phone size={12} />
            <span>DIRECT FOUNDRY LIAISON</span>
          </div>
          <h2 className="section-main-heading">VISIT & GET IN TOUCH</h2>
          <p className="section-sub-heading">
            Connect directly with Mr Vinoth or plan an in-person visit to our master foundry in Nachiyar Kovil.
          </p>
          <div className="gold-divider" />
        </div>

        <div className="contact-main-grid">
          {/* Left Column: Direct Official Contact Info */}
          <div className="contact-info-card">
            <div className="contact-card-header">
              <span className="info-tag">OFFICIAL FOUNDRY & SHOWROOM</span>
              <div className="owner-title-row">
                <User size={20} color="#C89B4A" />
                <h3 className="foundry-owner">Mr Vinoth</h3>
              </div>
              <h4 className="foundry-name">Manish metalworks</h4>
              <p className="foundry-motto">Custom Light Lamps (Kuthu Vilakku) As Per Orders</p>
            </div>

            <div className="contact-meta-list">
              <div className="meta-row">
                <div className="meta-icon-frame">
                  <MapPin size={20} color="#C89B4A" />
                </div>
                <div className="meta-text">
                  <span className="meta-label">FOUNDRY LOCATION</span>
                  <p className="meta-value address-formatted">
                    <strong>Nadukammala theru,</strong><br />
                    <strong>Natchiyarkovil,</strong><br />
                    <strong>Kumbakonam,</strong><br />
                    <strong>Thanjavur ( dt).</strong>
                  </p>
                </div>
              </div>

              <div className="meta-row">
                <div className="meta-icon-frame">
                  <Phone size={20} color="#C89B4A" />
                </div>
                <div className="meta-text">
                  <span className="meta-label">DIRECT PHONE LINES</span>
                  <div className="phone-anchors">
                    <a href="tel:+919585123459" className="phone-link">+91 9585123459</a>
                    <span className="phone-sep">•</span>
                    <a href="tel:+919952576916" className="phone-link">+91 9952576916</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Instant Action Buttons */}
            <div className="contact-quick-actions">
              <a href="tel:+919585123459" className="btn-primary" style={{ flex: 1 }}>
                <Phone size={14} />
                <span>CALL MR VINOTH</span>
              </a>
              <button 
                className="btn-outline whatsapp-green" 
                onClick={() => openWhatsApp('Showroom Direct Enquiry')}
              >
                <MessageSquare size={14} />
                <span>WHATSAPP</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct Message Form with Automated WhatsApp Transmission */}
          <div className="contact-form-card">
            <h3 className="form-card-title">SEND AUTOMATIC ENQUIRY</h3>
            <p className="form-card-sub">
              Submitting this form automatically transmits your enquiry to Mr Vinoth on WhatsApp.
            </p>

            {sent ? (
              <div className="contact-success-state">
                <CheckCircle2 size={44} color="#C89B4A" />
                <h4>TRANSMITTED TO WHATSAPP</h4>
                <p>
                  Thank you, {formState.name || 'Sir/Madam'}. Your enquiry is transmitting directly to Mr Vinoth via WhatsApp with complete details.
                </p>
              </div>
            ) : (
              <form className="direct-contact-form" onSubmit={handleSubmit}>
                <div className="form-field-group">
                  <label>YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>

                <div className="form-field-group">
                  <label>MOBILE / WHATSAPP NUMBER *</label>
                  <div className="phone-input-container">
                    <span className="phone-prefix">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="Mobile number"
                      value={formState.phone}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.startsWith('0')) {
                          val = val.substring(1);
                        } else if (val.startsWith('91') && val.length > 10) {
                          val = val.substring(2);
                        }
                        val = val.slice(0, 10);
                        setFormState({ ...formState, phone: val });
                        if (phoneError) setPhoneError('');
                      }}
                    />
                  </div>
                  {phoneError && <span className="phone-error-msg">{phoneError}</span>}
                </div>

                <div className="form-field-group">
                  <label>MESSAGE & LAMP REQUIREMENTS *</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe lamp models (Model 01 / Model 02), required heights, pooja requirements, or delivery address..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  <Send size={15} />
                  <span>TRANSMIT ENQUIRY VIA WHATSAPP</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Location View Map Container */}
        <div className="location-view-section">
          <div className="location-header-bar">
            <div className="loc-title-group">
              <Navigation size={18} color="#C89B4A" />
              <div>
                <h4 className="loc-heading">Location View — Nachiyar Kovil Foundry</h4>
                <p className="loc-sub">Nadukammala theru, Natchiyarkovil, Kumbakonam, Thanjavur (dt)</p>
              </div>
            </div>
            <button className="btn-outline" onClick={openGoogleMaps}>
              <ExternalLink size={14} />
              <span>GET DIRECTIONS IN GOOGLE MAPS</span>
            </button>
          </div>

          <div className="embedded-map-frame">
            <iframe
              title="Manish Metalworks Nachiyarkovil Location Map"
              src="https://maps.google.com/maps?q=Nachiyar+Koil+Kumbakonam+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="340"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;