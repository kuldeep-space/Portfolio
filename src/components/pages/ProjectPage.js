import React from "react";
import { useParams, Link } from "react-router-dom";

const data = [
  {
    id: 1,
    title: "Attendance System",
    description:
      "Smart system to efficiently track and manage student or employee attendance using facial recognition powered by Python and OpenCV.",
    tech: ["Python", "OpenCV", "Machine Learning"],
    github: "https://github.com/kuldeep-creates/ATTENDANCE-SYSTEM",
  },
  {
    id: 2,
    title: "PeerPlaces",
    description:
      "A platform to connect with peers, collaborate on projects, showcase skills, and access career opportunities.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/kuldeep-creates/PeerPlacers",
  },
  {
    id: 3,
    title: "Textify",
    description:
      "Simple and efficient tool to convert text case — uppercase, lowercase, title case, and more.",
    tech: ["React", "CSS"],
    github: "https://github.com/kuldeep-creates/Textify",
    weblink: "https://textify.kuldeep.space/",
  },
  {
    id: 4,
    title: "TestEdge",
    description:
      "Comprehensive online testing platform with real-time monitoring, automated grading, and comprehensive admin controls built with React and Firebase.",
    tech: ["React", "Firebase", "Node.js"],
    github: "https://github.com/kuldeep-creates/Testify",
    weblink: "https://testedge.live/",
  },
  {
    id: 5,
    title: "Tic Tac Toe",
    description:
      "Classic Tic Tac Toe game implemented with a clean, minimal interface.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/kuldeep-creates/TIC-TAC-TOE",
  },
];

const notFoundStyles = {
  paddingTop: "8rem",
  textAlign: "center",
  minHeight: "100vh",
  background: "#080808",
  color: "#f5f5f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ProjectPage = () => {
  const { id } = useParams();
  const project = data.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <section style={notFoundStyles}>
        <div>
          <p style={{ fontFamily: "Syne, sans-serif", fontSize: "5rem", fontWeight: 800, color: "#2a2a2a", lineHeight: 1 }}>404</p>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 800, color: "#f5f5f0", marginBottom: "1.5rem" }}>
            Project Not Found
          </h2>
          <Link
            to="/#projects"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#b8ff00",
              textDecoration: "none",
              borderBottom: "1px solid #b8ff00",
              paddingBottom: "2px",
            }}
          >
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        paddingTop: "10rem",
        paddingBottom: "8rem",
        minHeight: "100vh",
        background: "#080808",
        color: "#f5f5f0",
      }}
    >
      <div style={{ width: "88%", maxWidth: "900px", margin: "0 auto" }}>

        {/* Back link */}
        <Link
          to="/#projects"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#555",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "4rem",
            transition: "color 0.3s",
          }}
        >
          ? All Projects
        </Link>

        {/* Project title */}
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 800,
            color: "#f5f5f0",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            textTransform: "uppercase",
            marginBottom: "3rem",
          }}
        >
          {project.title}
        </h1>

        {/* Divider */}
        <div style={{ height: "1px", background: "#2a2a2a", marginBottom: "3rem" }} />

        {/* Description */}
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            lineHeight: 1.85,
            color: "rgba(245,245,240,0.65)",
            fontWeight: 300,
            maxWidth: "680px",
            marginBottom: "4rem",
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginBottom: "4rem" }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#555",
                border: "1px solid #2a2a2a",
                padding: "0.4rem 1rem",
                borderRadius: "999px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.82rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#f5f5f0",
              border: "1px solid #2a2a2a",
              padding: "0.85rem 2rem",
              borderRadius: "999px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
          >
            View on GitHub
          </a>
          {project.weblink && (
            <a
              href={project.weblink}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#080808",
                background: "#b8ff00",
                border: "1px solid #b8ff00",
                padding: "0.85rem 2rem",
                borderRadius: "999px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
            >
              Live Demo ?
            </a>
          )}
        </div>

      </div>
    </section>
  );
};

export default ProjectPage;
