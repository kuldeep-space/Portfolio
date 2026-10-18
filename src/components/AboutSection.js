import React, { useState } from 'react';
import './AboutSection.css';
import {
  FiArrowUpRight,
  FiCalendar,
  FiBriefcase,
  FiBookOpen,
  FiAward,
  FiTerminal,
  FiCheckCircle,
  FiLayers,
  FiArrowRight,
  FiArrowLeft,
} from 'react-icons/fi';
import resumePdf from '../assets/KULDEEP_CV.pdf';

const quickStats = [
  { val: '189+', label: 'LEETCODE PROBLEMS' },
  { val: 'DSA MENTOR', label: "CODER'S CAFE" },
  { val: 'GRADE A', label: 'PYTHON CERTIFIED' },
  { val: 'POSIX', label: 'LINUX CERTIFIED' },
];

const sectionTabs = [
  {
    id: 'experience',
    num: '01',
    label: 'WORK EXPERIENCE',
    icon: FiBriefcase,
  },
  {
    id: 'education',
    num: '02',
    label: 'ACADEMIC EDUCATION',
    icon: FiBookOpen,
  },
  {
    id: 'achievements',
    num: '03',
    label: 'ACHIEVEMENTS & CERTS',
    icon: FiAward,
  },
];

const experienceData = [
  {
    period: 'SEP 2025 — AUG 2026',
    badge: 'MENTORSHIP',
    status: 'ACTIVE',
    role: 'DSA Mentor & Facilitator',
    organization: "Coder's Cafe · Jaipur Engineering College",
    bullets: [
      'Guided 7–10 coding exercises weekly, facilitating structured problem-solving and targeted debugging support.',
      'Mentored students in analytical problem-solving, algorithm optimization, and clean Python/C++ implementations.',
      'Conducted workshops on programming fundamentals, core data structures, and modular coding practices.',
    ],
    skills: ['Python', 'C++', 'Data Structures & Algorithms', 'Algorithmic Optimization', 'Code Mentorship'],
  },
  {
    period: 'JUN 2024 — JUL 2024',
    badge: 'INTERNSHIP',
    status: 'COMPLETED',
    role: 'Python & Data Analytics Intern',
    organization: 'Learn and Build · 21-Day Intensive Track',
    bullets: [
      'Completed practical training in production Python programming and data-analytics workflows.',
      'Used NumPy and Pandas for large tabular data handling, feature cleaning, and analytical problem-solving.',
      'Developed automated data validation scripts and exploratory metrics pipelines.',
    ],
    skills: ['Python', 'NumPy', 'Pandas', 'Data Cleaning', 'Automated Pipelines'],
  },
];

const educationData = [
  {
    period: '2024 — MAY 2028',
    badge: 'EXPECTED GRADUATION',
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Jaipur Engineering College (JEC), Kukas, Jaipur',
    description:
      'Rigorous curriculum focused on Applied AI/ML, Computer Vision, Data Structures & Algorithms, and high-performance software architecture. Core coursework includes OOP, Database Management (SQL), Operating Systems, and Distributed Computing.',
    coursework: ['Applied AI / ML', 'Computer Vision', 'Data Structures & Algorithms', 'OOP', 'SQL & DBMS', 'Operating Systems'],
  },
  {
    period: '2024',
    badge: 'COMPLETED',
    degree: 'CBSE Class XII (Senior Secondary)',
    institution: 'Kendriya Vidyalaya, Jalore',
    description:
      'Rigorous STEM foundation centered on Computer Science, Advanced Mathematics, and Physics with focus on analytical reasoning and computational logic.',
    coursework: ['Computer Science', 'Mathematics', 'Physics', 'Computational Logic'],
  },
  {
    period: '2022',
    badge: 'COMPLETED',
    degree: 'Secondary Schooling (CBSE Class X)',
    institution: 'The Sanctum School, Kunda, Amer, Jaipur',
    description:
      'Foundational secondary education with academic distinction, developing early expertise in Computer Applications, Mathematics, Science, and logical problem-solving.',
    coursework: ['Computer Applications', 'Mathematics', 'Science', 'Logical Reasoning'],
  },
];

