import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { Reveal } from "@/components/ui/Reveal";
import MagneticButton from "./MagneticButton";

const projects = [
  {
    title: "Havacılık Türbin Kanatları",
    subtitle: "Ti-6Al-4V • 5 Eksen CNC",
    description: "AS9100 sertifikalı üretim hattında 1200+ türbin kanadı üretimi. ±0.003mm tolerans.",
    tag: "Havacılık & Uzay",
    gradient: "from-[hsl(var(--forge-iron))] to-[hsl(var(--forge-gunmetal))]",
    link: "/endustriyel/havacilik-uzay",
  },
  {
    title: "Otomotiv Şanzıman Gövdesi",
    subtitle: "Al 7075-T6 • CNC Frezeleme",
    description: "Seri üretimde 10.000+ adet/yıl kapasite. Entegre CMM kalite kontrolü.",
    tag: "Otomotiv",
    gradient: "from-[hsl(var(--forge-gunmetal))] to-[hsl(var(--forge-obsidian))]",
    link: "/endustriyel/otomotiv",
  },
  {
    title: "Medikal İmplant Prototipi",
    subtitle: "316L Paslanmaz • Mikro İşleme",
    description: "ISO 13485 uyumlu prototyping. Yüzey pürüzlülüğü Ra 0.4µm.",
    tag: "Medikal",
    gradient: "from-[hsl(var(--forge-steel))] to-[hsl(var(--forge-iron))]",
    link: "/endustriyel/medikal",
  },
  {
    title: "Enerji Valf Gövdeleri",
    subtitle: "Inconel 718 • Derin Delik",
    description: "Yüksek basınç uygulamaları için özel alaşım işleme. 350+ bar test.",
    tag: "Enerji",
    gradient: "from-[hsl(var(--forge-obsidian))] to-[hsl(var(--forge-steel))]",
    link: "/endustriyel/petrol-gaz",
  },
];

const ProjectShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["0%", `-${(projects.length - 1) * 80}vw`]
  );

  // Mobile: vertical layout
  if (isMobile) {
    return (
      <section
        className="section-industrial"
        style={{ backgroundColor: "hsl(var(--forge-obsidian))" }}
      >
        <div className="container-industrial">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="typo-tag text-primary">{"Projelerimiz"}</span>
            </div>
            <h2 className="typo-h2 text-white mb-4">
              <span>{"Referans Projeler"}</span>
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {projects.map((p, i) => (
              <MobileProjectCard key={i} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: `${projects.length * 100}vh`,
        backgroundColor: "hsl(var(--forge-obsidian))",
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Header */}
        <div className="container-industrial pt-12 pb-8">
          <Reveal direction="up" duration={0.6}>
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-primary" />
                  <span className="typo-tag text-primary">{"Projelerimiz"}</span>
                </div>
                <h2 className="typo-h2 text-white">
                  <span>{"Referans Projeler"}</span>
                </h2>
              </div>
              <Link
                to="/endustriyel/havacilik-uzay"
                className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors"
              >
                {"Tüm Projeler"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Horizontal scroll track */}
        <motion.div
          className="flex gap-8 pl-8"
          style={{ x }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="container-industrial py-6">
          <div className="w-full h-px bg-white/10 overflow-hidden">
            <motion.div
              className="h-full origin-left"
              style={{
                scaleX: scrollYProgress,
                background: "linear-gradient(90deg, hsl(var(--forge-molten)), hsl(var(--forge-amber)))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: typeof projects[number]; index: number }) => (
  <motion.div
    className={`relative flex-shrink-0 w-[75vw] h-[60vh] bg-gradient-to-br ${project.gradient} overflow-hidden group`}
    whileHover={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
  >
    {/* Grid overlay */}
    <div
      className="absolute inset-0 pointer-events-none opacity-10"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />

    {/* Content */}
    <div className="relative z-10 h-full flex flex-col justify-end p-10 lg:p-14">
      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 mb-4">
        {project.tag}
      </span>
      <h3 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-2">
        <span>{project.title}</span>
      </h3>
      <p className="text-sm font-mono text-white/50 mb-4">
        <span>{project.subtitle}</span>
      </p>
      <p className="text-base text-white/60 max-w-lg leading-relaxed mb-6">
        <span>{project.description}</span>
      </p>
      <MagneticButton
        href={project.link}
        className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/30 px-6 py-3 hover:bg-white/10 transition-all w-fit"
        strength={0.2}
      >
        <span>{"Detayları Gör"}</span>
        <ArrowRight className="w-4 h-4" />
      </MagneticButton>
    </div>

    {/* Number watermark */}
    <div
      className="absolute top-6 right-10 text-[120px] lg:text-[200px] font-bold leading-none pointer-events-none select-none"
      style={{ color: "rgba(255,255,255,0.03)" }}
    >
      {`0${index + 1}`}
    </div>
  </motion.div>
);

const MobileProjectCard = ({ project, index }: { project: typeof projects[number]; index: number }) => (
  <motion.div
    className={`relative bg-gradient-to-br ${project.gradient} overflow-hidden p-6`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 mb-3 block">
      {project.tag}
    </span>
    <h3 className="text-xl font-bold text-white tracking-tight mb-2">
      <span>{project.title}</span>
    </h3>
    <p className="text-xs font-mono text-white/50 mb-3">
      <span>{project.subtitle}</span>
    </p>
    <p className="text-sm text-white/60 leading-relaxed mb-4">
      <span>{project.description}</span>
    </p>
    <Link
      to={project.link}
      className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/30 px-4 py-2 hover:bg-white/10 transition-all"
    >
      {"Detaylar"}
      <ArrowRight className="w-3.5 h-3.5" />
    </Link>
  </motion.div>
);

export default ProjectShowcase;
