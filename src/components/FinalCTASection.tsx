import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import MagneticButton from "./MagneticButton";

const FinalCTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sweepState, setSweepState] = useState<"idle" | "animating">("idle");
  const [sweepDirection, setSweepDirection] = useState<"right" | "left">("right");
  const [sweepKey, setSweepKey] = useState(0);

  const triggerSweep = useCallback(
    (dir: "right" | "left") => {
      if (sweepState === "animating") return;
      setSweepDirection(dir);
      setSweepKey((k) => k + 1);
      setSweepState("animating");
    },
    [sweepState]
  );

  const handleMouseEnter = useCallback(() => triggerSweep("right"), [triggerSweep]);
  const handleMouseLeave = useCallback(() => triggerSweep("left"), [triggerSweep]);

  const getClipPath = (dir: "right" | "left", phase: "start" | "end") => {
    if (dir === "right") {
      return phase === "start"
        ? "polygon(-20% 0%, -10% 0%, -30% 100%, -40% 100%)"
        : "polygon(0% 0%, 120% 0%, 100% 100%, -20% 100%)";
    }
    return phase === "start"
      ? "polygon(110% 0%, 120% 0%, 140% 100%, 130% 100%)"
      : "polygon(-20% 0%, 120% 0%, 100% 100%, -20% 100%)";
  };

  return (
    <section
      ref={sectionRef}
      id="iletisim"
      className="py-20 md:py-28 text-center relative overflow-hidden"
      style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          background: sweepDirection === "right"
            ? "linear-gradient(135deg, #3a4a5c 0%, #0f0f0f 100%)"
            : "linear-gradient(135deg, #0f0f0f 0%, #3a4a5c 100%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-industrial relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70 mb-6 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Başlayalım
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6"
            style={{ lineHeight: 1.15 }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            Bir Sonraki Kritik Projenize<br />Başlamaya Hazır mısınız?
          </motion.h2>

          <motion.p
            className="text-base md:text-lg mb-10 max-w-xl mx-auto text-primary-foreground/70"
            style={{ lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            CAD dosyanızı gönderin, 24 saat içinde kapsamlı DFM analizi ve rekabetçi fiyat teklifi alın. Mühendislik ekibimiz zorlayıcı projelerinize yardımcı olmak için hazır.
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
              className="px-10 py-4 font-semibold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all text-white hover:brightness-110 border-2 bg-sanzo-sienna border-sanzo-sienna"
              strength={0.25}
            >
              Teklif Al
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              href="/iletisim"
              className="px-10 py-4 font-semibold text-sm uppercase tracking-wider inline-flex items-center justify-center transition-all bg-transparent text-primary-foreground hover:bg-primary-foreground/10 border border-primary-foreground/30"
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
