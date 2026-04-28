'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Vector3 } from 'three';
import { CompassModel } from './CompassModel';
import { DirectionButton } from './DirectionButton';
import { DirectionContent } from './DirectionContent';
import { SceneCamera } from './SceneCamera';
import { directionLayout, type Direction } from '@/lib/compassConfig';

type SceneRigProps = {
  activeDirection: Direction;
};

function SceneRig({ activeDirection }: SceneRigProps) {
  const { viewport } = useThree();
  const target = directionLayout[activeDirection];

  const targetPosition = useMemo(() => {
    const x = (target.compassAnchor.x - 0.5) * viewport.width;
    const y = (0.5 - target.compassAnchor.y) * viewport.height;
    return new Vector3(x, y, 0);
  }, [target.compassAnchor.x, target.compassAnchor.y, viewport.height, viewport.width]);

  return (
    <Float speed={0.6} rotationIntensity={0.12} floatIntensity={0.14}>
      <CompassModel targetPosition={targetPosition} targetScale={target.compassScale} />
    </Float>
  );
}

export function CompassScene() {
  const [activeDirection, setActiveDirection] = useState<Direction>('center');

  const buttons = [
    { direction: 'north', className: 'left-1/2 top-6 -translate-x-1/2' },
    { direction: 'south', className: 'bottom-6 left-1/2 -translate-x-1/2' },
    { direction: 'east', className: 'right-6 top-1/2 -translate-y-1/2' },
    { direction: 'west', className: 'left-6 top-1/2 -translate-y-1/2' },
  ] as const;

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <SceneCamera />
          <ambientLight intensity={0.45} />
          <directionalLight
            castShadow
            intensity={1.25}
            color="#fff2d0"
            position={[4, 5, 6]}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-4, -3, 4]} intensity={0.65} color="#6c8ec5" />
          <SceneRig activeDirection={activeDirection} />
        </Canvas>
      </div>

      <DirectionContent activeDirection={activeDirection} />

      <div className="pointer-events-none absolute inset-0 z-20">
        {buttons.map(({ direction, className }) => (
          <DirectionButton
            key={direction}
            direction={direction}
            activeDirection={activeDirection}
            onClick={(next) => setActiveDirection(next)}
            style={{
              pointerEvents: 'auto',
            }}
            className={className}
          />
        ))}
      </div>

      {activeDirection !== 'center' && (
        <motion.button
          type="button"
          aria-label="Torna alla vista centrale"
          onClick={() => setActiveDirection('center')}
          className="absolute left-4 top-4 z-30 rounded-full border border-amber-100/45 bg-black/55 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-amber-50/90 backdrop-blur-sm transition hover:border-amber-100/80 hover:bg-black/70 md:left-6 md:top-6"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          whileTap={{ scale: 0.96 }}
        >
          ← Indietro
        </motion.button>
      )}

    </main>
  );
}
