import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, MessageSquare, Send, CheckCircle2, Ruler, Sparkles } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';
import './CustomOrders.css';

const CustomOrders = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    size: '4.5 Feet',
    finish: 'Mirror-Buffed Polished Gold',
    crown: 'Lotus Petal Crown (Standard)',
    quantity: '1',
    requirements: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const sizes = ['2.5 Feet', '3.5 Feet', '4.5 Feet', '5.5 Feet', '7.0 Feet', 'Monumental Scale'];
  const finishes = ['Mirror-Buffed Polished Gold', 'Antique Heritage Bronze', 'Matte Temple Satin'];
  const crowns = ['Lotus Petal Crown (Standard)', 'Annam Divine Swan', 'Mayil Sacred Peacock', 'Custom Prabhavali'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Automatic transmission via WhatsApp
    openWhatsApp({
      name: formData.name || 'Valued Client',
      phone: formData.phone,
      size: formData.size,
      finish: formData.finish,
      quantity: `${formData.quantity} (Crown: ${formData.crown})`,
      requirements: formData.requirements || 'Bespoke custom order specifications'
    });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        size: '4.5 Feet',
        finish: 'Mirror-Buffed Polished Gold',
        crown: 'Lotus Petal Crown (Standard)',
        quantity: '1',
        requirements: ''
      });
    }, 6000);
  };

  const handleWhatsAppEnquiry = () => {
    openWhatsApp({
      name: formData.name || 'Valued Client',
      size: formData.size,
      finish: formData.finish,
      quantity: `${formData.quantity} (Crown: ${formData.crown})`,
      requirements: formData.requirements || 'Bespoke custom order specifications'
    });
  };

  return (
    <section className="showroom-custom-orders" id="custom-orders">
      <div className="custom-orders-container">
        {/* Header */}
        <div className="section-header-centered">
          <div className="header-badge">
            <Sliders size={12} />
            <span>BESPOKE FOUNDRY COMMISSIONS</span>
          </div>
          <h2 className="section-main-heading">MADE TO YOUR REQUIREMENTS</h2>
          <p className="section-sub-heading">
            Tailor lamp proportions, deity crowns, and metallurgical finishes to grace your sacred sanctuary.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Two-Column Form & Spec Builder */}
        <div className="custom-builder-grid">
          {/* Left Column: Interactive Specification Selector */}
          <div className="spec-selector-column">
            <h3 className="column-title">1. CONFIGURE SPECIFICATIONS</h3>
            <p className="column-subtitle">Select desired scale, finish, and devotional crown styling.</p>

            {/* Size Options */}
            <div className="config-group">
              <label className="config-label">
                <Ruler size={14} className="label-icon" />
                <span>DESIRED HEIGHT / SCALE:</span>
              </label>
              <div className="config-options-wrap">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    className={`config-pill ${formData.size === sz ? 'is-selected' : ''}`}
                    onClick={() => setFormData({ ...formData, size: sz })}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Options */}
            <div className="config-group">
              <label className="config-label">
                <Sparkles size={14} className="label-icon" />
                <span>METALLURGICAL FINISH:</span>
              </label>
              <div className="config-options-wrap">
                {finishes.map((fn) => (
                  <button
                    key={fn}
                    type="button"
                    className={`config-pill ${formData.finish === fn ? 'is-selected' : ''}`}
                    onClick={() => setFormData({ ...formData, finish: fn })}
                  >
                    {fn}
                  </button>
                ))}
              </div>
            </div>

            {/* Crown Motif Options */}
            <div className="config-group">
              <label className="config-label">
                <span>CROWN / MUKHA DESIGN:</span>
              </label>
              <div className="config-options-wrap">
                {crowns.map((cr) => (
                  <button
                    key={cr}
                    type="button"
                    className={`config-pill ${formData.crown === cr ? 'is-selected' : ''}`}
                    onClick={() => setFormData({ ...formData, crown: cr })}
                  >
                    {cr}
                  </button>
                ))}
              </div>
            </div>

            {/* Config Summary Card */}
            <div className="config-summary-card">
              <span className="summary-tag">SELECTION SUMMARY</span>
              <p className="summary-line"><strong>Scale:</strong> {formData.size}</p>
              <p className="summary-line"><strong>Finish:</strong> {formData.finish}</p>
              <p className="summary-line"><strong>Crown:</strong> {formData.crown}</p>
            </div>
          </div>

          {/* Right Column: Contact & Commission Form */}
          <div className="commission-form-column">
            <h3 className="column-title">2. SUBMIT ENQUIRY</h3>
            <p className="column-subtitle">Provide your contact info to receive an artisan quote and timeline.</p>

            {submitted ? (
              <div className="commission-success-box">
                <CheckCircle2 size={44} color="#C89B4A" />
                <h4 className="success-heading">COMMISSION ENQUIRY RECEIVED</h4>
                <p className="success-text">
                  Thank you, {formData.name || 'Sir/Madam'}. Our master artisan will review your custom specifications and reach out via WhatsApp/Phone shortly.
                </p>
              </div>
            ) : (
              <form className="commission-form" onSubmit={handleSubmit}>
                <div className="form-field-group">
                  <label>YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-field-row">
                  <div className="form-field-group">
                    <label>PHONE / WHATSAPP *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-field-group">
                    <label>QUANTITY</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label>CUSTOMIZATION NOTES / ENGRAVING REQUESTS</label>
                  <textarea
                    rows="3"
                    placeholder="E.g., Inscribe family name on base, pair matching, expedited festival requirement..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  />
                </div>

                <div className="form-submit-actions">
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                    <Send size={14} />
                    <span>SEND ENQUIRY</span>
                  </button>
                  <button
                    type="button"
                    className="btn-outline whatsapp-accent"
                    onClick={handleWhatsAppEnquiry}
                  >
                    <MessageSquare size={14} />
                    <span>DISCUSS ON WHATSAPP</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomOrders;