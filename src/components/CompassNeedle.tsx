'use client';

import { MeshStandardMaterial } from 'three';

const northMaterial = new MeshStandardMaterial({
  color: '#c33a2d',
  metalness: 0.55,
  roughness: 0.28,
  emissive: '#250604',
  emissiveIntensity: 0.25,
});

const southMaterial = new MeshStandardMaterial({
  color: '#bfa473',
  metalness: 0.75,
  roughness: 0.3,
});

export function CompassNeedle() {
  return (
    <group>
      <mesh position={[0, 0.8, 0.19]} material={northMaterial}>
        <coneGeometry args={[0.11, 1.8, 4]} />
      </mesh>
      <mesh position={[0, -0.8, 0.19]} rotation={[0, 0, Math.PI]} material={southMaterial}>
        <coneGeometry args={[0.09, 1.5, 4]} />
      </mesh>
      <mesh position={[0, 0, 0.22]} material={southMaterial}>
        <cylinderGeometry args={[0.22, 0.22, 0.13, 28]} />
      </mesh>
    </group>
  );
}
