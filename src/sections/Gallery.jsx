import React, { useState } from 'react';
import './Gallery.css';
import { X } from 'lucide-react';

const galleryImages = [
  { id: 1, src: '/lamps/ezgif-frame-001.jpg', category: 'LAMPS' },
  { id: 2, src: '/lamps/ezgif-frame-030.jpg', category: 'DETAILS' },
  { id: 3, src: '/lamps/ezgif-frame-060.jpg', category: 'CRAFTSMANSHIP' },
  { id: 4, src: '/lamps/ezgif-frame-090.jpg', category: 'LAMPS' },
  { id: 5, src: '/lamps/ezgif-frame-120.jpg', category: 'DETAILS' },
  { id: 6, src: '/lamps/ezgif-frame-150.jpg', category: 'DETAILS' },
  { id: 7, src: '/lamps/ezgif-frame-180.jpg', category: 'CRAFTSMANSHIP' },
  { id: 8, src: '/lamps/ezgif-frame-200.jpg', category: 'CRAFTSMANSHIP' },
  { id: 9, src: '/lamps/ezgif-frame-220.jpg', category: 'DETAILS' },
  { id: 10, src: '/lamps/ezgif-frame-240.jpg', category: 'LAMPS' }
];

const categories = ['ALL', 'LAMPS', 'DETAILS', 'CRAFTSMANSHIP'];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filteredImages = activeFilter === 'ALL' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <section className="gallery-section" id="gallery">
      <h2 className="gallery-title">GALLERY</h2>
      
      <div className="gallery-filters">
        {categories.map(cat => (
          <button 
            key={cat}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredImages.map((img) => (
          <div 
            key={img.id} 
            className="gallery-item"
            onClick={() => setLightboxImg(img.src)}
          >
            <img src={img.src} alt={`Gallery item ${img.id}`} />
            <div className="gallery-item-overlay"></div>
          </div>
        ))}
      </div>

      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImg(null)}>
            <X size={32} color="#D4AF37" />
          </button>
          <img src={lightboxImg} alt="Enlarged view" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
};

export default Gallery;