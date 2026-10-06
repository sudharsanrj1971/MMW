import React, { useEffect, useRef, useState } from 'react';
import './DecodeLamp.css';

const DecodeLamp = () => {
  const containerRef = useRef(null);
  const [frameIndex, setFrameIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const totalFrames = 240;

  useEffect(() => {
    const loadImages = async () => {
      for (let i = 1; i <= 20; i++) {
        const img = new Image();
        img.src = `/lamps/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      }
      setLoading(false);
      
      for (let i = 21; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `/lamps/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      }
    };
    loadImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const scrollableDistance = height - viewportHeight;
      if (scrollableDistance <= 0) return;
      
      let progress = -top / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress)); 
      
      const currentFrame = Math.max(1, Math.ceil(progress * totalFrames));
      setFrameIndex(currentFrame);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progressPercent = (frameIndex / totalFrames) * 100;
  
  const getStageLabel = () => {
    if (progressPercent < 20) return 'COMPLETE LAMP';
    if (progressPercent < 40) return 'ROTATING VIEW';
    if (progressPercent < 60) return 'SEPARATING COMPONENTS';
    if (progressPercent < 80) return 'EXPLODED VIEW';
    return 'INDIVIDUAL PARTS ANALYSIS';
  };

  const activeComponentIndex = Math.min(7, Math.floor(progressPercent / 12.5));

  const components = [
    "01 — Ornamental Head (Mukha)",
    "02 — Upper Screw",
    "03 — Lamp Bowl (Deepam Plate)",
    "04 — Connecting Ring",
    "05 — Central Column Sections",
    "06 — Lower Connector",
    "07 — Base Plate",
    "08 — Lock Nut"
  ];

  return (
    <section className="decode-section" id="decode" ref={containerRef}>
      <div className="decode-sticky">
        <div className="decode-header">
          <h2 className="decode-title">DECODE THE LAMP</h2>
          <p className="decode-subtitle">Explore the anatomy of a traditional brass Kuthu Vilakku</p>
        </div>

        <div className="decode-viewer">
          {!loading && (
            <img 
              src={`/lamps/ezgif-frame-${String(frameIndex).padStart(3, '0')}.jpg`} 
              alt="Lamp Frame" 
              className="decode-image"
            />
          )}
          <div className="decode-stage-label">{getStageLabel()}</div>
        </div>

        <div className="decode-sidebar">
          <ul className="component-list">
            {components.map((comp, idx) => (
              <li 
                key={idx} 
                className={`component-item ${idx === activeComponentIndex ? 'active' : ''}`}
              >
                {comp}
              </li>
            ))}
          </ul>
        </div>

        <div className="decode-progress-container">
          <div className="decode-progress-bar" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>
    </section>
  );
};

export default DecodeLamp;