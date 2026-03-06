import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import MagneticButton from "./MagneticButton";

const FinalCTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // Track sweep state: idle | animating
  const [sweepState, setSweepState] = useState<"idle" | "animating">("idle");
  const [sweepDirection, setSweepDirection] = useState<"right" | "left">("right");
  const [sweepKey, setSweepKey] = useState(0);

  const triggerSweep = useCallback(
    (dir: "right" | "left") => {
      if (sweepState === "animating") return; // don't interrupt
      setSweepDirection(dir);
      setSweepKey((k) => k + 1);
      setSweepState("animating");
    },
    [sweepState]
  );

  const handleMouseEnter = useCallback(() => triggerSweep("right"), [triggerSweep]);
  const handleMouseLeave = useCallback(() => triggerSweep("left"), [triggerSweep]);

  // Diagonal clip-path for slash effect
  const getClipPath = (dir: "right" | "left", phase: "start" | "end") => {
    if (dir === "right") {
      // top-left to bottom-right slash
      return phase === "start"
        ? "polygon(-20% 0%, -10% 0%, -30% 100%, -40% 100%)"
        : "polygon(0% 0%, 120% 0%, 100% 100%, -20% 100%)";
    }
    // right to left slash (top-right to bottom-left)
    return phase === "start"
      ? "polygon(110% 0%, 120% 0%, 140% 100%, 130% 100%)"
      : "polygon(-20% 0%, 120% 0%, 100% 100%, -20% 100%)";
  };

  return (
    <section
      ref={sectionRef}
      id="iletisim"
      className="section-industrial text-center relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
        color: "white",
      }}
    >
      {/* Diagonal sweep overlay */}
      <motion.div
        key={sweepKey}
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ clipPath: getClipPath(sweepDirection, "start") }}
        animate={{ clipPath: getClipPath(sweepDirection, "end") }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onAnimationComplete={() => setSweepState("idle")}
        style={{
          background:
            sweepDirection === "right"
              ? "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)"
              : "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
        }}
      />

      <div className="container-industrial relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-3"
            style={{ letterSpacing: "-0.01em", lineHeight: 1.1 }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            Projenizi Hayata Geçirmeye Hazır mısınız?
          </motion.h2>
          <motion.p
            className="text-lg mb-10"
            style={{ color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            CAD dosyanızı gönderin, 48 saat içinde detaylı teknik analiz ve fiyat teklifi alın.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <MagneticButton
              href="/teklif-al"
              className="px-10 py-4 font-semibold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all bg-white text-primary hover:bg-white/90 border-2 border-white"
              strength={0.25}
            >
              Teklif Al
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              href="/iletisim"
              className="px-10 py-4 font-semibold text-sm uppercase tracking-wider inline-flex items-center justify-center transition-all bg-white text-black hover:bg-black hover:text-white border-2 border-transparent"
              strength={0.25}
            >
              Bize Ulaşın
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
