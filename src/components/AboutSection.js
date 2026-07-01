import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';
import { FiAward, FiBookOpen, FiCode } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Entry animations
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none none' } });
    tl.fromTo(contentRef.current.querySelector('h2'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');
    tl.fromTo(cardsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' }, '-=0.4');
    tl.fromTo(contentRef.current.querySelector('p'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    tl.fromTo(contentRef.current.querySelector('.btn'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');

    // Glare effect for cards
    cardsRef.current.forEach(card => {
      const glare = card.querySelector('.glare');
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(glare, { 
          x: x, 
          y: y, 
          opacity: 1, 
          duration: 0.2, 
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(glare, { opacity: 0, duration: 0.5, ease: 'power2.out' });
      });
    });

    return () => {};
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <h2>ABOUT ME</h2>

      <div className="container">
        <div className="about__content" ref={contentRef}>
          <div className="about__cards">
            <article className='about__card' ref={el => cardsRef.current[0] = el}>
              <div className="glare"></div>
              <FiAward className='about__icon' />
              <h5>Experience</h5>
              <small>1+ Years Learning</small>
            </article>

            <article className='about__card' ref={el => cardsRef.current[1] = el}>
              <div className="glare"></div>
              <FiBookOpen className='about__icon' />
              <h5>Academics</h5>
              <small>B.Tech, JEC Jaipur</small>
            </article>

            <article className='about__card' ref={el => cardsRef.current[2] = el}>
              <div className="glare"></div>
              <FiCode className='about__icon' />
              <h5>Projects</h5>
              <small>4+ Completed</small>
            </article>
          </div>

          <p>
          I’M A CODE ENTHUSIAST FOCUSED ON CRAFTING ELEGANT, EFFICIENT SOLUTIONS. I ENJOY TURNING COMPLEX IDEAS INTO INTUITIVE, HIGH‑QUALITY EXPERIENCES USING MODERN WEB TECH LIKE REACT, NODE.JS AND PYTHON. CURRENTLY PURSUING B.TECH AT JAIPUR ENGINEERING COLLEGE AND EXPLORING AI/ML.
          
          </p>

          <div className="about__cta">
            <a href="/#contact" className='btn btn-primary'>Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
