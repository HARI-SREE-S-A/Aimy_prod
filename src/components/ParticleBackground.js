"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { useScrollStore } from '../store/store';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the heavy 3D Scene component to code-split and lazy-load Three.js
const Scene = dynamic(() => import('./canvas/Scene').then(mod => mod.Scene), { ssr: false });

export default function ParticleBackground() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Verify WebGL capability on startup to fail-safely switch to CSS animations
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  useEffect(() => {
    if (!isHomepage || !hasWebGL) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      
      const numChapters = 8; // Mirrors chapters.js length
      const continuousChapter = progress * (numChapters - 1);
      const chapter = Math.floor(continuousChapter);
      const chapterProgress = continuousChapter - chapter;
      
      // Update global store so the shader can slowly rotate/react to overall scroll and morph
      useScrollStore.setState({ progress, chapter, chapterProgress });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage, hasWebGL]);

  // Handle fallback to hardware-accelerated CSS ambient animations for all subpages and WebGL failures
  if (!isHomepage || !hasWebGL) {
    return (
      <div className="ambient-bg">
        <div className="ambient-glow" />
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#050505', pointerEvents: 'none' }}>
      {/* Background ambient glow to avoid raw black screen while WebGL compiling */}
      <div className="ambient-bg">
        <div className="ambient-glow" />
      </div>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}
