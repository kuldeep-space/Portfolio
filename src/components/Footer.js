import React from "react";
import "./Footer.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner">

        <div className="footer-top">
          <Link to="/#home" className="footer__logo">
            Kuldeep<br />Jangid
          </Link>

          <div className="footer-right">
            <ul className="permalinks">
              <li><Link to="/#home">Home</Link></li>
              <li><Link to="/#about">About</Link></li>
              <li><Link to="/#projects">Projects</Link></li>
              <li><Link to="/#skills">Skills</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>

            <div className="footer__socials">
              <a
                href="https://www.linkedin.com/in/kuldeep-space"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/kuldeep-space"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Kuldeep Jangid. AI/ML &amp; Python Developer.
          </p>
          <img
            src="/favicon-32x32.png"
            alt=""
            className="footer-burst"
            aria-hidden="true"
          />
        </div>

      </div>
    </footer>
  );
};

export default Footer;