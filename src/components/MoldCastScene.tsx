import { useRef, useEffect } from 'react';
import { gsap } from '@/hooks/use-gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { AmbientGlowOverlay } from '@/components/ui/AmbientGlowOverlay';
import { SparkParticles } from '@/components/ui/SparkParticles';
import { TextScramble } from '@/components/ui/TextScramble';

gsap.registerPlugin(ScrollTrigger);

export const MoldCastScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lavaStreamRef = useRef<HTMLDivElement>(null);
  const moldRef = useRef<HTMLDivElement>(null);
  const steamRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rippleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current) return;

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
        lavaStreamRef.current!,
        { y: '-100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 30, ease: 'none' }
      );

      if (rippleRef.current) {
        tl.fromTo(
          rippleRef.current,
          { scale: 0, opacity: 0.8 },
          { scale: 3, opacity: 0, duration: 15 },
          '+=0'
        );
      }

      tl.to(
        moldRef.current!,
        { '--mold-color': 'var(--mat-silver)', duration: 30 } as gsap.TweenVars,
        '+=0'
      );

      steamRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, y: 0, scale: 1 },
          {
            opacity: 0.6,
            y: -60,
            scale: 2,
            duration: 15,
            repeat: 1,
            yoyo: true,
            delay: i * 3,
          },
          '<'
        );
      });

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 10 },
          '-=20'
        );
      }

      tl.to(moldRef.current!, {
        scale: 3,
        rotateX: 5,
        rotateY: -3,
        clipPath: 'inset(30% 30% 30% 30%)',
        duration: 40,
        ease: 'power2.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--mat-silver)' }}
      >
        <span
          className="font-mono font-bold select-none"
          style={{
            fontSize: 'clamp(2rem, 8vw, 10rem)',
            color: 'var(--text-inverse-muted)',
          }}
        >
          DÖKÜM
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh]"
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--bg-cinematic-deep)', perspective: '1200px' }}
      >
        <AmbientGlowOverlay />

        <SparkParticles
          count={25}
          colors={['var(--heat-ember)', 'var(--heat-peak)', 'var(--heat-amber)']}
          speed={0.6}
          direction="up"
        />

        {/* Lava stream */}
        <div
          ref={lavaStreamRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-full"
          style={{
            background:
              `linear-gradient(to bottom, var(--lava-current-color, var(--heat-ember)), var(--heat-peak))`,
            opacity: 0,
            filter: 'blur(2px)',
            boxShadow: `0 0 40px var(--heat-radial-peak), 0 0 80px var(--heat-glow-mid)`,
          }}
        />

        {/* Mold container */}
        <div
          ref={moldRef}
          className="relative w-[60vw] max-w-[500px] aspect-square"
          style={{
            background: 'var(--mold-color, var(--heat-ember))',
            clipPath: 'inset(0)',
            border: `2px solid var(--surface-border)`,
            transformStyle: 'preserve-3d',
            boxShadow: `0 0 60px var(--heat-radial-base)`,
          }}
        >
          {/* Ripple on impact */}
          <div
            ref={rippleRef}
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              border: `2px solid var(--heat-glow-strong)`,
              opacity: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Surface texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent 0px, transparent 10px, var(--surface-glass) 10px, var(--surface-glass) 11px)`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Steam particles */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              ref={(el) => {
                steamRefs.current[i] = el;
              }}
              className="absolute"
              style={{
                width: 24,
                height: 24,
                left: `${10 + i * 13}%`,
                top: '-10%',
                background:
                  `radial-gradient(circle, var(--text-technical) 0%, transparent 70%)`,
                opacity: 0,
                pointerEvents: 'none',
                filter: 'blur(4px)',
              }}
            />
          ))}
        </div>

        {/* Phase label */}
        <div
          className="absolute top-8 right-8 font-mono text-[9px] tracking-[0.3em] uppercase pointer-events-none z-10"
          style={{ color: 'var(--text-vignette)' }}
        >
          FAZE 02 — DÖKÜM
        </div>

        {/* Technical readout */}
        <div
          ref={labelRef}
          className="absolute bottom-8 left-8 font-mono text-[10px] tracking-[0.2em] uppercase space-y-1 pointer-events-none z-10"
          style={{ color: 'var(--text-hint)', opacity: 0 }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)' }}>BASIN&Ccedil; </span>
            <TextScramble
              text="12.4 BAR"
              speed={50}
              trigger="inView"
              className="text-[10px]"
              style={{ color: 'var(--heat-molten)' }}
            />
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>SOĞUMA </span>
            <TextScramble
              text="180 sn"
              speed={50}
              trigger="inView"
              className="text-[10px]"
              style={{ color: 'var(--text-technical)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
