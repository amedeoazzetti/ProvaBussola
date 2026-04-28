'use client';

import { Text } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { Group, MeshStandardMaterial, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { animationConfig } from '@/lib/animationConfig';
import { CompassNeedle } from './CompassNeedle';

type CompassModelProps = {
  targetPosition: Vector3;
  targetScale: number;
};

const brassMaterial = new MeshStandardMaterial({
  color: '#9e7d4a',
  metalness: 0.9,
  roughness: 0.3,
});

const brassDarkMaterial = new MeshStandardMaterial({
  color: '#4a3b21',
  metalness: 0.82,
  roughness: 0.45,
});

const dialMaterial = new MeshStandardMaterial({
  color: '#14181f',
  metalness: 0.45,
  roughness: 0.5,
});

const tickMaterial = new MeshStandardMaterial({
  color: '#cab280',
  metalness: 0.6,
  roughness: 0.35,
});

export function CompassModel({ targetPosition, targetScale }: CompassModelProps) {
  const rootRef = useRef<Group>(null);
  const needlePivotRef = useRef<Group>(null);
  const worldPos = useMemo(() => new Vector3(), []);
  const rayPoint = useMemo(() => new Vector3(), []);
  const rayDirection = useMemo(() => new Vector3(), []);
  const hitPoint = useMemo(() => new Vector3(), []);

  const majorTicks = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 36;
        const major = i % 3 === 0;
        return {
          angle,
          length: major ? 0.26 : 0.13,
          width: major ? 0.028 : 0.018,
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
    <group ref={rootRef} scale={1}>
      <mesh material={brassDarkMaterial} receiveShadow>
        <cylinderGeometry args={[2.28, 2.28, 0.26, 100]} />
      </mesh>

      <mesh position={[0, 0, 0.05]} material={brassMaterial} castShadow>
        <torusGeometry args={[2.04, 0.18, 36, 160]} />
      </mesh>

      <mesh position={[0, 0, 0.1]} material={dialMaterial}>
        <cylinderGeometry args={[1.82, 1.82, 0.18, 96]} />
      </mesh>

      <mesh position={[0, 0, 0.2]} material={brassDarkMaterial}>
        <torusGeometry args={[1.2, 0.02, 12, 80]} />
      </mesh>

      {majorTicks.map((tick) => (
        <group key={tick.angle} rotation={[0, 0, tick.angle]}>
          <mesh position={[0, 1.58, 0.2]} material={tickMaterial}>
            <boxGeometry args={[tick.width, tick.length, 0.03]} />
          </mesh>
        </group>
      ))}

      <group position={[0, 0, 0.24]}>
        {([
          ['N', [0, 1.38, 0]],
          ['E', [1.38, 0, 0]],
          ['S', [0, -1.38, 0]],
          ['W', [-1.38, 0, 0]],
        ] as const).map(([label, pos]) => (
          <Text
            key={label}
            position={pos}
            fontSize={0.28}
            color={label === 'N' ? '#d9b46f' : '#e5d8bd'}
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

      <mesh position={[0, 0, 0.34]} material={brassMaterial}>
        <cylinderGeometry args={[0.13, 0.13, 0.11, 36]} />
      </mesh>
    </group>
  );
}
