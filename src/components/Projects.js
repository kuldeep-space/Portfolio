import React from "react";
import "./Projects.css";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import attendenceSystem from "../assets/Attandence.jpeg";
import peerPlaces from "../assets/PeerPlaces.png";
import textify from "../assets/Textify.jpeg";
import ticTacToe from "../assets/tic_tac_toe.png";
import textedge from "../assets/Testedge.png";

const data = [
  {
    id: 1,
    title: "Face-Detection Attendance System",
    description:
      "Real-time computer-vision application for face detection and identity recognition with automated camera-based attendance logging.",
    tech: "Python • OpenCV",
    image: attendenceSystem,
    github: "https://github.com/kuldeep-creates/ATTENDANCE-SYSTEM",
  },
  {
    id: 2,
    title: "EduShield AI – Student Analytics",
    description:
      "AI-oriented student analytics platform pitched at Hack AryaVerse hackathon to generate actionable educational insights from student metrics.",
    tech: "Python • AI/ML • Data Analytics",
    image: peerPlaces,
    github: "https://github.com/kuldeep-space",
  },
  {
    id: 3,
    title: "Python Train Search Engine",
    description:
      "Search and filtering engine for structured train datasets with custom criteria, optimized lookup logic, and efficient data handling.",
    tech: "Python • Data Preprocessing",
    image: textedge,
    github: "https://github.com/kuldeep-space",
  },
  {
    id: 4,
    title: "Textify – Text Analytics Utility",
    description:
      "Responsive text processing utility for case conversion, formatting, and real-time document metrics (character, word, sentence & line counters).",
    tech: "React.js • JavaScript • CSS",
    image: textify,
    github: "https://github.com/kuldeep-creates/Textify",
    weblink: "https://textify.kuldeep.space/",
  },
  {
    id: 5,
    title: "PeerPlaces Career Platform",
    description:
      "Collaborative platform connecting students and developers to showcase portfolios, collaborate on projects, and discover career opportunities.",
    tech: "React • Node.js • Firebase",
    image: ticTacToe,
    github: "https://github.com/kuldeep-creates/PeerPlacers",
  },
];

const ProjectsPage = () => {
  return (
    <main id="projects" className="projects-page">
      <div className="projects-inner">

        <div className="projects-header reveal">
          <h2>Work</h2>
          <span className="projects-header-italic">selected.</span>
          <span className="projects-count">0{data.length} Projects</span>
        </div>

        <div className="portfolio__container">
          {data.map(({ id, title, description, tech, image, github, weblink }) => (
            <article key={id} className="portfolio__item reveal">

              <div className="portfolio__item-image">
                <img src={image} alt={`Preview of ${title}`} />
              </div>

              <div className="portfolio__item-content">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>

              <div className="portfolio__item-tech">{tech}</div>

              <div className="portfolio__item-cta">
                <a
                  href={github}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiGithub /> GitHub
                </a>
                {weblink && (
                  <a
                    href={weblink}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live <FiExternalLink />
                  </a>
                )}
              </div>

            </article>
          ))}
        </div>

      </div>
    </main>
  );
};

export default ProjectsPage;