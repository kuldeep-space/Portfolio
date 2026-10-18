import React from 'react';
import './HeroAdvanced.css';
import resumePdf from '../assets/KULDEEP_CV.pdf';
import { FiArrowDown, FiArrowUpRight, FiMail } from 'react-icons/fi';

const HeroAdvanced = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-studio-section" aria-label="Kuldeep Jangid — Portfolio Hero">
      {/* Background layer positioning Kuldeep's body on the right side */}
      <div className="hero-bg-portrait-layer" aria-hidden="true">
        <div className="hero-bg-fade-mask" />
      </div>

      <div className="hero-studio-container">
        {/* Left Column: Typographic Narrative & Actions */}
        <div className="hero-content-col">
          {/* Identity & Main Headline */}
          <div className="hero-headline-block">
            <span className="hero-kicker">KULDEEP JANGID · AI/ML &amp; PYTHON DEVELOPER</span>
            <h1 className="hero-main-title">
              ARCHITECTING
              <span className="hero-title-light"> REAL-TIME COMPUTER VISION</span>
              <span className="hero-title-sub"> &amp; SCALABLE SYSTEMS.</span>
            </h1>
          </div>

          {/* High-Craft Action Buttons */}
          <div className="hero-actions-row">
            <button
              type="button"
              onClick={scrollToProjects}
              className="hero-btn hero-primary-btn"
            >
              <span>EXPLORE WORK</span>
              <FiArrowDown className="btn-icon" aria-hidden="true" />
            </button>

            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              className="hero-btn hero-secondary-btn"
            >
              <span>RESUME (PDF)</span>
              <FiArrowUpRight className="btn-icon" aria-hidden="true" />
            </a>

            <a href="#contact" className="hero-btn hero-ghost-btn">
              <FiMail className="btn-icon" aria-hidden="true" />
              <span>CONTACT</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAdvanced;