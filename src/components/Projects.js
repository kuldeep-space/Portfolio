import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import './Projects.css';
import { FiArrowUpRight, FiGithub, FiCheck, FiX, FiLayers } from 'react-icons/fi';

import attandence from '../assets/Attandence.jpeg';
import textify from '../assets/Textify.jpeg';
import textedge from '../assets/Testedge.png';
import edushield from '../assets/edushield.png';

const slides = [
  {
    id: 'edushield',
    num: '01',
    client: 'EDUSHIELD AI',
    tags: 'PREDICTIVE MODELING · STUDENT ANALYTICS · ML PIPELINES',
    headerRight: 'APPLIED AI & MACHINE LEARNING',
    titleLines: ['EduShield AI —', 'Student Dropout', 'Analytics'],
    desc: 'Intelligent predictive analytics platform calculating student dropout risk trajectories in real time. Features multi-metric classification pipelines, interactive risk dashboards, and high-availability edge inference.',
    bg: '#000000',
    accent: '#ffffff',
    image: edushield,
    github: null,
    weblink: 'https://edushield-ai.vercel.app/',
    techStack: ['Python', 'Scikit-Learn', 'NumPy', 'Pandas', 'Vercel Edge'],
    specs: {
      pipeline: 'Dataset ingestion → Feature scaling & outlier pruning → Predictive modeling → Risk classification → Real-time visual dashboard.',
      features: [
        'Multi-metric classification architecture evaluating real-time student progression',
        'Predictive early-warning indicators for academic intervention and student retention',
        'Interactive analytics dashboard deployed live on high-availability edge infrastructure'
      ]
    }
  },
  {
    id: 'attendance',
    num: '02',
    client: 'OPENCV VISION',
    tags: 'BIOMETRIC TRACKING · SUB-100MS INFERENCE · AUTOMATED LEDGERS',
    headerRight: 'COMPUTER VISION & EMBEDDED SYSTEMS',
    titleLines: ['Automated Face', 'Detection Attendance', 'System'],
    desc: 'High-frequency biometric attendance platform using computer vision for real-time facial contour tracking and automated identity verification with sub-100ms inference, writing directly to structured ledgers.',
    bg: '#000000',
    accent: '#ffffff',
    image: attandence,
    github: 'https://github.com/kuldeep-space/ATTENDANCE-SYSTEM',
    weblink: null,
    techStack: ['Python 3.x', 'OpenCV', 'Haar Cascades', 'NumPy', 'CSV Ledgers'],
    specs: {
      pipeline: 'Live video capture → Grayscale contrast equalization → Haar Cascade landmark detection → Vector matching → Automated timestamp logging.',
      features: [
        'Sub-100ms real-time face detection and bounding box tracking from camera streams',
        'Zero manual attendance paperwork; instant structured CSV persistence',
        'Optimized frame preprocessing algorithms eliminating compute bottlenecks'
      ]
    }
  },
  {
    id: 'testedge',
    num: '03',
    client: 'TESTEDGE PLATFORM',
    tags: 'DYNAMIC AUTO-GRADING · REALTIME CANDIDATE ASSESSMENT · STATE MACHINE',
    headerRight: 'FULL STACK & REALTIME DATABASE',
    titleLines: ['TestEdge —', 'Candidate Assessment', 'Platform'],
    desc: 'Synchronized examination clock and candidate evaluation system resilient against tab reloads, featuring dynamic multi-parameter auto-grading calculation engines and administrative analytics consoles.',
    bg: '#000000',
    accent: '#ffffff',
    image: textedge,
    github: null,
    weblink: 'https://testedge.live/',
    techStack: ['React', 'Node.js', 'Firebase Realtime DB', 'State Machines'],
    specs: {
      pipeline: 'Client timer loop ↔ Server timestamp drift validation → Answer state persistence → Automated submission evaluation.',
      features: [
        'Real-time examination clock synchronization resilient against tab changes or reloads',
        'Instant multi-parameter auto-grading with score distributions',
        'Multi-tenant administrative interface for question authoring and candidate metrics'
      ]
    }
  },
  {
    id: 'textify',
    num: '04',
    client: 'TEXTIFY UTILITY',
    tags: 'ZERO-DEPENDENCY RUNTIME · REAL-TIME DOCUMENT METRICS · REACT 18',
    headerRight: 'CLIENT-SIDE WEB UTILITY',
    titleLines: ['Textify — High', 'Throughput Text', 'Transformation'],
    desc: 'High-throughput client-side text transformation and document analytics suite engineered with zero external dependencies, offering real-time word, character, and line metrics with 1-click clipboard buffers.',
    bg: '#000000',
    accent: '#ffffff',
    image: textify,
    github: null,
    weblink: 'https://textify-kuldeep.vercel.app/',
    techStack: ['React 18', 'JavaScript ES6+', 'HTML5 / CSS3', 'Vercel Edge'],
    specs: {
      pipeline: 'Raw string stream → Regex tokenizer → Immutable state dispatch → Real-time metrics calculation → Output buffer.',
      features: [
        'Zero-lag text normalization algorithms processing multi-thousand word blocks',
        'Instant reading time estimation and lexical density calculations',
        'Responsive client-side architecture with 1-click clipboard integration'
      ]
    }
  }
];

