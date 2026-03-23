import { useRef } from "react";
import { Upload, MessageSquare, Settings, Truck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { SectionHeader } from "./SectionHeader";
import { useIsMobile } from "@/hooks/use-mobile";

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
  },
];

export const HowWeWorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const slideInitial = prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 };
  const slideAnimate = { opacity: 1, x: 0 };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Desktop: translate strip so all 4 cards scroll horizontally into view
  // Start offset = (totalCardWidth - viewport) expressed as % of strip width
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["60%", "-10%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.02], [0.8, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.02], [10, 0]);

  // Mobile: simple vertical layout, no sticky scroll
  if (isMobile) {
    return (
      <motion.section
        id="nasil-calisiyoruz"
        className="relative border-y border-border py-12"
        style={{ backgroundColor: "hsl(var(--forge-workshop))" }}
        initial={slideInitial}
        whileInView={slideAnimate}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
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
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={sectionRef}
      id="nasil-calisiyoruz"
      className="relative border-y border-border"
      style={{
        height: "300vh",
        backgroundColor: "hsl(var(--forge-workshop))",
      }}
      initial={slideInitial}
      whileInView={slideAnimate}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Header */}
        <motion.div className="container-industrial pt-8 pb-6" style={{ opacity: headerOpacity, y: headerY }}>
           <SectionHeader
            tag="Metodoloji"
            title="Hassas Üretim İş Akışımız"
            sectionNumber={2}
            description="Teknik veriden son kalite onayına kadar uçtan uca endüstriyel sürecimiz"
          />
        </motion.div>

        {/* Horizontal card strip */}
        <motion.div className="flex gap-5 px-8 lg:px-12 pb-8" style={{ x }}>
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const StepCard = ({ step, index }: { step: (typeof steps)[number]; index: number }) => {
  return (
    <div className="flex-shrink-0 w-full md:w-[calc(25%-15px)] min-w-0 md:min-w-[280px] p-6 lg:p-8 border bg-background border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 bg-primary flex items-center justify-center">
          <step.icon className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <span className="text-technical text-xs text-primary block">{step.number}.</span>
          <span className="font-bold text-lg">{step.label}</span>
        </div>
      </div>

      <h3 className="heading-industrial text-lg mb-2">{step.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{step.description}</p>

      <div className="grid grid-cols-1 gap-2 mb-5">
        {step.checklist.map((item) => (
          <div key={item.title} className="flex items-start gap-[8px]">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold block">{item.title}</span>
              <span className="text-[11px] text-muted-foreground">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <span className="text-technical font-bold text-primary text-xl">{step.stat.value}</span>
        <span className="text-technical text-[10px] text-muted-foreground uppercase tracking-wider">
          {step.stat.label}
        </span>
      </div>
    </div>
  );
};
