import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useImagePreloader } from "@/hooks/use-image-preloader";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const TOTAL_FRAMES = 80;

const materialProps = [
  { label: "İşlenebilirlik", value: 4, max: 5 },
  { label: "Korozyon Direnci", value: 5, max: 5 },
  { label: "Mukavemet", value: 4, max: 5 },
  { label: "Termal Dayanım", value: 3, max: 5 },
];

const MaterialMorphScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  const { images, ready, loadedCount } = useImagePreloader({
    basePath: "/sequence-material",
    totalFrames: TOTAL_FRAMES,
    eagerCount: 8,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Floating card appears at 40-80% scroll
  const cardOpacity = useTransform(scrollYProgress, [0.35, 0.42, 0.75, 0.82], [0, 1, 1, 0]);
  const cardX = useTransform(scrollYProgress, [0.35, 0.45], [60, 0]);

  // SVG progress ring
  const ringProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Title overlay
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.32], [0, 1, 1, 0]);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const clamped = Math.min(Math.max(Math.round(index), 0), TOTAL_FRAMES - 1);
      if (clamped === currentFrameRef.current) return;
      currentFrameRef.current = clamped;

      const img = images.current[clamped];
      if (!img || !img.complete) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;
      let sw: number, sh: number, sx: number, sy: number;

      if (imgRatio > canvasRatio) {
        sh = img.naturalHeight;
        sw = sh * canvasRatio;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      } else {
        sw = img.naturalWidth;
        sh = sw / canvasRatio;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    },
    [images]
  );

  useMotionValueEvent(frameIndex, "change", (v) => {
    if (!prefersReduced) drawFrame(v);
  });

  useEffect(() => {
    if (ready) drawFrame(0);
  }, [ready, drawFrame]);

  if (isMobile) {
    return (
      <section
        className="relative min-h-[70vh] flex items-center justify-center"
        style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
      >
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <span
            className="text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{ color: "hsl(var(--primary))", fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {"Malzeme Dönüşümü"}
          </span>
          <h2 className="text-3xl font-bold text-white mb-4">
            {"Yüzey Mükemmelliği"}
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            {"Ham titanyumdan cilalı anodize yüzeye dönüşüm."}
          </p>
        </div>
        <img
          src="/sequence-material/frame_0001.webp"
          alt="Malzeme Dönüşümü"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="lazy"
        />
      </section>
    );
  }

  const circumference = 2 * Math.PI * 45;

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
          aria-label="Malzeme dönüşüm animasyonu"
          role="img"
        />
        <div className="absolute inset-0" style={{ background: "rgba(15,15,15,0.4)" }} />

        {/* Loading state */}
        {!ready && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center" style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}>
            <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin mb-4" style={{ borderColor: "hsl(var(--forge-molten))" }} />
            <span className="text-sm font-mono" style={{ color: "hsl(var(--forge-molten))" }}>
              {`%${Math.round((loadedCount / TOTAL_FRAMES) * 100)} yükleniyor...`}
            </span>
          </div>
        )}

        {/* Title overlay */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ opacity: titleOpacity }}
        >
          <div className="text-center max-w-4xl mx-auto px-6">
            <span
              className="text-xs uppercase tracking-[0.3em] mb-4 block"
              style={{ color: "hsl(var(--primary))", fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {"Malzeme Dönüşümü"}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {"Yüzey Mükemmelliği"}
            </h2>
          </div>
        </motion.div>

        {/* Floating material properties card */}
        <motion.div
          className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-10 w-72"
          style={{ opacity: cardOpacity, x: cardX }}
        >
          <div
            className="p-6 border backdrop-blur-md"
            style={{
              backgroundColor: "rgba(15,15,15,0.8)",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            {/* SVG Progress Ring */}
            <div className="flex items-center gap-4 mb-5">
              <svg width="56" height="56" viewBox="0 0 100 100" className="shrink-0 -rotate-90">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                <motion.circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="hsl(var(--forge-molten))"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  style={{ strokeDashoffset: useTransform(ringProgress, (v) => circumference * (1 - v)) }}
                />
              </svg>
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-mono block">
                  {"Dönüşüm"}
                </span>
                <span className="text-xl font-bold text-white font-mono">
                  {"Ti-6Al-4V"}
                </span>
              </div>
            </div>

            {/* Material properties */}
            <div className="space-y-3">
              {materialProps.map((prop) => (
                <div key={prop.label}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-white/50 font-mono uppercase tracking-wider">{prop.label}</span>
                    <span className="text-white/80 font-mono font-bold">{prop.value}/{prop.max}</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(prop.value / prop.max) * 100}%`,
                        background: "linear-gradient(90deg, hsl(var(--forge-molten)), hsl(var(--forge-amber)))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MaterialMorphScroll;
