import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TextReveal } from "./ScrollReveal";
import {
  LayoutDashboard, FileText, Package, Factory,
  ShieldCheck, ArrowRight, ChevronRight, BarChart3,
  Clock, CheckCircle2, Upload, Eye
} from "lucide-react";

import moduleDashboard from "@/assets/module-dashboard.jpg";

/* Fake dashboard data for the mockup */
const recentOrders = [
  { id: "ORD-2847", part: "Flanş Bağlantı", status: "Üretimde", progress: 72, machine: "DMG MORI" },
  { id: "ORD-2846", part: "Vana Gövdesi", status: "KK Bekliyor", progress: 95, machine: "Mazak" },
  { id: "ORD-2845", part: "Piston Kolu", status: "Tamamlandı", progress: 100, machine: "Haas" },
];

const recentFiles = [
  { name: "flans-v3.2.step", size: "4.2 MB", date: "2 saat önce" },
  { name: "vana-govdesi.iges", size: "8.7 MB", date: "5 saat önce" },
  { name: "piston-kolu-rev2.stp", size: "3.1 MB", date: "1 gün önce" },
];

const features = [
  { icon: BarChart3, label: "Gerçek Zamanlı Üretim Takibi", desc: "Anlık makine ve sipariş durumu" },
  { icon: Upload, label: "CAD Dosya Yönetimi", desc: "Versiyon kontrolü ile güvenli paylaşım" },
  { icon: ShieldCheck, label: "Kalite Raporları & Sertifikalar", desc: "CMM ölçüm sonuçlarına anında erişim" },
  { icon: Clock, label: "Otomatik Bildirimler", desc: "Sipariş ve üretim durum güncellemeleri" },
];

const NexusPromoSection = () => {
  return (
    <section className="relative py-20 md:py-28" style={{ backgroundColor: "#b4cdc2" }}>
      <style>{`.dark .nexus-promo-section { background-color: hsl(var(--section-cool)) !important; }`}</style>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <TextReveal>
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary font-mono">
                Dijital Platform
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground max-w-2xl">
              Nexus Endüstriyel<br />Yönetim Paneli
            </h2>
          </div>
        </TextReveal>

        {/* Main Content: Left features + Right dashboard mockup */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Description + Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-foreground/70 leading-relaxed mb-8 max-w-lg">
              Üretim süreçlerinizi, tekliflerinizi ve sipariş durumlarınızı tek bir noktadan yönetin. 
              Hassas mühendislik için optimize edilmiş dijital tedarik zinciri entegrasyonu.
            </p>

            <div className="space-y-5 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  className="flex items-start gap-4 group cursor-default"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-0.5">{f.label}</h4>
                    <p className="text-xs text-foreground/60">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/musteri-paneli"
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold text-sm transition-all hover:brightness-110"
              style={{ transform: "skewX(-4deg)", backgroundColor: "#f37420" }}
            >
              <span style={{ transform: "skewX(4deg)" }} className="flex items-center gap-2">
                Paneli Keşfet
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Right: Dashboard Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="border border-border bg-card overflow-hidden shadow-xl">
              {/* Mockup Header Bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[10px] text-foreground/40 font-mono">nexus.mastechnic.com/dashboard</span>
                </div>
              </div>

              {/* Mockup Content */}
              <div className="flex">
                {/* Mini Sidebar */}
                <div className="w-12 border-r border-border bg-muted/20 py-3 hidden sm:flex flex-col items-center gap-3">
                  <div className="w-7 h-7 bg-primary flex items-center justify-center">
                    <span className="text-[8px] font-bold text-primary-foreground">MT</span>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center text-foreground/30 hover:text-primary transition-colors">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center text-primary">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center text-foreground/30">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center text-foreground/30">
                    <Factory className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Main Area */}
                <div className="flex-1 p-4 sm:p-5">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Sipariş Takibi</h4>
                      <span className="text-[10px] text-foreground/50 font-mono">3 aktif sipariş</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-green-500"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                      <span className="text-[10px] text-green-600 font-mono">Çevrimiçi</span>
                    </div>
                  </div>

                  {/* Order Table */}
                  <div className="border border-border mb-4">
                    <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-muted/30 border-b border-border">
                      <span className="text-[9px] font-semibold text-foreground/50 uppercase tracking-wider">Sipariş</span>
                      <span className="text-[9px] font-semibold text-foreground/50 uppercase tracking-wider">Parça</span>
                      <span className="text-[9px] font-semibold text-foreground/50 uppercase tracking-wider">Durum</span>
                      <span className="text-[9px] font-semibold text-foreground/50 uppercase tracking-wider">İlerleme</span>
                    </div>
                    {recentOrders.map((order) => (
                      <div key={order.id} className="grid grid-cols-4 gap-2 px-3 py-2.5 border-b border-border last:border-0 items-center">
                        <span className="text-[10px] font-mono font-semibold text-primary">{order.id}</span>
                        <span className="text-[10px] text-foreground/70 truncate">{order.part}</span>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 inline-block w-fit ${
                          order.status === "Tamamlandı" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          order.status === "KK Bekliyor" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                          "bg-primary/10 text-primary"
                        }`}>
                          {order.status}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${order.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-foreground/50">{order.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Files */}
                  <div>
                    <span className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wider mb-2 block">Son Dosyalar</span>
                    {recentFiles.map((file) => (
                      <div key={file.name} className="flex items-center gap-2 py-1.5 group">
                        <FileText className="w-3 h-3 text-primary/60 shrink-0" />
                        <span className="text-[10px] text-foreground/70 truncate flex-1 font-mono">{file.name}</span>
                        <span className="text-[9px] text-foreground/40">{file.size}</span>
                        <Eye className="w-3 h-3 text-foreground/20 group-hover:text-primary transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 px-4 py-2.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Tam Entegrasyon
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NexusPromoSection;
