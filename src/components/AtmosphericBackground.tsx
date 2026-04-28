'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { animationConfig } from '@/lib/animationConfig';
import type { Direction } from '@/lib/compassConfig';
import { backgroundByDirection } from '@/lib/visualConfig';

export function AtmosphericBackground({ activeDirection }: { activeDirection: Direction }) {
  const current = backgroundByDirection[activeDirection];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDirection}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animationConfig.uiDuration, ease: animationConfig.uiEase }}
          style={{ backgroundImage: current.gradient }}
        />
      </AnimatePresence>

      <motion.div
        key={`${activeDirection}-glow`}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: animationConfig.uiDuration * 1.15, ease: animationConfig.uiEase }}
        style={{ backgroundImage: current.glow }}
      />

      <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,0.62)_0.35px,transparent_0.35px)] [background-size:3px_3px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.52)_100%)]" />
    </div>
  );
}
