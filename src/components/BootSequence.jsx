import React, { useState, useEffect, useRef } from 'react';
import './BootSequence.css';

const BootSequence = ({ onComplete }) => {
  const [phase, setPhase] = useState(1); // 1: ambient, 2: video, 3: hold, 4: exit
  const [videoError, setVideoError] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem('mmw_intro_seen', 'true');
      onComplete();
      return;
    }

    // Phase 1 -> 2 (start video after initial warm ambient glow)
    const phase1Timer = setTimeout(() => {
      setPhase(2);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          setVideoError(true);
        });
      }
    }, 450);

    return () => clearTimeout(phase1Timer);
  }, [onComplete]);

  // Fallback if video errors
  useEffect(() => {
    if (videoError) {
      const fallbackTimer = setTimeout(() => {
        handleFinish();
      }, 2500);
      return () => clearTimeout(fallbackTimer);
    }
  }, [videoError]);

  const handleVideoEnded = () => {
    setPhase(3);
    setTimeout(() => {
      handleFinish();
    }, 700);
  };

  const handleFinish = () => {
    setIsFadingOut(true);
    sessionStorage.setItem('mmw_intro_seen', 'true');
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const handleSkip = () => {
    sessionStorage.setItem('mmw_intro_seen', 'true');
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div className={`boot-container ${isFadingOut ? 'boot-fade-out' : ''}`}>
      {/* Ambient background glow */}
      <div className={`boot-ambient ${phase >= 1 ? 'active' : ''}`} />

      {/* Video / Logo Layer */}
      <div className="boot-content">
        {!videoError ? (
          <div className={`video-wrapper ${phase === 3 ? 'video-hold' : ''}`}>
            <video
              ref={videoRef}
              src="/boot-video.mp4"
              playsInline
              muted
              autoPlay
              onEnded={handleVideoEnded}
              onError={() => setVideoError(true)}
              className="boot-video"
            />
          </div>
        ) : (
          <div className="fallback-logo-wrapper">
            <img src="/MMw-Logo.jpeg" alt="Manish Metal Works" className="fallback-logo" />
            <div className="fallback-glow" />
          </div>
        )}
      </div>

      {/* Skip Button */}
      <button className="boot-skip-btn" onClick={handleSkip} aria-label="Skip Introduction">
        <span>SKIP INTRO</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      {/* Golden Light Sweep Accent */}
      {phase === 3 && <div className="gold-sweep-line" />}
    </div>
  );
};

export default BootSequence;
