'use client';

import { useEffect, useRef } from 'react';

export default function LedCursor() {
  const dotRef = useRef(null);
  const auraRef = useRef(null);

  useEffect(() => {
    // Only run on desktop/pointing devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      document.body.style.cursor = 'auto';
      return;
    }

    const dot = dotRef.current;
    const aura = auraRef.current;
    if (!dot || !aura) return;

    let mouseX = -100;
    let mouseY = -100;
    let auraX = -100;
    let auraY = -100;
    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update dot position instantly without React state overhead
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(${isHovering ? 1.5 : 1})`;
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isHoverable = 
        target.tagName && (
          target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') || 
          target.closest('button') ||
          (target.classList && target.classList.contains('card'))
        );

      if (isHoverable) {
        isHovering = true;
        dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(1.5)`;
        dot.style.backgroundColor = '#ffffff';
        aura.style.opacity = '0.8';
      } else {
        isHovering = false;
        dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(1)`;
        dot.style.backgroundColor = '#E31E24';
        aura.style.opacity = '0.4';
      }
    };

    // Smooth animation loop for the aura using requestAnimationFrame
    let frameId;
    const tick = () => {
      // Lerp aura position towards mouse
      auraX += (mouseX - auraX) * 0.15;
      auraY += (mouseY - auraY) * 0.15;
      
      aura.style.transform = `translate3d(${auraX - 200}px, ${auraY - 200}px, 0)`;
      
      frameId = requestAnimationFrame(tick);
    };
    
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    frameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="led-cursor-dot" style={{ willChange: 'transform' }} />
      <div ref={ref => { auraRef.current = ref; }} className="led-cursor-aura" style={{ willChange: 'transform', opacity: 0.4 }} />
    </>
  );
}
