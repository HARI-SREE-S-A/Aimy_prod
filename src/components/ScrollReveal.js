'use client';

import { useEffect, useRef } from 'react';

/**
 * Pure CSS/IntersectionObserver scroll reveal — zero JS animation overhead.
 * Replaces Framer Motion's whileInView which was causing scroll jank 
 * due to per-element spring physics running on the main thread.
 */
export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  className = '',
  style = {}
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sr-visible');
          observer.unobserve(el); // once: true
        }
      },
      { rootMargin: '-60px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass = `sr-${direction}`;

  return (
    <div 
      ref={ref} 
      className={`sr ${dirClass} ${className}`}
      style={{ 
        ...style,
        transitionDelay: `${delay}s`,
        transitionDuration: `${duration}s`,
        height: '100%'
      }}
    >
      {children}
    </div>
  );
}
