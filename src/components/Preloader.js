import React from 'react';
import { motion } from 'framer-motion';
import './Preloader.css';

const Preloader = () => {
  const colors = ['#7aa2f7', '#9ece6a', '#c0caf5', '#f7768e'];
  const numDots = 4;

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const dotVariants = {
    initial: { y: '0%', opacity: 0 },
    animate: {
      y: ['0%', '-100%', '0%'],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="preloader">
      <motion.div
        className="loader-container"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {[...Array(numDots)].map((_, i) => (
          <motion.div
            key={i}
            className="loader-dot"
            style={{ backgroundColor: colors[i % colors.length] }}
            variants={dotVariants}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Preloader;
