import { useState, useEffect } from "react";
import { Wrench, Clock, AlertTriangle, Activity, Timer, Loader2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MachineHealth {
  id: string;
  name: string;
  spindle_hours: number;
  next_maintenance: number;
  filter_life: number;
  oil_level: number;
  status: string;
}

interface MaintenanceLog {
  id: string;
  machine: string;
  type: string;
  date: string;
  duration: string | null;
  cost: number;
  detail: string | null;
  technician: string | null;
  status: string | null;
}

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
  const [machines, setMachines] = useState<MachineHealth[]>([]);
  const [logs, setLogs] = useState<MaintenanceLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const [{ data: mData }, { data: lData }] = await Promise.all([
      supabase.from("machine_health").select("*").order("name"),
      supabase.from("maintenance_logs").select("*").order("date", { ascending: false }),
    ]);
    if (mData) setMachines(mData as MachineHealth[]);
    if (lData) setLogs(lData as MaintenanceLog[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const ch1 = supabase.channel("machine-health-rt").on("postgres_changes", { event: "*", schema: "public", table: "machine_health" }, () => fetchData()).subscribe();
    const ch2 = supabase.channel("maintenance-logs-rt").on("postgres_changes", { event: "*", schema: "public", table: "maintenance_logs" }, () => fetchData()).subscribe();
    return () => { supabase.removeChannel(ch1); supabase.removeChannel(ch2); };
  }, []);

  const totalCost = logs.reduce((s, l) => s + (l.cost || 0), 0);
  const nextMaintCount = machines.filter((m) => (m.next_maintenance - m.spindle_hours) < 1000).length;
  const downCount = machines.filter((m) => m.status === "down" || m.status === "maintenance").length;
  const avgFilterLife = machines.length > 0 ? Math.round(machines.reduce((s, m) => s + m.filter_life, 0) / machines.length) : 0;

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-[#0AA2CD]" /></div>;
  }

  return (
    <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Toplam Bakım Maliyeti", value: `₺${totalCost.toLocaleString("tr-TR")}`, icon: Clock, color: "text-[#0AA2CD]", bg: "bg-[#0AA2CD]/10" },
          { label: "Ort. Filtre Ömrü", value: `%${avgFilterLife}`, icon: Timer, color: "text-amber-400", bg: "bg-amber-400/10" },
          { label: "Duran Tezgah", value: `${downCount} makine`, icon: AlertTriangle, color: downCount > 0 ? "text-red-400" : "text-emerald-400", bg: downCount > 0 ? "bg-red-400/10" : "bg-emerald-400/10" },
          { label: "Yaklaşan Bakım", value: `${nextMaintCount} makine`, icon: Activity, color: nextMaintCount > 0 ? "text-amber-400" : "text-emerald-400", bg: nextMaintCount > 0 ? "bg-amber-400/10" : "bg-emerald-400/10" },
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
          {machines.map((m) => {
            const remaining = m.next_maintenance - m.spindle_hours;
            const pct = (m.spindle_hours / m.next_maintenance) * 100;
            return (
              <div key={m.id} className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border overflow-hidden">
                <div className={`h-1 ${statusColors[m.status] || "bg-slate-500"}`} />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold dark:text-white text-slate-800">{m.name}</h3>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-black text-white ${statusColors[m.status] || "bg-slate-500"}`}>
                      {statusLabels[m.status] || m.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="dark:text-slate-400 text-slate-500">Spindle Saati</span>
                        <span className="font-bold dark:text-white text-slate-800 font-mono tabular-nums">{m.spindle_hours.toLocaleString()} / {m.next_maintenance.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 dark:bg-[#0F172A] bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-500" : "bg-[#0AA2CD]"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                      <p className="text-[10px] dark:text-slate-500 text-slate-400 mt-0.5">{remaining > 0 ? `Bakıma ${remaining.toLocaleString()} saat kaldı` : "⚠️ Bakım zamanı geçti!"}</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <p className="text-[10px] dark:text-slate-500 text-slate-400">Filtre</p>
                        <p className={`text-xs font-bold font-mono tabular-nums ${m.filter_life < 40 ? "text-red-400" : m.filter_life < 60 ? "text-amber-400" : "text-emerald-400"}`}>%{m.filter_life}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] dark:text-slate-500 text-slate-400">Yağ Seviyesi</p>
                        <p className={`text-xs font-bold font-mono tabular-nums ${m.oil_level < 70 ? "text-amber-400" : "text-emerald-400"}`}>%{m.oil_level}</p>
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
                  <th className="text-left p-4">Makine</th>
                  <th className="text-left p-4">Tip</th>
                  <th className="text-left p-4 hidden md:table-cell">Tarih</th>
                  <th className="text-left p-4 hidden lg:table-cell">Süre</th>
                  <th className="text-left p-4 hidden md:table-cell">Teknisyen</th>
                  <th className="text-right p-4">Maliyet</th>
                  <th className="text-left p-4 hidden lg:table-cell">Detay</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => (
                  <tr key={l.id} className="dark:border-[#334155]/50 border-slate-100 border-b dark:hover:bg-white/5 hover:bg-slate-50 transition-colors">
                    <td className="p-4 dark:text-white text-slate-800 font-bold">{l.machine}</td>
                    <td className="p-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${l.type === "Arıza" ? "bg-red-500/20 text-red-400" : l.type === "Kalibrasyon" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                        {l.type}
                      </span>
                    </td>
                    <td className="p-4 dark:text-slate-400 text-slate-500 hidden md:table-cell">{l.date}</td>
                    <td className="p-4 dark:text-slate-400 text-slate-500 hidden lg:table-cell">{l.duration || "-"}</td>
                    <td className="p-4 dark:text-slate-400 text-slate-500 hidden md:table-cell">{l.technician || "-"}</td>
                    <td className="p-4 dark:text-white text-slate-800 font-bold text-right font-mono tabular-nums">₺{(l.cost || 0).toLocaleString("tr-TR")}</td>
                    <td className="p-4 text-xs dark:text-slate-400 text-slate-500 hidden lg:table-cell max-w-xs truncate">{l.detail || "-"}</td>
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
