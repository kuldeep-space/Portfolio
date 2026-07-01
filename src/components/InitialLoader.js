import React from 'react';
import { motion } from 'framer-motion';
import './InitialLoader.css';
import logo from '../assets/me.png'; // Using a personal logo

const InitialLoader = () => {
  return (
    <motion.div
      className="initial-loader-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { duration: 0.5, delay: 3.5 } }}
    >
      <div className="loader-content">
        <motion.img
          src={logo}
          alt="Logo"
          className="loader-logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } }}
        />
        <motion.h1
          className="loader-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8, delay: 1.2 } }}
        >
          Loading Portfolio...
        </motion.h1>
        <div className="loading-bar-container">
          <motion.div
            className="loading-bar"
            initial={{ width: '0%' }}
            animate={{ width: '100%', transition: { duration: 2, delay: 1.5, ease: 'easeInOut' } }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default InitialLoader;
