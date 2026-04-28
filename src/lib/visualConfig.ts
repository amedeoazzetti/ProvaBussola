import type { Direction } from './compassConfig';

export const backgroundByDirection: Record<Direction, { gradient: string; glow: string }> = {
  center: {
    gradient:
      'radial-gradient(circle at 22% 18%, rgba(64, 94, 163, 0.22), transparent 42%), radial-gradient(circle at 80% 88%, rgba(168, 118, 56, 0.13), transparent 44%), linear-gradient(160deg, #040712 0%, #03050c 48%, #020309 100%)',
    glow: 'radial-gradient(circle at 52% 45%, rgba(121, 157, 255, 0.08), transparent 56%)',
  },
  north: {
    gradient:
      'radial-gradient(circle at 50% 0%, rgba(124, 188, 255, 0.2), transparent 46%), radial-gradient(circle at 18% 86%, rgba(65, 107, 158, 0.16), transparent 46%), linear-gradient(165deg, #031024 0%, #040b1c 52%, #02050f 100%)',
    glow: 'radial-gradient(circle at 50% 12%, rgba(118, 214, 255, 0.16), transparent 44%)',
  },
  south: {
    gradient:
      'radial-gradient(circle at 50% 100%, rgba(172, 102, 54, 0.2), transparent 42%), radial-gradient(circle at 85% 20%, rgba(101, 53, 34, 0.14), transparent 45%), linear-gradient(155deg, #13090a 0%, #110a0b 50%, #06070d 100%)',
    glow: 'radial-gradient(circle at 48% 84%, rgba(255, 168, 92, 0.13), transparent 45%)',
  },
  east: {
    gradient:
      'radial-gradient(circle at 92% 46%, rgba(236, 193, 117, 0.16), transparent 40%), radial-gradient(circle at 20% 80%, rgba(98, 77, 151, 0.17), transparent 48%), linear-gradient(150deg, #110c1e 0%, #10081c 50%, #09060f 100%)',
    glow: 'radial-gradient(circle at 84% 50%, rgba(255, 206, 113, 0.14), transparent 40%)',
  },
  west: {
    gradient:
      'radial-gradient(circle at 8% 46%, rgba(72, 179, 181, 0.16), transparent 42%), radial-gradient(circle at 82% 18%, rgba(149, 95, 56, 0.14), transparent 45%), linear-gradient(150deg, #061319 0%, #071018 55%, #05070d 100%)',
    glow: 'radial-gradient(circle at 13% 52%, rgba(87, 216, 208, 0.12), transparent 42%)',
  },
};

export const compassVisual = {
  tiltX: -0.24,
  tiltY: 0.04,
  light: {
    ambient: 0.5,
    key: 1.3,
    rim: 0.65,
    fill: 0.45,
  },
};
