import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import MobileSidebar from "@/components/admin/MobileSidebar";
import DashboardHome from "@/components/admin/DashboardHome";
import RFQManager from "@/components/admin/RFQManager";
import OrdersView from "@/components/admin/OrdersView";
import WBSView from "@/components/admin/WBSView";
import SchedulingView from "@/components/admin/SchedulingView";
import IssuesView from "@/components/admin/IssuesView";
import CustomersView from "@/components/admin/CustomersView";
import SettingsView from "@/components/admin/SettingsView";
import FinancialView from "@/components/admin/FinancialView";
import PipelineView from "@/components/admin/PipelineView";
import TPMView from "@/components/admin/TPMView";
import InventoryView from "@/components/admin/InventoryView";
import FinanceDocsView from "@/components/admin/FinanceDocsView";
import SupportView from "@/components/admin/SupportView";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? "");
    });
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent).detail;
      if (tab) setActiveTab(tab);
    };
    window.addEventListener("nexus-navigate", handler);
    return () => window.removeEventListener("nexus-navigate", handler);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Çıkış yapıldı.");
    navigate("/admin/login");
  };

  const [exporting, setExporting] = useState(false);

  const handleExportCSV = async () => {
    setExporting(true);
    const now = new Date().toISOString().split("T")[0];
    const bom = "\uFEFF";

    const tabNames: Record<string, string> = {
      dashboard: "Ozet", rfq: "Talepler", orders: "Siparisler", wbs: "IsAkisi",
      scheduling: "Planlama", financial: "Finansal", pipeline: "Pipeline",
      tpm: "TPM_Bakim", inventory: "Envanter", financedocs: "NakitAkisi",
      issues: "Olaylar", customers: "CozumOrtaklari", support: "Destek",
      settings: "Ayarlar",
    };

    type ColDef = { key: string; label: string; fmt?: (v: any) => string };
    const fmtNum = (v: any) => v != null ? Number(v).toLocaleString("tr-TR") : "";
    const fmtDate = (v: any) => v ? String(v).split("T")[0] : "";

    const toCsv = (rows: Record<string, any>[], cols: ColDef[]) => {
      const header = cols.map(c => `"${c.label}"`).join(";");
      const body = rows.map(r =>
        cols.map(c => {
          const raw = r[c.key];
          const val = c.fmt ? c.fmt(raw) : (raw ?? "");
          return `"${String(val).replace(/"/g, '""')}"`;
        }).join(";")
      ).join("\n");
      return header + "\n" + body;
    };

    const download = (csv: string, name: string) => {
      const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url;
      a.download = `MasTechnic_${name}_${now}.csv`; a.click();
      URL.revokeObjectURL(url);
    };

    try {
      let csv = "";
      const tabName = tabNames[activeTab] || "Rapor";

      switch (activeTab) {
        case "dashboard": {
          const [rfqAll, ordersAll, issuesAll, finAll, custAll, pipeAll, maintAll, schedAll, rawMatAll, toolAll, supportAll] = await Promise.all([
            supabase.from("rfqs").select("*"),
            supabase.from("orders").select("*"),
            supabase.from("issues").select("*"),
            supabase.from("financial_documents").select("*"),
            supabase.from("customers").select("*"),
            supabase.from("pipeline_leads").select("*"),
            supabase.from("maintenance_logs").select("*"),
            supabase.from("machine_schedule").select("*"),
            supabase.from("raw_materials").select("*"),
            supabase.from("tool_inventory").select("*"),
            supabase.from("support_tickets").select("*"),
          ]);

          const rfqs = rfqAll.data || [];
          const orders = ordersAll.data || [];
          const issues = issuesAll.data || [];
          const fins = finAll.data || [];
          const custs = custAll.data || [];
          const pipes = pipeAll.data || [];
          const maints = maintAll.data || [];
          const scheds = schedAll.data || [];
          const raws = rawMatAll.data || [];
          const tools = toolAll.data || [];
          const tickets = supportAll.data || [];

          // RFQ istatistikleri
          const rfqByStatus: Record<string, number> = {};
          rfqs.forEach(r => { rfqByStatus[r.status || "Belirsiz"] = (rfqByStatus[r.status || "Belirsiz"] || 0) + 1; });
          const totalQuoted = rfqs.reduce((s, r) => s + (Number(r.quoted_price) || 0), 0);

          // Sipariş istatistikleri
          const orderByStatus: Record<string, number> = {};
          orders.forEach(o => { orderByStatus[o.status || "Belirsiz"] = (orderByStatus[o.status || "Belirsiz"] || 0) + 1; });
          const avgProgress = orders.length ? Math.round(orders.reduce((s, o) => s + (o.progress || 0), 0) / orders.length) : 0;
          const overdueOrders = orders.filter(o => o.deadline && new Date(o.deadline) < new Date() && o.status !== "Tamamlandı").length;

          // Finansal
          const totalIncome = fins.filter(f => f.doc_type === "fatura" || f.doc_type === "gelir").reduce((s, f) => s + (Number(f.total_amount) || 0), 0);
          const totalExpense = fins.filter(f => f.doc_type === "gider" || f.doc_type === "masraf").reduce((s, f) => s + (Number(f.total_amount) || 0), 0);
          const unpaidDocs = fins.filter(f => f.payment_status === "ödenmedi").length;
          const totalVat = fins.reduce((s, f) => s + (Number(f.vat_amount) || 0), 0);

          // Pipeline
          const totalPipeValue = pipes.reduce((s, p) => s + (Number(p.value) || 0), 0);
          const weightedPipe = pipes.reduce((s, p) => s + (Number(p.value) || 0) * ((p.probability || 0) / 100), 0);
          const pipeByStage: Record<string, number> = {};
          pipes.forEach(p => { pipeByStage[p.stage || "Belirsiz"] = (pipeByStage[p.stage || "Belirsiz"] || 0) + 1; });

          // Sorunlar
          const openIssues = issues.filter(i => i.status === "Açık").length;
          const issueCost = issues.reduce((s, i) => s + (Number(i.cost) || 0), 0);
          const issueBySev: Record<string, number> = {};
          issues.forEach(i => { issueBySev[i.severity || "Belirsiz"] = (issueBySev[i.severity || "Belirsiz"] || 0) + 1; });

          // Bakım
          const maintCost = maints.reduce((s, m) => s + (Number(m.cost) || 0), 0);
          const maintByType: Record<string, number> = {};
          maints.forEach(m => { maintByType[m.type || "Belirsiz"] = (maintByType[m.type || "Belirsiz"] || 0) + 1; });

          // Envanter
          const rawValue = raws.reduce((s, r) => s + (Number(r.stock) || 0) * (Number(r.unit_cost) || 0), 0);
          const toolValue = tools.reduce((s, t) => s + (Number(t.stock) || 0) * (Number(t.unit_cost) || 0), 0);
          const lowStockTools = tools.filter(t => (t.stock || 0) <= (t.min_stock || 5)).length;

          // Destek
          const openTickets = tickets.filter(t => t.status === "open").length;

          // Müşteri
          const totalBalance = custs.reduce((s, c) => s + (Number(c.balance) || 0), 0);

          const lines: string[] = ["Kategori;Metrik;Değer"];

          // Genel Özet
          lines.push(`Genel;Toplam RFQ Talebi;${rfqs.length}`);
          lines.push(`Genel;Toplam Sipariş;${orders.length}`);
          lines.push(`Genel;Toplam Müşteri;${custs.length}`);
          lines.push(`Genel;Açık Sorun;${openIssues}`);
          lines.push(`Genel;Açık Destek Talebi;${openTickets}`);
          lines.push("");

          // RFQ Detay
          lines.push(`RFQ;Toplam Teklif Tutarı (₺);${fmtNum(totalQuoted)}`);
          Object.entries(rfqByStatus).forEach(([k, v]) => lines.push(`RFQ;Durum: ${k};${v}`));
          lines.push("");

          // Sipariş Detay
          lines.push(`Sipariş;Ortalama İlerleme (%);${avgProgress}`);
          lines.push(`Sipariş;Geciken Sipariş;${overdueOrders}`);
          Object.entries(orderByStatus).forEach(([k, v]) => lines.push(`Sipariş;Durum: ${k};${v}`));
          lines.push("");

          // Finansal
          lines.push(`Finansal;Toplam Gelir (₺);${fmtNum(totalIncome)}`);
          lines.push(`Finansal;Toplam Gider (₺);${fmtNum(totalExpense)}`);
          lines.push(`Finansal;Net (₺);${fmtNum(totalIncome - totalExpense)}`);
          lines.push(`Finansal;Toplam KDV (₺);${fmtNum(totalVat)}`);
          lines.push(`Finansal;Ödenmemiş Belge;${unpaidDocs}`);
          lines.push("");

          // Pipeline
          lines.push(`Pipeline;Toplam Değer (₺);${fmtNum(totalPipeValue)}`);
          lines.push(`Pipeline;Ağırlıklı Değer (₺);${fmtNum(Math.round(weightedPipe))}`);
          Object.entries(pipeByStage).forEach(([k, v]) => lines.push(`Pipeline;Aşama: ${k};${v}`));
          lines.push("");

          // Sorunlar
          lines.push(`Sorunlar;Toplam Sorun;${issues.length}`);
          lines.push(`Sorunlar;Toplam Maliyet (₺);${fmtNum(issueCost)}`);
          Object.entries(issueBySev).forEach(([k, v]) => lines.push(`Sorunlar;Ciddiyet: ${k};${v}`));
          lines.push("");

          // Bakım
          lines.push(`Bakım;Toplam Kayıt;${maints.length}`);
          lines.push(`Bakım;Toplam Maliyet (₺);${fmtNum(maintCost)}`);
          Object.entries(maintByType).forEach(([k, v]) => lines.push(`Bakım;Tür: ${k};${v}`));
          lines.push("");

          // Envanter
          lines.push(`Envanter;Hammadde Çeşidi;${raws.length}`);
          lines.push(`Envanter;Hammadde Toplam Değer (₺);${fmtNum(Math.round(rawValue))}`);
          lines.push(`Envanter;Takım Çeşidi;${tools.length}`);
          lines.push(`Envanter;Takım Toplam Değer (₺);${fmtNum(Math.round(toolValue))}`);
          lines.push(`Envanter;Kritik Stok Takım;${lowStockTools}`);
          lines.push("");

          // Müşteri & Destek
          lines.push(`Müşteri;Toplam Bakiye (₺);${fmtNum(Math.round(totalBalance))}`);
          lines.push(`Planlama;Aktif Çizelge Kaydı;${scheds.length}`);

          csv = lines.map(l => l ? `"${l.split(";").join('";"')}"` : "").join("\n");
          break;
        }
        case "rfq": {
          const { data } = await supabase.from("rfqs").select("*").order("created_at", { ascending: false });
          csv = toCsv(data || [], [
            { key: "id", label: "ID" }, { key: "customer", label: "Müşteri" }, { key: "company", label: "Firma" },
            { key: "material", label: "Malzeme" }, { key: "service", label: "Hizmet" },
            { key: "quantity", label: "Miktar", fmt: fmtNum }, { key: "status", label: "Durum" },
            { key: "date", label: "Tarih", fmt: fmtDate }, { key: "quoted_price", label: "Fiyat", fmt: fmtNum },
          ]);
          break;
        }
        case "orders": {
          const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
          csv = toCsv(data || [], [
            { key: "id", label: "ID" }, { key: "part_name", label: "Parça" }, { key: "customer", label: "Müşteri" },
            { key: "quantity", label: "Miktar", fmt: fmtNum }, { key: "status", label: "Durum" },
            { key: "progress", label: "İlerleme (%)", fmt: fmtNum }, { key: "machine", label: "Makine" },
            { key: "deadline", label: "Termin", fmt: fmtDate },
          ]);
          break;
        }
        case "wbs": {
          const { data } = await supabase.from("wbs").select("*").order("created_at", { ascending: false });
          csv = toCsv(data || [], [
            { key: "id", label: "ID" }, { key: "order_id", label: "Sipariş" }, { key: "part_name", label: "Parça" },
            { key: "customer", label: "Müşteri" }, { key: "current_step", label: "Adım", fmt: fmtNum },
            { key: "status", label: "Durum" }, { key: "deadline", label: "Termin", fmt: fmtDate },
          ]);
          break;
        }
        case "scheduling": {
          const { data } = await supabase.from("machine_schedule").select("*").order("week_start", { ascending: false });
          csv = toCsv(data || [], [
            { key: "machine", label: "Makine" }, { key: "day", label: "Gün" },
            { key: "week_start", label: "Hafta Başı", fmt: fmtDate }, { key: "job_name", label: "İş Adı" },
            { key: "hours", label: "Saat", fmt: fmtNum },
          ]);
          break;
        }
        case "financial": {
          const { data } = await supabase.from("financial_documents").select("*").order("created_at", { ascending: false });
          csv = toCsv(data || [], [
            { key: "doc_number", label: "Belge No" }, { key: "doc_type", label: "Tür" },
            { key: "title", label: "Başlık" }, { key: "amount", label: "Tutar", fmt: fmtNum },
            { key: "vat_amount", label: "KDV", fmt: fmtNum }, { key: "total_amount", label: "Toplam", fmt: fmtNum },
            { key: "payment_status", label: "Ödeme Durumu" }, { key: "due_date", label: "Vade", fmt: fmtDate },
          ]);
          break;
        }
        case "pipeline": {
          const { data } = await supabase.from("pipeline_leads").select("*").order("created_at", { ascending: false });
          csv = toCsv(data || [], [
            { key: "company", label: "Firma" }, { key: "contact_name", label: "Kişi" },
            { key: "stage", label: "Aşama" }, { key: "value", label: "Değer", fmt: fmtNum },
            { key: "probability", label: "Olasılık (%)", fmt: fmtNum },
          ]);
          break;
        }
        case "tpm": {
          const [m, h] = await Promise.all([
            supabase.from("maintenance_logs").select("*").order("date", { ascending: false }),
            supabase.from("machine_health").select("*"),
          ]);
          const logCsv = toCsv(m.data || [], [
            { key: "machine", label: "Makine" }, { key: "type", label: "Tür" },
            { key: "date", label: "Tarih", fmt: fmtDate }, { key: "technician", label: "Teknisyen" },
            { key: "cost", label: "Maliyet", fmt: fmtNum }, { key: "status", label: "Durum" },
          ]);
          const healthCsv = toCsv(h.data || [], [
            { key: "name", label: "Makine" }, { key: "status", label: "Durum" },
            { key: "spindle_hours", label: "Spindle Saat", fmt: fmtNum },
            { key: "oil_level", label: "Yağ (%)", fmt: fmtNum },
          ]);
          csv = "=== BAKIM KAYITLARI ===\n" + logCsv + "\n\n=== MAKİNE SAĞLIĞI ===\n" + healthCsv;
          break;
        }
        case "inventory": {
          const [r, t] = await Promise.all([
            supabase.from("raw_materials").select("*").order("created_at", { ascending: false }),
            supabase.from("tool_inventory").select("*").order("created_at", { ascending: false }),
          ]);
          const rawCsv = toCsv(r.data || [], [
            { key: "code", label: "Kod" }, { key: "name", label: "Ad" },
            { key: "stock", label: "Stok", fmt: fmtNum }, { key: "unit_cost", label: "Birim Fiyat", fmt: fmtNum },
            { key: "unit", label: "Birim" },
          ]);
          const toolCsv = toCsv(t.data || [], [
            { key: "code", label: "Kod" }, { key: "name", label: "Ad" },
            { key: "stock", label: "Stok", fmt: fmtNum }, { key: "unit_cost", label: "Birim Fiyat", fmt: fmtNum },
            { key: "category", label: "Kategori" },
          ]);
          csv = "=== HAMMADDELER ===\n" + rawCsv + "\n\n=== TAKIM STOĞU ===\n" + toolCsv;
          break;
        }
        case "issues": {
          const { data } = await supabase.from("issues").select("*").order("created_at", { ascending: false });
          csv = toCsv(data || [], [
            { key: "id", label: "ID" }, { key: "job", label: "İş" }, { key: "machine", label: "Makine" },
            { key: "category", label: "Kategori" }, { key: "severity", label: "Ciddiyet" },
            { key: "status", label: "Durum" }, { key: "cost", label: "Maliyet", fmt: fmtNum },
          ]);
          break;
        }
        case "customers": {
          const { data } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
          csv = toCsv(data || [], [
            { key: "name", label: "Ad" }, { key: "company", label: "Firma" }, { key: "city", label: "Şehir" },
            { key: "phone", label: "Telefon" }, { key: "email", label: "Email" },
            { key: "balance", label: "Bakiye", fmt: fmtNum },
          ]);
          break;
        }
        case "financedocs": {
          const { data } = await supabase.from("financial_documents").select("*").order("created_at", { ascending: false });
          csv = toCsv(data || [], [
            { key: "doc_number", label: "Belge No" }, { key: "doc_type", label: "Tür" },
            { key: "total_amount", label: "Tutar", fmt: fmtNum }, { key: "payment_status", label: "Ödeme Durumu" },
          ]);
          break;
        }
        case "support": {
          const { data } = await supabase.from("support_tickets").select("*").order("created_at", { ascending: false });
          csv = toCsv(data || [], [
            { key: "subject", label: "Konu" }, { key: "priority", label: "Öncelik" },
            { key: "status", label: "Durum" }, { key: "created_at", label: "Tarih", fmt: fmtDate },
          ]);
          break;
        }
        default: {
          csv = "Bu sekme için rapor mevcut değil.";
        }
      }

      download(csv, tabName);
      toast.success("Rapor indirildi");
    } catch (err) {
      console.error(err);
      toast.error("Rapor oluşturulurken hata oluştu");
    } finally {
      setExporting(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardHome />;
      case "rfq": return <RFQManager />;
      case "orders": return <OrdersView />;
      case "wbs": return <WBSView />;
      case "scheduling": return <SchedulingView />;
      case "financial": return <FinancialView />;
      case "pipeline": return <PipelineView />;
      case "tpm": return <TPMView />;
      case "inventory": return <InventoryView />;
      case "financedocs": return <FinanceDocsView />;
      case "support": return <SupportView />;
      case "issues": return <IssuesView />;
      case "customers": return <CustomersView />;
      case "settings": return <SettingsView />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen flex dark:bg-[#0F172A] bg-slate-50 dark:text-white text-slate-800">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
          userEmail={userEmail}
          onLogout={handleLogout}
        />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          activeTab={activeTab}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onExportCSV={handleExportCSV}
          onNavigate={setActiveTab}
          exporting={exporting}
          mobileSidebar={
            <MobileSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              userEmail={userEmail}
              onLogout={handleLogout}
            />
          }
        />
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
