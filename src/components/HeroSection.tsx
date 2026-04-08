/**
 * HeroSection.tsx — Stacking scroll with horizontal slide reveal + lava effect
 *
 * Phase 1 (0–45%): MAS mask grows, content fades, header hides
 * Phase 2 (45–60%): PAUSE — section locked fullscreen
 * Phase 3 (60–88%): Horizontal slide — Hero slides left, QuickQuote slides in
 * Phase 4 (88–100%): Lava pour + heat distortion
 */
import { useRef, useEffect, useCallback, useState, lazy, Suspense } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/hooks/use-gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBg from "@/assets/hero-cnc.jpg";
import cncVideo from "@/assets/cnc-factory-zoom.mp4";
import { HeadlineStagger } from "./HeadlineStagger";
import { QuickQuoteSection } from "./QuickQuoteSection";
import { MotionGradientBg } from "./MotionGradientBg";

const HeroCanvas = lazy(() =>
  import("./r3f/HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
);

const headlines = [
  "Profesyonel CNC\nOperasyonları",
  "Yüksek Hassasiyetli\nÜretim",
  "Stabil Kalite &\nGüvenilir Teslimat",
];


interface HeroSectionProps {
  isFirstVisit?: boolean;
}

export const HeroSection = ({ isFirstVisit = false }: HeroSectionProps) => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  const scrollerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const maskedRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const horizontalWrapRef = useRef<HTMLDivElement>(null);
  const heroPanelRef = useRef<HTMLDivElement>(null);
  const quotePanelRef = useRef<HTMLDivElement>(null);
  const lavaFlowRef = useRef<HTMLDivElement>(null);
  const lavaOverlayRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], prefersReduced ? [0, 0] : [8, -8]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], prefersReduced ? [0, 0] : [-8, 8]);
  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 18 });

  // Headline rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // GSAP: 4-phase scroll
  useEffect(() => {
    if (prefersReduced) return;
    const scroller = scrollerRef.current;
    const masked = maskedRef.current;
    const bgImg = bgImgRef.current;
    const content = contentRef.current;
    const grid = gridRef.current;
    const horizontalWrap = horizontalWrapRef.current;
    const lavaFlow = lavaFlowRef.current;
    const lavaOverlay = lavaOverlayRef.current;
    const quotePanel = quotePanelRef.current;
    if (!scroller || !masked || !content || !grid || !horizontalWrap || !lavaFlow || !lavaOverlay || !quotePanel) return;

    const ctx = gsap.context(() => {
      // Phase 1: Mask expansion (0% – 45%)
      gsap.fromTo(
        masked,
        { "--mask-size": "22%" },
        {
          "--mask-size": "320%",
          ease: "none",
          scrollTrigger: {
            trigger: scroller,
            start: "top top",
            end: "45% top",
            scrub: 1.5,
          },
        },
      );

      // Background image fade in
      gsap.fromTo(
        bgImg,
        { opacity: 0 },
        {
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: scroller,
            start: "15% top",
            end: "40% top",
            scrub: 1,
          },
        },
      );

      // Content fade out
      gsap.to(content, {
        y: -140,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scroller,
          start: "8% top",
          end: "25% top",
          scrub: 1,
        },
      });

      // Grid parallax
      gsap.to(grid, {
        y: 400,
        ease: "none",
        scrollTrigger: {
          trigger: scroller,
          start: "top top",
          end: "45% top",
          scrub: 1,
        },
      });

      // Phase 2: Horizontal slide (45% – 85%)
      gsap.fromTo(
        horizontalWrap,
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: scroller,
            start: "45% top",
            end: "85% top",
            scrub: 0.6,
          },
        },
      );

      // Phase 3: Lava pour (85% – 100%)
      // Lava flow scaleY
      gsap.fromTo(
        lavaFlow,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scroller,
            start: "85% top",
            end: "100% top",
            scrub: 0.8,
          },
        },
      );

      // Heat distortion — animate displacement scale
      const displacementEl = document.getElementById("heat-displacement");
      if (displacementEl) {
        gsap.fromTo(
          displacementEl,
          { attr: { scale: 0 } },
          {
            attr: { scale: 3 },
            ease: "none",
            scrollTrigger: {
              trigger: scroller,
              start: "88% top",
              end: "100% top",
              scrub: true,
            },
          },
        );
      }

      // Background color shift on quote panel
      gsap.to(quotePanel, {
        background: "linear-gradient(135deg, #ff4500 0%, #e25822 50%, #b8451a 100%)",
        ease: "none",
        scrollTrigger: {
          trigger: scroller,
          start: "90% top",
          end: "100% top",
          scrub: true,
        },
      });

      // Lava overlay opacity
      gsap.fromTo(
        lavaOverlay,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scroller,
            start: "88% top",
            end: "95% top",
            scrub: true,
          },
        },
      );
    }, scroller);

    return () => ctx.revert();
  }, [prefersReduced]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const heroDelay = isFirstVisit ? 0.3 : 0;

  return (
    <div ref={scrollerRef} className="relative" style={{ height: "450vh" }}>
      <section
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
      >
        {/* Hidden SVG filter for heat distortion */}
        <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
          <defs>
            <filter id="heat-distortion">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015"
                numOctaves={2}
                result="noise"
              />
              <feDisplacementMap
                id="heat-displacement"
                in="SourceGraphic"
                in2="noise"
                scale={0}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        {/* Horizontal sliding container: 200vw wide, two panels side by side */}
        <div
          ref={horizontalWrapRef}
          className="flex h-full"
          style={{ width: "200vw" }}
        >
          {/* ── LEFT PANEL: Hero ── */}
          <div
            ref={heroPanelRef}
            className="relative h-full flex items-center justify-center overflow-hidden"
            style={{ width: "100vw", flexShrink: 0 }}
          >
            {/* R3F Liquid Distortion Canvas */}
            <Suspense fallback={null}>
              <div className="absolute inset-0 z-0">
                <HeroCanvas />
              </div>
            </Suspense>

            {/* Flash overlay for first visit */}
            {!prefersReduced && (
              <motion.div
                className="absolute inset-0 z-[50] pointer-events-none"
                initial={{ opacity: 1, filter: "brightness(3) blur(8px)" }}
                animate={{ opacity: 0, filter: "brightness(1) blur(0px)" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: isFirstVisit ? 2.6 : 0.1 }}
                style={{ backgroundColor: "white" }}
              />
            )}

            {/* Layer 1: Background video/image */}
            <div className="absolute inset-0 z-[1]">
              <video
                src={cncVideo}
                poster={heroBg}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover hidden md:block"
                style={{ opacity: 0.1 }}
              />
              <img
                src={heroBg}
                alt="CNC Factory"
                className="w-full h-full object-cover md:hidden"
                style={{ opacity: 0.15 }}
              />
            </div>

            {/* Layer 2: Masked image */}
            <div
              ref={maskedRef}
              className="absolute inset-0 z-[1]"
              style={{
                maskImage: "url('/images/mas-logo.svg')",
                WebkitMaskImage: "url('/images/mas-logo.svg')",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                maskSize: prefersReduced ? "320%" : "var(--mask-size, 22%)",
                WebkitMaskSize: prefersReduced ? "320%" : "var(--mask-size, 22%)",
              }}
            >
              <video
                src={cncVideo}
                poster={heroBg}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover hidden md:block"
                style={{ filter: "brightness(0.8) saturate(1.15) contrast(1.08)" }}
              />
              <img
                src={heroBg}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover md:hidden"
                style={{ filter: "brightness(0.8) saturate(1.15)" }}
              />
            </div>

            {/* Layer 3: Background image fade-in */}
            <div
              ref={bgImgRef}
              className="absolute inset-0 z-[2] pointer-events-none"
              style={{ opacity: prefersReduced ? 0.6 : 0 }}
            >
              <img
                src={heroBg}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.75) saturate(1.1)" }}
              />
            </div>

            {/* Layer 4: Grid overlay */}
            <div
              ref={gridRef}
              className="absolute inset-0 pointer-events-none z-[3]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(0,113,144,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,113,144,0.06) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Layer 5: Vignette */}
            <div
              className="absolute inset-0 pointer-events-none z-[4]"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(15,15,15,0.25) 0%, rgba(15,15,15,0.55) 60%, rgba(15,15,15,0.75) 100%)",
              }}
            />

            {/* Layer 6: Content */}
            <motion.div
              ref={contentRef}
              className="container-industrial relative z-10 w-full hero-content-behind-lava"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformPerspective: 1200,
                transformStyle: "preserve-3d" as const,
              }}
            >
              <motion.div
                className="max-w-6xl mx-auto text-center"
                initial={isFirstVisit ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ delay: heroDelay, duration: 0.6 }}
              >
                {/* Eyebrow */}
                <motion.div
                  className="flex items-center justify-center gap-4 mb-8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + heroDelay }}
                >
                  <motion.div
                    className="h-1 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: 64 }}
                    transition={{ duration: 0.8, delay: 0.3 + heroDelay }}
                  />
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    CNC Hassas İşleme
                  </span>
                  <motion.div
                    className="h-1 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: 64 }}
                    transition={{ duration: 0.8, delay: 0.3 + heroDelay }}
                  />
                </motion.div>

                {/* Headlines */}
                <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden mb-8">
                  <AnimatePresence mode="wait">
                    <HeadlineStagger key={currentHeadline} text={headlines[currentHeadline]} />
                  </AnimatePresence>
                </div>


                {/* Scroll indicator */}
                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1.5 + heroDelay }}
                >
                  <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/40">Scroll</span>
                  <motion.div
                    className="w-px h-8 bg-white/20"
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    style={{ transformOrigin: "top" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── RIGHT PANEL: QuickQuote with FloatingPaths ── */}
          <div
            ref={quotePanelRef}
            className="relative h-full flex items-center justify-center overflow-hidden quick-quote-panel"
            style={{
              width: "100vw",
              flexShrink: 0,
              backgroundColor: "hsl(var(--forge-mist))",
            }}
          >
            {/* WebGL Motion Gradient background */}
            <div className="absolute inset-0 z-0">
              <MotionGradientBg mode={0} temperature={0.5} />
            </div>

            {/* QuickQuote content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <QuickQuoteSection />
            </div>

            {/* Lava Overlay */}
            <div
              ref={lavaOverlayRef}
              className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
              style={{ opacity: 0 }}
            >
              <div
                ref={lavaFlowRef}
                className="absolute top-0 left-0 right-0 h-full"
                style={{
                  background: `
                    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
                    linear-gradient(to bottom, #ff6a00 0%, #ee0979 40%, #e25822 70%, #b8451a 100%)
                  `,
                  backgroundBlendMode: "overlay",
                  clipPath: "polygon(10% 0%, 90% 0%, 98% 100%, 2% 100%)",
                  transform: "scaleY(0)",
                  transformOrigin: "top",
                }}
              />
            </div>

            {/* Bottom white gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20"
              style={{
                background:
                  "linear-gradient(to top, hsl(var(--forge-mist)) 0%, hsl(var(--forge-mist) / 0.8) 40%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
