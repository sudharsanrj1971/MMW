import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Maximize2, Layers, MessageSquare, ChevronRight, CheckCircle2, Sparkles, ZoomIn } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';
import './DecodeSection.css';

const stages = [
  { time: 0, title: 'Stage 01 — The Complete Form', desc: 'Full traditional South Indian Kuthu Vilakku with agamic symmetry and golden luster.' },
  { time: 0.20, title: 'Stage 02 — Rotational View & Flame Crown', desc: 'Observe master hand-chiseled lotus petals and precision-balanced brass oil wicks.' },
  { time: 0.45, title: 'Stage 03 — Structural Separation', desc: 'Modular threaded components detach smoothly, revealing solid bell-metal construction.' },
  { time: 0.65, title: 'Stage 04 — Exploded 3D Architecture', desc: '8 individual handcrafted brass elements forged strictly to sacred temple proportions.' },
  { time: 0.85, title: 'Stage 05 — Component Inspection', desc: 'Select individual elements to inspect craftsmanship, alloy density, and purpose.' },
  { time: 1.0, title: 'Stage 06 — Precision Reassembly', desc: 'Threaded joints securely interlock to form the immortal flame bearer for pooja sanctuaries.' },
];

const components = [
  { id: 1, name: 'Ornamental Head (Mukha)', detail: 'Lotus & Prabhai Flame Crown', timeRatio: 0.68, craftImg: '/craft/craft-1.jpg' },
  { id: 2, name: 'Upper Screw Joint', detail: 'Precision Threaded Brass Connector', timeRatio: 0.72, craftImg: '/craft/craft-2.jpg' },
  { id: 3, name: 'Lamp Bowl (Agal)', detail: '5-Wick Oil Plate with Petal Notches', timeRatio: 0.76, craftImg: '/craft/craft-3.jpg' },
  { id: 4, name: 'Connecting Collar', detail: 'Structural Stabilizing Joint Ring', timeRatio: 0.80, craftImg: '/craft/craft-4.jpg' },
  { id: 5, name: 'Central Column (Thandu)', detail: 'Fluted Column with Floral Carvings', timeRatio: 0.84, craftImg: '/craft/craft-5.jpg' },
  { id: 6, name: 'Lower Connector', detail: 'Column-to-Base Precision Joint', timeRatio: 0.88, craftImg: '/craft/craft-1.jpg' },
  { id: 7, name: 'Base Plate (Kizhbagam)', detail: 'Heavy Cast Architectural Foundation', timeRatio: 0.92, craftImg: '/craft/craft-2.jpg' },
  { id: 8, name: 'Lock Nut (Aani)', detail: 'Threaded Foundation Lock Bolt', timeRatio: 0.96, craftImg: '/craft/craft-3.jpg' },
];

