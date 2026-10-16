import React from "react";
import "./SkillsSection.css";
import { FiCode, FiCpu, FiLayers, FiTool } from "react-icons/fi";

const skillsData = [
  {
    category: "Programming",
    icon: <FiCode />,
    skills: ["Python", "C++", "C", "SQL", "JavaScript"],
  },
  {
    category: "AI, Data & APIs",
    icon: <FiCpu />,
    skills: [
      "OpenCV",
      "NumPy",
      "Pandas",
      "Data Analytics",
      "Scikit-learn",
      "LLM APIs",
      "REST APIs",
    ],
  },
  {
    category: "Computer Science",
    icon: <FiLayers />,
    skills: [
      "DSA",
      "OOP",
      "Algorithm Optimization",
      "Analytical Problem Solving",
    ],
  },
  {
    category: "Web & Tools",
    icon: <FiTool />,
    skills: [
      "React.js",
      "HTML5 & CSS3",
      "Firebase",
      "Git & GitHub",
      "Linux",
      "VS Code",
      "Jupyter Notebook",
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills">
      <div className="skills-inner">

        <div className="skills-header reveal">
          <h2>Skills</h2>
          <span className="skills-header-italic">stack.</span>
        </div>

        <div className="experience__container">
          {skillsData.map((group, gIdx) => (
            <div key={gIdx} className="experience__col reveal">
              <h3>
                {group.icon} {group.category}
              </h3>
              <div className="experience__content">
                {group.skills.map((skill, index) => (
                  <article key={index} className="experience__details">
                    <h4>{skill}</h4>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;