import { useState } from "react";
import { Wrench, Clock, AlertTriangle, CheckCircle2, Activity, Timer } from "lucide-react";

const machineHealth = [
  { name: "CNC-01", spindleHours: 4280, nextMaintenance: 5000, filterLife: 82, oilLevel: 95, status: "normal" },
  { name: "CNC-02", spindleHours: 7800, nextMaintenance: 8000, filterLife: 34, oilLevel: 78, status: "warning" },
  { name: "CNC-03", spindleHours: 3100, nextMaintenance: 5000, filterLife: 91, oilLevel: 100, status: "down" },
  { name: "Lazer-01", spindleHours: 2400, nextMaintenance: 3000, filterLife: 67, oilLevel: 88, status: "normal" },
  { name: "Abkant-01", spindleHours: 6200, nextMaintenance: 7000, filterLife: 45, oilLevel: 62, status: "maintenance" },
  { name: "CMM-01", spindleHours: 1800, nextMaintenance: 5000, filterLife: 96, oilLevel: 100, status: "normal" },
];

const maintenanceLog = [
  { id: "BKM-001", machine: "CNC-01", type: "Periyodik", date: "2025-02-15", duration: "2 saat", cost: 1200, detail: "Spindle rulman kontrolü, yağ değişimi" },
  { id: "BKM-002", machine: "CNC-03", type: "Arıza", date: "2025-02-18", duration: "8 saat", cost: 4500, detail: "Spindle arızası — rulman değişimi" },
  { id: "BKM-003", machine: "Abkant-01", type: "Periyodik", date: "2025-02-10", duration: "3 saat", cost: 800, detail: "Hidrolik sistem kontrolü ve filtre değişimi" },
  { id: "BKM-004", machine: "Lazer-01", type: "Kalibrasyon", date: "2025-02-12", duration: "1 saat", cost: 600, detail: "Lazer güç kalibrasyonu" },
];

const statusColors: Record<string, string> = {
  normal: "bg-emerald-500",
  warning: "bg-amber-500",
  down: "bg-red-500",
  maintenance: "bg-blue-500",
};

const statusLabels: Record<string, string> = {
  normal: "Sağlıklı",
  warning: "Dikkat",
  down: "Arızalı",
  maintenance: "Bakımda",
};

const TPMView = () => {
  const [tab, setTab] = useState<"health" | "log">("health");

  const avgMTBF = "342 saat";
  const avgMTTR = "3.2 saat";
  const availability = "96.8%";
  const nextMaintCount = machineHealth.filter((m) => {
    const remaining = m.nextMaintenance - m.spindleHours;
    return remaining < 1000;
  }).length;

  return (
    <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Ortalama MTBF", value: avgMTBF, icon: Clock, color: "text-[#0AA2CD]", bg: "bg-[#0AA2CD]/10" },
          { label: "Ortalama MTTR", value: avgMTTR, icon: Timer, color: "text-amber-400", bg: "bg-amber-400/10" },
          { label: "Kullanılabilirlik", value: availability, icon: Activity, color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { label: "Yaklaşan Bakım", value: `${nextMaintCount} makine`, icon: AlertTriangle, color: nextMaintCount > 0 ? "text-amber-400" : "text-emerald-400", bg: nextMaintCount > 0 ? "bg-amber-400/10" : "bg-emerald-400/10" },
        ].map((m) => (
          <div key={m.label} className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</span>
              <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center`}>
                <m.icon className={`w-4 h-4 ${m.color}`} />
              </div>
            </div>
            <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: "health" as const, label: "Tezgah Sağlığı" },
          { id: "log" as const, label: "Bakım Geçmişi" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${tab === t.id ? "bg-[#0AA2CD] text-white" : "dark:bg-[#1E293B] bg-slate-100 dark:text-slate-400 text-slate-600 hover:text-[#0AA2CD]"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "health" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {machineHealth.map((m) => {
            const remaining = m.nextMaintenance - m.spindleHours;
            const pct = (m.spindleHours / m.nextMaintenance) * 100;
            return (
              <div key={m.name} className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border overflow-hidden">
                <div className={`h-1 ${statusColors[m.status]}`} />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold dark:text-white text-slate-800">{m.name}</h3>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-black text-white ${statusColors[m.status]}`}>
                      {statusLabels[m.status]}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="dark:text-slate-400 text-slate-500">Spindle Saati</span>
                        <span className="font-bold dark:text-white text-slate-800 font-mono tabular-nums">{m.spindleHours.toLocaleString()} / {m.nextMaintenance.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 dark:bg-[#0F172A] bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-500" : "bg-[#0AA2CD]"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                      <p className="text-[10px] dark:text-slate-500 text-slate-400 mt-0.5">{remaining > 0 ? `Bakıma ${remaining.toLocaleString()} saat kaldı` : "⚠️ Bakım zamanı geçti!"}</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <p className="text-[10px] dark:text-slate-500 text-slate-400">Filtre</p>
                        <p className={`text-xs font-bold font-mono tabular-nums ${m.filterLife < 40 ? "text-red-400" : m.filterLife < 60 ? "text-amber-400" : "text-emerald-400"}`}>%{m.filterLife}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] dark:text-slate-500 text-slate-400">Yağ Seviyesi</p>
                        <p className={`text-xs font-bold font-mono tabular-nums ${m.oilLevel < 70 ? "text-amber-400" : "text-emerald-400"}`}>%{m.oilLevel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 dark:bg-[#1E293B] bg-white z-10">
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest dark:border-[#334155] border-slate-200 border-b">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Makine</th>
                  <th className="text-left p-4">Tip</th>
                  <th className="text-left p-4 hidden md:table-cell">Tarih</th>
                  <th className="text-left p-4 hidden lg:table-cell">Süre</th>
                  <th className="text-right p-4">Maliyet</th>
                  <th className="text-left p-4 hidden md:table-cell">Detay</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceLog.map((l) => (
                  <tr key={l.id} className="dark:border-[#334155]/50 border-slate-100 border-b dark:hover:bg-white/5 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-[#0AA2CD]">{l.id}</td>
                    <td className="p-4 dark:text-white text-slate-800">{l.machine}</td>
                    <td className="p-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${l.type === "Arıza" ? "bg-red-500/20 text-red-400" : l.type === "Kalibrasyon" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                        {l.type}
                      </span>
                    </td>
                    <td className="p-4 dark:text-slate-400 text-slate-500 hidden md:table-cell">{l.date}</td>
                    <td className="p-4 dark:text-slate-400 text-slate-500 hidden lg:table-cell">{l.duration}</td>
                    <td className="p-4 dark:text-white text-slate-800 font-bold text-right font-mono tabular-nums">₺{l.cost.toLocaleString("tr-TR")}</td>
                    <td className="p-4 text-xs dark:text-slate-400 text-slate-500 hidden md:table-cell max-w-xs truncate">{l.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TPMView;
