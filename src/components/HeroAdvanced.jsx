import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroAdvanced.css';
import { FiArrowRight, FiFile, FiMail, FiGithub, FiMapPin } from 'react-icons/fi';
import profilePic from '../assets/profile.jpg';
import cvPdf from '../assets/KULDEEP_CV.pdf';

const MagneticButton = ({ children, ...props }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = (clientX - left - width / 2) * 0.2;
      const y = (clientY - top - height / 2) * 0.2;
      gsap.to(button, { x: x, y: y, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: buttonRef, ...props });
};

const HeroAdvanced = () => {
  return (
    <section id="home" className="hero-section-advanced">
      <div className="hero-content-advanced">
        <div className="hero-right">
          <div className="profile-image-container">
            <img src={profilePic} alt="Kuldeep Jangid" className="profile-image" />
          </div>
        </div>
        <div className="hero-left">
          <h3 className="hero-name">Hi I'm Kuldeep Jangid</h3>
          <h1 className="hero-title-advanced">
            <span className="highlight">CODE ENTHUSIAST</span>
          </h1>
          <p className="hero-subtitle-advanced">
            I CRAFT ELEGANT AND EFFICIENT SOLUTIONS THAT TURN IDEAS INTO REALITY. BUILDING CLEAN, POWERFUL CODE THAT MAKES IDEAS REAL.
          </p>
          <div className="hero-meta">
            <a
              className="meta-item icon-only"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=KULDEEPJANGID2008@GMAIL.COM"
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
              title="KULDEEPJANGID2008@GMAIL.COM"
            >
              <FiMail className="meta-icon" /> KULDEEPJANGID2008@GMAIL.COM
            </a>

            <a
              className="meta-item icon-only"
              href="https://github.com/kuldeep-space"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="github.com/kuldeep-space"
            >
              <FiGithub className="meta-icon" /> KULDEEP-SPACE
            </a>

            <div
              className="meta-item icon-only"
              aria-label="Location"
              title="Alwar, Rajasthan"
            >
              <FiMapPin className="meta-icon" /> ALWAR, RAJASTHAN
            </div>
          </div>
          <div className="hero-cta">
            <MagneticButton>
              <a href="#projects" className="btn btn-primary">
                My Work <FiArrowRight className="cta-icon" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={cvPdf}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                download="KULDEEP CV.pdf"
              >
                GET CV <FiFile className="cta-icon" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAdvanced;
