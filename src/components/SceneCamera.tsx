'use client';

import { PerspectiveCamera } from '@react-three/drei';

export function SceneCamera() {
  return <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={38} />;
}
