import React from 'react';
import './HeroAdvanced.css';
import resumePdf from '../assets/KULDEEP_CV.pdf';
import suitPhoto from '../assets/kuldeep_suit.png';
import { FiArrowDown, FiArrowUpRight, FiMail } from 'react-icons/fi';

const HeroAdvanced = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-studio-section" aria-label="Kuldeep Jangid — Portfolio Hero">
      {/* Desktop Background Layer (Active strictly on desktop > 1024px) */}
      <div className="hero-bg-portrait-layer" aria-hidden="true">
        <div className="hero-bg-fade-mask" />
      </div>

      <div className="hero-studio-container">
        <div className="hero-content-col">
          {/* Identity & Main Headline */}
          <div className="hero-headline-block">
            <div className="hero-kicker-row">
              <span className="hero-status-dot" aria-hidden="true" />
              <span className="hero-kicker">KULDEEP JANGID · AI/ML &amp; PYTHON DEVELOPER</span>
            </div>

            {/* Editorial Portrait Card (Displayed on Mobile & Tablet <= 1024px, above ARCHITECTING) */}
            <div className="hero-editorial-card-wrapper" aria-label="Kuldeep Jangid Profile Showcase">
              <div className="hero-editorial-card">
                <div className="card-corner card-corner-tl" aria-hidden="true" />
                <div className="card-corner card-corner-tr" aria-hidden="true" />
                <div className="card-corner card-corner-bl" aria-hidden="true" />
                <div className="card-corner card-corner-br" aria-hidden="true" />

                <div className="card-header-tag">
                  <span className="tag-index">01 // PROFILE</span>
                  <span className="tag-accent">&#10022; ED. 2026</span>
                </div>

                <div className="portrait-img-box">
                  <img
                    src={suitPhoto}
                    alt="Kuldeep Jangid — AI/ML &amp; Python Engineer"
                    className="portrait-img"
                  />
                  <div className="portrait-vignette" aria-hidden="true" />
                </div>

                <div className="card-footer-tag">
                  <div className="footer-tag-left">
                    <span className="tag-name">KULDEEP JANGID</span>
                    <span className="tag-role">AI/ML &amp; Python Engineer</span>
                  </div>
                  <div className="footer-tag-badge">
                    <span>JAIPUR, IN</span>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="hero-main-title">
              ARCHITECTING<br />
              <span className="hero-title-light"><span className="nowrap">REAL-TIME</span> COMPUTER VISION</span><br />
              <span className="hero-title-sub">&amp; SCALABLE SYSTEMS.</span>
            </h1>
          </div>

          {/* Action Buttons */}
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