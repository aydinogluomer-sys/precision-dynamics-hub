import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Gauge, Power, Zap, ShieldCheck, AlertTriangle, Package, FileText, Users, Wrench, DollarSign, Radio, MessageSquare, CheckCircle2, Clock, ArrowUpRight, Activity, Plus, Headphones, ClipboardList } from "lucide-react";
import QuickActionModals, { type ModalType } from "./QuickActionModals";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart,
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

/* ── Theme-aware chart palette ── */
const useChartTheme = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return {
    grid: isDark ? "#334155" : "#CBD5E1",
    gridOpacity: isDark ? 0.2 : 0.5,
    tick: isDark ? "#94A3B8" : "#475569",
    tooltipBg: isDark ? "#0F172A" : "#FFFFFF",
    emerald: isDark ? "#34D399" : "#059669",
    red: isDark ? "#EF4444" : "#DC2626",
    orange: isDark ? "#F97316" : "#EA580C",
    slate: isDark ? "#64748B" : "#94A3B8",
  };
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
    <div className="dark:bg-[#0F172A]/95 bg-white/95 backdrop-blur-xl border dark:border-[#334155] border-slate-200 rounded-xl p-3 shadow-2xl">
      <p className="text-[10px] font-black dark:text-slate-400 text-slate-500 mb-1.5 uppercase tracking-wider">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-[11px] dark:text-slate-400 text-slate-500">{p.name}:</span>
          <span className="text-[11px] font-black dark:text-white text-slate-800 font-mono">
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
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={800}>
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

type ActivityItem = {
  id: string;
  type: "rfq" | "order" | "ticket";
  title: string;
  subtitle: string;
  time: string;
  color: string;
  icon: any;
  tab: string;
};

type DashData = {
  rfqByStatus: { name: string; value: number; color: string }[];
  orderByStatus: { name: string; value: number; color: string }[];
  financialSummary: { name: string; Gelir: number; Gider: number; Net: number }[];
  issuesBySeverity: { name: string; value: number; color: string }[];
  maintByType: { name: string; Adet: number; Maliyet: number }[];
  pipelineByStage: { name: string; value: number; color: string }[];
  inventoryRadar: { subject: string; Hammadde: number; Takım: number }[];
  kpis: { rfqs: number; orders: number; customers: number; openIssues: number; openTickets: number; totalIncome: number; totalExpense: number; overdueOrders: number };
  topCustomers: { name: string; Bakiye: number }[];
  monthlyRfqs: { month: string; Talep: number; Onaylanan: number; Oran: number }[];
  ticketsByPriority: { name: string; value: number; color: string }[];
  orderCompletion: { name: string; Tamamlanan: number; Hedef: number }[];
  recentActivity: ActivityItem[];
};

