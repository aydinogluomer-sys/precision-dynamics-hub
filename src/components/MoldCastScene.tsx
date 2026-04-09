import { useRef, useEffect } from 'react';
import { gsap } from '@/hooks/use-gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { AmbientGlowOverlay } from '@/components/ui/AmbientGlowOverlay';

gsap.registerPlugin(ScrollTrigger);

export const MoldCastScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lavaStreamRef = useRef<HTMLDivElement>(null);
  const moldRef = useRef<HTMLDivElement>(null);
  const steamRefs = useRef<(HTMLDivElement | null)[]>([]);
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
            y: -40,
            scale: 1.5,
            duration: 15,
            repeat: 1,
            yoyo: true,
            delay: i * 3,
          },
          '<'
        );
      });

      // 60–100%: Zoom into cooled metal
      tl.to(moldRef.current!, {
        scale: 3,
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
        style={{ backgroundColor: '#0f0f0f' }}
      >
        <AmbientGlowOverlay />

        {/* Lava stream */}
        <div
          ref={lavaStreamRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-full"
          style={{
            background:
              'linear-gradient(to bottom, var(--lava-current-color, #ff6a00), #e25822)',
            opacity: 0,
            filter: 'blur(2px)',
          }}
        />

        {/* Mold container */}
        <div
          ref={moldRef}
          className="relative w-[60vw] max-w-[500px] aspect-square"
          style={{
            background: 'var(--mold-color, #ff6a00)',
            clipPath: 'inset(0)',
            border: '2px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Steam particles */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              ref={(el) => {
                steamRefs.current[i] = el;
              }}
              className="absolute"
              style={{
                width: 20,
                height: 20,
                left: `${15 + i * 18}%`,
                top: '-10%',
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
                opacity: 0,
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
