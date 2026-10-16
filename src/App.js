import React, { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import InitialLoader from './components/InitialLoader';
import NavigationBar from './components/NavigationBar';
import HeroAdvanced from './components/HeroAdvanced';
import AboutSection from './components/AboutSection';
import Projects from './components/Projects';
import SkillsSection from './components/SkillsSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LeetCodeExplorer from './components/pages/LeetCodeExplorer';
import CodeForces from './components/pages/CodeForces';
import ProjectPage from './components/pages/ProjectPage';

const MainLayout = () => (
  <>
    <HeroAdvanced />
    <AboutSection />
    <Projects />
    <SkillsSection />
    <Contact />
  </>
);

// Scroll to section when hash changes on the root path
const ScrollToSection = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/') return;
    const hash = location.hash || '#home';
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
  }, [location.pathname, location.hash]);
  return null;
};

// Global scroll reveal observer for cinematic animations
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
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

function App() {
  const [showIntro, setShowIntro] = React.useState(true);
  const [introExiting, setIntroExiting] = React.useState(false);

  useEffect(() => {
    const handleReplay = () => {
      setIntroExiting(false);
      setShowIntro(true);
    };
    window.addEventListener('replayIntro', handleReplay);
    return () => window.removeEventListener('replayIntro', handleReplay);
  }, []);

  return (
    <div className="App-container">
      {/* Intro Vector Canvas Landing Page with Precision Path2D Liquid Fill */}
      {showIntro && (
        <InitialLoader
          onExitStart={() => setIntroExiting(true)}
          onComplete={() => {
            setShowIntro(false);
            setIntroExiting(false);
          }}
        />
      )}

      <Analytics />
      <Router>
        <div className={`App ${introExiting ? "app-portal-reveal" : ""}`}>
          <NavigationBar />
          <ScrollToSection />
          <ScrollRevealWatcher />
          <main>
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/leetcode" element={<LeetCodeExplorer />} />
              <Route path="/codeforces" element={<CodeForces />} />
              <Route path="/project/:id" element={<ProjectPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;