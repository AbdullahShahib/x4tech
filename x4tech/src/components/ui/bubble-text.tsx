import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface BubbleTextProps {
  text: string;
  className?: string;
}

export function BubbleText({ text, className }: BubbleTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <h3
      onMouseLeave={() => setHoveredIndex(null)}
      className={cn('text-left text-lg md:text-xl font-light !text-black', className)}
    >
      {text.split('').map((char, idx) => {
        const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - idx) : null;

        let classes = 'transition-all duration-300 ease-in-out cursor-default';
        switch (distance) {
          case 0:
            classes += ' font-black !text-black';
            break;
          case 1:
            classes += ' font-medium !text-black';
            break;
          case 2:
            classes += ' font-normal';
            break;
          default:
            break;
        }

        return (
          <span key={idx} onMouseEnter={() => setHoveredIndex(idx)} className={classes}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </h3>
  );
}