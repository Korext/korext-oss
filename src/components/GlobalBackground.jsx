'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const DOT_SPACING = 30;
const DOT_RADIUS = 1.2;
const GLOW_RADIUS = 220;
const BASE_ALPHA = 0.08;
const GLOW_COLOR = [130, 100, 255]; // indigo-violet
const RESIZE_DEBOUNCE_MS = 150;

export default function GlobalBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const dotsRef = useRef([]);
  const dirtyRef = useRef(true);
  const reducedMotionRef = useRef(false);
  const resizeTimerRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = canvas;
    const dots = [];
    for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
      for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
        dots.push({ x, y });
      }
    }
    dotsRef.current = dots;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildGrid();
    dirtyRef.current = true;
  }, [buildGrid]);

  const debouncedResize = useCallback(() => {
    if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    resizeTimerRef.current = setTimeout(resize, RESIZE_DEBOUNCE_MS);
  }, [resize]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!dirtyRef.current) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }

    dirtyRef.current = false;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { x: mx, y: my } = mouseRef.current;
    const dots = dotsRef.current;
    const skipGlow = reducedMotionRef.current;

    for (let i = 0; i < dots.length; i++) {
      const { x, y } = dots[i];

      if (!skipGlow) {
        const dx = x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ratio = Math.max(0, 1 - dist / GLOW_RADIUS);

        if (ratio > 0) {
          const r = Math.round(255 + (GLOW_COLOR[0] - 255) * ratio);
          const g = Math.round(255 + (GLOW_COLOR[1] - 255) * ratio);
          const b = Math.round(255 + (GLOW_COLOR[2] - 255) * ratio);
          const a = BASE_ALPHA + (0.8 - BASE_ALPHA) * ratio;
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS + ratio * 1.2, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }
      }

      ctx.fillStyle = `rgba(255,255,255,${BASE_ALPHA})`;
      ctx.beginPath();
      ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    // Only enable on desktop screens (avoids SSR hydration mismatch)
    if (window.innerWidth >= 768) {
      setEnabled(true);
    }

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      reducedMotionRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    resize();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener('resize', debouncedResize, { passive: true });

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dirtyRef.current = true;
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      dirtyRef.current = true;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimerRef.current);
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, resize, debouncedResize, draw]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0, opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
