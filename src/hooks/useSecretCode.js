'use client';
import { useState, useEffect, useRef } from 'react';

export default function useSecretCode(secretCode = 'admin') {
  const [isTriggered, setIsTriggered] = useState(false);
  const bufferRef = useRef('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        return;
      }
      
      const char = e.key.length === 1 ? e.key : '';
      
      // Append the new character to the buffer
      bufferRef.current += char;
      
      // Keep only the last N characters (where N is the length of the secret code)
      if (bufferRef.current.length > secretCode.length) {
        bufferRef.current = bufferRef.current.slice(bufferRef.current.length - secretCode.length);
      }
      
      if (bufferRef.current === secretCode) {
        setIsTriggered(true);
        bufferRef.current = ''; // Reset after triggering
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [secretCode]);

  return { isTriggered, setIsTriggered };
}
