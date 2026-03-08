import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, TrendingDown, Gauge, Power, Zap, ShieldCheck, AlertTriangle, Package, FileText, Users, Wrench, DollarSign, Radio } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

/* ── Colors ── */
const C = {
  primary: "#0688AD",
  cyan: "#0AA2CD",
  orange: "#F97316",
  amber: "#FBBF24",
  emerald: "#34D399",
  red: "#EF4444",
  purple: "#A855F7",
  pink: "#EC4899",
  slate: "#64748B",
  indigo: "#6366F1",
  teal: "#14B8A6",
  lime: "#84CC16",
};

const RADIAN = Math.PI / 180;

/* ── Static OEE data ── */
const oeeHistory = [
  { month: "Eyl", oee: 76, availability: 85, performance: 90, quality: 97 },
  { month: "Eki", oee: 78, availability: 87, performance: 91, quality: 97 },
  { month: "Kas", oee: 80, availability: 88, performance: 92, quality: 98 },
  { month: "Ara", oee: 79, availability: 86, performance: 93, quality: 97 },
  { month: "Oca", oee: 82, availability: 90, performance: 93, quality: 98 },
  { month: "Şub", oee: 84, availability: 91, performance: 95, quality: 98 },
];

const oeeMetrics = [
  { label: "Genel OEE", value: "84.2%", icon: Gauge, color: "text-[#0AA2CD]", bg: "bg-[#0AA2CD]/10", trend: "+2.1%", up: true, bars: [60, 70, 65, 80, 75, 85, 78, 84, 82, 84] },
  { label: "Kullanılabilirlik", value: "91.5%", icon: Power, color: "text-[#F97316]", bg: "bg-[#F97316]/10", trend: "+0.8%", up: true, bars: [85, 88, 90, 87, 91, 89, 92, 90, 91, 92] },
  { label: "Performans", value: "94.8%", icon: Zap, color: "text-amber-400", bg: "bg-amber-400/10", trend: "+1.2%", up: true, bars: [90, 92, 91, 93, 94, 92, 95, 93, 94, 95] },
  { label: "Kalite Oranı", value: "98.1%", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-400/10", trend: "-0.2%", up: false, bars: [97, 98, 99, 98, 97, 98, 99, 98, 98, 98] },
];

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="dark:bg-[#1E293B] bg-white border dark:border-[#334155] border-slate-200 rounded-lg p-3 shadow-xl">
      <p className="text-xs font-bold dark:text-slate-300 text-slate-600 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-[11px] dark:text-slate-400 text-slate-500">{p.name}:</span>
          <span className="text-[11px] font-bold dark:text-white text-slate-800 font-mono">
            {typeof p.value === "number" ? p.value.toLocaleString("tr-TR") : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Custom Pie Label ── */
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.05) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/* ── Navigate helper ── */
const navigateTo = (tab: string) => {
  window.dispatchEvent(new CustomEvent("nexus-navigate", { detail: tab }));
};

/* ── Realtime tables ── */
const REALTIME_TABLES = [
  "rfqs", "orders", "issues", "financial_documents", "customers",
  "pipeline_leads", "maintenance_logs", "raw_materials", "tool_inventory", "support_tickets",
] as const;

type DashData = {
  rfqByStatus: { name: string; value: number; color: string }[];
  orderByStatus: { name: string; value: number; color: string }[];
  financialSummary: { name: string; Gelir: number; Gider: number }[];
  issuesBySeverity: { name: string; value: number; color: string }[];
  maintByType: { name: string; Adet: number; Maliyet: number }[];
  pipelineByStage: { name: string; value: number; color: string }[];
  inventoryRadar: { subject: string; Hammadde: number; Takım: number }[];
  kpis: { rfqs: number; orders: number; customers: number; openIssues: number; openTickets: number; totalIncome: number; totalExpense: number; overdueOrders: number };
  topCustomers: { name: string; Bakiye: number }[];
  monthlyRfqs: { month: string; Talep: number; Onaylanan: number }[];
};

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashData | null>(null);
  const [realtimeActive, setRealtimeActive] = useState(false);

  const statusColors: Record<string, string> = {
    "Onaylandı": C.emerald, "Fiyat Verildi": C.cyan, "Reddedildi": C.red, "Beklemede": C.amber,
    "Üretimde": C.cyan, "Hazırlık": C.orange, "Kalite Kontrol": C.purple, "Tamamlandı": C.emerald,
    "Teslim Edildi": C.lime, "İptal": C.red,
  };
  const severityColors: Record<string, string> = { "high": C.red, "normal": C.amber, "low": C.emerald, "critical": C.pink };
  const stageColors: Record<string, string> = { "prospect": C.slate, "qualified": C.cyan, "proposal": C.orange, "negotiation": C.purple, "closed_won": C.emerald, "closed_lost": C.red };

  const group = (arr: any[], key: string, colorMap: Record<string, string>) => {
    const map: Record<string, number> = {};
    arr.forEach((r) => { const k = r[key] || "Belirsiz"; map[k] = (map[k] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value, color: colorMap[name] || C.slate }));
  };

  const buildData = useCallback((rfqs: any[], orders: any[], issues: any[], fins: any[], custs: any[], pipes: any[], maints: any[], raws: any[], tools: any[], tickets: any[]): DashData => {
    const rfqByStatus = group(rfqs, "status", statusColors);
    const orderByStatus = group(orders, "status", statusColors);

    const finByMonth: Record<string, { Gelir: number; Gider: number }> = {};
    fins.forEach((f) => {
      const m = f.doc_date ? new Date(f.doc_date).toLocaleString("tr-TR", { month: "short" }) : "N/A";
      if (!finByMonth[m]) finByMonth[m] = { Gelir: 0, Gider: 0 };
      if (f.doc_type === "fatura" || f.doc_type === "gelir") finByMonth[m].Gelir += Number(f.total_amount) || 0;
      else finByMonth[m].Gider += Number(f.total_amount) || 0;
    });
    const financialSummary = Object.entries(finByMonth).map(([name, v]) => ({ name, ...v }));

    const issuesBySeverity = group(issues, "severity", severityColors);

    const maintMap: Record<string, { count: number; cost: number }> = {};
    maints.forEach((m) => {
      const k = m.type || "Belirsiz";
      if (!maintMap[k]) maintMap[k] = { count: 0, cost: 0 };
      maintMap[k].count++;
      maintMap[k].cost += Number(m.cost) || 0;
    });
    const maintByType = Object.entries(maintMap).map(([name, v]) => ({ name, Adet: v.count, Maliyet: v.cost }));

    const pipelineByStage = group(pipes, "stage", stageColors);

    const maxRaw = Math.max(raws.reduce((s: number, r: any) => s + (r.stock || 0), 0), 1);
    const maxTool = Math.max(tools.reduce((s: number, t: any) => s + (t.stock || 0), 0), 1);
    const rawValue = raws.reduce((s: number, r: any) => s + (r.stock || 0) * (Number(r.unit_cost) || 0), 0);
    const toolValue = tools.reduce((s: number, t: any) => s + (t.stock || 0) * (Number(t.unit_cost) || 0), 0);
    const maxVal = Math.max(rawValue, toolValue, 1);
    const lowStockTools = tools.filter((t: any) => (t.stock || 0) <= (t.min_stock || 5)).length;
    const inventoryRadar = [
      { subject: "Stok Adedi", Hammadde: Math.round((raws.reduce((s: number, r: any) => s + (r.stock || 0), 0) / maxRaw) * 100), Takım: Math.round((tools.reduce((s: number, t: any) => s + (t.stock || 0), 0) / maxTool) * 100) },
      { subject: "Çeşitlilik", Hammadde: raws.length * 10, Takım: tools.length * 10 },
      { subject: "Toplam Değer", Hammadde: Math.round((rawValue / maxVal) * 100), Takım: Math.round((toolValue / maxVal) * 100) },
      { subject: "Risk Skoru", Hammadde: 80, Takım: Math.max(0, 100 - lowStockTools * 20) },
    ];

    const totalIncome = fins.filter((f: any) => f.doc_type === "fatura" || f.doc_type === "gelir").reduce((s: number, f: any) => s + (Number(f.total_amount) || 0), 0);
    const totalExpense = fins.filter((f: any) => f.doc_type === "gider" || f.doc_type === "masraf").reduce((s: number, f: any) => s + (Number(f.total_amount) || 0), 0);
    const openIssues = issues.filter((i: any) => i.status === "Açık").length;
    const overdueOrders = orders.filter((o: any) => o.deadline && new Date(o.deadline) < new Date() && o.status !== "Tamamlandı").length;
    const openTickets = tickets.filter((t: any) => t.status === "open").length;

    const topCustomers = [...custs]
      .sort((a: any, b: any) => (Number(b.balance) || 0) - (Number(a.balance) || 0))
      .slice(0, 6)
      .map((c: any) => ({ name: c.short_name || c.company || c.name || "?", Bakiye: Number(c.balance) || 0 }));

    const rfqByMonth: Record<string, { total: number; approved: number }> = {};
    rfqs.forEach((r: any) => {
      const m = r.date ? new Date(r.date).toLocaleString("tr-TR", { month: "short" }) : "N/A";
      if (!rfqByMonth[m]) rfqByMonth[m] = { total: 0, approved: 0 };
      rfqByMonth[m].total++;
      if (r.status === "Onaylandı") rfqByMonth[m].approved++;
    });
    const monthlyRfqs = Object.entries(rfqByMonth).map(([month, v]) => ({ month, Talep: v.total, Onaylanan: v.approved }));

    return {
      rfqByStatus, orderByStatus, financialSummary, issuesBySeverity,
      maintByType, pipelineByStage, inventoryRadar,
      kpis: { rfqs: rfqs.length, orders: orders.length, customers: custs.length, openIssues, openTickets, totalIncome, totalExpense, overdueOrders },
      topCustomers, monthlyRfqs,
    };
  }, []);

  const fetchAll = useCallback(async () => {
    const [rfqR, ordR, issR, finR, custR, pipeR, maintR, rawR, toolR, ticketR] = await Promise.all([
      supabase.from("rfqs").select("*"),
      supabase.from("orders").select("*"),
      supabase.from("issues").select("*"),
      supabase.from("financial_documents").select("*"),
      supabase.from("customers").select("*"),
      supabase.from("pipeline_leads").select("*"),
      supabase.from("maintenance_logs").select("*"),
      supabase.from("raw_materials").select("*"),
      supabase.from("tool_inventory").select("*"),
      supabase.from("support_tickets").select("*"),
    ]);

    const result = buildData(
      rfqR.data || [], ordR.data || [], issR.data || [], finR.data || [],
      custR.data || [], pipeR.data || [], maintR.data || [], rawR.data || [],
      toolR.data || [], ticketR.data || [],
    );
    setData(result);
    setLoading(false);
  }, [buildData]);

  // Initial fetch + Realtime subscriptions
  useEffect(() => {
    fetchAll();

    const channel = supabase
      .channel("dashboard-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "rfqs" }, () => fetchAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => fetchAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "issues" }, () => fetchAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "financial_documents" }, () => fetchAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "customers" }, () => fetchAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "pipeline_leads" }, () => fetchAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "maintenance_logs" }, () => fetchAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "raw_materials" }, () => fetchAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "tool_inventory" }, () => fetchAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "support_tickets" }, () => fetchAll())
      .subscribe((status) => {
        setRealtimeActive(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAll]);

  if (loading || !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-28 dark:bg-[#1E293B] bg-white rounded-xl border dark:border-[#334155] border-slate-200" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-72 dark:bg-[#1E293B] bg-white rounded-xl border dark:border-[#334155] border-slate-200" />
          <div className="h-72 dark:bg-[#1E293B] bg-white rounded-xl border dark:border-[#334155] border-slate-200" />
        </div>
      </div>
    );
  }

  const kpiCards = [
    { label: "Toplam Teklif", value: data.kpis.rfqs, icon: FileText, color: C.cyan, bg: "bg-[#0AA2CD]/10", tab: "rfq" },
    { label: "Aktif Sipariş", value: data.kpis.orders, icon: Package, color: C.orange, bg: "bg-[#F97316]/10", tab: "orders" },
    { label: "Çözüm Ortağı", value: data.kpis.customers, icon: Users, color: C.emerald, bg: "bg-emerald-400/10", tab: "customers" },
    { label: "Açık Sorun", value: data.kpis.openIssues, icon: AlertTriangle, color: data.kpis.openIssues > 0 ? C.red : C.emerald, bg: data.kpis.openIssues > 0 ? "bg-red-500/10" : "bg-emerald-400/10", tab: "issues" },
    { label: "Geciken Sipariş", value: data.kpis.overdueOrders, icon: Wrench, color: data.kpis.overdueOrders > 0 ? C.red : C.emerald, bg: data.kpis.overdueOrders > 0 ? "bg-red-500/10" : "bg-emerald-400/10", tab: "orders" },
    { label: "Net Gelir (₺)", value: data.kpis.totalIncome - data.kpis.totalExpense, icon: DollarSign, color: C.primary, bg: "bg-[#0688AD]/10", fmt: true, tab: "financial" },
  ];

  const cardClass = "dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4 sm:p-5 hover:shadow-xl hover:border-[#0AA2CD]/30 transition-all";
  const clickableCard = (tab: string) => `${cardClass} cursor-pointer group`;

  return (
    <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
      {/* ── Realtime indicator ── */}
      <div className="flex items-center gap-2">
        <Radio className={`w-3.5 h-3.5 ${realtimeActive ? "text-emerald-400 animate-pulse" : "text-slate-500"}`} />
        <span className="text-[10px] font-medium dark:text-slate-400 text-slate-500">
          {realtimeActive ? "Canlı veri akışı aktif" : "Bağlanıyor..."}
        </span>
      </div>

      {/* ── KPI CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpiCards.map((k) => (
          <div key={k.label} className={`${cardClass} cursor-pointer hover:scale-[1.02]`} onClick={() => navigateTo(k.tab)}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">{k.label}</span>
              <div className={`w-7 h-7 rounded-lg ${k.bg} flex items-center justify-center`}>
                <k.icon className="w-3.5 h-3.5" style={{ color: k.color }} />
              </div>
            </div>
            <p className="text-xl sm:text-2xl font-black dark:text-white text-slate-800 font-mono tabular-nums">
              {k.fmt ? Number(k.value).toLocaleString("tr-TR") : k.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── OEE METRICS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {oeeMetrics.map((m) => (
          <div key={m.label} className={`${cardClass} cursor-pointer`} onClick={() => navigateTo("tpm")}>
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

      {/* ── ROW 1: OEE Trend + RFQ Pie ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`lg:col-span-2 ${clickableCard("tpm")}`} onClick={() => navigateTo("tpm")}>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-[#0AA2CD] transition-colors">OEE Trend Analizi (6 Ay)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={oeeHistory} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} domain={[70, 100]} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="oee" name="OEE" stroke={C.cyan} strokeWidth={3} dot={{ r: 4, fill: C.cyan }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="availability" name="Kullanılabilirlik" stroke={C.orange} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="performance" name="Performans" stroke={C.amber} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="quality" name="Kalite" stroke={C.emerald} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-3">
            {[{ label: "OEE", color: C.cyan }, { label: "Kullanılabilirlik", color: C.orange }, { label: "Performans", color: C.amber }, { label: "Kalite", color: C.emerald }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-[10px] dark:text-slate-400 text-slate-500 font-medium">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RFQ Status Pie */}
        <div className={clickableCard("rfq")} onClick={() => navigateTo("rfq")}>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-[#0AA2CD] transition-colors">RFQ Durum Dağılımı</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.rfqByStatus} cx="50%" cy="50%" innerRadius={40} outerRadius={72} paddingAngle={3} dataKey="value" stroke="none" labelLine={false} label={renderCustomLabel}>
                  {data.rfqByStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {data.rfqByStatus.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] dark:text-slate-300 text-slate-600">{item.name}</span>
                </div>
                <span className="text-[11px] font-bold dark:text-white text-slate-800 font-mono tabular-nums">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 2: Financial Area + Order Bar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={clickableCard("financial")} onClick={() => navigateTo("financial")}>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-[#0AA2CD] transition-colors">Finansal Akış (Aylık)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.financialSummary} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="gradGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.emerald} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.emerald} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradGider" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.red} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.red} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Gelir" stroke={C.emerald} strokeWidth={2} fill="url(#gradGelir)" />
                <Area type="monotone" dataKey="Gider" stroke={C.red} strokeWidth={2} fill="url(#gradGider)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: C.emerald }} />
              <span className="text-[10px] dark:text-slate-400 text-slate-500">Gelir</span>
              <span className="text-xs font-bold dark:text-white text-slate-800 font-mono">{data.kpis.totalIncome.toLocaleString("tr-TR")} ₺</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: C.red }} />
              <span className="text-[10px] dark:text-slate-400 text-slate-500">Gider</span>
              <span className="text-xs font-bold dark:text-white text-slate-800 font-mono">{data.kpis.totalExpense.toLocaleString("tr-TR")} ₺</span>
            </div>
          </div>
        </div>

        <div className={clickableCard("orders")} onClick={() => navigateTo("orders")}>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-[#0AA2CD] transition-colors">Sipariş Durum Dağılımı</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.orderByStatus} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.3} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={90} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Adet" radius={[0, 6, 6, 0]} barSize={20}>
                  {data.orderByStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── ROW 3: Pipeline + Issues + Maintenance ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className={clickableCard("pipeline")} onClick={() => navigateTo("pipeline")}>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-[#0AA2CD] transition-colors">Pipeline Aşamaları</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.pipelineByStage} cx="50%" cy="50%" outerRadius={70} paddingAngle={2} dataKey="value" stroke="none" labelLine={false} label={renderCustomLabel}>
                  {data.pipelineByStage.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {data.pipelineByStage.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] dark:text-slate-300 text-slate-600">{item.name}</span>
                </div>
                <span className="text-[11px] font-bold dark:text-white text-slate-800 font-mono tabular-nums">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={clickableCard("issues")} onClick={() => navigateTo("issues")}>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-[#0AA2CD] transition-colors">Sorun Ciddiyet Dağılımı</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.issuesBySeverity} cx="50%" cy="50%" innerRadius={35} outerRadius={70} paddingAngle={4} dataKey="value" stroke="none" labelLine={false} label={renderCustomLabel}>
                  {data.issuesBySeverity.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {data.issuesBySeverity.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] dark:text-slate-300 text-slate-600 capitalize">{item.name}</span>
                </div>
                <span className="text-[11px] font-bold dark:text-white text-slate-800 font-mono tabular-nums">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={clickableCard("tpm")} onClick={() => navigateTo("tpm")}>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-[#0AA2CD] transition-colors">Bakım Türleri & Maliyetleri</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.maintByType} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Adet" fill={C.cyan} radius={[4, 4, 0, 0]} barSize={22} />
                <Bar dataKey="Maliyet" fill={C.orange} radius={[4, 4, 0, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: C.cyan }} />
              <span className="text-[10px] dark:text-slate-400 text-slate-500">Adet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: C.orange }} />
              <span className="text-[10px] dark:text-slate-400 text-slate-500">Maliyet (₺)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ROW 4: Top Customers + Inventory Radar + RFQ Trend ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className={clickableCard("customers")} onClick={() => navigateTo("customers")}>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-[#0AA2CD] transition-colors">En Yüksek Bakiyeli Müşteriler</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topCustomers} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.3} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Bakiye" name="Bakiye (₺)" radius={[0, 6, 6, 0]} barSize={16}>
                  {data.topCustomers.map((_, i) => <Cell key={i} fill={i === 0 ? C.primary : i === 1 ? C.cyan : C.teal} opacity={1 - i * 0.1} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={clickableCard("inventory")} onClick={() => navigateTo("inventory")}>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-[#0AA2CD] transition-colors">Envanter Radar Analizi</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.inventoryRadar} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#334155" strokeOpacity={0.5} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#94A3B8" }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Hammadde" dataKey="Hammadde" stroke={C.cyan} fill={C.cyan} fillOpacity={0.2} strokeWidth={2} />
                <Radar name="Takım" dataKey="Takım" stroke={C.orange} fill={C.orange} fillOpacity={0.15} strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 justify-center">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: C.cyan }} />
              <span className="text-[10px] dark:text-slate-400 text-slate-500">Hammadde</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: C.orange }} />
              <span className="text-[10px] dark:text-slate-400 text-slate-500">Takım</span>
            </div>
          </div>
        </div>

        <div className={clickableCard("rfq")} onClick={() => navigateTo("rfq")}>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-[#0AA2CD] transition-colors">Aylık Teklif Trendi</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyRfqs} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Talep" fill={C.cyan} radius={[4, 4, 0, 0]} barSize={18} />
                <Bar dataKey="Onaylanan" fill={C.emerald} radius={[4, 4, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: C.cyan }} />
              <span className="text-[10px] dark:text-slate-400 text-slate-500">Toplam Talep</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: C.emerald }} />
              <span className="text-[10px] dark:text-slate-400 text-slate-500">Onaylanan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
