'use client';

import { useScrollReveal } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
  delay?: number;
}

export function Reveal({ children, className, direction = 'up', delay = 0 }: RevealProps) {
  const { ref, visible } = useScrollReveal();

  const dirClass = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    none: 'reveal',
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(dirClass, visible && 'visible', className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
