import { useRef, useEffect } from 'react';
import { gsap } from '@/hooks/use-gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { AmbientGlowOverlay } from '@/components/ui/AmbientGlowOverlay';

gsap.registerPlugin(ScrollTrigger);

export const LavaTypographyScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
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

      // 0–40%: Text fade in + scale
      tl.fromTo(
        textRef.current!,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 40 }
      );

      // 40–80%: Lava fill via CSS custom prop
      tl.fromTo(
        textRef.current!,
        { '--lava-fill': '0%' } as gsap.TweenVars,
        { '--lava-fill': '100%', duration: 40 } as gsap.TweenVars
      );

      // 80–100%: Background burns to lava color
      tl.to(containerRef.current!, {
        backgroundColor: '#e25822',
        duration: 20,
        onUpdate() {
          document.documentElement.style.setProperty(
            '--lava-current-color',
            '#e25822'
          );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #ff6a00, #b8451a)',
        }}
      >
        <span
          className="font-mono font-bold select-none"
          style={{
            fontSize: 'clamp(3rem, 15vw, 20rem)',
            color: 'rgba(255,255,255,0.8)',
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
      style={{ zIndex: Z.lavaTypography }}
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'hsl(var(--forge-obsidian))' }}
      >
        <AmbientGlowOverlay />

        <div
          ref={textRef}
          className="font-mono font-bold select-none relative"
          style={{
            fontSize: 'clamp(3rem, 15vw, 20rem)',
            background: 'linear-gradient(to bottom, #ff6a00, #e25822, #b8451a)',
            backgroundSize: '100% 200%',
            backgroundPosition: '0 calc(100% - var(--lava-fill, 0%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: 0,
          }}
        >
          ERGİTME
        </div>
      </div>
    </div>
  );
};
