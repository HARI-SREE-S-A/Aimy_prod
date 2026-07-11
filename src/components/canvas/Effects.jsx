"use client";
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// Minimal post-processing — only the essentials for LED glow look.
// Removed ChromaticAberration and Noise to halve GPU render passes.
export function Effects() {
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <Bloom 
        luminanceThreshold={0.3} 
        luminanceSmoothing={0.9} 
        intensity={1.2} 
      />
      <Vignette 
        eskil={false} 
        offset={0.15} 
        darkness={0.8} 
        blendFunction={BlendFunction.NORMAL} 
      />
    </EffectComposer>
  );
}
