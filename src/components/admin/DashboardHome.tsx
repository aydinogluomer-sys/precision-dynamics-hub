import { TrendingUp, TrendingDown, Gauge, Power, Zap, ShieldCheck, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

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

const oeeHistory = [
  { month: "Eyl", oee: 76, availability: 85, performance: 90, quality: 97 },
  { month: "Eki", oee: 78, availability: 87, performance: 91, quality: 97 },
  { month: "Kas", oee: 80, availability: 88, performance: 92, quality: 98 },
  { month: "Ara", oee: 79, availability: 86, performance: 93, quality: 97 },
  { month: "Oca", oee: 82, availability: 90, performance: 93, quality: 98 },
  { month: "Şub", oee: 84, availability: 91, performance: 95, quality: 98 },
];

const machineUtilization = [
  { name: "Üretimde", value: 60, color: "#0AA2CD" },
  { name: "Kurulum", value: 15, color: "#F97316" },
  { name: "Boşta", value: 12, color: "#64748B" },
  { name: "Bakım", value: 8, color: "#EF4444" },
  { name: "Plansız Duruş", value: 5, color: "#A855F7" },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
      {/* OEE Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4 sm:p-5 hover:shadow-xl hover:border-[#0AA2CD]/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</span>
              <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center`}>
                <m.icon className={`w-4 h-4 ${m.color}`} />
              </div>
            </div>
            <p className="text-2xl font-black dark:text-white text-slate-800 mb-3">{m.value}</p>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* OEE Trend Chart */}
        <div className="lg:col-span-2 dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4 sm:p-5">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">OEE Trend Analizi (6 Ay)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={oeeHistory} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} domain={[70, 100]} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(222.2 47.4% 11.2%)", border: "1px solid hsl(217.2 32.6% 17.5%)", borderRadius: "8px", fontSize: "12px", color: "#e2e8f0" }}
                  labelStyle={{ color: "#94A3B8", fontWeight: 700, marginBottom: 4 }}
                  itemStyle={{ padding: "1px 0" }}
                  formatter={(value: number, name: string) => {
                    const labels: Record<string, string> = { oee: "OEE", availability: "Kullanılabilirlik", performance: "Performans", quality: "Kalite" };
                    return [`%${value}`, labels[name] || name];
                  }}
                />
                <Line type="monotone" dataKey="oee" stroke="#0AA2CD" strokeWidth={3} dot={{ r: 4, fill: "#0AA2CD" }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="availability" stroke="#F97316" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="performance" stroke="#FBBF24" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="quality" stroke="#34D399" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-3">
            {[
              { label: "OEE", color: "#0AA2CD" },
              { label: "Kullanılabilirlik", color: "#F97316" },
              { label: "Performans", color: "#FBBF24" },
              { label: "Kalite", color: "#34D399" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-[10px] dark:text-slate-400 text-slate-500 font-medium">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Machine Utilization Pie Chart */}
        <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4 sm:p-5">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Makine Kullanım Oranı</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={machineUtilization}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {machineUtilization.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(222.2 47.4% 11.2%)", border: "1px solid hsl(217.2 32.6% 17.5%)", borderRadius: "8px", fontSize: "12px", color: "#e2e8f0" }}
                  formatter={(value: number) => [`%${value}`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {machineUtilization.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] dark:text-slate-300 text-slate-600">{item.name}</span>
                </div>
                <span className="text-[11px] font-bold dark:text-white text-slate-800 font-mono tabular-nums">%{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Machine Overview */}
        <div className="lg:col-span-2 dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Makine Planlama Özeti</h3>
            <button onClick={() => window.dispatchEvent(new CustomEvent('nexus-navigate', { detail: 'scheduling' }))} className="text-xs text-[#0AA2CD] font-bold hover:underline">Tam Görünüm →</button>
          </div>
          <div className="space-y-3">
            {machines.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="text-xs font-bold dark:text-white text-slate-800 w-20">{m.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  m.status === "Aktif" ? "bg-emerald-500/20 text-emerald-400" :
                  m.status === "Bakım" ? "bg-red-500/20 text-red-400" :
                  "bg-slate-500/20 text-slate-400"
                }`}>{m.status}</span>
                <div className="flex-1 h-6 dark:bg-[#0F172A] bg-slate-100 rounded-lg overflow-hidden">
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
        <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4 sm:p-5">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Acil Uyarılar</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-red-500 bg-red-500/10 rounded-r-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-xs font-bold text-red-400">Kritik Durma</span>
              </div>
              <p className="text-[11px] dark:text-slate-300 text-slate-600">CNC-03 Spindle arızası — E-0442</p>
            </div>
            <div className="border-l-4 border-amber-500 bg-amber-500/10 rounded-r-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-400">Bakım Uyarısı</span>
              </div>
              <p className="text-[11px] dark:text-slate-300 text-slate-600">Abkant-01 periyodik bakım zamanı</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Orders */}
      <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4 sm:p-5">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Aktif Üretim Siparişleri</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b dark:border-[#334155] border-slate-200">
                <th className="text-left pb-3">ID</th>
                <th className="text-left pb-3">Ürün</th>
                <th className="text-left pb-3">Makine</th>
                <th className="text-left pb-3">İlerleme</th>
                <th className="text-left pb-3">Teslim</th>
              </tr>
            </thead>
            <tbody>
              {activeOrders.map((o) => (
                <tr key={o.id} className="border-b dark:border-[#334155]/50 border-slate-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 font-bold text-[#0AA2CD]">{o.id}</td>
                  <td className="py-3 dark:text-white text-slate-800">{o.product}</td>
                  <td className="py-3 text-slate-400">{o.machine}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 dark:bg-[#0F172A] bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0AA2CD] rounded-full transition-all duration-1000" style={{ width: `${o.progress}%` }} />
                      </div>
                      <span className="text-xs font-bold dark:text-white text-slate-800">{o.progress}%</span>
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
