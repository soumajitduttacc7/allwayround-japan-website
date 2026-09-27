/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  isDarkMode: boolean;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate gentle drifting particles around the center
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: width * 0.5 + (Math.random() - 0.5) * width * 0.7,
      y: height * 0.5 + (Math.random() - 0.5) * height * 0.65,
      radius: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -Math.random() * 0.35 - 0.08, // Slow upward drift
      alpha: Math.random() * 0.55 + 0.2,
      baseAlpha: Math.random() * 0.55 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Determine palette based on theme
      const r = isDarkMode ? 165 : 255;
      const g = isDarkMode ? 195 : 210;
      const b = isDarkMode ? 255 : 180;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(frame * 0.015 + p.angle) * 0.15;
        p.y += p.vy;

        // Wrap around viewport bounds
        if (p.y < 0) {
          p.y = height;
          p.x = width * 0.5 + (Math.random() - 0.5) * width * 0.7;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Gentle breathing alpha
        const currentAlpha = p.baseAlpha * (0.65 + 0.35 * Math.sin(frame * p.pulseSpeed));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.8})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        mixBlendMode: 'screen',
      }}
    />
  );
};
