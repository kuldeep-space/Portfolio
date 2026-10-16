import React from "react";
import "./AboutSection.css";
import suitPhoto from "../assets/kuldeep_suit.png";
import { FiAward, FiBookOpen } from "react-icons/fi";

const AboutSection = () => {
  return (
    <section id="about">
      <div className="about__inner">

        {/* ---- HEADER ---- */}
        <div className="about__header reveal">
          <h2>About</h2>
          <span className="about__header-accent">me.</span>
        </div>

        {/* ---- BODY ---- */}
        <div className="about__content">

          {/* LEFT: stats + photo */}
          <div className="about__stats reveal">
            <div className="about__stat">
              <span className="about__stat-number">189+</span>
              <span className="about__stat-label">LeetCode Problems Solved</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">B.Tech</span>
              <span className="about__stat-label">CSE, JEC Jaipur (2024–2028)</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">DSA</span>
              <span className="about__stat-label">Mentor &middot; Coder&apos;s Cafe</span>
            </div>

            {/* Suit photo - cinematic editorial style */}
            <div className="about__image">
              <img src={suitPhoto} alt="Kuldeep Jangid" />
            </div>
          </div>

          {/* RIGHT: bio & background */}
          <div className="about__bio-block reveal">
            <p className="about__bio">
              I am a <strong>Computer Science undergraduate</strong> and <strong>Python developer</strong> with
              hands-on experience in <strong>Python, NumPy, Pandas, OpenCV, SQL, and C++</strong>.
              I specialize in building practical computer-vision, student-analytics, and data-driven applications.
            </p>

            <p className="about__bio">
              Experienced in <strong>DSA mentoring</strong>, data preprocessing, algorithmic problem-solving, and <strong>REST API &amp; LLM integration</strong>.
              Currently pursuing my B.Tech in CSE at <strong>Jaipur Engineering College</strong> (Expected May 2028),
              eager to contribute to applied AI/ML and Python development.
            </p>

            {/* EXPERIENCE & EDUCATION CARDS */}
            <div className="about__experience-section">
              <h3 className="about__subheading">
                <FiBookOpen /> Experience &amp; Education
              </h3>

              <div className="about__experience-grid">
                <div className="about__exp-card">
                  <span className="about__exp-period">Sep 2025 &ndash; Aug 2026</span>
                  <h4>DSA Mentor</h4>
                  <p className="about__exp-org">Coder&apos;s Cafe</p>
                  <p className="about__exp-desc">
                    Guided 7&ndash;10 exercises weekly, conducted workshops on fundamentals and mentored students in algorithm optimization and clean code.
                  </p>
                </div>

                <div className="about__exp-card">
                  <span className="about__exp-period">Intensive Program</span>
                  <h4>Python &amp; Data Analytics Intern</h4>
                  <p className="about__exp-org">Learn and Build</p>
                  <p className="about__exp-desc">
                    Trained in Python data analytics workflows, using NumPy and Pandas for dataset manipulation and analytical problem-solving.
                  </p>
                </div>

                <div className="about__exp-card">
                  <span className="about__exp-period">Expected May 2028</span>
                  <h4>B.Tech, Computer Science &amp; Eng.</h4>
                  <p className="about__exp-org">Jaipur Engineering College, Rajasthan</p>
                  <p className="about__exp-desc">
                    Focusing on AI/ML, Data Structures &amp; Algorithms, and scalable software systems.
                  </p>
                </div>

                <div className="about__exp-card">
                  <span className="about__exp-period">Completed 2024</span>
                  <h4>CBSE Class XII</h4>
                  <p className="about__exp-org">Kendriya Vidyalaya, Jalore</p>
                  <p className="about__exp-desc">
                    Strong foundational STEM education with focus on Mathematics and Computer Science.
                  </p>
                </div>
              </div>
            </div>

            {/* HACKATHONS & CERTIFICATIONS BADGES */}
            <div className="about__achievements-section">
              <h3 className="about__subheading">
                <FiAward /> Key Achievements &amp; Certifications
              </h3>
              <ul className="about__achievements-list">
                <li>
                  <strong>Hack AryaVerse:</strong> Developed &amp; pitched EduShield AI during the 24-Hour Hackathon.
                </li>
                <li>
                  <strong>Shankara Global Hackathon 2025:</strong> 24-hour innovation &amp; startup challenge participant.
                </li>
                <li>
                  <strong>Python Programming Certification:</strong> Learn and Build (45-hour, Grade A).
                </li>
                <li>
                  <strong>Linux System Certification:</strong> Learn and Build (40-hour program).
                </li>
              </ul>
            </div>

            <div className="about__cta">
              <a href="/#contact" className="btn btn-primary">
                Get in Touch
              </a>
              <a href="#projects" className="btn btn-secondary">
                See Featured Work
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;