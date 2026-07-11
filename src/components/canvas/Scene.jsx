"use client";
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { Effects } from './Effects';
import { chapters } from '../../data/chapters';

export function Scene() {
  return (
    <Canvas
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 18], fov: 35 }}
      dpr={[1, 1.5]}
      frameloop="demand"
    >
      <color attach="background" args={['#050505']} />
      <ParticleField chapters={chapters} particleCount={800} />
      <Effects />
    </Canvas>
  );
}

