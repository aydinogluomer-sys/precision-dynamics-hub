import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import MagneticButton from "./MagneticButton";

const FinalCTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="iletisim"
      className="section-industrial text-center relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
        color: "white",
      }}
    >
      {/* Sweep animation overlay */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={false}
        animate={{
          x: isHovered ? "0%" : "-100%",
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)",
        }}
      />

      <motion.div className="container-industrial relative z-10" style={{ scale, opacity }}>
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
            CAD dosyanızı gönderin, 24 saat içinde detaylı teknik analiz ve fiyat teklifi alın.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <MagneticButton
              href="#teklif"
              className="px-10 py-4 font-semibold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all border-2 border-white text-white"
              strength={0.25}
            >
              Teklif Al
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              href="#kabiliyetler"
              className="px-10 py-4 font-semibold text-sm uppercase tracking-wider inline-flex items-center justify-center transition-all bg-white text-black hover:bg-black hover:text-white border-2 border-transparent"
              strength={0.25}
            >
              Portföyümüz
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
