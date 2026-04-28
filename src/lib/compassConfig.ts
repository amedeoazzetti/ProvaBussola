export type Direction = 'center' | 'north' | 'south' | 'east' | 'west';

type Anchor = {
  x: number;
  y: number;
};

type DirectionLayoutConfig = {
  compassAnchor: Anchor;
  compassScale: number;
  contentAnchorClass: string;
  contentAlignClass: string;
  buttonRingRadius: number;
};

export const directionLayout: Record<Direction, DirectionLayoutConfig> = {
  center: {
    compassAnchor: { x: 0.5, y: 0.5 },
    compassScale: 1,
    contentAnchorClass: 'left-1/2 top-1/2',
    contentAlignClass: '-translate-x-1/2 -translate-y-1/2 text-center',
    buttonRingRadius: 172,
  },
  north: {
    compassAnchor: { x: 0.5, y: 1.06 },
    compassScale: 1.9,
    contentAnchorClass: 'left-1/2 top-12',
    contentAlignClass: '-translate-x-1/2 text-center',
    buttonRingRadius: 198,
  },
  south: {
    compassAnchor: { x: 0.5, y: -0.06 },
    compassScale: 1.9,
    contentAnchorClass: 'left-1/2 bottom-10',
    contentAlignClass: '-translate-x-1/2 text-center',
    buttonRingRadius: 198,
  },
  east: {
    compassAnchor: { x: -0.04, y: 0.5 },
    compassScale: 1.85,
    contentAnchorClass: 'right-6 top-1/2',
    contentAlignClass: '-translate-y-1/2 text-right',
    buttonRingRadius: 195,
  },
  west: {
    compassAnchor: { x: 1.04, y: 0.5 },
    compassScale: 1.85,
    contentAnchorClass: 'left-6 top-1/2',
    contentAlignClass: '-translate-y-1/2 text-left',
    buttonRingRadius: 195,
  },
};

export const directionContent: Record<Direction, { title: string; subtitle: string }> = {
  center: {
    title: 'Compass',
    subtitle: 'Choose a cardinal point to navigate this cinematic space.',
  },
  north: {
    title: 'North',
    subtitle: 'Vision, direction and ambition.',
  },
  south: {
    title: 'South',
    subtitle: 'Roots, memory and foundations.',
  },
  east: {
    title: 'East',
    subtitle: 'Discovery, light and new horizons.',
  },
  west: {
    title: 'West',
    subtitle: 'Reflection, endings and transformation.',
  },
};

export const directionAngles: Record<Exclude<Direction, 'center'>, number> = {
  north: 0,
  east: 90,
  south: 180,
  west: 270,
};
