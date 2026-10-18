import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop/laptop with a fine pointer (mouse/trackpad)
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    try {
      const media = window.matchMedia('(pointer: coarse)');
      if (media && media.matches) return;
    } catch (e) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId = null;
    let isHovering = false;

    let lastScrollY = typeof window !== 'undefined' ? (window.pageYOffset || document.documentElement.scrollTop || 0) : 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;

      // Check if mouse is over any clickable/interactive element
      const target = e.target;
      const clickable = target && (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('.interactable') ||
        target.closest('.magnetic') ||
        target.closest('.nav__item') ||
        target.closest('.skill-card') ||
        target.closest('.project-card') ||
        target.closest('.tech-chip') ||
        target.closest('.specs-pill-btn') ||
        target.closest('.specs-modal-close')
      );

      if (clickable && !isHovering) {
        isHovering = true;
        ring.classList.add('is-hovered');
        dot.classList.add('is-hovered');
      } else if (!clickable && isHovering) {
        isHovering = false;
        ring.classList.remove('is-hovered');
        dot.classList.remove('is-hovered');
      }
    };

    const onMouseDown = () => {
      ring.classList.add('is-clicking');
    };

    const onMouseUp = () => {
      ring.classList.remove('is-clicking');
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const triggerScroll = (direction) => {
      ring.classList.add('is-scrolling');
      dot.classList.add('is-scrolling');

      if (direction === 'down') {
        ring.classList.add('is-scrolling-down');
        ring.classList.remove('is-scrolling-up');
        dot.classList.add('is-scrolling-down');
        dot.classList.remove('is-scrolling-up');
      } else {
        ring.classList.add('is-scrolling-up');
        ring.classList.remove('is-scrolling-down');
        dot.classList.add('is-scrolling-up');
        dot.classList.remove('is-scrolling-down');
      }

      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        ring.classList.remove('is-scrolling', 'is-scrolling-down', 'is-scrolling-up');
        dot.classList.remove('is-scrolling', 'is-scrolling-down', 'is-scrolling-up');
      }, 400);
    };

    const onWheel = (e) => {
      if (!e) return;
      if (Math.abs(e.deltaY) < 1) return;
      triggerScroll(e.deltaY > 0 ? 'down' : 'up');
    };

    const onWindowScroll = () => {
      const currentY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const diff = currentY - lastScrollY;
      lastScrollY = currentY;
      if (Math.abs(diff) < 1) return;
      triggerScroll(diff > 0 ? 'down' : 'up');
    };

    const onKeyDown = (e) => {
      if (!e) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        triggerScroll('down');
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        triggerScroll('up');
      }
    };

    // Physics render loop for smooth trailing ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('keydown', onKeyDown);
      if (animId) cancelAnimationFrame(animId);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`global-cursor-dot ${isVisible ? 'is-visible' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`global-cursor-ring ${isVisible ? 'is-visible' : ''}`}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
