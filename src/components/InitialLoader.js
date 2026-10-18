import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./InitialLoader.css";

/**
 * MODERN EXTENDED GROTESQUE (MONUMENT / CLASH STYLE)
 * Precision 100-Unit Cap-Height Vector Coordinate System
 * Ultra-wide stance, heavy 24-unit stems, authoritative creative studio proportions.
 */
const GLYPH_DEFS = {
  K: {
    w: 104,
    contours: [
      "M 0 0 L 24 0 L 24 45 L 68 0 L 102 0 L 52 52 L 106 100 L 74 100 L 36 62 L 24 74 L 24 100 L 0 100 Z",
    ],
  },
  U: {
    w: 102,
    contours: [
      "M 0 0 L 24 0 L 24 64 C 24 74 34 76 51 76 C 68 76 78 74 78 64 L 78 0 L 102 0 L 102 64 C 102 88 81 100 51 100 C 21 100 0 88 0 64 Z",
    ],
  },
  L: {
    w: 88,
    contours: ["M 0 0 L 24 0 L 24 76 L 88 76 L 88 100 L 0 100 Z"],
  },
  D: {
    w: 108,
    contours: [
      "M 0 0 L 54 0 C 88 0 108 20 108 50 C 108 80 88 100 54 100 L 0 100 Z",
      "M 24 24 L 54 24 C 74 24 84 35 84 50 C 84 65 74 76 54 76 L 24 76 Z",
    ],
  },
  E: {
    w: 92,
    contours: [
      "M 0 0 L 92 0 L 92 24 L 24 24 L 24 44 L 78 44 L 78 68 L 24 68 L 24 76 L 92 76 L 92 100 L 0 100 Z",
    ],
  },
  P: {
    w: 98,
    contours: [
      "M 0 0 L 58 0 C 84 0 98 12 98 31 C 98 50 84 62 58 62 L 24 62 L 24 100 L 0 100 Z",
      "M 24 24 L 56 24 C 70 24 74 27 74 31 C 74 35 70 38 56 38 L 24 38 Z",
    ],
  },
  J: {
    w: 86,
    contours: [
      "M 62 0 L 86 0 L 86 64 C 86 86 70 100 43 100 C 16 100 0 86 0 64 L 24 64 C 24 74 32 76 43 76 C 54 76 62 72 62 64 Z",
    ],
  },
  A: {
    w: 114,
    contours: [
      "M 44 0 L 70 0 L 114 100 L 88 100 L 78 76 L 36 76 L 26 100 L 0 100 Z",
      "M 57 24 L 71 58 L 43 58 Z",
    ],
  },
  N: {
    w: 104,
    contours: [
      "M 0 0 L 24 0 L 80 66 L 80 0 L 104 0 L 104 100 L 80 100 L 24 34 L 24 100 L 0 100 Z",
    ],
  },
  G: {
    w: 108,
    contours: [
      "M 106 36 L 82 36 C 78 24 68 20 54 20 C 37 20 25 32 25 50 C 25 68 37 80 56 80 C 70 80 79 73 81 60 L 56 60 L 56 42 L 108 42 L 108 100 L 85 100 L 82 88 C 74 97 63 101 49 101 C 19 101 0 81 0 50 C 0 19 20 -1 54 -1 C 82 -1 101 14 106 36 Z",
    ],
  },
  I: {
    w: 26,
    contours: ["M 0 0 L 26 0 L 26 100 L 0 100 Z"],
  },
  " ": {
    w: 48,
    contours: [],
  },
};

const LINE_1 = "KULDEEP".split("");
const LINE_2 = "JANGID".split("");
const LINES = [LINE_1, LINE_2];
const ANIM_DURATION = 4600; // ms

