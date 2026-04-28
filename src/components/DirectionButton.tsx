'use client';

import type { Direction } from '@/lib/compassConfig';
import type { CSSProperties } from 'react';

type DirectionButtonProps = {
  direction: Exclude<Direction, 'center'>;
  activeDirection: Direction;
  onClick: (direction: Exclude<Direction, 'center'>) => void;
  style: CSSProperties;
};

export function DirectionButton({ direction, activeDirection, onClick, style }: DirectionButtonProps) {
  const isActive = activeDirection === direction;
  return (
    <button
      type="button"
      aria-label={`Open ${direction} section`}
      onClick={() => onClick(direction)}
      style={style}
      className={`absolute z-20 h-11 w-11 rounded-full border text-[11px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 md:h-12 md:w-12 ${
        isActive
          ? 'border-amber-200/90 bg-amber-100/20 text-amber-50 shadow-glow'
          : 'border-amber-200/40 bg-black/35 text-amber-100/90 hover:border-amber-100/80 hover:bg-amber-200/10'
      }`}
    >
      {direction.slice(0, 1)}
    </button>
  );
}
