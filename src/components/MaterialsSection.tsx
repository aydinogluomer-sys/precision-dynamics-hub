import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { ToleranceMaterialCard } from "@/components/ToleranceMaterialCard";
import { toleranceMaterials } from "@/data/toleranceMaterials";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const proofPoints = ["EN 10204 3.1 izlenebilirlik", "CMM raporu", "FAIR / PPAP hazırlığı"] as const;

export const MaterialsSection = () => {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section
      id="malzemeler"
      className="relative overflow-hidden bg-background py-24 md:py-32 lg:py-36"
      style={{ backgroundColor: "var(--bg-dark-gunmetal)" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--border)/0.12)_1px,transparent_1px),linear-gradient(180deg,hsl(var(--border)/0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />
      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 grid gap-8 border-b border-surface-border pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.5em] text-primary">
                Materials Ledger
              </span>
            </div>
            <motion.h2
              className="max-w-3xl text-4xl font-semibold leading-[0.95] tracking-normal text-foreground md:text-6xl"
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Malzeme seçimi artık tolerans verisiyle okunur.
            </motion.h2>
          </div>
          <div className="lg:pl-8">
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Kritik alaşımlar, hedef tolerans bandı, ölçülen sapma ve kalite kontrol iziyle birlikte sunulur; satın alma ve mühendislik aynı ledger üzerinden karar verir.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {proofPoints.map((point) => (
                <span key={point} className="inline-flex items-center gap-2 border border-surface-border bg-card/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {toleranceMaterials.map((material, index) => (
            <ToleranceMaterialCard key={material.code} material={material} index={index} />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-surface-border pt-7 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Ölçüm periyodu · 2026 Q1 · CMM / profilometre kontrollü
          </p>
          <a
            href="/malzemeler"
            className="inline-flex w-fit items-center gap-2 border border-primary/40 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            Malzeme kütüphanesi
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
