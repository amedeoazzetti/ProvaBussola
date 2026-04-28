'use client';

import { useMemo } from 'react';
import { MeshStandardMaterial, Shape } from 'three';

const rubyMaterial = new MeshStandardMaterial({
  color: '#c41a26',
  metalness: 0.45,
  roughness: 0.22,
  emissive: '#360409',
  emissiveIntensity: 0.32,
});

const goldRimMaterial = new MeshStandardMaterial({
  color: '#d8b66e',
  metalness: 0.88,
  roughness: 0.22,
});

const darkBronzeMaterial = new MeshStandardMaterial({
  color: '#3a2916',
  metalness: 0.82,
  roughness: 0.4,
});

const NORTH_LENGTH = 1.55;
const SOUTH_LENGTH = 0.95;
const HALF_WIDTH = 0.085;

function makeNeedleShape(length: number, halfWidth: number) {
  const shape = new Shape();
  shape.moveTo(0, length);
  shape.lineTo(halfWidth, 0);
  shape.lineTo(-halfWidth, 0);
  shape.lineTo(0, length);
  return shape;
}

export function CompassNeedle() {
  const northShape = useMemo(() => makeNeedleShape(NORTH_LENGTH, HALF_WIDTH), []);
  const northRimShape = useMemo(() => makeNeedleShape(NORTH_LENGTH + 0.04, HALF_WIDTH + 0.018), []);
  const southShape = useMemo(() => makeNeedleShape(SOUTH_LENGTH, HALF_WIDTH * 0.85), []);
  const southRimShape = useMemo(
    () => makeNeedleShape(SOUTH_LENGTH + 0.03, HALF_WIDTH * 0.85 + 0.014),
    [],
  );

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <shapeGeometry args={[northRimShape]} />
        <primitive object={goldRimMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0, 0.004]}>
        <shapeGeometry args={[northShape]} />
        <primitive object={rubyMaterial} attach="material" />
      </mesh>

      <group rotation={[0, 0, Math.PI]}>
        <mesh position={[0, 0, 0]}>
          <shapeGeometry args={[southRimShape]} />
          <primitive object={goldRimMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.004]}>
          <shapeGeometry args={[southShape]} />
          <primitive object={darkBronzeMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
