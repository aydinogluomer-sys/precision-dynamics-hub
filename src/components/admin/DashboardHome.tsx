import { TrendingUp, TrendingDown, Gauge, Power, Zap, ShieldCheck, AlertTriangle } from "lucide-react";

const metrics = [
  { label: "Genel OEE", value: "84.2%", icon: Gauge, color: "text-[#0AA2CD]", bg: "bg-[#0AA2CD]/10", trend: "+2.1%", up: true, bars: [60, 70, 65, 80, 75, 85, 78, 84, 82, 84] },
  { label: "Kullanılabilirlik", value: "91.5%", icon: Power, color: "text-[#F97316]", bg: "bg-[#F97316]/10", trend: "+0.8%", up: true, bars: [85, 88, 90, 87, 91, 89, 92, 90, 91, 92] },
  { label: "Performans", value: "94.8%", icon: Zap, color: "text-amber-400", bg: "bg-amber-400/10", trend: "+1.2%", up: true, bars: [90, 92, 91, 93, 94, 92, 95, 93, 94, 95] },
  { label: "Kalite Oranı", value: "98.1%", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-400/10", trend: "-0.2%", up: false, bars: [97, 98, 99, 98, 97, 98, 99, 98, 98, 98] },
];

const machines = [
  { name: "CNC-01", status: "Aktif", job: "PO-9928", progress: 75 },
  { name: "CNC-02", status: "Aktif", job: "PO-9931", progress: 40 },
  { name: "CNC-03", status: "Boşta", job: "-", progress: 0 },
  { name: "Lazer-01", status: "Aktif", job: "PO-9930", progress: 90 },
  { name: "Abkant-01", status: "Bakım", job: "-", progress: 0 },
];

const activeOrders = [
  { id: "ORD-2025-101", product: "Motor Gövdesi", machine: "CNC-01", progress: 75, deadline: "2025-02-28" },
  { id: "ORD-2025-102", product: "Bağlantı Plakası", machine: "CNC-02", progress: 40, deadline: "2025-03-05" },
  { id: "ORD-2025-103", product: "Dişli Mili", machine: "Lazer-01", progress: 90, deadline: "2025-02-25" },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
      {/* OEE Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-[#1E293B] rounded-xl border border-[#334155] p-5 hover:shadow-xl hover:border-[#0AA2CD]/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</span>
              <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center`}>
                <m.icon className={`w-4 h-4 ${m.color}`} />
              </div>
            </div>
            <p className="text-2xl font-black text-white mb-3">{m.value}</p>
            <div className="flex items-end gap-0.5 h-8 mb-2">
              {m.bars.map((v, i) => (
                <div key={i} className={`flex-1 rounded-sm ${m.bg}`} style={{ height: `${v}%` }} />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {m.up ? <TrendingUp className="w-3 h-3 text-emerald-400" /> : <TrendingDown className="w-3 h-3 text-red-400" />}
              <span className={`text-xs font-bold ${m.up ? "text-emerald-400" : "text-red-400"}`}>{m.trend}</span>
              <span className="text-[10px] text-slate-500 ml-1">son 30 gün</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Machine Overview */}
        <div className="lg:col-span-2 bg-[#1E293B] rounded-xl border border-[#334155] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Makine Planlama Özeti</h3>
            <button className="text-xs text-[#0AA2CD] font-bold hover:underline">Tam Görünüm →</button>
          </div>
          <div className="space-y-3">
            {machines.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-white w-20">{m.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  m.status === "Aktif" ? "bg-emerald-500/20 text-emerald-400" :
                  m.status === "Bakım" ? "bg-red-500/20 text-red-400" :
                  "bg-slate-500/20 text-slate-400"
                }`}>{m.status}</span>
                <div className="flex-1 h-6 bg-[#0F172A] rounded-lg overflow-hidden">
                  {m.progress > 0 && (
                    <div className="h-full bg-[#0AA2CD]/30 rounded-lg flex items-center px-2" style={{ width: `${m.progress}%` }}>
                      <span className="text-[10px] font-bold text-[#0AA2CD]">{m.job}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-5">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Acil Uyarılar</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-red-500 bg-red-500/10 rounded-r-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-xs font-bold text-red-400">Kritik Durma</span>
              </div>
              <p className="text-[11px] text-slate-300">CNC-03 Spindle arızası — E-0442</p>
            </div>
            <div className="border-l-4 border-amber-500 bg-amber-500/10 rounded-r-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-400">Bakım Uyarısı</span>
              </div>
              <p className="text-[11px] text-slate-300">Abkant-01 periyodik bakım zamanı</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Orders */}
      <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-5">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Aktif Üretim Siparişleri</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-[#334155]">
                <th className="text-left pb-3">ID</th>
                <th className="text-left pb-3">Ürün</th>
                <th className="text-left pb-3">Makine</th>
                <th className="text-left pb-3">İlerleme</th>
                <th className="text-left pb-3">Teslim</th>
              </tr>
            </thead>
            <tbody>
              {activeOrders.map((o) => (
                <tr key={o.id} className="border-b border-[#334155]/50 hover:bg-white/5 transition-colors">
                  <td className="py-3 font-bold text-[#0AA2CD]">{o.id}</td>
                  <td className="py-3 text-white">{o.product}</td>
                  <td className="py-3 text-slate-400">{o.machine}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-[#0F172A] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0AA2CD] rounded-full transition-all duration-1000" style={{ width: `${o.progress}%` }} />
                      </div>
                      <span className="text-xs font-bold text-white">{o.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-400">{o.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
