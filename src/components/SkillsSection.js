import React from 'react';
import './SkillsSection.css';
import { FiCode, FiDatabase, FiTool } from 'react-icons/fi';

const skillsData = {
  Language: ['C++', 'Python', 'C', 'React'],
  Extra: ['DSA', 'HTML', 'MySQL', 'DS'],
  Tools: ['Git & GitHub', 'OpenCV', 'Linux', 'VS Code'],
};

const SkillsSection = () => {
  return (
    <section id="skills">
      <div className="container">
        <h2>MY SKILLS</h2>

        <div className="experience__container">
          <div className="experience__frontend">
            <h3><FiCode /> LANGUAGE</h3>
            <div className="experience__content">
              {skillsData.Language.map((skill, index) => (
                <article key={index} className="experience__details">
                  <h4>{skill}</h4>
                </article>
              ))}
            </div>
          </div>

          <div className="experience__backend">
            <h3><FiDatabase /> EXTRA</h3>
            <div className="experience__content">
              {skillsData.Extra.map((skill, index) => (
                <article key={index} className="experience__details">
                  <h4>{skill}</h4>
                </article>
              ))}
            </div>
          </div>

          <div className="experience__tools">
            <h3><FiTool /> TOOLS</h3>
            <div className="experience__content">
              {skillsData.Tools.map((skill, index) => (
                <article key={index} className="experience__details">
                  <h4>{skill}</h4>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
