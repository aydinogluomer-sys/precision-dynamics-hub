import { useRef, useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, ScrollTrigger } from "@/hooks/use-gsap";
import cncVideo from "@/assets/cnc-factory-zoom.mp4";

// Replace with URL from scripts/generate-engineering-video.py
const SEEDANCE_VIDEO = "";
const VIDEO_SRC = SEEDANCE_VIDEO || cncVideo;

const stages = [
  {
    index: "01",
    phase: "Tasarım",
    title: "DFM Analizi &\nTolerans Kontrolü",
    specs: ["3D model → üretilebilirlik analizi", "Kritik toleranslar: ±0.005mm", "Malzeme fizibilitesi raporu"],
    metric: "48 sa",
    metricLabel: "Teklif Süresi",
    accent: "hsl(var(--forge-teal))",
  },
  {
    index: "02",
    phase: "Malzeme",
    title: "500+ Malzeme\nSeçeneği",
    specs: ["Al 7075, SS 316L, Ti-6Al-4V", "Isıl işlem ve sertleştirme", "Sertifikalı malzeme tedariki"],
    metric: "500+",
    metricLabel: "Malzeme",
    accent: "hsl(var(--forge-molten))",
  },
  {
    index: "03",
    phase: "İşleme",
    title: "5-Eksen CNC\nHassas Üretim",
    specs: ["DMG MORI & Mazak tezgâhlar", "Gerçek zamanlı SPC kontrolü", "Ra 0.4μm yüzey kalitesi"],
    metric: "45+",
    metricLabel: "CNC Tezgâh",
    accent: "hsl(var(--forge-amber))",
  },
  {
    index: "04",
    phase: "Kalite Kontrol",
    title: "CMM ile\nISO Sertifikasyon",
    specs: ["3D koordinat ölçümü", "ISO 9001 / AS9100D uyumu", "Tam malzeme sertifikası"],
    metric: "%100",
    metricLabel: "Kalite Onayı",
    accent: "hsl(var(--primary))",
  },
];

export const EngineeringSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReduced = usePrefersReducedMotion();

  // Video gated by IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { video.play().catch(() => {}); } else { video.pause(); } },
      { threshold: 0.1 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const wrapper = wrapperRef.current;
    const pin = pinRef.current;
    const progress = progressRef.current;
    const counter = counterRef.current;
    const stages = stageRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!wrapper || !pin || !progress || !counter || stages.length < 4) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=300%",
          pin,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(progress, { scaleX: self.progress });
            const step = Math.min(4, Math.floor(self.progress * 4) + 1);
            const cur = parseInt(counter.dataset.step ?? "1");
            if (step !== cur) {
              counter.dataset.step = String(step);
              counter.textContent = String(step).padStart(2, "0");
              gsap.fromTo(counter, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: "power2.out", overwrite: true });
            }
          },
        },
      });

      // Each stage: clip-path reveal in, pause, wipe out
      stages.forEach((stage, i) => {
        gsap.set(stage, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
        const offset = i * 0.25;
        tl.to(stage, { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.2, ease: "power2.out" }, offset)
          .to(stage, { opacity: 0, duration: 0.08, ease: "power2.in" }, offset + 0.18);
      });
      // Last stage stays visible
      gsap.set(stages[3], {});
      tl.to(stages[3], { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.2 }, 0.75);
    }, wrapper);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <div ref={wrapperRef} id="muhendislik-uretim">
      <div
        ref={pinRef}
        className="relative overflow-hidden"
        style={{ height: "100vh", backgroundColor: "hsl(var(--forge-obsidian))" }}
      >
        {/* Blueprint grid overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.04 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="eng-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--forge-teal))" strokeWidth="0.5" />
            </pattern>
            <pattern id="eng-grid-major" width="300" height="300" patternUnits="userSpaceOnUse">
              <path d="M 300 0 L 0 0 0 300" fill="none" stroke="hsl(var(--forge-teal))" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eng-grid)" />
          <rect width="100%" height="100%" fill="url(#eng-grid-major)" />
        </svg>

        {/* Video background */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted loop playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.12, mixBlendMode: "luminosity" }}
        />
        {/* Dark vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, hsl(var(--forge-obsidian) / 0.7) 100%)" }}
        />

        {/* Section tag */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <div className="w-6 h-px" style={{ backgroundColor: "hsl(var(--forge-teal))" }} />
          <span
            className="text-[10px] font-mono uppercase tracking-[0.3em]"
            style={{ color: "hsl(var(--forge-teal))" }}
          >
            Mühendislik & Üretim
          </span>
        </div>

        {/* Stage content */}
        <div className="absolute inset-0 flex items-center justify-center px-8">
          {stages.map((stage, i) => (
            <div
              key={stage.index}
              ref={(el) => { stageRefs.current[i] = el; }}
              className="absolute inset-0 flex items-center justify-center px-8"
              style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            >
              <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: number + title */}
                <div>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span
                      className="text-[120px] font-bold font-mono leading-none select-none"
                      style={{ color: stage.accent, opacity: 0.15 }}
                    >
                      {stage.index}
                    </span>
                    <span
                      className="text-xs font-mono uppercase tracking-[0.25em]"
                      style={{ color: stage.accent }}
                    >
                      {stage.phase}
                    </span>
                  </div>
                  <h2
                    className="text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tighter mb-6"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {stage.title}
                  </h2>
                  <ul className="space-y-2">
                    {stage.specs.map((spec) => (
                      <li key={spec} className="flex items-center gap-3 text-sm" style={{ color: "hsl(var(--forge-silver))" }}>
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: stage.accent }} />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Right: metric */}
                <div className="flex flex-col items-start lg:items-end">
                  <div
                    className="text-7xl md:text-9xl font-bold font-mono leading-none mb-2"
                    style={{ color: stage.accent }}
                  >
                    {stage.metric}
                  </div>
                  <div
                    className="text-xs font-mono uppercase tracking-[0.25em]"
                    style={{ color: "hsl(var(--forge-silver))" }}
                  >
                    {stage.metricLabel}
                  </div>
                  {/* Accent line */}
                  <div className="mt-6 w-24 h-px" style={{ backgroundColor: stage.accent }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom progress + counter */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: "hsl(var(--border))" }}>
          <div
            ref={progressRef}
            className="h-full origin-left"
            style={{ backgroundColor: "hsl(var(--forge-molten))", transform: "scaleX(0)" }}
          />
        </div>
        <div className="absolute bottom-6 right-8 flex items-center gap-2 text-xs font-mono tracking-widest" style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
          <span ref={counterRef} data-step="1">01</span>
          <span>/ 04</span>
        </div>
      </div>
    </div>
  );
};
