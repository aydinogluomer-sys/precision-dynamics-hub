import { useEffect, useRef, useCallback } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface SparkParticlesProps {
  count?: number;
  colors?: string[];
  speed?: number;
  /** "up" embers or "radial" explosion */
  direction?: "up" | "radial";
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  glow: number;
}

export const SparkParticles = ({
  count = 40,
  colors = ["#ff6a00", "#e25822", "#ffaa44", "#ff4400"],
  speed = 1,
  direction = "up",
  className = "",
}: SparkParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const reduced = usePrefersReducedMotion();

  const createParticle = useCallback(
    (w: number, h: number): Particle => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      if (direction === "up") {
        return {
          x: Math.random() * w,
          y: h + Math.random() * 20,
          vx: (Math.random() - 0.5) * 0.8 * speed,
          vy: -(1 + Math.random() * 2) * speed,
          size: 1 + Math.random() * 2.5,
          life: 0,
          maxLife: 60 + Math.random() * 120,
          color,
          glow: 4 + Math.random() * 8,
        };
      }
      // radial
      const angle = Math.random() * Math.PI * 2;
      const vel = (0.5 + Math.random() * 2) * speed;
      return {
        x: w / 2,
        y: h / 2,
        vx: Math.cos(angle) * vel,
        vy: Math.sin(angle) * vel,
        size: 1 + Math.random() * 3,
        life: 0,
        maxLife: 40 + Math.random() * 80,
        color,
        glow: 6 + Math.random() * 10,
      };
    },
    [colors, direction, speed],
  );

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Init particles
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    particlesRef.current = Array.from({ length: count }, () => {
      const p = createParticle(w, h);
      p.life = Math.random() * p.maxLife; // stagger start
      return p;
    });

    const animate = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.clearRect(0, 0, cw, ch);

      particlesRef.current.forEach((p) => {
        p.life++;
        if (p.life > p.maxLife) {
          Object.assign(p, createParticle(cw, ch));
          p.life = 0;
        }

        p.x += p.vx;
        p.y += p.vy;
        // slight wind wobble
        p.vx += (Math.random() - 0.5) * 0.05;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.1
          ? progress / 0.1
          : progress > 0.7
            ? 1 - (progress - 0.7) / 0.3
            : 1;

        ctx.save();
        ctx.globalAlpha = alpha * 0.8;
        ctx.shadowBlur = p.glow;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [reduced, count, createParticle]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