const achievementsData = [
  {
    year: '2025',
    category: 'INNOVATION',
    title: 'Shankara Global Hackathon 2025',
    detail:
      'Participated in a 24-hour high-velocity innovation and startup challenge, building production prototypes under tight operational constraints.',
    highlight: '24h Innovation Challenge',
    icon: FiLayers,
  },
  {
    year: '2024',
    category: 'HACKATHON',
    title: 'Hack AryaVerse (24-Hour Hackathon)',
    detail:
      'Developed and pitched EduShield AI student dropout analytics platform during an intensive 24-hour hackathon.',
    highlight: 'EduShield AI Pitch & Prototype',
    icon: FiLayers,
  },
  {
    year: '2024',
    category: 'CREDENTIAL',
    title: 'Python Programming Certification (Grade A)',
    detail:
      'Comprehensive 45-hour evaluation by Learn and Build in Python syntax, OOP design patterns, tabular data analysis, and algorithmic scripting.',
    highlight: '45h Intensive Evaluation',
    icon: FiCheckCircle,
  },
  {
    year: '2024',
    category: 'CREDENTIAL',
    title: 'Linux System Administration Certification',
    detail:
      '40-hour intensive program by Learn and Build covering Bash shell scripting, process scheduling, package management, and POSIX workflows.',
    highlight: 'POSIX · Bash Shell',
    icon: FiTerminal,
  },
];

