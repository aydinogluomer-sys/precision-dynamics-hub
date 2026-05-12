import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animation-manager';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { AmbientGlowOverlay } from '@/components/ui/AmbientGlowOverlay';
import { SparkParticles } from '@/components/ui/SparkParticles';
import { TextScramble } from '@/components/ui/TextScramble';

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

      // 0–30%: Lava stream flows down
      tl.fromTo(
        lavaStreamRef.current!,
        { y: '-100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 30, ease: 'none' }
      );

      // Ripple effect when lava hits mold
      if (rippleRef.current) {
        tl.fromTo(
          rippleRef.current,
          { scale: 0, opacity: 0.8 },
          { scale: 3, opacity: 0, duration: 15 },
          '+=0'
        );
      }

      // 30–60%: Cooling color shift
      tl.to(
        moldRef.current!,
        { '--mold-color': '#c0c0c0', duration: 30 } as gsap.TweenVars,
        '+=0'
      );

      // Steam particles during cooling
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

      // Label fade in
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 10 },
          '-=20'
        );
      }

      // 60–100%: Zoom into cooled metal with 3D perspective
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
        style={{ backgroundColor: '#c0c0c0' }}
      >
        <span
          className="font-mono font-bold select-none"
          style={{
            fontSize: 'clamp(2rem, 8vw, 10rem)',
            color: 'rgba(0,0,0,0.2)',
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
        style={{ backgroundColor: '#0f0f0f', perspective: '1200px' }}
      >
        <AmbientGlowOverlay />

        {/* Spark particles — embers floating up */}
        <SparkParticles
          count={25}
          colors={['#ff6a00', '#e25822', '#ffaa44']}
          speed={0.6}
          direction="up"
        />

        {/* Lava stream with glow */}
        <div
          ref={lavaStreamRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-full"
          style={{
            background:
              'linear-gradient(to bottom, var(--lava-current-color, #ff6a00), #e25822)',
            opacity: 0,
            filter: 'blur(2px)',
            boxShadow: '0 0 40px rgba(255,106,0,0.4), 0 0 80px rgba(226,88,34,0.2)',
          }}
        />

        {/* Mold container with 3D transform origin */}
        <div
          ref={moldRef}
          className="relative w-[60vw] max-w-[500px] aspect-square"
          style={{
            background: 'var(--mold-color, #ff6a00)',
            clipPath: 'inset(0)',
            border: '2px solid rgba(255,255,255,0.1)',
            transformStyle: 'preserve-3d',
            boxShadow: '0 0 60px rgba(255,106,0,0.15)',
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
              border: '2px solid rgba(255,106,0,0.4)',
              opacity: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Surface texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 11px)',
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
                  'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
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
          style={{ color: 'rgba(255,255,255,0.15)' }}
        >
          FAZE 02 — DÖKÜM
        </div>

        {/* Technical readout */}
        <div
          ref={labelRef}
          className="absolute bottom-8 left-8 font-mono text-[10px] tracking-[0.2em] uppercase space-y-1 pointer-events-none z-10"
          style={{ color: 'rgba(255,255,255,0.2)', opacity: 0 }}
        >
          <div>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>BASIN&Ccedil; </span>
            <TextScramble
              text="12.4 BAR"
              speed={50}
              trigger="inView"
              className="text-[10px]"
              style={{ color: 'hsl(var(--forge-molten))' }}
            />
          </div>
          <div>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>SOĞUMA </span>
            <TextScramble
              text="180 sn"
              speed={50}
              trigger="inView"
              className="text-[10px]"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
