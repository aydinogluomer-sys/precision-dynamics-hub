import React, { useRef, useState, useEffect } from "react";
import { Upload, MessageSquare, Settings, Truck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

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
  { title: "ISO Hazırlığı", desc: "Standart uyumluluk denetimi" }],

  stat: { value: "99.8%", label: "Faz Güvenilirliği" }
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
  { title: "Malzeme Seçimi", desc: "Uygulamaya özel malzeme" }],

  stat: { value: "48 sa", label: "Ortalama Teklif Süresi" }
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
  { title: "Proses Kontrolü", desc: "SPC ile süreç yönetimi" }],

  stat: { value: "±0.005", label: "mm Tolerans" }
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
  { title: "Lojistik", desc: "Uluslararası sevkiyat desteği" }],

  stat: { value: "%100", label: "Kalite Kontrol" }
}];


const HowWeWorkSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <section id="nasil-calisiyoruz" className="min-h-screen flex flex-col justify-center border-y border-border" style={{ backgroundColor: "hsl(var(--forge-workshop))" }}>
      <style>{`.dark #nasil-calisiyoruz { background-color: hsl(var(--forge-workshop)) !important; }`}</style>
      {/* Section Header */}
      <div className="container-industrial py-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          
          <SectionHeader
            tag="Metodoloji"
            title="Hassas Üretim İş Akışımız"
            description="Teknik veriden son kalite onayına kadar uçtan uca endüstriyel sürecimiz"
          />
        </motion.div>
      </div>

      {/* Sticky scroll area */}
      <div className="relative">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left: Sticky panel */}
            <div className="hidden lg:block">
              <div className="sticky top-28 pb-16">
                <div className="relative">
                  {steps.map((step, i) =>
                  <motion.div
                    key={step.number}
                    initial={false}
                    animate={{
                      opacity: activeStep === i ? 1 : 0,
                      y: activeStep === i ? 0 : 12
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                      position: activeStep === i ? "relative" : "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      pointerEvents: activeStep === i ? "auto" : "none"
                    }}>
                    
                      <div className="p-8 border border-border bg-background">
                        <span className="text-technical text-xs text-primary bg-primary/10 px-3 py-1 inline-block mb-6">
                          Faz {step.number}: {step.label}
                        </span>
                        <h3 className="heading-industrial text-2xl mb-4">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-8">{step.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                          {step.checklist.map((item) =>
                        <div key={item.title} className="flex gap-3 items-start">
                              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <div>
                                <span className="text-sm font-semibold block">{item.title}</span>
                                <span className="text-xs text-muted-foreground">{item.desc}</span>
                              </div>
                            </div>
                        )}
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
                    </motion.div>
                  )}

                  {/* Step progress indicator */}
                  <div className="flex gap-2 mt-6">
                    {steps.map((_, i) =>
                    <div
                      key={i}
                      className="h-1 flex-1 transition-all duration-300"
                      style={{
                        backgroundColor: i <= activeStep ? "hsl(var(--primary))" : "hsl(var(--border))"
                      }} />

                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Scrolling step cards — NO blur, full opacity, no scroll-driven opacity */}
            <div className="space-y-0">
              {steps.map((step, i) =>
              <StepCard
                key={step.number}
                step={step}
                index={i}
                isActive={activeStep === i}
                ref={(el) => {stepRefs.current[i] = el;}} />

              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

};

const StepCard = React.forwardRef<
  HTMLDivElement,
  {step: (typeof steps)[number];index: number;isActive: boolean;}>(
  ({ step, index, isActive }, ref) => {
    return (
      <div
        ref={ref}
        className="min-h-[50vh] flex items-center py-6">
        
      <div
          className={`w-full p-8 lg:p-10 border bg-background transition-all duration-300 hover:shadow-lg ${
          isActive ? "border-primary shadow-lg" : "border-border"}`
          }>
          
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
              style={{ width: isActive ? 48 : 0 }} />
            
        </div>

        <h3 className="heading-industrial text-xl mb-3">{step.title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {step.checklist.map((item) =>
            <div key={item.title} className="flex gap-2 items-start">
              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold block">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </div>
            </div>
            )}
        </div>

        <div className="flex items-center gap-4 pt-6 border-t border-border">
          <span className="text-technical text-3xl font-bold text-primary">{step.stat.value}</span>
          <span className="text-technical text-xs text-muted-foreground uppercase tracking-wider">{step.stat.label}</span>
        </div>

        <div className="lg:hidden mt-6">
          <a href="#teklif" className="btn-industrial-primary text-center w-full inline-block">
            Metodolojiyi İncele
          </a>
        </div>
      </div>
    </div>);

  });

StepCard.displayName = "StepCard";

export default HowWeWorkSection;