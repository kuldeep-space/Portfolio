import React from "react";
import "./HeroAdvanced.css";
import {
  FiArrowRight,
  FiFile,
  FiMail,
  FiGithub,
  FiMapPin,
  FiPhone,
  FiTerminal,
} from "react-icons/fi";
import suitPhoto from "../assets/kuldeep_suit.png";
import cvPdf from "../assets/KULDEEP_CV.pdf";

const marqueeItems = [
  "PYTHON DEVELOPER",
  "APPLIED AI & ML",
  "OPENCV & COMPUTER VISION",
  "NUMPY & PANDAS",
  "DATA STRUCTURES & ALGORITHMS",
  "STUDENT ANALYTICS",
  "REST APIS",
  "189+ LEETCODE SOLVED",
];

const HeroAdvanced = () => {
  return (
    <section id="home" className="hero-advanced">
      {/* Background ambient lighting */}
      <div className="hero-glow hero-glow-1" aria-hidden="true" />
      <div className="hero-glow hero-glow-2" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-inner">
        {/* Top Status & Meta Bar */}
        <div className="hero-topbar">
          <div className="hero-status">
            <span className="hero-status-dot" />
            <span className="hero-status-text">AVAILABLE FOR ROLES &amp; PROJECTS</span>
          </div>

          <div className="hero-location-chip">
            <FiMapPin className="chip-icon" />
            <span>JAIPUR, RAJASTHAN</span>
          </div>
        </div>

        {/* Main Grid: Left Content + Right Compact Portrait */}
        <div className="hero-main-grid">
          {/* Left Column: Typography & Actions */}
          <div className="hero-left">
            <div
              className="hero-badge hero-badge-interactive"
              onClick={() => window.dispatchEvent(new CustomEvent('replayIntro'))}
              title="Click to replay Vector Canvas Intro"
            >
              <FiTerminal className="badge-icon" />
              <span>B.Tech CSE &middot; AI/ML Specialist &middot; ✦ Vector Intro</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-first">KULDEEP</span>
              <span className="hero-title-last">JANGID</span>
              <span className="hero-title-italic">AI/ML &amp; Python Developer</span>
            </h1>

            <p className="hero-description">
              Building practical computer-vision, student-analytics, and
              high-performance Python solutions. Experienced in <strong>DSA mentoring</strong>,
              data preprocessing, and applied AI.
            </p>

            {/* Quick Contact Chips */}
            <div className="hero-contacts">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=KuldeepJangid2008@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="hero-contact-chip"
              >
                <FiMail />
                <span>KuldeepJangid2008@gmail.com</span>
              </a>

              <a href="tel:+919166292611" className="hero-contact-chip">
                <FiPhone />
                <span>+91-9166292611</span>
              </a>

              <a
                href="https://github.com/kuldeep-space"
                target="_blank"
                rel="noreferrer"
                className="hero-contact-chip"
              >
                <FiGithub />
                <span>github.com/kuldeep-space</span>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                Explore Projects <FiArrowRight className="cta-icon" />
              </a>
              <a
                href={cvPdf}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                download="KULDEEP_CV.pdf"
              >
                Download Resume <FiFile className="cta-icon" />
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="hero-metrics">
              <div className="hero-metric">
                <span className="metric-val">189+</span>
                <span className="metric-lbl">LeetCode Solved</span>
              </div>
              <div className="hero-metric-sep" />
              <div className="hero-metric">
                <span className="metric-val">DSA</span>
                <span className="metric-lbl">Mentor &middot; Coder&apos;s Cafe</span>
              </div>
              <div className="hero-metric-sep" />
              <div className="hero-metric">
                <span className="metric-val">JEC</span>
                <span className="metric-lbl">Jaipur (2024&ndash;2028)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Windows-Fit Editorial Portrait Card */}
          <div className="hero-right">
            <div className="hero-card-wrapper">
              <div className="hero-card-aura" aria-hidden="true" />

              <div className="hero-portrait-card">
                <div className="card-corner card-corner-tl" />
                <div className="card-corner card-corner-tr" />
                <div className="card-corner card-corner-bl" />
                <div className="card-corner card-corner-br" />

                <div className="card-header-tag">
                  <span className="tag-index">01 // PROFILE</span>
                  <span className="tag-accent">&#10022; ED. 2026</span>
                </div>

                <div className="portrait-img-box">
                  <img
                    src={suitPhoto}
                    alt="Kuldeep Jangid"
                    className="portrait-img"
                  />
                  <div className="portrait-vignette" />
                </div>

                <div className="card-footer-tag">
                  <div className="footer-tag-left">
                    <span className="tag-name">KULDEEP JANGID</span>
                    <span className="tag-role">AI/ML &amp; Python Engineer</span>
                  </div>
                  <div className="footer-tag-badge">
                    <span>IN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Ribbon */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
            (text, idx) => (
              <span key={idx} className="marquee-item">
                <span className="marquee-dot">&#10022;</span>
                {text}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroAdvanced;