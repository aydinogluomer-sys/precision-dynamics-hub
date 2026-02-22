import { useState } from "react";
import { Filter, PhoneCall, Mail, Handshake, Truck, Star, ArrowRight } from "lucide-react";

const stagesDef = [
  { id: "prospect", label: "Prospeksiyon", icon: Filter, color: "bg-blue-500" },
  { id: "qualify", label: "Kalifikasyon", icon: PhoneCall, color: "bg-cyan-500" },
  { id: "rfq", label: "Teknik Keşif / RFQ", icon: Mail, color: "bg-[#0AA2CD]" },
  { id: "quote", label: "Teklif & Müzakere", icon: Handshake, color: "bg-amber-500" },
  { id: "po", label: "Sipariş Onayı", icon: Truck, color: "bg-emerald-500" },
  { id: "followup", label: "Teslimat Takibi", icon: Star, color: "bg-purple-500" },
];

const deals = [
  { id: "DEAL-001", company: "Yılmaz Makina", contact: "Ahmet Yılmaz", value: 45000, stage: "quote", probability: 75, lastAction: "Teklif gönderildi" },
  { id: "DEAL-002", company: "AeroDynamics Inc.", contact: "Emre Çelik", value: 180000, stage: "rfq", probability: 50, lastAction: "Teknik çizim inceleniyor" },
  { id: "DEAL-003", company: "Kaya Medikal", contact: "Dr. Zeynep Kaya", value: 22000, stage: "po", probability: 95, lastAction: "PO onayı bekleniyor" },
  { id: "DEAL-004", company: "Demir Otomotiv", contact: "Mehmet Demir", value: 350000, stage: "qualify", probability: 30, lastAction: "İlk görüşme planlandı" },
  { id: "DEAL-005", company: "Teknik Plastik", contact: "Fatma Arslan", value: 65000, stage: "prospect", probability: 15, lastAction: "Araştırma aşamasında" },
];

const outreachTemplates = [
  { target: "CEO / Üst Yönetim", focus: "Stratejik büyüme & ROI", openRate: "32%" },
  { target: "Üretim Müdürü", focus: "Operasyonel verimlilik & kalite", openRate: "41%" },
  { target: "Satın Alma", focus: "Maliyet optimizasyonu & teslim hızı", openRate: "28%" },
  { target: "Tasarım Mühendisi", focus: "Tolerans kabiliyeti & DFM", openRate: "45%" },
];

const PipelineView = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const filteredDeals = selectedStage ? deals.filter((d) => d.stage === selectedStage) : deals;
  const stages = stagesDef.map((s) => ({ ...s, count: deals.filter((d) => d.stage === s.id).length }));
  const totalPipelineValue = deals.reduce((s, d) => s + d.value, 0);
  const weightedValue = deals.reduce((s, d) => s + d.value * (d.probability / 100), 0);

  return (
    <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
      {/* Pipeline KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Toplam Pipeline</p>
          <p className="text-xl font-black text-[#0AA2CD] font-mono tabular-nums mt-1">₺{totalPipelineValue.toLocaleString("tr-TR")}</p>
        </div>
        <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ağırlıklı Değer</p>
          <p className="text-xl font-black text-emerald-400 font-mono tabular-nums mt-1">₺{weightedValue.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aktif Fırsatlar</p>
          <p className="text-xl font-black dark:text-white text-slate-800 mt-1">{deals.length}</p>
        </div>
        <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ort. Dönüşüm</p>
          <p className="text-xl font-black text-amber-400 mt-1">%38</p>
        </div>
      </div>

      {/* Pipeline Funnel */}
      <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-5">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Satış Hattı Aşamaları</h3>
        <div className="flex flex-wrap gap-2">
          {stages.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSelectedStage(selectedStage === s.id ? null : s.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedStage === s.id ? `${s.color} text-white` : "dark:bg-[#0F172A] bg-slate-50 dark:text-slate-300 text-slate-600 hover:text-[#0AA2CD]"
              }`}
            >
              <s.icon className="w-3.5 h-3.5" />
              {s.label}
              <span className="dark:bg-white/20 bg-black/10 px-1.5 py-0.5 rounded-full text-[10px]">{s.count}</span>
              {i < stages.length - 1 && <ArrowRight className="w-3 h-3 opacity-30 hidden sm:block" />}
            </button>
          ))}
        </div>
      </div>

      {/* Deals Table */}
      <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 dark:bg-[#1E293B] bg-white z-10">
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest dark:border-[#334155] border-slate-200 border-b">
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Firma</th>
                <th className="text-left p-4 hidden md:table-cell">İlgili Kişi</th>
                <th className="text-right p-4">Değer</th>
                <th className="text-left p-4 hidden lg:table-cell">Aşama</th>
                <th className="text-right p-4">Olasılık</th>
                <th className="text-left p-4 hidden md:table-cell">Son Eylem</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((d) => {
                const stage = stages.find((s) => s.id === d.stage);
                return (
                  <tr key={d.id} className="dark:border-[#334155]/50 border-slate-100 border-b dark:hover:bg-white/5 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-[#0AA2CD]">{d.id}</td>
                    <td className="p-4 dark:text-white text-slate-800 font-medium">{d.company}</td>
                    <td className="p-4 dark:text-slate-400 text-slate-500 hidden md:table-cell">{d.contact}</td>
                    <td className="p-4 dark:text-white text-slate-800 font-bold text-right font-mono tabular-nums">₺{d.value.toLocaleString("tr-TR")}</td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold text-white ${stage?.color || "bg-slate-500"}`}>
                        {stage?.label || d.stage}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`text-xs font-bold font-mono tabular-nums ${d.probability >= 70 ? "text-emerald-400" : d.probability >= 40 ? "text-amber-400" : "text-slate-400"}`}>
                        %{d.probability}
                      </span>
                    </td>
                    <td className="p-4 text-xs dark:text-slate-400 text-slate-500 hidden md:table-cell">{d.lastAction}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outreach Templates */}
      <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-5">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Cold Mail Stratejisi — Hedef Bazlı Mesajlaşma</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {outreachTemplates.map((t) => (
            <div key={t.target} className="dark:bg-[#0F172A] bg-slate-50 rounded-lg p-3">
              <p className="text-xs font-bold dark:text-white text-slate-800 mb-1">{t.target}</p>
              <p className="text-[10px] dark:text-slate-400 text-slate-500 mb-2">{t.focus}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Açılma Oranı</span>
                <span className="text-xs font-bold text-[#0AA2CD] font-mono">{t.openRate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineView;
