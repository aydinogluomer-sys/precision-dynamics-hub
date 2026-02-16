import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";

const stats = [
  { value: 35, suffix: "+", label: "CNC Tezgâh", description: "Modern makine parkuru" },
  { value: 0.01, suffix: "mm", label: "Tolerans", description: "Hassasiyet standardı", isDecimal: true },
  { value: 2000, suffix: "mm", label: "Max Parça", description: "İşleme kapasitesi" },
  { value: 15, suffix: "+", label: "Yıl Tecrübe", description: "Endüstri deneyimi" },
];

const useCountUp = (end: number, duration: number = 2000, isDecimal: boolean = false) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const step = () => {
            const progress = Math.min((Date.now() - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(easeOut * end);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { count: isDecimal ? count.toFixed(2) : Math.floor(count), ref };
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={sectionRef} id="rakamlar" className="py-20 relative overflow-hidden" style={{ backgroundColor: "#0F172A" }}>
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(6, 136, 173, 0.15) 0%, transparent 60%)",
          y: bgY,
        }}
      />

      <div className="container-industrial relative z-10">
        <TextReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Rakamlarla Mas Technic
          </h2>
        </TextReveal>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const { count, ref } = useCountUp(stat.value, 2000, stat.isDecimal);
            return (
              <StaggerItem key={index}>
                <motion.div
                  ref={ref}
                  className="text-center p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  whileHover={{
                    borderColor: "rgba(6, 136, 173, 0.4)",
                    boxShadow: "0 0 30px rgba(6, 136, 173, 0.1)",
                  }}
                >
                  <div
                    className="text-5xl md:text-6xl font-bold text-primary mb-2"
                    style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}
                  >
                    {count}
                    <span className="text-3xl">{stat.suffix}</span>
                  </div>
                  <div
                    className="text-xs uppercase tracking-[0.2rem] font-semibold"
                    style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default StatsSection;
