import React from 'react';
import './MarqueeRibbon.css';

const items = [
  'ARCHITECTING PRACTICAL AI/ML',
  'COMPUTER VISION & OPENCV',
  'REAL-TIME BIOMETRIC PIPELINES',
  'NUMPY VECTORIZED ENGINES',
  'ALGORITHMIC RIGOR & DSA',
  'CODER’S CAFE DSA MENTOR',
  'DATA ANALYTICS & LOGGING',
  'HIGH-PERFORMANCE ARCHITECTURE',
];

const MarqueeRibbon = ({ reverse = false, speed = '32s' }) => {
  return (
    <div className="ownitt-marquee-wrapper" aria-hidden="true">
      <div
        className={`ownitt-marquee-track ${reverse ? 'is-reverse' : ''}`}
        style={{ animationDuration: speed }}
      >
        {/* Double the list for seamless infinite loop */}
        {[...items, ...items].map((text, idx) => (
          <span key={idx} className="marquee-item">
            <span className="marquee-dot" />
            <span className="marquee-text">{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeRibbon;
