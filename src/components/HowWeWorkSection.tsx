import { Upload, MessageSquare, Settings, Truck, CheckCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Track which step cards are in view
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setActiveStep(index);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="nasil-calisiyoruz" className="border-y border-border" style={{ background: "#FAFAF9" }}>
      {/* Section Header */}
      <div className="container-industrial py-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
              Metodoloji
            </span>
          </div>
          <h2 className="heading-industrial text-3xl md:text-4xl mb-4">
            Hassas Üretim İş Akışımız
          </h2>
          <p className="subheading-industrial text-lg max-w-3xl">
            İlk konseptten son kalite doğrulamasına kadar uçtan uca endüstriyel sürecimiz
          </p>
        </motion.div>
      </div>

      {/* Sticky scroll area */}
      <div ref={containerRef} className="relative">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left: Sticky panel — shows active step detail */}
            <div className="hidden lg:block">
              <div className="sticky top-32 pb-20">
                <div className="relative">
                  {steps.map((step, i) => (
                    <div
                      key={step.number}
                      className="transition-all duration-500"
                      style={{
                        opacity: activeStep === i ? 1 : 0,
                        position: activeStep === i ? "relative" : "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        pointerEvents: activeStep === i ? "auto" : "none",
                        transform: activeStep === i ? "translateY(0)" : "translateY(12px)",
                      }}
                    >
                      <div className="p-8 border border-border bg-background">
                        <span className="text-technical text-xs text-primary bg-primary/10 px-3 py-1 inline-block mb-6">
                          Faz {step.number}: {step.label}
                        </span>
                        <h3 className="heading-industrial text-2xl mb-4">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-8">{step.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                          {step.checklist.map((item) => (
                            <div key={item.title} className="flex gap-3 items-start">
                              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <div>
                                <span className="text-sm font-semibold block">{item.title}</span>
                                <span className="text-xs text-muted-foreground">{item.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="text-center p-6 border border-border bg-card">
                          <span className="text-technical text-4xl font-bold text-primary block mb-1">
                            {step.stat.value}
                          </span>
                          <span className="text-technical text-xs text-muted-foreground uppercase tracking-wider">
                            {step.stat.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Scrolling step cards */}
            <div className="space-y-0">
              {steps.map((step, i) => (
                <StepCard
                  key={step.number}
                  step={step}
                  index={i}
                  isActive={activeStep === i}
                  ref={(el) => { stepRefs.current[i] = el; }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Scrolling step card on the right
const StepCard = React.forwardRef<
  HTMLDivElement,
  { step: (typeof steps)[number]; index: number; isActive: boolean }
>(({ step, index, isActive }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const lineWidth = useTransform(scrollYProgress, [0, 0.6], [0, 48]);

  return (
    <motion.div
      ref={(el) => {
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className="min-h-[80vh] flex items-center py-10"
      style={{ opacity, x }}
    >
      <div
        className={`w-full p-8 lg:p-10 border bg-background transition-all duration-300 hover:shadow-lg ${
          isActive ? "border-primary shadow-lg" : "border-border"
        }`}
      >
        {/* Step number & icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-primary flex items-center justify-center">
            <step.icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <span className="text-technical text-xs text-primary block">{step.number}.</span>
            <span className="font-bold text-xl">{step.label}</span>
          </div>
          <motion.div className="h-[2px] bg-primary ml-auto" style={{ width: lineWidth }} />
        </div>

        <h3 className="heading-industrial text-xl mb-3">{step.title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>

        {/* Checklist */}
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

        {/* Stat */}
        <div className="flex items-center gap-4 pt-6 border-t border-border">
          <span className="text-technical text-3xl font-bold text-primary">
            {step.stat.value}
          </span>
          <span className="text-technical text-xs text-muted-foreground uppercase tracking-wider">
            {step.stat.label}
          </span>
        </div>

        {/* Mobile: Show detail directly */}
        <div className="lg:hidden mt-6">
          <a href="#teklif" className="btn-industrial-primary text-center w-full inline-block">
            Metodolojiyi İncele
          </a>
        </div>
      </div>
    </motion.div>
  );
});

StepCard.displayName = "StepCard";

import React from "react";

export default HowWeWorkSection;