/* ── Animation variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashData | null>(null);
  const [realtimeActive, setRealtimeActive] = useState(false);
  const [activityFilter, setActivityFilter] = useState<"all" | "rfq" | "order" | "ticket">("all");
  const ct = useChartTheme();

  const statusColors: Record<string, string> = {
    "Onaylandı": C.emerald, "Fiyat Verildi": C.cyan, "Reddedildi": C.red, "Beklemede": C.amber,
    "Üretimde": C.cyan, "Hazırlık": C.orange, "Kalite Kontrol": C.purple, "Tamamlandı": C.emerald,
    "Teslim Edildi": C.lime, "İptal": C.red,
  };
  const severityColors: Record<string, string> = { "high": C.red, "normal": C.amber, "low": C.emerald, "critical": C.pink };
  const stageColors: Record<string, string> = { "prospect": C.slate, "qualified": C.cyan, "proposal": C.orange, "negotiation": C.purple, "closed_won": C.emerald, "closed_lost": C.red };
  const priorityColors: Record<string, string> = { "urgent": C.red, "high": C.orange, "normal": C.cyan, "low": C.emerald };

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
    const financialSummary = Object.entries(finByMonth).map(([name, v]) => ({ name, ...v, Net: v.Gelir - v.Gider }));

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
    const monthlyRfqs = Object.entries(rfqByMonth).map(([month, v]) => ({
      month, Talep: v.total, Onaylanan: v.approved,
      Oran: v.total > 0 ? Math.round((v.approved / v.total) * 100) : 0,
    }));

    // Tickets by priority
    const ticketsByPriority = group(tickets, "priority", priorityColors);

    // Order completion by month
    const orderByMonth: Record<string, { completed: number; total: number }> = {};
    orders.forEach((o: any) => {
      const m = o.order_date ? new Date(o.order_date).toLocaleString("tr-TR", { month: "short" }) : "N/A";
      if (!orderByMonth[m]) orderByMonth[m] = { completed: 0, total: 0 };
      orderByMonth[m].total++;
      if (o.status === "Tamamlandı" || o.status === "Teslim Edildi") orderByMonth[m].completed++;
    });
    const orderCompletion = Object.entries(orderByMonth).map(([name, v]) => ({
      name, Tamamlanan: v.completed, Hedef: v.total,
    }));

    // Recent activity feed
    const timeAgo = (d: string) => {
      const diff = Date.now() - new Date(d).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 60) return `${mins}dk önce`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}sa önce`;
      return `${Math.floor(hrs / 24)}g önce`;
    };
    const recentActivity: ActivityItem[] = [
      ...rfqs.slice(-8).map((r: any) => ({
        id: `rfq-${r.id}`, type: "rfq" as const, title: `Teklif: ${r.id}`,
        subtitle: `${r.customer || "—"} • ${r.service || "—"}`,
        time: r.created_at, color: C.cyan, icon: FileText, tab: "rfq",
      })),
      ...orders.slice(-8).map((o: any) => ({
        id: `ord-${o.id}`, type: "order" as const, title: `Sipariş: ${o.id}`,
        subtitle: `${o.part_name || "—"} • ${o.customer || "—"}`,
        time: o.created_at, color: C.orange, icon: Package, tab: "orders",
      })),
      ...tickets.slice(-8).map((t: any) => ({
        id: `tkt-${t.id}`, type: "ticket" as const, title: t.subject || "Destek Talebi",
        subtitle: `${t.priority || "normal"} öncelik`,
        time: t.created_at, color: C.purple, icon: MessageSquare, tab: "support",
      })),
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
     .slice(0, 12)
     .map((a) => ({ ...a, time: timeAgo(a.time) }));

    return {
      rfqByStatus, orderByStatus, financialSummary, issuesBySeverity,
      maintByType, pipelineByStage, inventoryRadar,
      kpis: { rfqs: rfqs.length, orders: orders.length, customers: custs.length, openIssues, openTickets, totalIncome, totalExpense, overdueOrders },
      topCustomers, monthlyRfqs, ticketsByPriority, orderCompletion, recentActivity,
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
      .subscribe((status) => { setRealtimeActive(status === "SUBSCRIBED"); });
    return () => { supabase.removeChannel(channel); };
  }, [fetchAll]);

  if (loading || !data) {
    return (
      <div className="space-y-6 animate-pulse p-1">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-24 dark:bg-[#1E293B] bg-white rounded-2xl border dark:border-[#334155] border-slate-200" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-72 dark:bg-[#1E293B] bg-white rounded-2xl border dark:border-[#334155] border-slate-200" />
          <div className="h-72 dark:bg-[#1E293B] bg-white rounded-2xl border dark:border-[#334155] border-slate-200" />
        </div>
      </div>
    );
  }

  const kpiCards = [
    { label: "Toplam Teklif", value: data.kpis.rfqs, icon: FileText, color: C.cyan, bg: "bg-[#0AA2CD]/10", tab: "rfq" },
    { label: "Aktif Sipariş", value: data.kpis.orders, icon: Package, color: C.orange, bg: "bg-[#F97316]/10", tab: "orders" },
    { label: "Çözüm Ortağı", value: data.kpis.customers, icon: Users, color: C.emerald, bg: "bg-emerald-400/10", tab: "customers" },
    { label: "Açık Sorun", value: data.kpis.openIssues, icon: AlertTriangle, color: data.kpis.openIssues > 0 ? C.red : C.emerald, bg: data.kpis.openIssues > 0 ? "bg-red-500/10" : "bg-emerald-400/10", tab: "issues" },
    { label: "Geciken Sipariş", value: data.kpis.overdueOrders, icon: Clock, color: data.kpis.overdueOrders > 0 ? C.red : C.emerald, bg: data.kpis.overdueOrders > 0 ? "bg-red-500/10" : "bg-emerald-400/10", tab: "orders" },
    { label: "Net Gelir (₺)", value: data.kpis.totalIncome - data.kpis.totalExpense, icon: DollarSign, color: C.primary, bg: "bg-[#0688AD]/10", fmt: true, tab: "financial" },
  ];

  const cardBase = "dark:bg-[#1E293B]/80 bg-white rounded-2xl dark:border-[#1E293B] border-slate-200 border shadow-sm hover:shadow-lg hover:shadow-[#0AA2CD]/5 transition-all duration-300";
  const clickableCard = (tab: string) => `${cardBase} cursor-pointer group p-5`;

  const totalRfq = data.rfqByStatus.reduce((s, r) => s + r.value, 0);
  const grd = { stroke: ct.grid, strokeOpacity: ct.gridOpacity };
  const tkS = { fontSize: 11, fill: ct.tick };
  const tkXS = { fontSize: 10, fill: ct.tick };
  const tkXXS = { fontSize: 9, fill: ct.tick };
  const filteredActivity = activityFilter === "all" ? data.recentActivity : data.recentActivity.filter((a) => a.type === activityFilter);

  return (
    <motion.div className="space-y-5 p-1" variants={containerVariants} initial="hidden" animate="visible">
      {/* ── Realtime indicator ── */}
      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <div className="relative">
          <Radio className={`w-3.5 h-3.5 ${realtimeActive ? "text-emerald-400" : "text-slate-500"}`} />
          {realtimeActive && <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />}
        </div>
        <span className="text-[10px] font-semibold dark:text-slate-500 text-slate-400 tracking-wide">
          {realtimeActive ? "CANLI VERİ AKIŞI AKTİF" : "Bağlanıyor..."}
        </span>
      </motion.div>

      {/* ── QUICK ACTIONS ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Yeni Teklif", icon: Plus, color: C.cyan, bg: "bg-[#0AA2CD]/10", tab: "rfq" },
          { label: "Sipariş Ekle", icon: ClipboardList, color: C.orange, bg: "bg-[#F97316]/10", tab: "orders" },
          { label: "Destek Talebi", icon: Headphones, color: C.purple, bg: "bg-purple-500/10", tab: "support" },
          { label: "Pipeline Ekle", icon: DollarSign, color: C.emerald, bg: "bg-emerald-400/10", tab: "pipeline" },
        ].map((a) => (
          <button
            key={a.label}
            onClick={() => navigateTo(a.tab)}
            className="flex items-center gap-3 dark:bg-[#1E293B]/80 bg-white rounded-2xl border dark:border-[#1E293B] border-slate-200 p-4 hover:shadow-lg hover:shadow-[#0AA2CD]/5 transition-all duration-200 hover:scale-[1.02] group"
          >
            <div className={`w-9 h-9 rounded-xl ${a.bg} flex items-center justify-center shrink-0`}>
              <a.icon className="w-4 h-4" style={{ color: a.color }} />
            </div>
            <span className="text-xs font-bold dark:text-slate-300 text-slate-700 group-hover:text-[#0AA2CD] transition-colors">{a.label}</span>
          </button>
        ))}
      </motion.div>

      {/* ── KPI CARDS ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpiCards.map((k) => (
          <div key={k.label} className={`${cardBase} cursor-pointer hover:scale-[1.02] p-4 relative overflow-hidden`} onClick={() => navigateTo(k.tab)}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-[0.04]" style={{ backgroundColor: k.color, transform: "translate(30%, -30%)" }} />
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-xl ${k.bg} flex items-center justify-center`}>
                <k.icon className="w-4 h-4" style={{ color: k.color }} />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-2xl font-black dark:text-white text-slate-800 font-mono tabular-nums leading-none mb-1">
              {k.fmt ? Number(k.value).toLocaleString("tr-TR") : k.value}
            </p>
            <span className="text-[10px] font-semibold dark:text-slate-500 text-slate-400 tracking-wide">{k.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── OEE METRICS ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {oeeMetrics.map((m) => (
          <div key={m.label} className={`${cardBase} cursor-pointer p-4`} onClick={() => navigateTo("tpm")}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold dark:text-slate-500 text-slate-400 uppercase tracking-widest">{m.label}</span>
              <div className={`w-7 h-7 rounded-lg ${m.bg} flex items-center justify-center`}>
                <m.icon className={`w-3.5 h-3.5 ${m.color}`} />
              </div>
            </div>
            <p className="text-2xl font-black dark:text-white text-slate-800 mb-3">{m.value}</p>
            <div className="flex items-end gap-[3px] h-7 mb-2">
              {m.bars.map((v, i) => (
                <div key={i} className="flex-1 rounded-sm transition-all" style={{ height: `${v}%`, backgroundColor: `color-mix(in srgb, ${m.color === "text-[#0AA2CD]" ? C.cyan : m.color === "text-[#F97316]" ? C.orange : m.color === "text-amber-400" ? C.amber : C.emerald} ${30 + i * 7}%, transparent)` }} />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {m.up ? <TrendingUp className="w-3 h-3 text-emerald-400" /> : <TrendingDown className="w-3 h-3 text-red-400" />}
              <span className={`text-[11px] font-bold ${m.up ? "text-emerald-400" : "text-red-400"}`}>{m.trend}</span>
              <span className="text-[10px] text-slate-500 ml-1">son 30g</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── ROW 1: OEE Trend + RFQ Status (Redesigned as horizontal bars) ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className={`lg:col-span-3 ${clickableCard("tpm")}`} onClick={() => navigateTo("tpm")}>
          <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] mb-4 group-hover:text-[#0AA2CD] transition-colors">OEE Trend Analizi (6 Ay)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={oeeHistory} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" {...grd} />
                <XAxis dataKey="month" tick={tkS} axisLine={false} tickLine={false} />
                <YAxis tick={tkS} domain={[70, 100]} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="oee" name="OEE" stroke={C.cyan} strokeWidth={3} dot={{ r: 4, fill: C.cyan, strokeWidth: 0 }} activeDot={{ r: 6, stroke: C.cyan, strokeWidth: 2, fill: "#0F172A" }} />
                <Line type="monotone" dataKey="availability" name="Kullanılabilirlik" stroke={C.orange} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="performance" name="Performans" stroke={C.amber} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="quality" name="Kalite" stroke={C.emerald} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-3">
            {[{ label: "OEE", color: C.cyan, dash: false }, { label: "Kullanılabilirlik", color: C.orange, dash: true }, { label: "Performans", color: C.amber, dash: true }, { label: "Kalite", color: C.emerald, dash: true }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-4 h-0.5 rounded-full ${l.dash ? "border-t border-dashed" : ""}`} style={{ backgroundColor: l.dash ? "transparent" : l.color, borderColor: l.color }} />
                <span className="text-[10px] dark:text-slate-500 text-slate-400 font-medium">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RFQ Status — Redesigned as progress bars */}
        <div className={`lg:col-span-2 ${clickableCard("rfq")}`} onClick={() => navigateTo("rfq")}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] group-hover:text-[#0AA2CD] transition-colors">RFQ Durum Dağılımı</h3>
            <span className="text-lg font-black dark:text-white text-slate-800 font-mono">{totalRfq}</span>
          </div>
          <div className="space-y-3">
            {data.rfqByStatus.sort((a, b) => b.value - a.value).map((item) => {
              const pct = totalRfq > 0 ? (item.value / totalRfq) * 100 : 0;
              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold dark:text-slate-300 text-slate-600">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black dark:text-white text-slate-800 font-mono">{item.value}</span>
                      <span className="text-[10px] dark:text-slate-500 text-slate-400 font-mono w-9 text-right">{pct.toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="h-2 dark:bg-[#0F172A] bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ── ROW 2: Financial (Redesigned as ComposedChart) + Order Status ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={clickableCard("financial")} onClick={() => navigateTo("financial")}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] group-hover:text-[#0AA2CD] transition-colors">Gelir & Gider Analizi</h3>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[9px] dark:text-slate-500 text-slate-400">Net Kar</p>
                <p className={`text-sm font-black font-mono ${(data.kpis.totalIncome - data.kpis.totalExpense) >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {(data.kpis.totalIncome - data.kpis.totalExpense).toLocaleString("tr-TR")} ₺
                </p>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.financialSummary} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="gradGelir2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.emerald} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={C.emerald} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" {...grd} />
                <XAxis dataKey="name" tick={tkS} axisLine={false} tickLine={false} />
                <YAxis tick={tkXS} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Gelir" name="Gelir" fill={C.emerald} radius={[4, 4, 0, 0]} barSize={24} fillOpacity={0.8} />
                <Bar dataKey="Gider" name="Gider" fill={C.red} radius={[4, 4, 0, 0]} barSize={24} fillOpacity={0.6} />
                <Line type="monotone" dataKey="Net" name="Net Kar" stroke={C.cyan} strokeWidth={2.5} dot={{ r: 3, fill: C.cyan, strokeWidth: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-5 mt-3">
            {[{ label: "Gelir", color: C.emerald, val: data.kpis.totalIncome }, { label: "Gider", color: C.red, val: data.kpis.totalExpense }].map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: l.color }} />
                <span className="text-[10px] dark:text-slate-500 text-slate-400">{l.label}</span>
                <span className="text-[11px] font-bold dark:text-slate-300 text-slate-600 font-mono">{l.val.toLocaleString("tr-TR")} ₺</span>
              </div>
            ))}
          </div>
        </div>

        <div className={clickableCard("orders")} onClick={() => navigateTo("orders")}>
          <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] mb-4 group-hover:text-[#0AA2CD] transition-colors">Sipariş Durum Dağılımı</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.orderByStatus} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" {...grd} horizontal={false} />
                <XAxis type="number" tick={tkS} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={tkS} axisLine={false} tickLine={false} width={90} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Adet" radius={[0, 8, 8, 0]} barSize={18}>
                  {data.orderByStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* ── ROW 3: Pipeline + Issues + Maintenance + Tickets ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={clickableCard("pipeline")} onClick={() => navigateTo("pipeline")}>
          <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] mb-4 group-hover:text-[#0AA2CD] transition-colors">Pipeline Aşamaları</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.pipelineByStage} cx="50%" cy="50%" outerRadius={60} paddingAngle={2} dataKey="value" stroke="none" labelLine={false} label={renderCustomLabel}>
                  {data.pipelineByStage.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 mt-1">
            {data.pipelineByStage.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] dark:text-slate-400 text-slate-500 truncate max-w-[80px]">{item.name}</span>
                </div>
                <span className="text-[10px] font-bold dark:text-white text-slate-800 font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={clickableCard("issues")} onClick={() => navigateTo("issues")}>
          <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] mb-4 group-hover:text-[#0AA2CD] transition-colors">Sorun Ciddiyet Dağılımı</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.issuesBySeverity} cx="50%" cy="50%" innerRadius={30} outerRadius={60} paddingAngle={4} dataKey="value" stroke="none" labelLine={false} label={renderCustomLabel}>
                  {data.issuesBySeverity.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 mt-1">
            {data.issuesBySeverity.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] dark:text-slate-400 text-slate-500 capitalize">{item.name}</span>
                </div>
                <span className="text-[10px] font-bold dark:text-white text-slate-800 font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={clickableCard("tpm")} onClick={() => navigateTo("tpm")}>
          <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] mb-4 group-hover:text-[#0AA2CD] transition-colors">Bakım Türleri & Maliyet</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.maintByType} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" {...grd} />
                <XAxis dataKey="name" tick={tkXXS} axisLine={false} tickLine={false} />
                <YAxis tick={tkXXS} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Adet" fill={C.cyan} radius={[3, 3, 0, 0]} barSize={16} />
                <Bar dataKey="Maliyet" fill={C.orange} radius={[3, 3, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-3 mt-1">
            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: C.cyan }} /><span className="text-[9px] dark:text-slate-500 text-slate-400">Adet</span></div>
            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: C.orange }} /><span className="text-[9px] dark:text-slate-500 text-slate-400">Maliyet</span></div>
          </div>
        </div>

        {/* NEW: Destek Talepleri by Priority */}
        <div className={clickableCard("support")} onClick={() => navigateTo("support")}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] group-hover:text-[#0AA2CD] transition-colors">Destek Talepleri</h3>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0AA2CD]/10">
              <MessageSquare className="w-3 h-3 text-[#0AA2CD]" />
              <span className="text-[10px] font-bold text-[#0AA2CD] font-mono">{data.kpis.openTickets}</span>
            </div>
          </div>
          <div className="space-y-3">
            {data.ticketsByPriority.sort((a, b) => b.value - a.value).map((item) => {
              const total = data.ticketsByPriority.reduce((s, t) => s + t.value, 0);
              const pct = total > 0 ? (item.value / total) * 100 : 0;
              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold dark:text-slate-300 text-slate-600 capitalize">{item.name}</span>
                    <span className="text-[10px] font-bold dark:text-white text-slate-800 font-mono">{item.value}</span>
                  </div>
                  <div className="h-1.5 dark:bg-[#0F172A] bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              );
            })}
          </div>
          {data.ticketsByPriority.length === 0 && (
            <div className="flex flex-col items-center justify-center h-44 gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400/30" />
              <span className="text-[11px] dark:text-slate-500 text-slate-400">Açık talep yok</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── ROW 4: Top Customers + Radar + RFQ Trend + Order Completion ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={clickableCard("customers")} onClick={() => navigateTo("customers")}>
          <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] mb-4 group-hover:text-[#0AA2CD] transition-colors">En Yüksek Bakiye</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topCustomers} margin={{ top: 5, right: 5, left: -15, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" {...grd} horizontal={false} />
                <XAxis type="number" tick={tkXXS} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="name" tick={tkXXS} axisLine={false} tickLine={false} width={55} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Bakiye" name="Bakiye (₺)" radius={[0, 6, 6, 0]} barSize={12}>
                  {data.topCustomers.map((_, i) => <Cell key={i} fill={[C.primary, C.cyan, C.teal, C.emerald, C.indigo, C.purple][i] || C.slate} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={clickableCard("inventory")} onClick={() => navigateTo("inventory")}>
          <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] mb-4 group-hover:text-[#0AA2CD] transition-colors">Envanter Radar</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.inventoryRadar} cx="50%" cy="50%" outerRadius="65%">
                <PolarGrid stroke={ct.grid} strokeOpacity={ct.gridOpacity} />
                <PolarAngleAxis dataKey="subject" tick={tkXXS} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Hammadde" dataKey="Hammadde" stroke={C.cyan} fill={C.cyan} fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Takım" dataKey="Takım" stroke={C.orange} fill={C.orange} fillOpacity={0.1} strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-3 mt-1 justify-center">
            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: C.cyan }} /><span className="text-[9px] dark:text-slate-500 text-slate-400">Hammadde</span></div>
            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: C.orange }} /><span className="text-[9px] dark:text-slate-500 text-slate-400">Takım</span></div>
          </div>
        </div>

        <div className={clickableCard("rfq")} onClick={() => navigateTo("rfq")}>
          <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] mb-4 group-hover:text-[#0AA2CD] transition-colors">Aylık Teklif Trendi</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyRfqs} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" {...grd} />
                <XAxis dataKey="month" tick={tkXXS} axisLine={false} tickLine={false} />
                <YAxis tick={tkXXS} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Talep" fill={C.cyan} radius={[3, 3, 0, 0]} barSize={14} />
                <Bar dataKey="Onaylanan" fill={C.emerald} radius={[3, 3, 0, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-3 mt-1">
            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: C.cyan }} /><span className="text-[9px] dark:text-slate-500 text-slate-400">Talep</span></div>
            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: C.emerald }} /><span className="text-[9px] dark:text-slate-500 text-slate-400">Onay</span></div>
          </div>
        </div>

        {/* NEW: Sipariş Tamamlanma Oranı */}
        <div className={clickableCard("orders")} onClick={() => navigateTo("orders")}>
          <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em] mb-4 group-hover:text-[#0AA2CD] transition-colors">Sipariş Tamamlanma</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.orderCompletion} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" {...grd} />
                <XAxis dataKey="name" tick={tkXXS} axisLine={false} tickLine={false} />
                <YAxis tick={tkXXS} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Hedef" name="Toplam" fill={C.slate} radius={[3, 3, 0, 0]} barSize={14} fillOpacity={0.3} />
                <Bar dataKey="Tamamlanan" name="Tamamlanan" fill={C.emerald} radius={[3, 3, 0, 0]} barSize={14} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-3 mt-1">
            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: C.slate, opacity: 0.3 }} /><span className="text-[9px] dark:text-slate-500 text-slate-400">Toplam</span></div>
            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: C.emerald }} /><span className="text-[9px] dark:text-slate-500 text-slate-400">Tamamlanan</span></div>
          </div>
        </div>
      </motion.div>

      {/* ── ROW 5: Activity Feed ── */}
      <motion.div variants={itemVariants} className={`${cardBase} p-5`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0AA2CD]" />
            <h3 className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.15em]">Son Aktiviteler</h3>
          </div>
          <div className="flex items-center gap-1.5">
            {([
              { key: "all", label: "Tümü" },
              { key: "rfq", label: "Teklifler" },
              { key: "order", label: "Siparişler" },
              { key: "ticket", label: "Destek" },
            ] as const).map((f) => (
              <button
                key={f.key}
                onClick={() => setActivityFilter(f.key)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  activityFilter === f.key
                    ? "bg-[#0AA2CD]/15 text-[#0AA2CD]"
                    : "dark:text-slate-500 text-slate-400 dark:hover:bg-white/5 hover:bg-slate-50"
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="text-[10px] dark:text-slate-600 text-slate-300 font-mono ml-2">{filteredActivity.length}</span>
          </div>
        </div>
        {filteredActivity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <Activity className="w-8 h-8 dark:text-slate-700 text-slate-200" />
            <span className="text-[11px] dark:text-slate-600 text-slate-400">Aktivite bulunamadı</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredActivity.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="flex items-center gap-3 p-2.5 rounded-xl dark:hover:bg-white/[0.03] hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => navigateTo(a.tab)}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${a.color}15` }}>
                  <a.icon className="w-3.5 h-3.5" style={{ color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold dark:text-slate-200 text-slate-700 truncate">{a.title}</p>
                  <p className="text-[10px] dark:text-slate-500 text-slate-400 truncate">{a.subtitle}</p>
                </div>
                <span className="text-[9px] dark:text-slate-600 text-slate-300 font-mono shrink-0">{a.time}</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DashboardHome;
