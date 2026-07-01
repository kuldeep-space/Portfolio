import React from 'react';
import './Footer.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <Link to="/#home" className='footer__logo'>KULDEEP JANGID</Link>

      <ul className='permalinks'>
        <li><Link to="/#home">Home</Link></li>
        <li><Link to="/#about">About</Link></li>
        <li><Link to="/#projects">Projects</Link></li>
        <li><Link to="/#skills">Skills</Link></li>
        <li><Link to="/#contact">Contact</Link></li>
      </ul>

      <div className="footer__socials">
        <a href="https://www.linkedin.com/in/kuldeep-jangid-001/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        <a href="https://github.com/kuldeep-creates" target="_blank" rel="noreferrer"><FaGithub /></a>
      </div>

      <div className="footer__copyright">
        <small>&copy; Kuldeep Jangid. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
