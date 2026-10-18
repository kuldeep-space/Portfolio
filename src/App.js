import React, { useEffect, useState } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import HeroAdvanced from './components/HeroAdvanced';
import AboutSection from './components/AboutSection';
import Projects from './components/Projects';
import SkillsSection from './components/SkillsSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import InitialLoader from './components/InitialLoader';

const MainLayout = () => (
  <>
    <HeroAdvanced />
    <AboutSection />
    <Projects />
    <SkillsSection />
    <Contact />
  </>
);

// Scroll to section when hash changes on the root path (respects heroLock)
const ScrollToSection = ({ isLocked }) => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/' || isLocked) return;
    const hash = location.hash;
    if (!hash || hash === '#home') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    const id = hash.replace('#', '');

    let tries = 0;
    const maxTries = 10;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (tries < maxTries) {
        tries += 1;
        setTimeout(tryScroll, 50);
      }
    };
    setTimeout(tryScroll, 0);
  }, [location.pathname, location.hash, isLocked]);
  return null;
};

// Global scroll reveal observer for refined element animations
const ScrollRevealWatcher = () => {
  const location = useLocation();
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal, .reveal-left');
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introExiting, setIntroExiting] = useState(false);
  const [heroLocked, setHeroLocked] = useState(true);

  useEffect(() => {
    const handleReplay = () => {
      setIntroExiting(false);
      setHeroLocked(true);
      setShowIntro(true);
    };
    window.addEventListener('replayIntro', handleReplay);
    return () => window.removeEventListener('replayIntro', handleReplay);
  }, []);

  // Strict 3-second hold on Hero section upon entering portfolio
  useEffect(() => {
    if (!showIntro && heroLocked) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      // Intercept accidental scroll momentum/gestures during the 3 seconds
      const preventMomentum = (e) => {
        if (e.cancelable) e.preventDefault();
        window.scrollTo(0, 0);
      };

      window.addEventListener('wheel', preventMomentum, { passive: false });
      window.addEventListener('touchmove', preventMomentum, { passive: false });

      // Hold on Hero for 1.5 seconds, then unlock smooth scrolling
      const unlockTimer = setTimeout(() => {
        setHeroLocked(false);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }, 1500);

      // Allow immediate unlock if user deliberately clicks an action button or nav link
      const handleExplicitClick = (e) => {
        if (e.target && e.target.closest && e.target.closest('a, button')) {
          setHeroLocked(false);
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }
      };
      window.addEventListener('click', handleExplicitClick);

      return () => {
        clearTimeout(unlockTimer);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        window.removeEventListener('wheel', preventMomentum);
        window.removeEventListener('touchmove', preventMomentum);
        window.removeEventListener('click', handleExplicitClick);
      };
    }
  }, [showIntro, heroLocked]);

  return (
    <div className="App-container">
      <CustomCursor />
      {showIntro && (
        <InitialLoader
          onExitStart={() => {
            setIntroExiting(true);
            setHeroLocked(true);
            if (window.location.hash) {
              window.history.replaceState(null, '', window.location.pathname);
            }
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          onComplete={() => {
            setShowIntro(false);
            setIntroExiting(false);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
        />
      )}
      <Analytics />
      <Router>
        <div className={`App ${introExiting ? "app-portal-reveal" : ""}`}>
          <NavigationBar />
          <ScrollToSection isLocked={heroLocked} />
          <ScrollRevealWatcher />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="*" element={<MainLayout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;