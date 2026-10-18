import React from 'react';
import './SkillsSection.css';
import { FiTerminal, FiCpu, FiCode, FiLayers } from 'react-icons/fi';

const skillDomains = [
  {
    id: 'programming',
    num: '01',
    icon: FiTerminal,
    tag: 'LANGUAGES & RUNTIMES',
    domain: 'Programming & Languages',
    summary: 'Core language proficiency, memory allocation, and algorithmic scripting.',
    technologies: [
      { name: 'Python', badge: 'Primary', desc: 'Production scripting, OpenCV, NumPy, Pandas & AI workflows' },
      { name: 'C++', badge: 'High-Perf', desc: 'Algorithmic problem-solving & memory efficiency' },
      { name: 'C', badge: 'CS Core', desc: 'Low-level pointers, allocation & system concepts' },
      { name: 'SQL', badge: 'Databases', desc: 'Relational queries, schema design & table normalization' },
      { name: 'JavaScript', badge: 'ES6+', desc: 'Modern asynchronous event loops, DOM & web logic' },
    ],
  },
  {
    id: 'ai-data',
    num: '02',
    icon: FiCpu,
    tag: 'APPLIED AI & DATA',
    domain: 'AI, Vision & Data Engineering',
    summary: 'Computer vision pipelines, dataset analytics, and machine learning models.',
    technologies: [
      { name: 'OpenCV', badge: 'Vision', desc: 'Real-time face detection, video frames & biometrics' },
      { name: 'NumPy & Pandas', badge: 'Analytics', desc: 'Data preprocessing, array manipulation & analytics' },
      { name: 'Scikit-Learn', badge: 'ML', desc: 'Predictive modeling, classification & evaluation' },
      { name: 'REST APIs & Requests', badge: 'HTTP', desc: 'Python Requests, automated ingestion & RESTful APIs' },
      { name: 'Prompt Engineering & LLMs', badge: 'GenAI', desc: 'Structured prompt design & LLM API integration' },
      { name: 'Data Preprocessing', badge: 'Pipelines', desc: 'Outlier pruning, feature scaling & analytics workflows' },
    ],
  },
  {
    id: 'cs-algo',
    num: '03',
    icon: FiCode,
    tag: 'CORE FOUNDATIONS',
    domain: 'Computer Science Fundamentals',
    summary: 'Fundamental computational theory, low-level systems, and data structures.',
    technologies: [
      { name: 'Data Structures & Algorithms (DSA)', badge: 'Core', desc: 'Trees, Graphs, Dynamic Programming, Heaps & Recursion' },
      { name: 'Object-Oriented Programming (OOP)', badge: 'Design', desc: 'Encapsulation, inheritance, polymorphism & modular classes' },
      { name: 'Algorithm Optimization & Problem Solving', badge: 'Analytics', desc: 'Analytical problem-solving, clean implementations & complexity reduction' },
      { name: 'Database Management (DBMS)', badge: 'Data', desc: 'Relational normalization, ACID transactions & schema indexing' },
    ],
  },
  {
    id: 'web-tools',
    num: '04',
    icon: FiLayers,
    tag: 'DEVELOPER TOOLING',
    domain: 'Web & Developer Tooling',
    summary: 'Modern reactive frontend development and verified POSIX administration.',
    technologies: [
      { name: 'React.js', badge: 'Frontend', desc: 'Component architecture, state machines & hooks' },
      { name: 'HTML5 & CSS3', badge: 'UI/UX', desc: 'Semantic layouts, responsive styling & design tokens' },
      { name: 'Linux Administration', badge: 'Certified', desc: 'Bash shell scripting, cron scheduling & POSIX workflows' },
      { name: 'Git & GitHub', badge: 'VCS', desc: 'Distributed version control & collaborative Git workflows' },
      { name: 'Firebase', badge: 'Cloud DB', desc: 'Realtime database listeners, auth & cloud hosting' },
      { name: 'VS Code & Jupyter', badge: 'IDE / Data', desc: 'Interactive experimentation & modern development' },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="modern-skills-section">
      <div className="skills-container">

        {/* Section Header */}
        <header className="skills-section-header">
          <div className="skills-kicker-row">
            <span className="skills-kicker-num">03</span>
            <span className="skills-kicker-slash">/</span>
            <span className="skills-kicker-tag">TECHNICAL COMPETENCIES</span>
          </div>

          <h2 className="skills-section-title">
            TECHNICAL EXPERTISE &amp; STACK
          </h2>

          <p className="skills-section-lead">
            Production-tested proficiencies across low-level systems, computer vision pipelines, and full-stack software architecture.
          </p>

          {/* Quick Technical Overview Ledger */}
          <div className="skills-radar-summary">
            <div className="radar-metric">
              <span className="radar-num">04</span>
              <span className="radar-label">DOMAINS</span>
            </div>
            <div className="radar-sep">/</div>
            <div className="radar-metric">
              <span className="radar-num">20+</span>
              <span className="radar-label">TECHNOLOGIES</span>
            </div>
            <div className="radar-sep">/</div>
            <div className="radar-metric">
              <span className="radar-num">PYTHON</span>
              <span className="radar-label">CORE SPECIALIZATION</span>
            </div>
            <div className="radar-sep">/</div>
            <div className="radar-metric">
              <span className="radar-num">OPENCV</span>
              <span className="radar-label">REAL-TIME VISION</span>
            </div>
          </div>
        </header>

        {/* Bento Grid Matrix */}
        <div className="skills-bento-grid">
          {skillDomains.map((domain) => {
            const IconComponent = domain.icon;
            return (
              <article key={domain.id} className="skills-bento-card">
                {/* Domain Header */}
                <div className="bento-card-header">
                  <div className="bento-icon-wrapper">
                    <IconComponent className="bento-icon" aria-hidden="true" />
                  </div>
                  <div className="bento-header-text">
                    <div className="bento-meta-row">
                      <span className="bento-domain-num">{domain.num}</span>
                      <span className="bento-domain-tag">{domain.tag}</span>
                    </div>
                    <h3 className="bento-domain-title">{domain.domain}</h3>
                  </div>
                </div>

                <p className="bento-domain-summary">{domain.summary}</p>

                {/* Technologies List */}
                <div className="bento-tech-list">
                  {domain.technologies.map((tech, tIdx) => (
                    <div key={tIdx} className="bento-tech-item">
                      <div className="bento-tech-left">
                        <span className="tech-bullet-dot" aria-hidden="true">—</span>
                        <span className="bento-tech-name">{tech.name}</span>
                        {tech.badge && (
                          <span className="bento-tech-badge">{tech.badge}</span>
                        )}
                      </div>
                      <span className="bento-tech-desc">{tech.desc}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;