const DecodeSection = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(stages[0]);
  const [activeComp, setActiveComp] = useState(0);
  const [fullLampModal, setFullLampModal] = useState(false);

  // Sync scroll with video progress when scrolling through pinned section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;
      if (scrollableDist <= 0) return;

      const rawPct = Math.max(0, Math.min(1, -rect.top / scrollableDist));
      setProgress(rawPct);

      if (videoRef.current.duration) {
        // Smoothly adjust video time based on scroll
        videoRef.current.currentTime = rawPct * videoRef.current.duration;
      }

      // Find active stage
      const current = stages.slice().reverse().find(s => rawPct >= s.time) || stages[0];
      setActiveStage(current);

      if (rawPct >= 0.6) {
        const compIdx = Math.min(7, Math.max(0, Math.floor((rawPct - 0.6) / 0.05)));
        setActiveComp(compIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const seekToStage = (timeRatio) => {
    if (!videoRef.current || !containerRef.current) return;
    if (videoRef.current.duration) {
      videoRef.current.currentTime = timeRatio * videoRef.current.duration;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableDist = rect.height - window.innerHeight;
    const targetY = window.scrollY + rect.top + (scrollableDist * timeRatio);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const resetExperience = () => {
    seekToStage(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section className="decode-runway-section" id="decode" ref={containerRef}>
      <div className="decode-sticky-view">
        {/* Header Overlay */}
        <div className="decode-header-overlay">
          <div className="decode-badge">
            <Layers size={13} />
            <span>3D DIGITAL ANATOMY & BUILD EXPERIENCE</span>
          </div>
          <h2 className="decode-main-title">{activeStage.title}</h2>
          <p className="decode-stage-desc">{activeStage.desc}</p>
        </div>

        {/* Central 3D Video & Lamp Stage */}
        <div className="decode-media-stage">
          <div className="decode-aura-glow" />
          
          <div className="video-player-container">
            <video
              ref={videoRef}
              src="/lamp-3d-build.mp4"
              playsInline
              muted
              autoPlay
              loop
              className="lamp-3d-video"
              onTimeUpdate={() => {
                if (videoRef.current && videoRef.current.duration) {
                  const currentRatio = videoRef.current.currentTime / videoRef.current.duration;
                  const current = stages.slice().reverse().find(s => currentRatio >= s.time) || stages[0];
                  setActiveStage(current);
                }
              }}
            />

            {/* Quick Full-View Button */}
            <button 
              className="btn-full-lamp-view"
              onClick={() => setFullLampModal(true)}
              title="View full uncropped high-resolution lamp"
            >
              <ZoomIn size={14} />
              <span>FULL PIC VIEW</span>
            </button>
          </div>

          {/* Right Floating Components Breakdown Panel */}
          <div className="decode-components-box">
            <div className="box-header">
              <span className="box-title">8 HANDCRAFTED PARTS</span>
              <span className="box-tag">AGAMIC SPEC</span>
            </div>
            <div className="components-scroll-list">
              {components.map((comp, idx) => (
                <div
                  key={comp.id}
                  className={`comp-card ${activeComp === idx ? 'active' : ''}`}
                  onClick={() => seekToStage(comp.timeRatio)}
                >
                  <span className="comp-num">0{comp.id}</span>
                  <div className="comp-info">
                    <span className="comp-heading">{comp.name}</span>
                    <span className="comp-subtext">{comp.detail}</span>
                  </div>
                  <ChevronRight size={14} className="comp-chevron" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Control Panel */}
        <div className="decode-bottom-controls">
          <div className="controls-row">
            <button className="control-action-btn" onClick={togglePlay}>
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY 3D BUILD'}</span>
            </button>
            <button className="control-action-btn" onClick={() => seekToStage(0.65)}>
              <Layers size={14} />
              <span>EXPLODE ANATOMY</span>
            </button>
            <button className="control-action-btn" onClick={() => seekToStage(1.0)}>
              <CheckCircle2 size={14} />
              <span>FINAL ASSEMBLE</span>
            </button>
            <button className="control-action-btn" onClick={resetExperience}>
              <RotateCcw size={14} />
              <span>RESET</span>
            </button>
            <button 
              className="control-action-btn gold-cta"
              onClick={() => openWhatsApp({ model: 'Custom Handcrafted Kuthu Vilakku (Decoded 3D Form)' })}
            >
              <MessageSquare size={14} />
              <span>ENQUIRE ON WHATSAPP</span>
            </button>
          </div>

          {/* Progress Timeline Scrubber */}
          <div className="timeline-scrubber-bar">
            <div className="timeline-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
            <div className="timeline-milestones">
              <span onClick={() => seekToStage(0)}>01 FORM</span>
              <span onClick={() => seekToStage(0.25)}>02 ROTATION</span>
              <span onClick={() => seekToStage(0.5)}>03 SEPARATION</span>
              <span onClick={() => seekToStage(0.7)}>04 EXPLODED</span>
              <span onClick={() => seekToStage(0.9)}>05 INSPECT</span>
              <span onClick={() => seekToStage(1.0)}>06 REASSEMBLE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Lamp High-Resolution View Modal */}
      <AnimatePresence>
        {fullLampModal && (
          <div className="full-lamp-modal-backdrop" onClick={() => setFullLampModal(false)}>
            <motion.div 
              className="full-lamp-dialog"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-dismiss-btn" onClick={() => setFullLampModal(false)}>
                ✕
              </button>
              
              <div className="full-lamp-inner">
                <div className="full-lamp-image-stage">
                  <img 
                    src="/lamps/ezgif-frame-001.jpg" 
                    alt="Complete Uncropped Kuthu Vilakku" 
                    className="full-uncropped-lamp"
                  />
                </div>
                <div className="full-lamp-meta">
                  <div className="meta-badge">100% AUTHENTIC PROPORTIONS</div>
                  <h3 className="meta-title">COMPLETE KUTHU VILAKKU SACRED ARCHITECTURE</h3>
                  <p className="meta-desc">
                    Full vertical profile of our master cast lamp—from the five-flame lotus crown down through the tiered floral column to the weighted foundation plate.
                  </p>
                  <div className="meta-specs">
                    <p><strong>Foundry:</strong> Manish Metalworks, Nachiyar Kovil</p>
                    <p><strong>Master Artisan:</strong> Mr Vinoth</p>
                    <p><strong>Material:</strong> Sacred High-Copper Brass Alloy</p>
                  </div>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setFullLampModal(false);
                      openWhatsApp({ model: 'Full Kuthu Vilakku (Master Form)' });
                    }}
                  >
                    <MessageSquare size={14} />
                    <span>ENQUIRE VIA WHATSAPP</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DecodeSection;
