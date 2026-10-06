import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './TempleBellCharm.css';

// Individual Single Bell Sub-Component with full physics and interaction
const SingleTempleBell = ({ side = 'left', onRing }) => {
  const [angle, setAngle] = useState(0);
  const [isRinging, setIsRinging] = useState(false);
  
  const isDraggingRef = useRef(false);
  const stateRef = useRef({
    angle: 0,
    angularVelocity: 0,
    lastMouseX: 0
  });

  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      const state = stateRef.current;

      if (!isDraggingRef.current) {
        const gravity = 18; 
        const damping = 0.982;
        const torque = -gravity * Math.sin(state.angle);
        state.angularVelocity = (state.angularVelocity + torque * dt) * damping;
        state.angle += state.angularVelocity * dt;

        // Subtle ambient natural draft
        if (Math.abs(state.angularVelocity) < 0.02 && Math.abs(state.angle) < 0.02) {
          state.angularVelocity += (Math.random() - 0.5) * 0.006;
        }

        setAngle(state.angle * (180 / Math.PI));
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const triggerRing = () => {
    setIsRinging(true);
    stateRef.current.angularVelocity += (side === 'left' ? 1 : -1) * 3.5;
    onRing();
    setTimeout(() => setIsRinging(false), 900);
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    stateRef.current.lastMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - stateRef.current.lastMouseX;
    stateRef.current.lastMouseX = clientX;

    stateRef.current.angle += deltaX * 0.02;
    stateRef.current.angle = Math.max(-0.55, Math.min(0.55, stateRef.current.angle));
    setAngle(stateRef.current.angle * (180 / Math.PI));
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      onRing();
    }
  };

  return (
    <div 
      className={`single-bell-column bell-${side} ${isRinging ? 'is-ringing' : ''}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <div 
        className="bell-anchor"
        style={{ transform: `rotate(${angle}deg)` }}
        onClick={triggerRing}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        title={`Click or drag the sacred ${side} temple bell`}
      >
        {/* Ornamental Wire with Carved Beads (Matching Reference Image) */}
        <div className="bell-hanging-assembly">
          <div className="hanging-wire" />
          <div className="bead-stack">
            <div className="bead-cap top" />
            <div className="bead-carved-main" />
            <div className="bead-cap bottom" />
          </div>
          <div className="hanging-wire short" />
        </div>

        {/* Traditional South Indian Brass Temple Bell (Matching Reference Image media_1791204923145) */}
        <div className="bell-body-wrapper">
          <svg className="bell-svg" viewBox="0 0 90 105" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`bronzeGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D78E" />
                <stop offset="18%" stopColor="#D4AF37" />
                <stop offset="45%" stopColor="#A67C1E" />
                <stop offset="70%" stopColor="#6B4E12" />
                <stop offset="88%" stopColor="#8F6822" />
                <stop offset="100%" stopColor="#E2C178" />
              </linearGradient>

              <linearGradient id={`silverCapGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C0C0C0" />
                <stop offset="50%" stopColor="#E8E8E8" />
                <stop offset="100%" stopColor="#808080" />
              </linearGradient>

              <linearGradient id={`innerShadow-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              <linearGradient id={`goldHighlight-${side}`} x1="30%" y1="0%" x2="70%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,248,220,0.6)" />
                <stop offset="50%" stopColor="rgba(255,215,0,0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              <radialGradient id={`clapperGrad-${side}`} cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#F7E1A0" />
                <stop offset="60%" stopColor="#A67C1E" />
                <stop offset="100%" stopColor="#3B2605" />
              </radialGradient>
            </defs>

            {/* Top Suspension Crown Ring */}
            <circle cx="45" cy="11" r="7.5" stroke={`url(#bronzeGrad-${side})`} strokeWidth="3.2" fill="none" />
            <path d="M40 17 L50 17" stroke="#F5D78E" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Bell Upper Crown Base Cap */}
            <path d="M36 18 Q45 15 54 18 Q58 24 64 29 Q45 27 26 29 Q32 24 36 18 Z" fill={`url(#bronzeGrad-${side})`} stroke="#F5D78E" strokeWidth="0.8" />
            
            {/* Main Agamic Bell Dome (Reference Image Flared Silhouette) */}
            <path 
              d="M26 29 Q45 25 64 29 Q68 45 76 68 Q82 78 80 84 Q74 88 45 88 Q16 88 10 84 Q8 78 14 68 Q22 45 26 29 Z" 
              fill={`url(#bronzeGrad-${side})`} 
              stroke="#F5D78E" 
              strokeWidth="1.2"
            />
            
            {/* Embossed Deity Arch Panels (Goddess Lakshmi Motif as in Reference Image) */}
            <g opacity="0.85">
              {/* Central Arch */}
              <path d="M33 46 Q45 38 57 46 L57 66 Q45 69 33 66 Z" stroke="#3D2606" strokeWidth="1.5" fill="rgba(61,38,6,0.25)" />
              {/* Deity Silhouette Motif */}
              <circle cx="45" cy="50" r="3" fill="#F5D78E" />
              <path d="M41 62 Q45 54 49 62 Z" fill="#F5D78E" />
              <path d="M39 57 Q45 53 51 57" stroke="#F5D78E" strokeWidth="1.2" fill="none" />

              {/* Left Arch */}
              <path d="M19 49 Q27 43 31 48 L31 66 Q25 68 19 66 Z" stroke="#3D2606" strokeWidth="1.2" fill="rgba(61,38,6,0.2)" />
              {/* Right Arch */}
              <path d="M59 48 Q63 43 71 49 L71 66 Q65 68 59 66 Z" stroke="#3D2606" strokeWidth="1.2" fill="rgba(61,38,6,0.2)" />
            </g>

            {/* Ornamental Engraved Horizontal Moldings */}
            <path d="M25 35 Q45 32 65 35" stroke="#3D2606" strokeWidth="1.8" fill="none" />
            <path d="M22 42 Q45 38 68 42" stroke="#F5D78E" strokeWidth="1.2" fill="none" />
            <path d="M15 70 Q45 66 75 70" stroke="#3D2606" strokeWidth="2" fill="none" />
            <path d="M12 77 Q45 72 78 77" stroke="#F5D78E" strokeWidth="1.8" fill="none" />

            {/* Agamic Inscription Relief Texture Band */}
            <path d="M10 82 Q45 77 80 82" stroke="#3D2606" strokeWidth="2.5" fill="none" />

            {/* Flared Bottom Lotus Edge Notches */}
            <path d="M9 85 Q13 89 17 85 Q21 89 25 85 Q29 89 33 85 Q37 89 41 85 Q45 89 49 85 Q53 89 57 85 Q61 89 65 85 Q69 89 73 85 Q77 89 81 85" stroke="#F5D78E" strokeWidth="1.5" fill="none" />

            {/* Inner Heavy Brass Clapper Ball */}
            <circle 
              cx={45 + (angle * 0.18)} 
              cy="92" 
              r="6.5" 
              fill={`url(#clapperGrad-${side})`} 
              stroke="#F5D78E" 
              strokeWidth="1" 
            />
            
            {/* Metallic Specular Highlight Overlay */}
            <path 
              d="M30 30 Q45 28 60 30 Q63 45 68 68 Q45 71 22 68 Q27 45 30 30 Z" 
              fill={`url(#goldHighlight-${side})`} 
              style={{ mixBlendMode: 'screen' }}
            />
          </svg>
          
          {/* Golden Sound Ripple */}
          <div className="bell-ring-pulse" />
        </div>
      </div>
    </div>
  );
};

const TempleBellCharm = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);

  // Web Audio Synthesizer for rich South Indian temple bell tone
  const playBellSound = useCallback(() => {
    if (isMuted) return;

    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      // Traditional South Indian temple bell harmonics: fundamental G5 + pure overtones
      const freqs = [784, 1175, 1568, 2349, 3136];
      const gains = [0.4, 0.25, 0.18, 0.1, 0.05];
      const decays = [2.2, 1.8, 1.4, 0.9, 0.6];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.99, now + decays[idx]);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(gains[idx], now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + decays[idx] + 0.1);
      });
    } catch (e) {
      console.warn('Audio playback waiting for gesture', e);
    }
  }, [isMuted]);

  return (
    <div className="temple-bell-pair-system">
      {/* Left Temple Bell */}
      <SingleTempleBell side="left" onRing={playBellSound} />

      {/* Right Temple Bell */}
      <SingleTempleBell side="right" onRing={playBellSound} />

      {/* Global Mute Audio Toggle (Discrete on left bottom) */}
      <button 
        className="bell-global-mute-btn"
        onClick={() => setIsMuted(!isMuted)}
        title={isMuted ? "Unmute Temple Bells" : "Mute Temple Bells"}
        aria-label="Toggle temple bell sound"
      >
        {isMuted ? <VolumeX size={12} color="#7E7569" /> : <Volume2 size={12} color="#C89B4A" />}
      </button>
    </div>
  );
};

export default TempleBellCharm;
