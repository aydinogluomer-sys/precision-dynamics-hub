/**
 * SectionTransitionGlow — radial glow fade for dark↔light section transitions.
 * Place between two Scene/FlowScene wrappers in Index.tsx.
 *
 * variant="dark-to-light": dark top → transparent bottom (dark section ending)
 * variant="light-to-dark": transparent top → dark bottom (entering dark section)
 */

interface SectionTransitionGlowProps {
  variant: 'dark-to-light' | 'light-to-dark';
  fromColor?: string;
  toColor?: string;
  height?: number;
  z: number;
}

export const SectionTransitionGlow = ({
  variant,
  fromColor,
  toColor,
  height = 120,
  z,
}: SectionTransitionGlowProps) => {
  const darkDefault = 'hsl(var(--forge-obsidian))';
  const lightDefault = 'transparent';

  const topColor =
    variant === 'dark-to-light'
      ? (fromColor ?? darkDefault)
      : lightDefault;
  const bottomColor =
    variant === 'dark-to-light'
      ? lightDefault
      : (toColor ?? darkDefault);

  return (
    <div
      className="relative w-full pointer-events-none"
      style={{ zIndex: z, height }}
      aria-hidden="true"
    >
      {/* Main gradient fade */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${topColor}, ${bottomColor})`,
        }}
      />
      {/* Radial glow accent at the seam */}
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === 'dark-to-light'
              ? `radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary) / 0.06), transparent 70%)`
              : `radial-gradient(ellipse 80% 60% at 50% 100%, hsl(var(--primary) / 0.06), transparent 70%)`,
        }}
      />
    </div>
  );
};
