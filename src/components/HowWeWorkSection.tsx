import { useRef, useEffect } from "react";
import { Upload, MessageSquare, Settings, Truck } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { SectionHeader } from "./SectionHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { gsap, ScrollTrigger } from "@/hooks/use-gsap";

const steps = [
  {
    number: "01",
    icon: Upload,
    label: "Analiz",
    title: "Fizibilite & Kaynak Planlaması",
    description: "Teknik analiz, malzeme fizibilitesi ve kaynak planlamasıyla başlıyoruz.",
    checklist: [
      { title: "Maliyet Optimizasyonu", desc: "Kaynak tahsis stratejisi" },
      { title: "Malzeme Analizi", desc: "Dayanıklılık ve mukavemet testleri" },
      { title: "ISO Hazırlığı", desc: "Standart uyumluluk denetimi" },
    ],
    stat: { value: "99.8%", label: "Faz Güvenilirliği" },
    accent: "hsl(var(--forge-teal))",
  },
  {
    number: "02",
    icon: MessageSquare,
    label: "Tasarım",
    title: "Teknik Tasarım & Geri Bildirim",
    description: "Mühendislerimiz, tasarımınızı DFM ilkelerine göre imalata uygunluk açısından inceler.",
    checklist: [
      { title: "DFM Analizi", desc: "Üretim için tasarım optimizasyonu" },
      { title: "Tolerans Kontrolü", desc: "Geometrik boyut doğrulama" },
      { title: "Malzeme Seçimi", desc: "Uygulamaya özel malzeme" },
    ],
    stat: { value: "48 sa", label: "Ortalama Teklif Süresi" },
    accent: "hsl(var(--forge-molten))",
  },
  {
    number: "03",
    icon: Settings,
    label: "Üretim",
    title: "Hassas Üretim & İzleme",
    description: "Onaylı tasarımlar, CNC tezgâhlarda gerçek zamanlı izlemeyle üretilir.",
    checklist: [
      { title: "5 Eksen CNC", desc: "Karmaşık geometri işleme" },
      { title: "Yüzey İşleme", desc: "Ra 0.4μm yüzey kalitesi" },
      { title: "Proses Kontrolü", desc: "SPC ile süreç yönetimi" },
    ],
    stat: { value: "±0.005", label: "mm Tolerans" },
    accent: "hsl(var(--forge-amber))",
  },
  {
    number: "04",
    icon: Truck,
    label: "KK & Teslimat",
    title: "Kalite Kontrol & Sevkiyat",
    description: "CMM ölçüm cihazlarıyla kalite onayı, özenli paketleme ve tam vaktinde teslimat.",
    checklist: [
      { title: "CMM Ölçüm", desc: "3 boyutlu koordinat ölçümü" },
      { title: "Sertifikasyon", desc: "Malzeme ve test sertifikaları" },
      { title: "Paketleme", desc: "Özel koruyucu ambalaj" },
    ],
    stat: { value: "%100", label: "Kalite Kontrol" },
    accent: "hsl(var(--primary))",
  },
];

export const HowWeWorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (isMobile || prefersReduced) return;
    const section = sectionRef.current;
    const strip = stripRef.current;
    const header = headerRef.current;
    const progress = progressRef.current;
    if (!section || !strip || !header || !progress) return;

    const ctx = gsap.context(() => {
      // Header fade in
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Horizontal scroll pinning
      const totalScroll = strip.scrollWidth - window.innerWidth;

      gsap.to(strip, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set(progress, { scaleX: self.progress });
          },
        },
      });

      // Stagger card reveals
      const cards = strip.querySelectorAll(".hww-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById?.("hww-scroll") || undefined,
              start: "left 80%",
              toggleActions: "play none none none",
            },
            delay: i * 0.1,
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile, prefersReduced]);

  // Mobile: simple vertical layout
  if (isMobile) {
    return (
      <section
        id="nasil-calisiyoruz"
        className="relative border-y border-border py-12"
        style={{ backgroundColor: "hsl(var(--forge-workshop))" }}
      >
        <div className="container-industrial mb-8">
          <SectionHeader
            tag="Metodoloji"
            title="Hassas Üretim İş Akışımız"
            sectionNumber={2}
            description="Teknik veriden son kalite onayına kadar uçtan uca endüstriyel sürecimiz"
          />
        </div>
        <div className="flex flex-col gap-5 px-4">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="nasil-calisiyoruz"
      className="relative border-y border-border overflow-hidden"
      style={{ backgroundColor: "hsl(var(--forge-workshop))" }}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none" style={{ opacity: 0 }}>
        <div
          ref={progressRef}
          className="h-full origin-left"
          style={{
            backgroundColor: "hsl(var(--primary))",
            transform: "scaleX(0)",
          }}
        />
      </div>

      {/* Header — inside sticky container */}
      <div ref={headerRef} className="pt-16 pb-8 px-8 lg:px-16">
        <SectionHeader
          tag="Metodoloji"
          title="Hassas Üretim İş Akışımız"
          sectionNumber={2}
          description="Teknik veriden son kalite onayına kadar uçtan uca endüstriyel sürecimiz"
        />
      </div>

      {/* Horizontal scroll strip */}
      <div ref={stripRef} className="flex gap-8 px-8 lg:px-16 pb-16 will-change-transform">
        {/* Spacer for initial viewport centering */}
        <div className="flex-shrink-0 w-[10vw]" />
        {steps.map((step, i) => (
          <StepCard key={step.number} step={step} index={i} />
        ))}
        {/* End spacer */}
        <div className="flex-shrink-0 w-[20vw]" />
      </div>

      {/* Bottom progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: "hsl(var(--border))" }}>
        <div
          ref={progressRef}
          className="h-full origin-left transition-none"
          style={{
            backgroundColor: "hsl(var(--primary))",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </section>
  );
};

const StepCard = ({ step, index }: { step: (typeof steps)[number]; index: number }) => {
  return (
    <div
      className="hww-card flex-shrink-0 w-full md:w-[380px] lg:w-[420px] p-8 lg:p-10 border bg-background border-border hover:border-primary/40 transition-all duration-500 group relative overflow-hidden"
      data-cursor="detail"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ backgroundColor: step.accent }}
      />

      {/* Step number + icon */}
      <div className="flex items-center justify-between mb-8">
        <span
          className="text-6xl font-bold font-mono leading-none"
          style={{ color: "hsl(var(--border))" }}
        >
          {step.number}
        </span>
        <div
          className="w-14 h-14 flex items-center justify-center border border-border group-hover:border-primary/40 transition-colors duration-300"
          style={{ backgroundColor: "hsl(var(--muted))" }}
        >
          <step.icon className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Label */}
      <span
        className="text-[10px] font-mono uppercase tracking-[0.3em] mb-3 block"
        style={{ color: step.accent }}
      >
        {step.label}
      </span>

      {/* Title */}
      <h3 className="heading-industrial text-xl lg:text-2xl mb-3 group-hover:text-primary transition-colors duration-300">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{step.description}</p>

      {/* Checklist */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {step.checklist.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
              style={{ backgroundColor: step.accent }}
            />
            <div>
              <span className="text-xs font-semibold block">{item.title}</span>
              <span className="text-[11px] text-muted-foreground">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stat footer */}
      <div className="flex items-center gap-3 pt-5 border-t border-border">
        <span className="text-technical font-bold text-xl" style={{ color: step.accent }}>
          {step.stat.value}
        </span>
        <span className="text-technical text-[10px] text-muted-foreground uppercase tracking-wider">
          {step.stat.label}
        </span>
      </div>
    </div>
  );
};
