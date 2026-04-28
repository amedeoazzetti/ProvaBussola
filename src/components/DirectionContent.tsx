'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { directionContent, directionLayout, type Direction } from '@/lib/compassConfig';
import { animationConfig } from '@/lib/animationConfig';

export function DirectionContent({ activeDirection }: { activeDirection: Direction }) {
  const content = directionContent[activeDirection];
  const layout = directionLayout[activeDirection];

  return (
    <div className={`pointer-events-none absolute z-10 max-w-xl px-6 md:px-10 ${layout.contentAnchorClass}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDirection}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: animationConfig.uiDuration * 0.65, ease: animationConfig.uiEase }}
          className={`${layout.contentAlignClass}`}
        >
          <p className="font-serif text-4xl font-semibold tracking-wide text-ivory md:text-6xl">{content.title}</p>
          <p className="mt-2 max-w-md text-sm text-amber-50/80 md:text-base">{content.subtitle}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