function clamp(v, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function getWaveY(localX, baseY, amp, worldOffsetX, time, opts) {
  const worldX = (worldOffsetX + localX) * 0.03;
  const w1 = Math.sin(worldX + time * opts.speed + opts.phase);
  const w2 = Math.cos(worldX * 1.9 - time * (opts.speed * 0.75) + opts.phase * 1.3) * 0.42;
  return baseY + (w1 + w2) * amp;
}

function drawSplineLiquidLayer(ctx, glyphW, fillT, worldOffsetX, time, opts) {
  if (fillT <= 0.001) return;

  const pad = 18;
  const baseY = 104 - fillT * 110;
  const envelope = Math.sin(fillT * Math.PI) * 0.9 + (1 - fillT) * 0.22;
  const amp = opts.amplitude * envelope;

  const steps = 18;
  const pts = [];
  for (let s = 0; s <= steps; s++) {
    const ratio = s / steps;
    const x = -pad + ratio * (glyphW + pad * 2);
    const y = getWaveY(x, baseY, amp, worldOffsetX, time, opts);
    pts.push({ x, y });
  }

  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);

  for (let s = 0; s < pts.length - 1; s++) {
    const midX = (pts[s].x + pts[s + 1].x) * 0.5;
    const midY = (pts[s].y + pts[s + 1].y) * 0.5;
    ctx.quadraticCurveTo(pts[s].x, pts[s].y, midX, midY);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last.x, last.y);

  if (opts.crestStroke && fillT < 0.992) {
    ctx.save();
    ctx.strokeStyle = opts.crestStroke;
    ctx.lineWidth = opts.crestWidth || 1.8;
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.restore();
  }

  ctx.lineTo(glyphW + pad, 125);
  ctx.lineTo(-pad, 125);
  ctx.closePath();

  ctx.fillStyle = opts.fillStyle;
  ctx.fill();
}

