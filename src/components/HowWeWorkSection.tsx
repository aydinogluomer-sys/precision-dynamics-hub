import React, { useRef, useState, useEffect } from "react";
import { Upload, MessageSquare, Settings, Truck, CheckCircle } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
  {
    number: "01",
    icon: Upload,
    label: "Analiz",
    title: "Fizibilite & Kaynak Planlaması",
    description:
      "İlk aşamada derinlemesine teknik analiz, malzeme fizibilite çalışmaları ve kapsamlı kaynak planlaması gerçekleştiriyoruz.",
    checklist: [
      { title: "CAD Uyumluluğu", desc: "Evrensel dosya formatı desteği" },
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
    description:
      "Mühendislerimiz tasarımınızı detaylı olarak inceler, DFM ilkeleri doğrultusunda imalat uygunluğunu değerlendirir.",
    checklist: [
      { title: "DFM Analizi", desc: "Üretim için tasarım optimizasyonu" },
      { title: "Tolerans Kontrolü", desc: "Geometrik boyut doğrulama" },
      { title: "Prototip Planı", desc: "Hızlı prototipleme stratejisi" },
      { title: "Malzeme Seçimi", desc: "Uygulamaya özel malzeme" },
    ],
    stat: { value: "48 sa", label: "Ortalama Teklif Süresi" },
  },
  {
    number: "03",
    icon: Settings,
    label: "Üretim",
    title: "Hassas Üretim & İzleme",
    description:
      "Onaylanan tasarımlar çok eksenli CNC tezgâhlarımızda üretilir. Tüm süreç boyunca gerçek zamanlı izleme yapılır.",
    checklist: [
      { title: "5 Eksen CNC", desc: "Karmaşık geometri işleme" },
      { title: "Gerçek Zamanlı İzleme", desc: "IoT destekli proses takibi" },
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
    description:
      "CMM ölçüm cihazları ile %100 kalite kontrol sonrası güvenli paketleme ve zamanında teslimat.",
    checklist: [
      { title: "CMM Ölçüm", desc: "3 boyutlu koordinat ölçümü" },
      { title: "Sertifikasyon", desc: "Malzeme ve test sertifikaları" },
      { title: "Paketleme", desc: "Özel koruyucu ambalaj" },
      { title: "Lojistik", desc: "Uluslararası sevkiyat desteği" },
    ],
    stat: { value: "%100", label: "Kalite Kontrol" },
  },
];

const HowWeWorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // All hooks called unconditionally
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "-75%"]
  );
  const x = useSpring(rawX, { stiffness: 200, damping: 40 });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // IO-based activeStep for mobile
  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        });
        if (bestEntry) {
          const index = stepRefs.current.indexOf(bestEntry.target as HTMLDivElement);
          if (index !== -1) setActiveStep(index);
        }
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-20% 0px -20% 0px" }
    );
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div
      ref={sectionRef}
      className="lg:h-[400vh] h-auto"
      style={{ backgroundColor: "hsl(var(--forge-workshop))" }}
    >
      <style>{`.dark #nasil-calisiyoruz { background-color: hsl(var(--forge-workshop)) !important; }`}</style>
      <div
        id="nasil-calisiyoruz"
        className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col justify-center border-y border-border"
        style={{ backgroundColor: "hsl(var(--forge-workshop))" }}
      >
        {/* Section Header */}
        <div className="container-industrial pt-16 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              tag="Metodoloji"
              title="Hassas Üretim İş Akışımız"
              description="Teknik veriden son kalite onayına kadar uçtan uca endüstriyel sürecimiz"
            />
          </motion.div>
        </div>

        {/* Progress bar — desktop only */}
        <div className="hidden lg:block container-industrial pb-4">
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: progressWidth,
                backgroundColor: "hsl(var(--primary))",
              }}
            />
          </div>
        </div>

        {/* Steps container */}
        <motion.div
          className="lg:flex lg:flex-row flex flex-col lg:flex-nowrap"
          style={{ x }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="lg:w-screen lg:shrink-0 lg:px-16 lg:flex lg:items-center min-h-[50vh] lg:min-h-0 lg:h-[calc(100vh-12rem)] flex items-center py-6 px-4"
            >
              <StepCard step={step} index={i} isActive={!isMobile || activeStep === i} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const StepCard = ({ step, index, isActive }: { step: (typeof steps)[number]; index: number; isActive: boolean }) => {
  return (
    <div
      className={`w-full max-w-2xl mx-auto p-8 lg:p-10 border bg-background transition-all duration-300 hover:shadow-lg ${
        isActive ? "border-primary shadow-lg" : "border-border"
      }`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-primary flex items-center justify-center">
          <step.icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <span className="text-technical text-xs text-primary block">{step.number}.</span>
          <span className="font-bold text-xl">{step.label}</span>
        </div>
        <div
          className="h-[2px] bg-primary ml-auto transition-all duration-500"
          style={{ width: isActive ? 48 : 0 }}
        />
      </div>

      <h3 className="heading-industrial text-xl mb-3">{step.title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {step.checklist.map((item) => (
          <div key={item.title} className="flex gap-2 items-start">
            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold block">{item.title}</span>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-border">
        <span className="text-technical text-3xl font-bold text-primary">{step.stat.value}</span>
        <span className="text-technical text-xs text-muted-foreground uppercase tracking-wider">{step.stat.label}</span>
      </div>
    </div>
  );
};

export default HowWeWorkSection;
