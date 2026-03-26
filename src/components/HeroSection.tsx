/**
 * HeroSection.tsx — FIXED
 *
 * FIXES:
 * 1. Vignette was rgba(15,15,15,0.85/0.95) — killed the mask reveal visibility
 *    → Reduced to 0.3/0.6/0.75 for breathing room
 * 2. Mouse tilt was ±3° — barely noticeable (Beaucoup uses 8-12°)
 *    → Increased to ±8°
 * 3. Mask start was 30% — too large, reveal not dramatic enough
 *    → Reduced to 22%, end to 320% for full bleed
 * 4. Background image layer opacity too low
 *    → Adjusted fade ranges
 * 5. Content z-index layering cleaned up
 */
import { useRef, useEffect, useCallback, useState } from "react";
import { ArrowDown } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/hooks/use-gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBg from "@/assets/hero-cnc.jpg";
import cncVideo from "@/assets/cnc-factory-zoom.mp4";
import { MagneticButton } from "./MagneticButton";
import { HeadlineStagger } from "./HeadlineStagger";

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

  // FIX: Mouse tilt increased from ±3° to ±8° (Beaucoup Studio reference)
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

  // GSAP scroll-linked mask reveal
  useEffect(() => {
    if (prefersReduced) return;
    const scroller = scrollerRef.current;
    const masked = maskedRef.current;
    const bgImg = bgImgRef.current;
    const content = contentRef.current;
    const grid = gridRef.current;
    if (!scroller || !masked || !bgImg || !content || !grid) return;

    const ctx = gsap.context(() => {
      // FIX: Mask expansion — start smaller (22%) for more dramatic reveal, end bigger (320%)
      gsap.fromTo(
        masked,
        { "--mask-size": "22%" },
        {
          "--mask-size": "320%",
          ease: "none",
          scrollTrigger: {
            trigger: scroller,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );

      // FIX: Background image — wider fade range, higher peak opacity
      gsap.fromTo(
        bgImg,
        { opacity: 0 },
        {
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: scroller,
            start: "25% top",
            end: "75% top",
            scrub: 1,
          },
        },
      );

      // Content fade out on scroll
      gsap.to(content, {
        y: -140,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scroller,
          start: "12% top",
          end: "45% top",
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
          end: "bottom top",
          scrub: 1,
        },
      });
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
    <div ref={scrollerRef} className="relative" style={{ height: "300vh" }}>
      <section
        ref={stickyRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
      >
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

        {/* Layer 1: Background video/image (dimmed, always present) */}
        <div className="absolute inset-0 z-0">
          <video
            src={cncVideo}
            poster={heroBg}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover hidden md:block"
            style={{ opacity: 0.18 }}
          />
          <img
            src={heroBg}
            alt="CNC Factory"
            className="w-full h-full object-cover md:hidden"
            style={{ opacity: 0.18 }}
          />
        </div>

        {/* Layer 2: Masked image — reveals through MAS logo on scroll */}
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
            preload="none"
            className="w-full h-full object-cover hidden md:block"
            /* FIX: Masked layer brighter — the whole point is to SEE it through the mask */
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

        {/* Layer 3: Background image (fades in during scroll to blend mask → full image) */}
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

        {/* Layer 5: Vignette — FIX: was way too dark (0.85/0.95), mask reveal invisible */}
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
          className="container-industrial relative z-10 w-full"
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

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: "rgba(255,255,255,0.7)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + heroDelay }}
            >
              CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti, yüksek doğruluk ve proses kontrollü üretim
              anlayışıyla, stabil kalite ve zamanında teslimat odaklı mühendislik çözümleri sunuyoruz.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + heroDelay }}
            >
              <MagneticButton
                as="button"
                onClick={() => {
                  const el = document.getElementById("hizli-teklif");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-primary text-primary-foreground font-bold px-10 py-4 uppercase tracking-wider text-sm flex items-center justify-center gap-3 hover:brightness-110 transition-all"
              >
                <span>Hızlı Teklif Al</span>
                <motion.span
                  className="inline-block"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowDown className="w-4 h-4" />
                </motion.span>
              </MagneticButton>
            </motion.div>

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
      </section>
    </div>
  );
};