const secondaryProjects = [
  {
    year: '2024',
    name: 'Python Train Search Engine',
    category: 'Data Preprocessing & Algorithmic Lookup',
    tech: 'Python · Data Wrangling · Algorithms',
    highlight: 'Search and query engine for structured railway datasets with optimized filtering logic.',
    url: 'https://github.com/kuldeep-space/Python-Train-Search-Engine',
  },
  {
    year: '2024',
    name: 'Rock Paper Scissors Engine',
    category: 'Game Logic & Algorithmic State',
    tech: 'Python · Core Logic · Event State',
    highlight: 'Interactive game implementation with algorithmic randomization and match state persistence.',
    url: 'https://github.com/kuldeep-space/Rock-Paper-scissors',
  },
  {
    year: '2024',
    name: 'PeerPlaces Collaboration Platform',
    category: 'Cross-Functional Web Platform',
    tech: 'React · Node.js · Firebase',
    highlight: 'Platform connecting students and developers to showcase portfolios and form project teams.',
    url: null,
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openSpecs, setOpenSpecs] = useState(false);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const lastStepTimeRef = useRef(Date.now());
  const exitDownDeltaRef = useRef(0);
  const exitUpDeltaRef = useRef(0);
  const isNavigatingAwayRef = useRef(false);
  const wasOutOfViewRef = useRef(true);
  const entryLockTimeRef = useRef(0);

  const sectionRef = useRef(null);
  const metaStackRef = useRef(null);
  const titleStackRef = useRef(null);
  const descStackRef = useRef(null);
  const mediaFrameRef = useRef(null);
  const counterWrapRef = useRef(null);
  const headerTagWrapRef = useRef(null);
  const watermarkWrapRef = useRef(null);
  const paginationRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Helper: Create Masked Lines DOM Element
  const createMaskedLines = useCallback((lines, className) => {
    const container = document.createElement('div');
    container.className = `stack-item ${className}`;
    container.innerHTML = lines
      .map((line) => `<span class="line-mask"><span class="line-inner">${line}</span></span>`)
      .join('');
    return container;
  }, []);

  // Helper: Create Slide Media DOM Layer
  const createMediaElement = useCallback((slide) => {
    const layer = document.createElement('div');
    layer.className = 'slide-media';
    layer.innerHTML = `
      <div class="slide-media-inner">
        <img src="${slide.image}" alt="${slide.client}" class="slide-media-main-img" />
      </div>
    `;
    return layer;
  }, []);

  // Transition Typography Stack (Overlapping Split-Line Animation)
  const transitionStack = useCallback((stackContainer, newLines, className, direction, staggerVal = 0.055) => {
    if (!stackContainer) return;
    const oldItem = stackContainer.lastElementChild;
    const newItem = createMaskedLines(newLines, className);
    stackContainer.appendChild(newItem);

    const oldInners = oldItem ? oldItem.querySelectorAll('.line-inner') : [];
    const newInners = newItem.querySelectorAll('.line-inner');

    const yOut = direction > 0 ? '-115%' : '115%';
    const yIn = direction > 0 ? '115%' : '-115%';

    if (oldInners.length) {
      gsap.to(oldInners, {
        y: yOut,
        rotation: direction > 0 ? -1.5 : 1.5,
        duration: 0.85,
        stagger: staggerVal,
        ease: 'expo.inOut',
        onComplete: () => oldItem && oldItem.remove(),
      });
    }

    gsap.fromTo(
      newInners,
      { y: yIn, rotation: direction > 0 ? 1.5 : -1.5 },
      {
        y: '0%',
        rotation: 0,
        duration: 0.95,
        delay: 0.08,
        stagger: staggerVal,
        ease: 'expo.inOut',
      }
    );
  }, [createMaskedLines]);

  // Helper: Create Description & Tech Stack DOM Element
  const createDescElement = useCallback((slide) => {
    const container = document.createElement('div');
    container.className = 'stack-item project-desc-block';

    const chips = (slide.techStack || [])
      .map((tech) => `<span class="tech-chip">${tech}</span>`)
      .join('');

    container.innerHTML = `
      <p class="project-desc-paragraph">${slide.desc}</p>
      <div class="project-tech-chips">${chips}</div>
    `;
    return container;
  }, []);

  // Transition Description & Tech Stack
  const transitionDesc = useCallback((stackContainer, nextSlide, direction) => {
    if (!stackContainer) return;
    const oldItem = stackContainer.lastElementChild;
    const newItem = createDescElement(nextSlide);
    stackContainer.appendChild(newItem);

    const yOut = direction > 0 ? -16 : 16;
    const yIn = direction > 0 ? 16 : -16;

    if (oldItem) {
      gsap.to(oldItem, {
        opacity: 0,
        y: yOut,
        duration: 0.55,
        ease: 'power2.inOut',
        onComplete: () => oldItem && oldItem.remove(),
      });
    }

    gsap.fromTo(
      newItem,
      { opacity: 0, y: yIn },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        delay: 0.08,
        ease: 'expo.out',
      }
    );
  }, [createDescElement]);

  // Core Slide Transition
  const goToSlide = useCallback((nextIndex, direction = 1) => {
    if (isAnimatingRef.current || nextIndex === currentIndexRef.current) return;
    isAnimatingRef.current = true;
    lastStepTimeRef.current = Date.now();
    exitDownDeltaRef.current = 0;
    exitUpDeltaRef.current = 0;

    const nextSlide = slides[nextIndex];
    currentIndexRef.current = nextIndex;
    setCurrentIndex(nextIndex);
    setOpenSpecs(false);

    const section = sectionRef.current;
    if (section) {
      section.style.setProperty('--accent', nextSlide.accent);
    }

    // 1. Background Color Interpolation
    if (section) {
      gsap.to(section, {
        backgroundColor: nextSlide.bg,
        duration: 1.15,
        ease: 'power2.inOut',
      });
    }

    // 2. Center Column: Media Frame Micro-Pulse & Dual-Image Parallax
    const mediaFrame = mediaFrameRef.current;

    if (mediaFrame) {
      gsap.fromTo(
        mediaFrame,
        { scale: 0.985 },
        { scale: 1, duration: 0.85, ease: 'expo.out' }
      );

      const oldMedia = mediaFrame.lastElementChild;
      const newMedia = createMediaElement(nextSlide);

      const startClip =
        direction > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)';
      newMedia.style.clipPath = startClip;
      mediaFrame.appendChild(newMedia);

      const oldInner = oldMedia ? oldMedia.querySelector('.slide-media-inner') : null;
      const newInner = newMedia.querySelector('.slide-media-inner');

      if (oldInner) {
        gsap.to(oldInner, {
          yPercent: direction > 0 ? -8 : 8,
          scale: 1.04,
          filter: 'brightness(0.4)',
          duration: 1.15,
          ease: 'expo.inOut',
        });
      }

      gsap.fromTo(
        newInner,
        { yPercent: direction > 0 ? 8 : -8, scale: 1.04 },
        { yPercent: 0, scale: 1, duration: 1.15, ease: 'expo.inOut' }
      );

      gsap.to(newMedia, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.15,
        ease: 'expo.inOut',
        onComplete: () => {
          while (mediaFrame.children.length > 1) {
            mediaFrame.firstElementChild.remove();
          }
          isAnimatingRef.current = false;
        },
      });
    }

    // 3. Simultaneous Overlapping Typography Reveal
    transitionStack(
      metaStackRef.current,
      [`<strong>${nextSlide.client}</strong> — ${nextSlide.tags}`],
      'project-meta',
      direction,
      0.04
    );
    transitionStack(
      titleStackRef.current,
      nextSlide.titleLines,
      'project-title',
      direction,
      0.06
    );
    transitionDesc(descStackRef.current, nextSlide, direction);

    // 5. Case Number Roll
    const counterWrap = counterWrapRef.current;
    if (counterWrap) {
      const oldCounter = counterWrap.lastElementChild;
      const newCounter = document.createElement('span');
      newCounter.textContent = nextSlide.num;
      counterWrap.appendChild(newCounter);

      if (oldCounter) {
        gsap.to(oldCounter, {
          yPercent: direction > 0 ? -110 : 110,
          duration: 0.75,
          ease: 'expo.inOut',
          onComplete: () => oldCounter.remove(),
        });
      }
      gsap.fromTo(
        newCounter,
        { yPercent: direction > 0 ? 110 : -110 },
        { yPercent: 0, duration: 0.75, ease: 'expo.inOut' }
      );
    }

    // 6. Header Tag Roll
    const headerTagWrap = headerTagWrapRef.current;
    if (headerTagWrap) {
      const oldTag = headerTagWrap.lastElementChild;
      const newTag = document.createElement('div');
      newTag.className = 'header-tag';
      newTag.textContent = nextSlide.headerRight;
      headerTagWrap.appendChild(newTag);

      if (oldTag) {
        gsap.to(oldTag, {
          yPercent: direction > 0 ? -110 : 110,
          duration: 0.75,
          ease: 'expo.inOut',
          onComplete: () => oldTag.remove(),
        });
      }
      gsap.fromTo(
        newTag,
        { yPercent: direction > 0 ? 110 : -110 },
        { yPercent: 0, duration: 0.75, ease: 'expo.inOut' }
      );
    }

    // 7. Giant Background Watermark Cross-Slide
    const watermarkWrap = watermarkWrapRef.current;
    if (watermarkWrap) {
      const oldMark = watermarkWrap.lastElementChild;
      const newMark = document.createElement('div');
      newMark.className = 'watermark';
      newMark.textContent = nextSlide.num;
      watermarkWrap.appendChild(newMark);

      if (oldMark) {
        gsap.to(oldMark, {
          yPercent: direction > 0 ? -35 : 35,
          opacity: 0,
          duration: 0.85,
          ease: 'expo.inOut',
          onComplete: () => oldMark.remove(),
        });
      }
      gsap.fromTo(
        newMark,
        { yPercent: direction > 0 ? 35 : -35, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.95, ease: 'expo.inOut' }
      );
    }
  }, [createMediaElement, transitionStack, transitionDesc]);

  // Initialize First Slide on Mount
  useEffect(() => {
    const first = slides[0];
    const section = sectionRef.current;
    if (section) {
      section.style.setProperty('--accent', first.accent);
      section.style.backgroundColor = first.bg;
    }

    if (metaStackRef.current && metaStackRef.current.children.length === 0) {
      metaStackRef.current.appendChild(
        createMaskedLines([`<strong>${first.client}</strong> — ${first.tags}`], 'project-meta')
      );
    }

    if (titleStackRef.current && titleStackRef.current.children.length === 0) {
      titleStackRef.current.appendChild(
        createMaskedLines(first.titleLines, 'project-title')
      );
    }

    if (descStackRef.current && descStackRef.current.children.length === 0) {
      descStackRef.current.appendChild(createDescElement(first));
    }

    if (mediaFrameRef.current && mediaFrameRef.current.children.length === 0) {
      mediaFrameRef.current.appendChild(createMediaElement(first));
    }
  }, [createMaskedLines, createDescElement, createMediaElement]);

  // Wheel & Keyboard Scroll Handling (Zero Shaking, Rock-Solid Viewport Lock)
  useEffect(() => {
    const onWheel = (e) => {
      if (openSpecs) return;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      // Section is active in the viewport
      const inView = rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.35;
      if (!inView) {
        wasOutOfViewRef.current = true;
        exitDownDeltaRef.current = 0;
        exitUpDeltaRef.current = 0;
        return;
      }

      // CRITICAL: Prevent default unconditionally so window CANNOT scroll to another section!
      e.preventDefault();

      // If we just entered the section from outside, lock entry to current slide (first slide)
      // and absorb the incoming scroll momentum so it doesn't immediately skip Slide 01!
      if (wasOutOfViewRef.current) {
        wasOutOfViewRef.current = false;
        entryLockTimeRef.current = Date.now();
        lastStepTimeRef.current = Date.now();
        exitDownDeltaRef.current = 0;
        exitUpDeltaRef.current = 0;
        if (Math.abs(rect.top) > 2 && !isNavigatingAwayRef.current) {
          window.scrollTo(0, section.offsetTop);
        }
        return;
      }

      // If viewport has even a tiny vertical offset from the top of the section, snap window directly to section top
      if (Math.abs(rect.top) > 2 && !isNavigatingAwayRef.current) {
        window.scrollTo(0, section.offsetTop);
      }

      const now = Date.now();
      const timeSince = now - lastStepTimeRef.current;
      const timeSinceEntry = now - entryLockTimeRef.current;

      // Ensure cooldown after entering or between slide transitions
      if (isAnimatingRef.current || timeSince < 850 || timeSinceEntry < 600) return;

      if (e.deltaY > 20) {
        // Scroll DOWN: Advance project by exactly 1 slide
        if (currentIndexRef.current < slides.length - 1) {
          exitDownDeltaRef.current = 0;
          exitUpDeltaRef.current = 0;
          goToSlide(currentIndexRef.current + 1, 1);
        } else {
          // On last slide (04) — requires deliberate accumulated scroll effort to transition to other projects
          exitDownDeltaRef.current += e.deltaY;
          if (exitDownDeltaRef.current > 380 && timeSince > 850) {
            isNavigatingAwayRef.current = true;
            exitDownDeltaRef.current = 0;
            document.getElementById('other-projects')?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              isNavigatingAwayRef.current = false;
            }, 1000);
          }
        }
      } else if (e.deltaY < -20) {
        // Scroll UP: Previous project by exactly 1 slide
        if (currentIndexRef.current > 0) {
          exitDownDeltaRef.current = 0;
          exitUpDeltaRef.current = 0;
          goToSlide(currentIndexRef.current - 1, -1);
        } else {
          // On first slide (01) — requires deliberate accumulated scroll effort to transition back to about
          exitUpDeltaRef.current += Math.abs(e.deltaY);
          if (exitUpDeltaRef.current > 380 && timeSince > 850) {
            isNavigatingAwayRef.current = true;
            exitUpDeltaRef.current = 0;
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              isNavigatingAwayRef.current = false;
            }, 1000);
          }
        }
      }
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (openSpecs) setOpenSpecs(false);
        return;
      }
      if (openSpecs) return;

      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.35;
      if (!inView || isAnimatingRef.current) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndexRef.current < slides.length - 1) {
          e.preventDefault();
          goToSlide(currentIndexRef.current + 1, 1);
        } else {
          e.preventDefault();
          document.getElementById('other-projects')?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndexRef.current > 0) {
          e.preventDefault();
          goToSlide(currentIndexRef.current - 1, -1);
        } else {
          e.preventDefault();
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [openSpecs, goToSlide]);

  // Touch Swipe Support for Mobile (Horizontal + Vertical gestures)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null || isAnimatingRef.current || openSpecs) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const timeSince = Date.now() - lastStepTimeRef.current;

    // Horizontal swipe (left/right carousel gesture)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        if (currentIndexRef.current < slides.length - 1) {
          goToSlide(currentIndexRef.current + 1, 1);
        }
      } else {
        if (currentIndexRef.current > 0) {
          goToSlide(currentIndexRef.current - 1, -1);
        }
      }
    } else if (Math.abs(diffY) > 50) {
      // Vertical swipe
      if (diffY > 0) {
        if (currentIndexRef.current < slides.length - 1) {
          goToSlide(currentIndexRef.current + 1, 1);
        } else if (timeSince > 700) {
          document.getElementById('other-projects')?.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        if (currentIndexRef.current > 0) {
          goToSlide(currentIndexRef.current - 1, -1);
        } else if (timeSince > 700) {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Magnetic Pull for Action Buttons
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const magneticElements = section.querySelectorAll('.magnetic');
    const handleMagMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, { x: x * 0.28, y: y * 0.28, duration: 0.35, ease: 'power2.out' });
    };

    const handleMagLeave = (e) => {
      const el = e.currentTarget;
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', handleMagMove);
      el.addEventListener('mouseleave', handleMagLeave);
    });

    return () => {
      magneticElements.forEach((el) => {
        el.removeEventListener('mousemove', handleMagMove);
        el.removeEventListener('mouseleave', handleMagLeave);
      });
    };
  }, []);

  const activeProject = slides[currentIndex];

  return (
    <>
      {/* ========================================================
          OWNITT FULL-PAGE AWWWARDS SLIDER (100vw × 100vh)
          ======================================================== */}
      <section
        id="projects"
        ref={sectionRef}
        className="ownitt-slider-section"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Ownitt Awwwards Featured Projects"
      >
        {/* Subtle Film Grain Noise Overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Giant Background Watermark Number */}
        <div className="watermark-wrap" ref={watermarkWrapRef} aria-hidden="true">
          <div className="watermark">01</div>
        </div>

        {/* App Frame */}
        <div className="ownitt-app-grid">
          {/* Header */}
          <header className="ownitt-header">
            <div className="header-left">
              <div className="case-counter">
                <span className="counter-num-wrap" ref={counterWrapRef}>
                  <span>01</span>
                </span>
                <span className="case-sep">/</span>
                <span className="case-total">04</span>
                <span className="case-label">SELECTED CASE</span>
              </div>
            </div>

            <div className="header-right">
              <div className="header-tag-mask" ref={headerTagWrapRef}>
                <div className="header-tag">APPLIED AI &amp; MACHINE LEARNING</div>
              </div>
            </div>
          </header>

          {/* Main 3-Column Stage */}
          <main className="ownitt-main-stage">
            {/* Left Column: Overlapping Split-Line Typography */}
            <div className="project-info">
              <div className="stack-grid meta-stack" ref={metaStackRef} />
              <div className="stack-grid title-stack" ref={titleStackRef} />
              <div className="stack-grid desc-stack" ref={descStackRef} />

              {/* Action Cluster: Circular Arrow Disc CTA + Source + Tech Specs */}
              <div className="action-cluster">
                {activeProject.weblink ? (
                  <a
                    href={activeProject.weblink}
                    target="_blank"
                    rel="noreferrer"
                    className="cta-link magnetic interactable"
                    aria-label={`Launch live demo for ${activeProject.client}`}
                  >
                    <span>VIEW LIVE DEMO</span>
                    <span className="cta-circle">→</span>
                  </a>
                ) : (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="cta-link magnetic interactable"
                    aria-label={`Inspect source code for ${activeProject.client}`}
                  >
                    <span>INSPECT CODEBASE</span>
                    <span className="cta-circle">→</span>
                  </a>
                )}

                {activeProject.github && activeProject.weblink && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="ghost-action-btn magnetic interactable"
                    aria-label="Inspect GitHub repository"
                  >
                    <FiGithub aria-hidden="true" />
                    <span>SOURCE</span>
                    <FiArrowUpRight aria-hidden="true" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setOpenSpecs(true)}
                  className={`ghost-action-btn magnetic interactable ${openSpecs ? 'is-active' : ''}`}
                  aria-haspopup="dialog"
                  aria-expanded={openSpecs}
                >
                  <FiLayers aria-hidden="true" />
                  <span>TECH SPECS</span>
                </button>
              </div>
            </div>

            {/* Center Column: Morphing Frame */}
            <div className="media-stage">
              <div className="media-wrapper">
                <div className="media-frame" ref={mediaFrameRef} />
              </div>
            </div>

            {/* Right Column: Accordion Pagination */}
            <nav className="pagination" ref={paginationRef} aria-label="Project slider pagination">
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  className={`page-item ${idx === currentIndex ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className={`page-num interactable ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => {
                      if (idx !== currentIndexRef.current && !isAnimatingRef.current) {
                        goToSlide(idx, idx > currentIndexRef.current ? 1 : -1);
                      }
                    }}
                    aria-label={`Jump to case ${s.num}: ${s.client}`}
                  >
                    {s.num}
                  </button>
                  <div className="page-line" />
                </div>
              ))}
            </nav>
          </main>
        </div>

        {/* Architecture Specs Modal with Lens Blur Backdrop */}
        {openSpecs && (
          <div className="specs-modal-backdrop" onClick={() => setOpenSpecs(false)}>
            <div
              className="specs-modal-dialog"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="specs-modal-title"
            >
              <div className="specs-modal-header">
                <div className="specs-modal-title-group">
                  <span className="specs-modal-badge">{activeProject.client}</span>
                  <h3 id="specs-modal-title" className="specs-modal-heading">
                    SYSTEM ARCHITECTURE &amp; SPECS
                  </h3>
                </div>
                <button
                  type="button"
                  className="specs-modal-close interactable"
                  onClick={() => setOpenSpecs(false)}
                  aria-label="Close specifications modal"
                >
                  <FiX aria-hidden="true" />
                </button>
              </div>

              <div className="specs-modal-body">
                <div className="specs-modal-section">
                  <span className="specs-head">PIPELINE ARCHITECTURE</span>
                  <p className="specs-pipeline-text">{activeProject.specs.pipeline}</p>
                </div>

                <div className="specs-modal-section">
                  <span className="specs-head">ENGINEERING HIGHLIGHTS</span>
                  <ul className="specs-bullets">
                    {activeProject.specs.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <FiCheck className="specs-check" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="specs-modal-section">
                  <span className="specs-head">CORE STACK DEPLOYED</span>
                  <div className="specs-tech-pills">
                    {activeProject.techStack.map((tech, idx) => (
                      <span key={idx} className="tech-chip">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================
          OTHER PROJECTS (Completely Separate Section)
          Pure Solid Black Background (#000000)
          ======================================================== */}
      <section id="other-projects" className="other-projects-section">
        <div className="other-projects-container">
          <div className="other-projects-header">
            <span className="other-kicker">ADDITIONAL REPOSITORIES</span>
            <h3 className="other-title">OTHER PROJECTS</h3>
          </div>

          <div className="other-table">
            <div className="other-row head">
              <span>YEAR</span>
              <span>PROJECT TITLE</span>
              <span>HIGHLIGHT / ARCHITECTURE</span>
              <span>STACK</span>
              <span className="text-right">SOURCE</span>
            </div>

            {secondaryProjects.map((repo, i) => (
              <div key={i} className="other-row">
                <span className="row-year">{repo.year}</span>
                <span className="row-name">{repo.name}</span>
                <span className="row-cat">{repo.highlight}</span>
                <span className="row-tech">{repo.tech}</span>
                <span className="row-action text-right">
                  {repo.url ? (
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="row-link"
                      aria-label={`View ${repo.name} on GitHub`}
                    >
                      <span>VIEW</span>
                      <FiArrowUpRight aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="row-empty" aria-label="Source code private or proprietary">—</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;