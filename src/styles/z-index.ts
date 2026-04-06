export const Z = {
  base: 0,
  content: 1,
  ambientGlow: 2,
  grain: 5,
  scrollVelocity: 8,
  lavaTypography: 10,
  moldCast: 11,
  cncStory: 12,
  marquee: 15,
  dotNav: 20,
  header: 50,
  mobileMenu: 60,
  cursor: 90,
  pageTransition: 95,
  preloader: 100,
} as const;

export type ZLayer = keyof typeof Z;
