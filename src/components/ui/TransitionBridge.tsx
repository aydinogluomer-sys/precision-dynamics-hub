/**
 * TransitionBridge — clean gradient bridge between sections.
 *
 * dark-to-dark:  40px subtle blend
 * dark-to-light: 120px gradient fade with radial glow accent
 * light-to-dark: 120px gradient fade with radial glow accent
 * light-to-light: 40px subtle blend (via GlowLineDivider instead)
 */

interface TransitionBridgeProps {
  variant: 'dark-to-dark' | 'dark-to-light' | 'light-to-dark';
  fromColor: string;
  toColor: string;
  z: number;
}

export const TransitionBridge = ({
  variant,
  fromColor,
  toColor,
  z,
}: TransitionBridgeProps) => {
  const height = variant === 'dark-to-dark' ? 40 : 120;

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
          background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        }}
      />

      {/* Radial glow accent at the seam — only for cross-theme transitions */}
      {variant !== 'dark-to-dark' && (
        <div
          className="absolute inset-0"
          style={{
            background:
              variant === 'dark-to-light'
                ? `radial-gradient(ellipse 80% 60% at 50% 100%, hsl(var(--primary) / 0.06), transparent 70%)`
                : `radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary) / 0.06), transparent 70%)`,
          }}
        />
      )}
    </div>
  );
};
