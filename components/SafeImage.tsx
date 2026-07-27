'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80';

export function SafeImage({ src, alt, ...props }: ImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(typeof src === 'string' && src ? src : FALLBACK_IMAGE);

  React.useEffect(() => {
    setImgSrc(typeof src === 'string' && src ? src : FALLBACK_IMAGE);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || 'L’AVENIR Luxury Atelier'}
      onError={() => {
        setImgSrc(FALLBACK_IMAGE);
      }}
    />
  );
}

export function SafeImg({ src, alt, className, onError, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [imgSrc, setImgSrc] = useState<string>(typeof src === 'string' && src ? src : FALLBACK_IMAGE);

  React.useEffect(() => {
    setImgSrc(typeof src === 'string' && src ? src : FALLBACK_IMAGE);
  }, [src]);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt || 'L’AVENIR Luxury Atelier'}
      className={className}
      onError={(e) => {
        setImgSrc(FALLBACK_IMAGE);
        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
        if (onError) onError(e);
      }}
    />
  );
}
