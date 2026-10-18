import React, { useState, useEffect } from 'react';
import './NavigationBar.css';
import { FiArrowUpRight, FiFileText, FiMenu, FiX } from 'react-icons/fi';
import resumePdf from '../assets/KULDEEP_CV.pdf';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CONTACT', href: '#contact' },
];

const NavigationBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInProjects, setIsInProjects] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 40);

      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        // Hide navbar while viewing the full-page projects shutter stage
        const inProjects = rect.top <= 60 && rect.bottom >= 80;
        setIsInProjects(inProjects);
        if (inProjects) {
          setMobileMenuOpen(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`modern-navbar ${isScrolled ? 'is-scrolled' : ''} ${
        isInProjects ? 'is-hidden-on-projects' : ''
      }`}
    >
      <div className="navbar-container">
        {/* Brand Wordmark */}
        <a href="#home" className="navbar-brand" aria-label="Kuldeep Jangid — Home">
          <span className="brand-wordmark">KULDEEP</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link-item"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="navbar-actions">
          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="navbar-resume-btn"
            aria-label="Download Kuldeep's Verified Resume"
          >
            <FiFileText aria-hidden="true" />
            <span>RESUME</span>
            <FiArrowUpRight aria-hidden="true" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-drawer-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="mobile-nav-link"
            >
              <span>{link.label}</span>
              <FiArrowUpRight aria-hidden="true" />
            </a>
          ))}

          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="mobile-nav-link mobile-resume-link"
          >
            <span>DOWNLOAD RESUME (PDF)</span>
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
