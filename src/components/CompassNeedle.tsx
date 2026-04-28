'use client';

import { MeshStandardMaterial } from 'three';

const rubyMaterial = new MeshStandardMaterial({
  color: '#d1141f',
  metalness: 0.55,
  roughness: 0.18,
  emissive: '#3a0408',
  emissiveIntensity: 0.36,
});

const brassMaterial = new MeshStandardMaterial({
  color: '#c6a163',
  metalness: 0.82,
  roughness: 0.24,
});

const darkMetalMaterial = new MeshStandardMaterial({
  color: '#4c3921',
  metalness: 0.85,
  roughness: 0.35,
});

export function CompassNeedle() {
  return (
    <group>
      <mesh position={[0, 0.12, 0.2]} material={brassMaterial}>
        <cylinderGeometry args={[0.035, 0.035, 2.05, 18]} />
      </mesh>

      <mesh position={[0, 0.98, 0.23]} material={rubyMaterial} castShadow>
        <coneGeometry args={[0.14, 1.6, 4]} />
      </mesh>
      <mesh position={[0, 0.98, 0.235]} material={brassMaterial}>
        <coneGeometry args={[0.16, 1.63, 4]} />
      </mesh>

      <mesh position={[0, -0.58, 0.22]} rotation={[0, 0, Math.PI]} material={darkMetalMaterial}>
        <coneGeometry args={[0.1, 0.92, 4]} />
      </mesh>
      <mesh position={[0, -0.58, 0.225]} rotation={[0, 0, Math.PI]} material={brassMaterial}>
        <coneGeometry args={[0.118, 0.96, 4]} />
      </mesh>

      <mesh position={[0, 0, 0.255]} material={brassMaterial} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.14, 30]} />
      </mesh>
      <mesh position={[0, 0, 0.29]} material={rubyMaterial}>
        <cylinderGeometry args={[0.1, 0.1, 0.08, 24]} />
      </mesh>
    </group>
  );
}
