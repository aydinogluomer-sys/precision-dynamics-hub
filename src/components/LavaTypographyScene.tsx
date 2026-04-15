import { useRef, useEffect } from 'react';
import { gsap } from '@/hooks/use-gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { AmbientGlowOverlay } from '@/components/ui/AmbientGlowOverlay';
import { SparkParticles } from '@/components/ui/SparkParticles';
import { TextScramble } from '@/components/ui/TextScramble';

gsap.registerPlugin(ScrollTrigger);

export const LavaTypographyScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heatRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      tl.fromTo(
        textRef.current!,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 40 }
      );

      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 0.6, scale: 1.2, duration: 40 },
          '<'
        );
      }

      tl.fromTo(
        textRef.current!,
        { '--lava-fill': '0%' } as gsap.TweenVars,
        { '--lava-fill': '100%', duration: 40 } as gsap.TweenVars
      );

      if (heatRef.current) {
        tl.fromTo(
          heatRef.current,
          { opacity: 0 },
          { opacity: 0.3, duration: 40 },
          '<'
        );
      }

      tl.to(containerRef.current!, {
        backgroundColor: 'var(--heat-peak)',
        duration: 20,
        onUpdate() {
          document.documentElement.style.setProperty(
            '--lava-current-color',
            'var(--heat-peak)'
          );
        },
      });

      if (glowRef.current) {
        tl.to(glowRef.current, { opacity: 0.9, scale: 1.5, duration: 20 }, '<');
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, var(--heat-ember), var(--heat-char))`,
        }}
      >
        <span
          className="font-mono font-bold select-none"
          style={{
            fontSize: 'clamp(3rem, 15vw, 20rem)',
            color: 'var(--text-secondary)',
          }}
        >
          ERGİTME
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh]"
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--bg-cinematic-deep)' }}
      >
        <AmbientGlowOverlay />

        {/* Radial glow behind text */}
        <div
          ref={glowRef}
          className="absolute"
          style={{
            width: '60vw',
            height: '60vw',
            maxWidth: 800,
            maxHeight: 800,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, var(--heat-glow-strong) 0%, var(--heat-radial-base) 40%, transparent 70%)`,
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Ember particles */}
        <SparkParticles
          count={35}
          colors={['var(--heat-ember)', 'var(--heat-peak)', 'var(--heat-amber)', 'var(--heat-char)', 'var(--heat-molten)']}
          speed={0.8}
          direction="up"
        />

        {/* Heat distortion shimmer overlay */}
        <div
          ref={heatRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background: `repeating-linear-gradient(0deg, transparent 0px, var(--heat-glow-subtle) 2px, transparent 4px)`,
            animation: 'heatShimmer 2s ease-in-out infinite',
          }}
        />

        {/* Main lava text */}
        <div
          ref={textRef}
          className="font-mono font-bold select-none relative z-10"
          style={{
            fontSize: 'clamp(3rem, 15vw, 20rem)',
            background: `linear-gradient(to bottom, var(--heat-ember), var(--heat-peak), var(--heat-char))`,
            backgroundSize: '100% 200%',
            backgroundPosition: '0 calc(100% - var(--lava-fill, 0%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: 0,
            filter: `drop-shadow(0 0 30px var(--heat-radial-peak))`,
          }}
        >
          ERGİTME
        </div>

        {/* Temperature readout */}
        <div
          className="absolute bottom-8 left-8 font-mono text-[10px] tracking-[0.2em] uppercase space-y-1 pointer-events-none z-10"
          style={{ color: 'var(--text-hint)' }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)' }}>SICAKLIK </span>
            <TextScramble
              text="1.668°C"
              speed={60}
              trigger="inView"
              className="text-[10px]"
              style={{ color: 'var(--heat-molten)' }}
            />
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>MALZEME </span>
            <TextScramble
              text="Ti-6Al-4V"
              speed={50}
              trigger="inView"
              className="text-[10px]"
              style={{ color: 'var(--text-technical)' }}
            />
          </div>
        </div>

        {/* Process label */}
        <div
          className="absolute top-8 right-8 font-mono text-[9px] tracking-[0.3em] uppercase pointer-events-none z-10"
          style={{ color: 'var(--text-vignette)' }}
        >
          FAZE 01 — ERGİTME
        </div>
      </div>

      <style>{`
        @keyframes heatShimmer {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-2px) scaleY(1.01); }
        }
      `}</style>
    </div>
  );
};
