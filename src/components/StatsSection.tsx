// StatsSection - each stat uses its own StatCard component for proper hook usage
import { SectionHeader } from "./SectionHeader";
import { useEffect, useState, useRef, forwardRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div className={className} variants={staggerItemVariants}>
    {children}
  </motion.div>
);

const StaggerContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0 }}
    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
  >
    {children}
  </motion.div>
);
const stats = [
  { value: 35, suffix: "+", label: "CNC Tezgâh", isDecimal: false },
  { value: 0.01, suffix: "mm", label: "Tolerans", isDecimal: true },
  { value: 2000, suffix: "mm", label: "Max Parça", isDecimal: false },
  { value: 15, suffix: "+", label: "Yıl Tecrübe", isDecimal: false },
];

const StatCard = ({ stat, index }: { stat: (typeof stats)[number]; index: number }) => {
  const prefersReduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) {
      setCount(stat.value);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const duration = 2000;
          const step = () => {
            const progress = Math.min((Date.now() - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(easeOut * stat.value);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value, hasAnimated, prefersReduced]);

  const displayCount = stat.isDecimal ? count.toFixed(2) : Math.floor(count);

  return (
    <StaggerItem>
      <motion.div
        ref={ref}
        className="relative text-center p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
        whileHover={{
          borderColor: "rgba(232, 97, 10, 0.4)",
          boxShadow: "0 0 30px rgba(232, 97, 10, 0.15)",
        }}
        transition={{ delay: 0.15 * index }}
      >
        {/* Scroll-driven fill bar — scaleX 0→1 as section enters */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px origin-left"
          style={{ background: "hsl(var(--forge-molten))" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.5 + index * 0.12 }}
        />
        <div
          className="text-5xl md:text-6xl font-bold mb-2 font-mono"
          style={{
            lineHeight: 1,
            color: "hsl(var(--forge-molten))",
            fontVariantNumeric: "tabular-nums",
            textShadow: "0 0 20px rgba(232, 97, 10, 0.4), 0 0 40px rgba(232, 97, 10, 0.15)",
          }}
        >
          {displayCount}
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
};

export const StatsSection = forwardRef<HTMLElement>(function StatsSection(_props, forwardedRef) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedGlobal = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const circleInitial = prefersReducedGlobal
    ? { clipPath: "circle(150% at 50% 50%)" }
    : { clipPath: "circle(0% at 50% 50%)" };
  const circleAnimate = { clipPath: "circle(150% at 50% 50%)" };

  return (
    <motion.section
      ref={(node) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      id="rakamlar"
      className="py-24 md:py-32 lg:py-40 min-h-screen flex items-center relative overflow-hidden"
      style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
      initial={circleInitial}
      whileInView={circleAnimate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,126,140,0.15) 0%, rgba(232,97,10,0.05) 40%, transparent 60%)",
          y: bgY,
        }}
      />
      <div className="container-industrial relative z-10">
        <div className="mb-16">
           <SectionHeader
            tag="Rakamlar"
            title="Rakamlarla Mas Technic"
            sectionNumber={5}
            align="center"
            titleClassName="text-4xl md:text-6xl font-bold text-white tracking-tighter"
          />
        </div>
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </StaggerContainer>
      </div>
    </motion.section>
  );
});

StatsSection.displayName = "StatsSection";