const AboutSection = () => {
  const [activeSection, setActiveSection] = useState('experience');

  const currentIndex = sectionTabs.findIndex((t) => t.id === activeSection);
  const prevTab = currentIndex > 0 ? sectionTabs[currentIndex - 1] : null;
  const nextTab = currentIndex < sectionTabs.length - 1 ? sectionTabs[currentIndex + 1] : null;

  return (
    <section id="about" className="minimal-about-section">
      <div className="minimal-about-container">

        {/* ============================================================
           SECTION HEADER: Clear "About Me."
           ============================================================ */}
        <header className="about-main-header">
          <div className="about-kicker-row">
            <span className="about-kicker-num">01</span>
            <span className="about-kicker-slash">/</span>
            <span className="about-kicker-tag">ABOUT ME</span>
          </div>
          <h2 className="about-section-heading">About Me.</h2>
          <p className="about-section-statement">
            ALGORITHMIC RIGOR. PRACTICAL SYSTEMS.
          </p>
        </header>

        {/* ============================================================
           MINIMAL EDITORIAL BIO DOSSIER
           ============================================================ */}
        <div className="about-dossier-card">
          <div className="dossier-prose">
            <p className="dossier-lead">
              Computer Science undergraduate and Python developer with hands-on experience in Python, NumPy, Pandas, OpenCV, SQL, and C++. Builds practical computer-vision, student-analytics, and data-driven applications.
            </p>
            <p className="dossier-desc">
              Experienced in DSA mentoring, data preprocessing, algorithmic problem-solving, and REST API integration. Seeking to contribute to Python development, data analytics, and applied AI/ML projects.
            </p>
          </div>

          {/* Quick Metrics Bar (Pure Black & White) */}
          <div className="dossier-metrics-grid">
            {quickStats.map((stat, idx) => (
              <div key={idx} className="metric-cell">
                <span className="metric-val">{stat.val}</span>
                <span className="metric-label">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="dossier-actions-row">
            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              className="minimal-resume-btn"
              aria-label="Download Resume (PDF)"
            >
              <span>DOWNLOAD RESUME (PDF)</span>
              <FiArrowUpRight className="resume-btn-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* ============================================================
           SPLIT WORKSPACE: Sticky Left Rail + Distinct Highlighted Section
           ============================================================ */}
        <div className="about-split-workspace">
          
          {/* Sticky Left Navigation Rail with 3 Icons */}
          <aside className="vertical-icon-rail" aria-label="About Chapters Navigation">
            <div className="rail-track">
              {sectionTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSection === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`rail-nav-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveSection(tab.id)}
                    aria-label={`View ${tab.label}`}
                  >
                    <div className="rail-icon-box">
                      <Icon className="rail-icon" aria-hidden="true" />
                    </div>

                    <div className="rail-text-col">
                      <span className="rail-num">{tab.num}</span>
                      <span className="rail-title">{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Stage: Single Distinct Section Display */}
          <div className="highlighted-section-stage">

            {/* 01. WORK EXPERIENCE (Dedicated Pane) */}
            {activeSection === 'experience' && (
              <div className="chapter-dedicated-pane animate-fade-in">
                <div className="stage-section-header">
                  <div className="stage-header-left">
                    <span className="stage-index">01</span>
                    <h3 className="stage-title">WORK EXPERIENCE</h3>
                  </div>
                </div>

                <div className="chapter-cards-stack">
                  {experienceData.map((exp, idx) => (
                    <article key={idx} className="minimal-card">
                      <div className="card-sidebar">
                        <div className="sidebar-badges">
                          <span className="mono-badge">{exp.badge}</span>
                          {exp.status === 'ACTIVE' && (
                            <span className="mono-badge active-badge">ACTIVE</span>
                          )}
                        </div>
                        <span className="card-period">
                          <FiCalendar className="sidebar-calendar-icon" aria-hidden="true" />
                          {exp.period}
                        </span>
                      </div>

                      <div className="card-content">
                        <h4 className="card-role">{exp.role}</h4>
                        <p className="card-organization">{exp.organization}</p>

                        <ul className="card-bullet-list">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="card-bullet-item">
                              <span className="bullet-symbol" aria-hidden="true">—</span>
                              <span className="bullet-copy">{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="card-pills-row">
                          {exp.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="mono-pill">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* 02. ACADEMIC EDUCATION (Dedicated Pane) */}
            {activeSection === 'education' && (
              <div className="chapter-dedicated-pane animate-fade-in">
                <div className="stage-section-header">
                  <div className="stage-header-left">
                    <span className="stage-index">02</span>
                    <h3 className="stage-title">ACADEMIC EDUCATION</h3>
                  </div>
                </div>

                <div className="chapter-cards-stack">
                  {educationData.map((edu, idx) => (
                    <article key={idx} className="minimal-card">
                      <div className="card-sidebar">
                        <div className="sidebar-badges">
                          <span className="mono-badge">{edu.badge}</span>
                        </div>
                        <span className="card-period">
                          <FiCalendar className="sidebar-calendar-icon" aria-hidden="true" />
                          {edu.period}
                        </span>
                      </div>

                      <div className="card-content">
                        <h4 className="card-role">{edu.degree}</h4>
                        <p className="card-organization">{edu.institution}</p>
                        <p className="card-narrative">{edu.description}</p>

                        <div className="card-pills-row">
                          {edu.coursework.map((course, cIdx) => (
                            <span key={cIdx} className="mono-pill">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* 03. ACHIEVEMENTS & CERTIFICATIONS (Dedicated Pane) */}
            {activeSection === 'achievements' && (
              <div className="chapter-dedicated-pane animate-fade-in">
                <div className="stage-section-header">
                  <div className="stage-header-left">
                    <span className="stage-index">03</span>
                    <h3 className="stage-title">ACHIEVEMENTS &amp; CERTIFICATIONS</h3>
                  </div>
                </div>

                <div className="achievements-bento">
                  {/* Featured LeetCode Card */}
                  <article className="bento-feature-card">
                    <div className="feature-stat-box">
                      <span className="stat-large-num">189+</span>
                      <span className="stat-sub-label">SOLVED</span>
                    </div>

                    <div className="feature-detail-box">
                      <div className="feature-meta-line">
                        <span className="mono-badge">2025</span>
                        <span className="mono-badge">LEETCODE</span>
                        <span className="meta-light-tag">ALGORITHMS &amp; DATA STRUCTURES</span>
                      </div>
                      <h4 className="feature-heading">189 Algorithmic Problems Solved</h4>
                      <p className="feature-description">
                        Demonstrated algorithmic mastery across dynamic programming, graph traversal, trees, heaps, and array optimization with 189 solutions.
                      </p>
                      <div className="card-pills-row">
                        <span className="mono-pill">Dynamic Programming</span>
                        <span className="mono-pill">Graph Traversal</span>
                        <span className="mono-pill">Trees &amp; Heaps</span>
                        <span className="mono-pill">Array Optimization</span>
                      </div>
                    </div>
                  </article>

                  {/* 3 Verified Milestones */}
                  {achievementsData.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <article key={idx} className="bento-standard-card">
                        <div className="standard-card-top">
                          <div className="standard-meta">
                            <span className="mono-badge">{item.year}</span>
                            <span className="mono-badge">{item.category}</span>
                          </div>
                          <Icon className="standard-icon" aria-hidden="true" />
                        </div>

                        <h4 className="standard-heading">{item.title}</h4>
                        <p className="standard-detail">{item.detail}</p>

                        <div className="standard-footer">
                          <span className="standard-highlight">
                            <span className="highlight-dash">—</span>
                            {item.highlight}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stepper Pagination at bottom */}
            <footer className="stage-pagination-row">
              {prevTab ? (
                <button
                  type="button"
                  className="stage-page-btn"
                  onClick={() => setActiveSection(prevTab.id)}
                >
                  <FiArrowLeft aria-hidden="true" />
                  <span>PREV: {prevTab.label}</span>
                </button>
              ) : (
                <div />
              )}

              {nextTab && (
                <button
                  type="button"
                  className="stage-page-btn next-btn"
                  onClick={() => setActiveSection(nextTab.id)}
                >
                  <span>NEXT: {nextTab.label}</span>
                  <FiArrowRight aria-hidden="true" />
                </button>
              )}
            </footer>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;