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

const RADIUS = 2.4;

const Z = {
  base: 0,
  baseRim: 0.012,
  dial: 0.024,
  rings: 0.034,
  ticks: 0.04,
  letters: 0.05,
  needle: 0.07,
  pin: 0.11,
};

const baseMaterial = new MeshStandardMaterial({
  color: '#5a3d22',
  metalness: 0.78,
  roughness: 0.42,
});

const baseRimMaterial = new MeshStandardMaterial({
  color: '#8a6a3c',
  metalness: 0.88,
  roughness: 0.3,
});

const dialMaterial = new MeshStandardMaterial({
  color: '#1b2535',
  metalness: 0.2,
  roughness: 0.72,
});

const goldMaterial = new MeshStandardMaterial({
  color: '#c5a368',
  metalness: 0.85,
  roughness: 0.26,
});

const ivoryMaterial = new MeshStandardMaterial({
  color: '#e7d6a8',
  metalness: 0.35,
  roughness: 0.45,
});

const ivoryDimMaterial = new MeshStandardMaterial({
  color: '#a99366',
  metalness: 0.4,
  roughness: 0.5,
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
        const isCardinal = i % 30 === 0;
        const isMajor = i % 10 === 0;
        return {
          angle,
          width: isCardinal ? 0.045 : isMajor ? 0.028 : 0.014,
          length: isCardinal ? 0.32 : isMajor ? 0.2 : 0.1,
          radial: RADIUS - 0.22,
          material: isCardinal ? ivoryMaterial : isMajor ? ivoryMaterial : ivoryDimMaterial,
        };
      }),
    [],
  );

  const rivets = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 16;
        return {
          angle,
          x: Math.sin(angle) * (RADIUS - 0.06),
          y: Math.cos(angle) * (RADIUS - 0.06),
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
      <mesh position={[0, 0, Z.base]} material={baseMaterial} receiveShadow>
        <circleGeometry args={[RADIUS, 128]} />
      </mesh>

      <mesh position={[0, 0, Z.baseRim]} material={baseRimMaterial}>
        <ringGeometry args={[RADIUS - 0.14, RADIUS - 0.02, 128]} />
      </mesh>

      <mesh position={[0, 0, Z.baseRim + 0.002]} material={goldMaterial}>
        <ringGeometry args={[RADIUS - 0.04, RADIUS - 0.02, 128]} />
      </mesh>

      <mesh position={[0, 0, Z.dial]} material={dialMaterial} receiveShadow>
        <circleGeometry args={[RADIUS - 0.18, 128]} />
      </mesh>

      <mesh position={[0, 0, Z.rings]} material={goldMaterial}>
        <ringGeometry args={[RADIUS - 0.2, RADIUS - 0.185, 128]} />
      </mesh>
      <mesh position={[0, 0, Z.rings]} material={goldMaterial}>
        <ringGeometry args={[1.18, 1.195, 120]} />
      </mesh>
      <mesh position={[0, 0, Z.rings]} material={goldMaterial}>
        <ringGeometry args={[0.78, 0.79, 96]} />
      </mesh>

      <mesh position={[0, 0, Z.ticks]} material={ivoryDimMaterial}>
        <boxGeometry args={[0.018, (RADIUS - 0.22) * 2, 0.005]} />
      </mesh>
      <mesh position={[0, 0, Z.ticks]} rotation={[0, 0, Math.PI / 2]} material={ivoryDimMaterial}>
        <boxGeometry args={[0.018, (RADIUS - 0.22) * 2, 0.005]} />
      </mesh>
      <mesh position={[0, 0, Z.ticks]} rotation={[0, 0, Math.PI / 4]} material={ivoryDimMaterial}>
        <boxGeometry args={[0.01, (RADIUS - 0.22) * 2 * 0.92, 0.005]} />
      </mesh>
      <mesh position={[0, 0, Z.ticks]} rotation={[0, 0, -Math.PI / 4]} material={ivoryDimMaterial}>
        <boxGeometry args={[0.01, (RADIUS - 0.22) * 2 * 0.92, 0.005]} />
      </mesh>

      {degreeMarkers.map((marker) => (
        <group key={marker.angle} rotation={[0, 0, marker.angle]}>
          <mesh
            position={[0, marker.radial - marker.length / 2, Z.ticks]}
            material={marker.material}
          >
            <boxGeometry args={[marker.width, marker.length, 0.006]} />
          </mesh>
        </group>
      ))}

      {rivets.map((rivet) => (
        <mesh
          key={rivet.angle}
          position={[rivet.x, rivet.y, Z.baseRim + 0.004]}
          material={goldMaterial}
        >
          <circleGeometry args={[0.028, 18]} />
        </mesh>
      ))}

      <group position={[0, 0, Z.letters]}>
        {([
          ['N', [0, RADIUS - 0.46, 0], '#f1deab', 0.32],
          ['E', [RADIUS - 0.46, 0, 0], '#dfca97', 0.28],
          ['S', [0, -(RADIUS - 0.46), 0], '#dfca97', 0.28],
          ['W', [-(RADIUS - 0.46), 0, 0], '#dfca97', 0.28],
          ['NE', [1.04, 1.04, 0], '#b8a275', 0.12],
          ['SE', [1.04, -1.04, 0], '#b8a275', 0.12],
          ['SW', [-1.04, -1.04, 0], '#b8a275', 0.12],
          ['NW', [-1.04, 1.04, 0], '#b8a275', 0.12],
        ] as const).map(([label, pos, color, fontSize]) => (
          <Text
            key={label}
            position={pos}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
            fontWeight={700}
          >
            {label}
          </Text>
        ))}
      </group>

      <group ref={needlePivotRef} position={[0, 0, Z.needle]}>
        <CompassNeedle />
      </group>

      <mesh
        position={[0, 0, Z.pin]}
        rotation={[Math.PI / 2, 0, 0]}
        material={goldMaterial}
        castShadow
      >
        <cylinderGeometry args={[0.11, 0.13, 0.04, 32]} />
      </mesh>
      <mesh position={[0, 0, Z.pin + 0.022]} material={baseMaterial}>
        <circleGeometry args={[0.05, 24]} />
      </mesh>
    </group>
  );
}
