import {
  Target,
  RefreshCw,
  Clock,
  Wrench,
  ShieldCheck,
  FileSearch,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Dijital Şeffaflık",
    subtitle: "100%",
    description:
      "Üretim sürecinizi, size özel kontrol paneli üzerinden gerçek zamanlı olarak izleyin ve tüm aşamalara tam şeffaflıkla erişin.",
  },
  {
    icon: RefreshCw,
    title: "RFQ Süreci",
    subtitle: "4 Adım",
    description:
      "CAD Yükleme, teknik özellik belirleme, önizleme ve teklif gönderme adımlarından oluşan 4 aşamalı hızlı RFQ sistemi.",
  },
  {
    icon: Clock,
    title: "Anlık Model İzleme",
    subtitle: "3D",
    description:
      "Projelerinizi sistem üzerinden 3D ortamda görüntüleyin, teknik detayları analiz edin ve üretim öncesi doğrulama yapın.",
  },
  {
    icon: Wrench,
    title: "Bütünsel Yönetim",
    subtitle: "360°",
    description:
      "Teklif aşamasından kalite raporlarına, cari takipten teslimat sürecine kadar tüm operasyonları tek platform üzerinden yönetin.",
  },
] as const;

const badges = [
  { label: "Proses Kontrollü Üretim", icon: ShieldCheck },
  { label: "Teknik Güvence Protokolü", icon: FileSearch },
  { label: "DFM Analizi Desteği", icon: Wrench },
  { label: "Zamanında Teslimat Garantisi", icon: Clock },
] as const;

const WhyUsSection = () => {
  return (
    <section id="neden-biz" className="py-16 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-2 block text-primary">
              Avantajlar
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Neden Mas Technic?</h2>
            <p className="text-sm max-w-lg text-foreground/80">
              Mikron seviyesinde üretim hassasiyetini, uçtan uca dijital izlenebilirlik ve şeffaf süreç
              yönetimiyle müşterilerimize sunuyoruz
            </p>
          </div>
          <a
            href="#teklif"
            className="text-sm font-medium text-primary hover:text-accent flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            Kontrol Paneline Git <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="relative p-6 text-center h-[300px] md:h-[320px] overflow-hidden transition-colors bg-background border border-border hover:border-primary"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-10 h-10 mb-3 flex items-center justify-center text-primary">
                  <value.icon className="w-10 h-10" />
                </div>

                <h4 className="font-bold text-base mb-1 text-foreground">{value.title}</h4>
                <span className="text-sm font-semibold text-primary font-mono block mb-3">
                  {value.subtitle}
                </span>

                <p className="text-xs leading-relaxed text-foreground/80">{value.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 flex items-center gap-4 bg-background border border-border">
          <Building2 className="w-8 h-8 text-primary flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-bold text-sm mb-0.5 text-foreground">Hakkımızda</h4>
            <p className="text-xs text-foreground/80">
              Hassas üretim, güvenilir süreçler ve mühendislik odaklı yaklaşımımızla en zorlu teknik
              spesifikasyonlara ve global üretim standartlarına endüstriyel çözümler sunuyoruz.
            </p>
          </div>
          <Link
            to="/hakkimizda"
            className="text-xs font-semibold text-primary hover:underline whitespace-nowrap"
          >
            Daha Fazla →
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 pt-4 mt-4 border-t border-border">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-2 text-sm text-foreground/80"
            >
              <badge.icon className="w-4 h-4 text-primary flex-shrink-0" />
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
