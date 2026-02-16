import { Upload, MessageSquare, Settings, Truck, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    number: "01",
    icon: Upload,
    label: "Analiz",
    title: "Fizibilite & Kaynak Planlaması",
    description:
      "İlk aşamada derinlemesine teknik analiz, malzeme fizibilite çalışmaları ve kapsamlı kaynak planlaması gerçekleştiriyoruz. Tek bir tezgâh çalıştırılmadan önce proje uygulanabilirliğini ve maliyet verimliliğini sağlamak için prediktif modelleme kullanıyoruz.",
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
      "Mühendislerimiz tasarımınızı detaylı olarak inceler, DFM (Üretim İçin Tasarım) ilkeleri doğrultusunda imalat uygunluğunu değerlendirir ve size kapsamlı teknik teklif sunar.",
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
      "Onaylanan tasarımlar çok eksenli CNC tezgâhlarımızda üretilir. Tüm süreç boyunca gerçek zamanlı izleme ve proses içi kalite kontrol uygulanır.",
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
      "CMM ölçüm cihazları ile %100 kalite kontrol sonrası güvenli paketleme ile parçalarınız zamanında ve hasarsız şekilde adresinize teslim edilir.",
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
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];

  return (
    <section className="section-industrial bg-card border-y border-border">
      <div className="container-industrial">
        {/* Section Header */}
        <motion.div
          className="mb-16"
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
            İlk konseptten son kalite doğrulamasına kadar uçtan uca endüstriyel sürecimiz, sıfır hatalı üretim ve optimize edilmiş kaynak tahsisi sağlar.
          </p>
        </motion.div>

        {/* Phase Tabs */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(i)}
                className={`flex items-center gap-3 px-5 py-4 border text-left transition-all duration-200 ${
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-muted-foreground/30"
                }`}
              >
                <step.icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <div>
                  <span
                    className={`text-technical text-xs block ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.number}.
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Active Phase Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-5 gap-8 border border-border bg-background p-8 lg:p-10"
          >
            {/* Left: Phase info */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <span className="text-technical text-xs text-primary bg-primary/10 px-3 py-1 inline-block mb-4">
                  Mevcut Faz: {current.label}
                </span>
                <h3 className="heading-industrial text-2xl mb-4">{current.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{current.description}</p>
              </div>

              {/* Checklist grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {current.checklist.map((item) => (
                  <div key={item.title} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-foreground block">{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <a href="#teklif" className="btn-industrial-primary">
                  Metodolojiyi İncele
                </a>
                <a
                  href="#iletisim"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors px-4 py-3"
                >
                  Teknik Doküman
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Stat */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="text-center p-10 border border-border bg-card w-full">
                <span className="text-technical text-5xl md:text-6xl font-bold text-primary block mb-2">
                  {current.stat.value}
                </span>
                <span className="text-technical text-sm text-muted-foreground uppercase tracking-wider">
                  {current.stat.label}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
