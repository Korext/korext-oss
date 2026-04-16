'use client';

import { useEffect, useRef, useCallback } from 'react';

const DOT_SPACING = 30;
const DOT_RADIUS = 1.2;
const GLOW_RADIUS = 220;
const BASE_ALPHA = 0.08;
const GLOW_COLOR = [130, 100, 255]; // indigo-violet

export default function GlobalBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const dotsRef = useRef([]);
  const reducedMotionRef = useRef(false);

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
  }, [buildGrid]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      reducedMotionRef.current = true;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    resize();
    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener('resize', onResize, { passive: true });

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [resize, draw]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0, opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
