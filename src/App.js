import React, { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
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
    const maxTries = 10; // ~500ms total
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (tries < maxTries) {
        tries += 1;
        setTimeout(tryScroll, 50);
      }
    };
    // Use a micro-delay to allow layout/render
    setTimeout(tryScroll, 0);
  }, [location.pathname, location.hash]);
  return null;
};

function App() {
  return (
    <div className="App-container">
            <Analytics />
      <Router>
        <div className="App">
          <NavigationBar />
          <ScrollToSection />
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
