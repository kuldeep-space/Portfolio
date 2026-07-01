import React from 'react';
import { useParams } from 'react-router-dom';

// Dummy data for now - this should be centralized later
const data = [
  {
    id: 1,
    title: 'Personal Portfolio Website',
    description: 'A responsive portfolio built with React, showcasing my skills and projects with a modern, glassmorphic design.',
  },
  {
    id: 2,
    title: 'Data Visualization Dashboard',
    description: 'A web app using Chart.js to display interactive charts and graphs for a given dataset, with filtering and export options.',
  },
  {
    id: 3,
    title: 'RESTful API ',
    description: 'A backend service for a blog platform, featuring user authentication, CRUD operations for posts, and a testing suite.',
  }
];

const ProjectPage = () => {
  const { id } = useParams();
  const project = data.find(p => p.id === parseInt(id));

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <section style={{ paddingTop: '10rem', color: 'white', textAlign: 'center', minHeight: '100vh' }}>
      <div className="container">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        {/* More project details can be added here */}
      </div>
    </section>
  );
};

export default ProjectPage;
