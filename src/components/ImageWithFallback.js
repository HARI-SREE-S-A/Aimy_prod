'use client';

import { useState, useCallback } from 'react';

export default function ImageWithFallback({ src, fallbackSrc, fallbackStyle, style, alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [currentStyle, setCurrentStyle] = useState(style);
  const [triedPng, setTriedPng] = useState(false);

  const handleError = useCallback(() => {
    if (!triedPng && imgSrc.endsWith('.jpg')) {
      // Try .png variant before giving up
      setTriedPng(true);
      setImgSrc(imgSrc.replace(/\.jpg$/, '.png'));
    } else if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      if (fallbackStyle) setCurrentStyle({ ...style, ...fallbackStyle });
    }
  }, [imgSrc, triedPng, fallbackSrc, fallbackStyle, style]);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      style={currentStyle}
      loading="lazy"
      onError={handleError}
    />
  );
}

