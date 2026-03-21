import { useRef, useEffect, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useImagePreloader } from "@/hooks/use-image-preloader";
import { useIsMobile } from "@/hooks/use-mobile";

const TOTAL_FRAMES = 120;

const CNCScrollStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const isMobile = useIsMobile();

  const { images, ready } = useImagePreloader({
    basePath: "/sequence-cnc",
    totalFrames: TOTAL_FRAMES,
    eagerCount: 10,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

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

      // Cover-fit the image
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
    drawFrame(v);
  });

  // Draw first frame when ready
  useEffect(() => {
    if (ready) drawFrame(0);
  }, [ready, drawFrame]);

  if (isMobile) {
    return (
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          <span
            className="text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{ color: "hsl(var(--primary))", fontFamily: "'JetBrains Mono', monospace" }}
          >
            CNC İşleme Süreci
          </span>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ham Metalden Hassas Parçaya
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            Alüminyum billet'ten nihai havacılık parçasına dönüşüm sürecini keşfedin.
          </p>
        </div>
        <img
          src="/sequence-cnc/frame_0001.webp"
          alt="CNC İşleme"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="lazy"
        />
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(15,15,15,0.45)" }} />

        {/* Content overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span
              className="text-xs uppercase tracking-[0.3em] mb-4 block"
              style={{ color: "hsl(var(--primary))", fontFamily: "'JetBrains Mono', monospace" }}
            >
              CNC İşleme Süreci
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Ham Metalden
              <br />
              Hassas Parçaya
            </h2>
            <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              Alüminyum billet'ten nihai havacılık parçasına dönüşüm sürecini scroll ile keşfedin.
            </p>
          </div>
        </div>

        {/* Loading indicator */}
        {!ready && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CNCScrollStory;
