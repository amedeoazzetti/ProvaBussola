'use client';

import { Text } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { Group, MeshStandardMaterial, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { animationConfig } from '@/lib/animationConfig';
import { compassVisual } from '@/lib/visualConfig';
import { CompassNeedle } from './CompassNeedle';

type CompassModelProps = {
  targetPosition: Vector3;
  targetScale: number;
};

const bronzeMaterial = new MeshStandardMaterial({
  color: '#6a4a2b',
  metalness: 0.9,
  roughness: 0.34,
});

const bronzeDarkMaterial = new MeshStandardMaterial({
  color: '#2d2013',
  metalness: 0.86,
  roughness: 0.48,
});

const brushedGoldMaterial = new MeshStandardMaterial({
  color: '#b99a62',
  metalness: 0.85,
  roughness: 0.24,
});

const dialMaterial = new MeshStandardMaterial({
  color: '#111823',
  metalness: 0.25,
  roughness: 0.68,
});

const ivoryMaterial = new MeshStandardMaterial({
  color: '#dcc9a3',
  metalness: 0.5,
  roughness: 0.32,
});

export function CompassModel({ targetPosition, targetScale }: CompassModelProps) {
  const rootRef = useRef<Group>(null);
  const needlePivotRef = useRef<Group>(null);
  const worldPos = useMemo(() => new Vector3(), []);
  const rayPoint = useMemo(() => new Vector3(), []);
  const rayDirection = useMemo(() => new Vector3(), []);
  const hitPoint = useMemo(() => new Vector3(), []);

  const degreeMarkers = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 120;
        const cardinal = i % 30 === 0;
        const major = i % 10 === 0;
        return {
          angle,
          width: cardinal ? 0.05 : major ? 0.03 : 0.016,
          length: cardinal ? 0.38 : major ? 0.22 : 0.12,
          y: cardinal ? 1.58 : major ? 1.55 : 1.54,
        };
      }),
    [],
  );

  const rivets = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 24;
        return {
          x: Math.sin(angle) * 2.03,
          y: Math.cos(angle) * 2.03,
          angle,
        };
      }),
    [],
  );

  useFrame((state) => {
    if (!rootRef.current) return;

    rootRef.current.position.lerp(targetPosition, animationConfig.compassLerp);
    const currentScale = rootRef.current.scale.x;
    const nextScale = currentScale + (targetScale - currentScale) * animationConfig.compassLerp;
    rootRef.current.scale.setScalar(nextScale);

    if (!needlePivotRef.current) return;

    rootRef.current.getWorldPosition(worldPos);
    const pointer = state.pointer;
    rayPoint.set(pointer.x, pointer.y, 0.5).unproject(state.camera);
    rayDirection.copy(rayPoint).sub(state.camera.position).normalize();
    const distance = -state.camera.position.z / rayDirection.z;
    hitPoint.copy(state.camera.position).addScaledVector(rayDirection, distance);

    const dx = hitPoint.x - worldPos.x;
    const dy = hitPoint.y - worldPos.y;
    const targetAngle = Math.atan2(dx, dy);
    const current = needlePivotRef.current.rotation.z;
    let delta = targetAngle - current;
    delta = Math.atan2(Math.sin(delta), Math.cos(delta));
    needlePivotRef.current.rotation.z = current + delta * animationConfig.needleLerp;
  });

  return (
    <group ref={rootRef} rotation={[compassVisual.tiltX, compassVisual.tiltY, 0]} scale={1}>
      <mesh material={bronzeDarkMaterial} receiveShadow castShadow>
        <cylinderGeometry args={[2.34, 2.26, 0.42, 128]} />
      </mesh>

      <mesh position={[0, 0, 0.11]} material={bronzeMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[2.18, 2.04, 0.24, 128, 1, true]} />
      </mesh>

      <mesh position={[0, 0, 0.17]} material={brushedGoldMaterial}>
        <cylinderGeometry args={[1.84, 1.78, 0.04, 120, 1, true]} />
      </mesh>

      <mesh position={[0, 0, 0.08]} material={dialMaterial} receiveShadow>
        <cylinderGeometry args={[1.78, 1.78, 0.2, 120]} />
      </mesh>

      <mesh position={[0, 0, 0.202]} material={brushedGoldMaterial}>
        <ringGeometry args={[1.16, 1.18, 120]} />
      </mesh>
      <mesh position={[0, 0, 0.203]} material={brushedGoldMaterial}>
        <ringGeometry args={[0.808, 0.82, 96]} />
      </mesh>

      <mesh position={[0, 0, 0.205]} material={bronzeDarkMaterial}>
        <boxGeometry args={[0.04, 3.2, 0.015]} />
      </mesh>
      <mesh position={[0, 0, 0.205]} rotation={[0, 0, Math.PI / 2]} material={bronzeDarkMaterial}>
        <boxGeometry args={[0.04, 3.2, 0.015]} />
      </mesh>

      {degreeMarkers.map((marker) => (
        <group key={marker.angle} rotation={[0, 0, marker.angle]}>
          <mesh position={[0, marker.y, 0.2]} material={ivoryMaterial}>
            <boxGeometry args={[marker.width, marker.length, 0.03]} />
          </mesh>
        </group>
      ))}

      {rivets.map((rivet) => (
        <mesh key={rivet.angle} position={[rivet.x, rivet.y, 0.24]} material={brushedGoldMaterial} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.04, 14]} />
        </mesh>
      ))}

      <group position={[0, 0, 0.25]}>
        {([
          ['N', [0, 1.37, 0], '#ecd7a8'],
          ['E', [1.37, 0, 0], '#dbc9a0'],
          ['S', [0, -1.37, 0], '#dbc9a0'],
          ['W', [-1.37, 0, 0], '#dbc9a0'],
          ['NE', [0.95, 0.95, 0], '#b8a684'],
          ['SE', [0.95, -0.95, 0], '#b8a684'],
          ['SW', [-0.95, -0.95, 0], '#b8a684'],
          ['NW', [-0.95, 0.95, 0], '#b8a684'],
        ] as const).map(([label, pos, color]) => (
          <Text
            key={label}
            position={pos}
            fontSize={label.length === 1 ? 0.27 : 0.11}
            color={color}
            anchorX="center"
            anchorY="middle"
            fontWeight={700}
          >
            {label}
          </Text>
        ))}
      </group>

      <group ref={needlePivotRef}>
        <CompassNeedle />
      </group>

      <mesh position={[0, 0, 0.35]} material={brushedGoldMaterial} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.12, 28]} />
      </mesh>
      <mesh position={[0, 0, 0.41]} material={bronzeMaterial}>
        <sphereGeometry args={[0.08, 20, 20]} />
      </mesh>
    </group>
  );
}