const InitialLoader = ({ onComplete, onExitStart }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [subtitleY, setSubtitleY] = useState(() => {
    if (typeof window === "undefined") return null;
    const h = window.innerHeight;
    const isMobile = window.innerWidth < 600;
    return Math.round(h * (isMobile ? 0.44 : 0.46) + 70);
  });

  const canvasRef = useRef(null);
  const touchStartY = useRef(null);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(performance.now());
  const renderLoopRef = useRef(null);

  // Pre-compile Path2D and offscreen SVGPathElement
  const compiledGlyphs = useMemo(() => {
    if (typeof document === "undefined") return {};
    const svgNS = "http://www.w3.org/2000/svg";
    const hiddenSvg = document.createElementNS(svgNS, "svg");
    hiddenSvg.style.position = "absolute";
    hiddenSvg.style.width = "0";
    hiddenSvg.style.height = "0";
    hiddenSvg.style.overflow = "hidden";
    hiddenSvg.style.visibility = "hidden";
    hiddenSvg.style.pointerEvents = "none";
    document.body.appendChild(hiddenSvg);

    const compiled = {};
    for (const [char, def] of Object.entries(GLYPH_DEFS)) {
      const combinedPath2D = new Path2D();
      const contourItems = def.contours.map((d) => {
        const p2d = new Path2D(d);
        combinedPath2D.addPath(p2d);

        const svgPath = document.createElementNS(svgNS, "path");
        svgPath.setAttribute("d", d);
        hiddenSvg.appendChild(svgPath);
        const length = typeof svgPath.getTotalLength === "function" ? svgPath.getTotalLength() : 100;

        return { p2d, svgPath, length };
      });

      compiled[char] = {
        w: def.w,
        combinedPath2D,
        contours: contourItems,
      };
    }

    return { compiled, hiddenSvg };
  }, []);

  // Cleanup offscreen SVG
  useEffect(() => {
    return () => {
      if (compiledGlyphs && compiledGlyphs.hiddenSvg && compiledGlyphs.hiddenSvg.parentNode) {
        compiledGlyphs.hiddenSvg.parentNode.removeChild(compiledGlyphs.hiddenSvg);
      }
    };
  }, [compiledGlyphs]);

  // Transition into portfolio with SLOW-MOTION cinematic blur & scale
  // Transition into portfolio with smooth cinematic blur & scale
  const triggerEnter = useCallback(() => {
    if (isExiting || isDone) return;
    setIsExiting(true);
    if (onExitStart) onExitStart();

    // Immediately restore page scroll so Hero section never gets stuck
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 550);
  }, [isExiting, isDone, onExitStart, onComplete]);

  // Lock body scroll strictly during active intro presentation
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Responsive scroll/touch detection for mobile & desktop
  useEffect(() => {
    if (isDone || isExiting) return;

    let accumulatedScroll = 0;

    const onWheel = (e) => {
      accumulatedScroll += e.deltaY;
      if (accumulatedScroll > 18 || Math.abs(e.deltaY) > 14) {
        if (e.cancelable) e.preventDefault();
        triggerEnter();
      }
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      // Unconditionally prevent mobile touch scrolling while on intro
      if (e.cancelable) e.preventDefault();
      if (touchStartY.current !== null && e.touches && e.touches.length > 0) {
        const diff = touchStartY.current - e.touches[0].clientY;
        if (Math.abs(diff) > 12) {
          triggerEnter();
        }
      }
    };

    const onKeyDown = (e) => {
      if (["ArrowDown", "PageDown", " ", "Enter", "Escape"].includes(e.key)) {
        e.preventDefault();
        triggerEnter();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [triggerEnter, isDone, isExiting]);

  // Canvas Render Loop with Golden Ratio Mobile & Desktop Positioning
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !compiledGlyphs || !compiledGlyphs.compiled) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const COMPILED_GLYPHS = compiledGlyphs.compiled;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 600;
      const isSmallMobile = width < 380 || height < 680;

      const maxLineWidth = width * (isSmallMobile ? 0.92 : isMobile ? 0.88 : 0.84);
      const letterGap = isSmallMobile ? 8 : isMobile ? 11 : 16;

      let maxLineUnits = 0;
      LINES.forEach((line) => {
        const units =
          line.reduce((acc, ch) => acc + (COMPILED_GLYPHS[ch]?.w || 0), 0) +
          letterGap * (line.length - 1);
        if (units > maxLineUnits) maxLineUnits = units;
      });

      const maxAllowedHeight = isMobile ? height * 0.36 : height * 0.48;
      const scale = Math.max(
        0.24,
        Math.min(maxLineWidth / maxLineUnits, maxAllowedHeight / 230, isMobile ? 0.82 : 1.35)
      );

      const glyphH = 100 * scale;
      const lineSpacing = glyphH * (isMobile ? 0.22 : 0.26);
      const totalBlockHeight = glyphH * 2 + lineSpacing;
      const subtitleGap = Math.max(isMobile ? 14 : 22, glyphH * 0.25);
      const subtitleH = isMobile ? 22 : 28;

      const totalCompositionH = totalBlockHeight + subtitleGap + subtitleH;
      const targetCenterY = height * (isMobile ? 0.44 : 0.46);
      const startY = Math.max(isMobile ? 32 : 40, targetCenterY - totalCompositionH / 2);
      const computedSubY = startY + totalBlockHeight + subtitleGap;

      setSubtitleY(Math.round(computedSubY));
    }

    resize();
    window.addEventListener("resize", resize);

    function render(now) {
      const elapsed = now - startTimeRef.current;
      const masterProgress = clamp(elapsed / ANIM_DURATION, 0, 1);
      const holdProgress = clamp((elapsed - ANIM_DURATION) / 1200, 0, 1);
      const time = now * 0.0046;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      const isMobile = width < 600;
      const isSmallMobile = width < 380 || height < 680;

      const maxLineWidth = width * (isSmallMobile ? 0.92 : isMobile ? 0.88 : 0.84);
      const letterGap = isSmallMobile ? 8 : isMobile ? 11 : 16;

      let maxLineUnits = 0;
      LINES.forEach((line) => {
        const units =
          line.reduce((acc, ch) => acc + (COMPILED_GLYPHS[ch]?.w || 0), 0) +
          letterGap * (line.length - 1);
        if (units > maxLineUnits) maxLineUnits = units;
      });

      const maxAllowedHeight = isMobile ? height * 0.36 : height * 0.48;
      const scale = Math.max(
        0.24,
        Math.min(maxLineWidth / maxLineUnits, maxAllowedHeight / 230, isMobile ? 0.82 : 1.35)
      );

      const glyphH = 100 * scale;
      const lineSpacing = glyphH * (isMobile ? 0.22 : 0.26);
      const totalBlockHeight = glyphH * 2 + lineSpacing;
      const subtitleGap = Math.max(isMobile ? 14 : 22, glyphH * 0.25);
      const subtitleH = isMobile ? 22 : 28;
      const totalCompositionH = totalBlockHeight + subtitleGap + subtitleH;

      const targetCenterY = height * (isMobile ? 0.44 : 0.46);
      const startY = Math.max(isMobile ? 32 : 40, targetCenterY - totalCompositionH / 2);

      let globalGlyphIndex = 0;
      const totalNonSpaceChars = LINES.reduce(
        (acc, line) => acc + line.filter((c) => c !== " ").length,
        0
      );

      for (let lineIdx = 0; lineIdx < LINES.length; lineIdx++) {
        const chars = LINES[lineIdx];
        const lineUnits =
          chars.reduce((acc, ch) => acc + (COMPILED_GLYPHS[ch]?.w || 0), 0) +
          letterGap * (chars.length - 1);
        const lineWidth = lineUnits * scale;
        const startX = (width - lineWidth) / 2;
        const lineY = startY + lineIdx * (glyphH + lineSpacing);

        let cursorUnitsX = 0;

        for (let i = 0; i < chars.length; i++) {
          const ch = chars[i];
          const glyph = COMPILED_GLYPHS[ch];
          if (!glyph) continue;

          const charUnitsX = cursorUnitsX;
          const charScreenX = startX + charUnitsX * scale;
          cursorUnitsX += glyph.w + letterGap;

          if (ch === " ") continue;

          const staggerWindow = 0.52;
          const charWindow = 1 - staggerWindow;
          const delay = (globalGlyphIndex / (totalNonSpaceChars - 1)) * staggerWindow;
          globalGlyphIndex++;

          const u = clamp((masterProgress - delay) / charWindow, 0, 1);

          const strokeT = easeInOutCubic(clamp(u / 0.64, 0, 1));
          const backWaveT = easeOutQuart(clamp((u - 0.16) / 0.84, 0, 1));
          const midWaveT = easeOutQuart(clamp((u - 0.21) / 0.79, 0, 1));
          const frontWaveT = easeInOutCubic(clamp((u - 0.25) / 0.75, 0, 1));

          ctx.save();
          ctx.translate(charScreenX, lineY);
          ctx.scale(scale, scale);

          // Architectural outline
          ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
          ctx.lineWidth = 1.1 / scale;
          ctx.stroke(glyph.combinedPath2D);

          // 3-Layer Spline Liquid Fill inside glyph
          if (backWaveT > 0) {
            ctx.save();
            ctx.clip(glyph.combinedPath2D, "evenodd");

            if (frontWaveT < 1) {
              drawSplineLiquidLayer(ctx, glyph.w, backWaveT, charUnitsX, time, {
                amplitude: 9.5,
                speed: 1.15,
                phase: lineIdx * 1.5,
                fillStyle: "rgba(255, 255, 255, 0.14)",
              });

              drawSplineLiquidLayer(ctx, glyph.w, midWaveT, charUnitsX, time, {
                amplitude: 7.8,
                speed: -1.4,
                phase: lineIdx * 2.1 + 1.2,
                fillStyle: "rgba(255, 255, 255, 0.4)",
              });
            }

            const liqGrad = ctx.createLinearGradient(0, 0, 0, 100);
            liqGrad.addColorStop(0, "#ffffff");
            liqGrad.addColorStop(0.65, "#efeff2");
            liqGrad.addColorStop(1, "#c8c8d2");

            drawSplineLiquidLayer(ctx, glyph.w, frontWaveT, charUnitsX, time, {
              amplitude: 6.0,
              speed: 1.6,
              phase: lineIdx * 1.8 + 2.8,
              fillStyle: liqGrad,
              crestStroke: frontWaveT >= 0.99 ? null : "#ffffff",
              crestWidth: (isMobile ? 1.5 : 1.8) / scale,
            });

            // Diamond shimmer sweep across completed letters
            if (holdProgress > 0.04 && holdProgress < 0.95) {
              const normHold = (holdProgress - 0.04) / 0.91;
              const sweepPos = easeInOutCubic(normHold) * (lineUnits + 360) - 180;
              const localSweepX = sweepPos - charUnitsX;

              const sheenGrad = ctx.createLinearGradient(
                localSweepX - 70,
                -10,
                localSweepX + 70,
                110
              );
              sheenGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
              sheenGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.45)");
              sheenGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

              ctx.globalCompositeOperation = "source-atop";
              ctx.fillStyle = sheenGrad;
              ctx.fillRect(-15, -15, glyph.w + 30, 130);
              ctx.globalCompositeOperation = "source-over";
            }

            ctx.restore();
          }

          // Precision border trace + glowing comet tip (retina-optimized)
          if (strokeT > 0 && strokeT < 1) {
            for (const contour of glyph.contours) {
              const len = contour.length;

              ctx.save();
              ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
              ctx.lineWidth = (isMobile ? 1.6 : 1.9) / scale;
              ctx.lineCap = "round";
              ctx.lineJoin = "round";
              ctx.setLineDash([len, len]);
              ctx.lineDashOffset = len * (1 - strokeT);
              ctx.stroke(contour.p2d);
              ctx.restore();

              if (strokeT > 0.008 && strokeT < 0.992) {
                const cometLength = Math.min(len * strokeT, isMobile ? 32 : 42);

                ctx.save();
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = (isMobile ? 2.5 : 3.0) / scale;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.shadowColor = "#ffffff";
                ctx.shadowBlur = isMobile ? 8 : 10;
                ctx.setLineDash([cometLength, len]);
                ctx.lineDashOffset = -(len * strokeT - cometLength);
                ctx.stroke(contour.p2d);
                ctx.restore();

                const tip = typeof contour.svgPath.getPointAtLength === "function" ? contour.svgPath.getPointAtLength(len * strokeT) : { x: 0, y: 0 };
                ctx.save();
                ctx.fillStyle = "#ffffff";
                ctx.shadowColor = "#ffffff";
                ctx.shadowBlur = isMobile ? 10 : 14;
                ctx.beginPath();
                ctx.arc(tip.x, tip.y, (isMobile ? 2.1 : 2.5) / scale, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
              }
            }
          } else if (strokeT >= 1) {
            for (const contour of glyph.contours) {
              ctx.save();
              ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
              ctx.lineWidth = (isMobile ? 1.6 : 1.9) / scale;
              ctx.lineCap = "round";
              ctx.lineJoin = "round";
              ctx.stroke(contour.p2d);
              ctx.restore();
            }
          }

          ctx.restore();
        }
      }

      if (masterProgress < 1 || holdProgress < 1) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    }

    renderLoopRef.current = render;
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [compiledGlyphs]);

  // Click on canvas restarts animation
  const handleStageClick = () => {
    startTimeRef.current = performance.now();
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (renderLoopRef.current) {
      animFrameRef.current = requestAnimationFrame(renderLoopRef.current);
    }
  };

  if (isDone) return null;

  return (
    <div
      className={`intro-stage-container ${isExiting ? "intro-cinematic-exit" : ""}`}
      onClick={handleStageClick}
      role="button"
      tabIndex={0}
      aria-label="Click to replay intro animation. Scroll down to enter portfolio."
    >
      {/* Main Fullscreen Stage Canvas */}
      <canvas ref={canvasRef} id="stage" className="intro-stage-canvas" />

      {/* 100% Optically Centered Subtitle */}
      <div
        className="intro-subtitle-box"
        style={{
          top: subtitleY ? `${subtitleY}px` : "calc(50% + 80px)",
        }}
      >
        <h2 className="intro-role-title">AI/ML &amp; PYTHON DEVELOPER</h2>
      </div>

      {/* 100% Transparent Luxury Scroll Down Indicator (tap or scroll to enter) */}
      <div
        className="intro-scroll-indicator"
        onClick={(e) => {
          e.stopPropagation();
          triggerEnter();
        }}
        role="button"
        tabIndex={0}
        title="Scroll down or tap to enter portfolio"
        aria-label="Scroll down or tap to enter portfolio"
      >
        <div className="scroll-capsule">
          <div className="scroll-dot" />
        </div>
        <span className="scroll-text">SCROLL DOWN</span>
      </div>
    </div>
  );
};

export default InitialLoader;