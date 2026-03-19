import React from "react";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const HowWeWorkSection = () => {
  return (
    <section
      id="nasil-calisiyoruz"
      className="section-industrial border-y border-border"
      style={{ backgroundColor: "hsl(var(--forge-workshop))" }}
    >
      <div className="container-industrial">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeader
            tag="Metodoloji"
            title="Hassas Üretim İş Akışımız"
            description="Teknik veriden son kalite onayına kadar uçtan uca endüstriyel sürecimiz"
          />
        </motion.div>

        {/* Connecting progress line (desktop) */}
        <div className="hidden lg:block relative mb-10">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
          <div className="flex justify-between relative z-10">
            {steps.map((step, i) => (
              <div key={step.number} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                  <span>{step.number}</span>
                </div>
                <span className="text-technical text-xs text-muted-foreground">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2×2 Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, i) => (
            <motion.div key={step.number} variants={cardVariants}>
              <StepCard step={step} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
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
