import React from 'react';
import './Footer.css';
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowUp,
  FiArrowUpRight,
  FiFileText
} from 'react-icons/fi';
import resumePdf from '../assets/KULDEEP_CV.pdf';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" role="contentinfo">
      {/* Pre-Footer Call to Action */}
      <div className="pre-footer-block">
        <div className="footer-container">
          <div className="pre-footer-content">
            <span className="footer-kicker">READY TO COLLABORATE</span>
            <h2 className="pre-footer-title">
              LET&apos;S ARCHITECT
              <br />
              WHAT&apos;S NEXT.
            </h2>
            <p className="pre-footer-lead">
              Currently open to software engineering internships, junior developer roles, and technical collaborations in Applied AI/ML, Computer Vision, and full-stack systems.
            </p>
            <div className="pre-footer-actions">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=KuldeepJangid2008@gmail.com&su=Engineering%20Inquiry%20from%20Portfolio"
                target="_blank"
                rel="noreferrer"
                className="footer-action-btn primary"
              >
                <span>INITIATE CONTACT</span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
              <a
                href={resumePdf}
                target="_blank"
                rel="noreferrer"
                className="footer-action-btn"
              >
                <FiFileText aria-hidden="true" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col brand-col">
              <span className="footer-brand-wordmark">KULDEEP</span>
              <p className="footer-bio">
                Computer Science undergraduate specializing in real-time computer vision, applied machine learning, and reliable software systems.
              </p>
            </div>

            <div className="footer-col">
              <span className="footer-col-title">NAVIGATION</span>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="footer-col-title">NETWORKS</span>
              <ul className="footer-links">
                <li>
                  <a href="https://github.com/kuldeep-space" target="_blank" rel="noreferrer">
                    <FiGithub aria-hidden="true" />
                    <span>GitHub / kuldeep-space</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/kuldeep-space" target="_blank" rel="noreferrer">
                    <FiLinkedin aria-hidden="true" />
                    <span>LinkedIn / kuldeep-space</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:KuldeepJangid2008@gmail.com">
                    <FiMail aria-hidden="true" />
                    <span>KuldeepJangid2008@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <div className="footer-bottom-bar">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Kuldeep Jangid. All rights reserved.
            </p>

            <button
              type="button"
              className="footer-back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top of page"
            >
              <span>BACK TO TOP</span>
              <FiArrowUp aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;