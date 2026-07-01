import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationBar.css';
import { AiOutlineHome, AiOutlineUser, AiOutlineCode } from 'react-icons/ai';
import { BiBook, BiMessageSquareDetail } from 'react-icons/bi';
import { RiServiceLine } from 'react-icons/ri';

const NavigationBar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  // Track active section (home, about, projects, skills, contact)
  const [activeSection, setActiveSection] = useState('home');

  // Sync active section with current location hash when navigating
  useEffect(() => {
    if (location.pathname !== '/') return;
    const current = (location.hash || '#home').slice(1);
    setActiveSection(current);
  }, [location.pathname, location.hash]);

  // Observe sections to update active icon on scroll
  useEffect(() => {
    if (location.pathname !== '/') return; // Only on the main page
    const ids = ['home', 'about', 'projects', 'skills', 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    let ticking = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (ticking) return;
        ticking = true;
        // Pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id;
          setActiveSection(id);
          // Update hash without pushing history entries
          if (window.location.pathname === '/') {
            const newHash = `#${id}`;
            if (window.location.hash !== newHash) {
              window.history.replaceState(null, '', `/${newHash}`);
            }
          }
        }
        requestAnimationFrame(() => (ticking = false));
      },
      { threshold: [0.55, 0.65, 0.75] }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [location.pathname]);

  const navLinks = [
    { to: '/#home', icon: <AiOutlineHome />, section: 'home' },
    { to: '/#about', icon: <AiOutlineUser />, section: 'about' },
    { to: '/#projects', icon: <RiServiceLine />, section: 'projects' },
    { to: '/#skills', icon: <BiBook />, section: 'skills' },
    { to: '/#contact', icon: <BiMessageSquareDetail />, section: 'contact' },
  ];

  return (
    <nav>
      {/* Main links (route to home with section hash) */}
      {navLinks.map((link) => (
        <Link
          key={link.section}
          to={link.to}
          className={location.pathname === '/' && activeSection === link.section ? 'active' : ''}
        >
          {link.icon}
        </Link>
      ))}

      {/* Problems dropdown */}
      <div className="dropdown" ref={dropdownRef}>
                <a
          href="#!"
          className={['/leetcode', '/codeforces'].includes(location.pathname) ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setDropdownOpen(!dropdownOpen);
          }}
        >
          <AiOutlineCode />
        </a>
        <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
          {[ { to: '/leetcode', label: 'LeetCode' }, { to: '/codeforces', label: 'Codeforces' } ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={location.pathname === item.to ? 'active' : ''}
              onClick={() => setDropdownOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
