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
          const [r1, r2, r3] = await Promise.all([
            supabase.from("rfqs").select("id", { count: "exact", head: true }),
            supabase.from("orders").select("id", { count: "exact", head: true }),
            supabase.from("issues").select("id", { count: "exact", head: true }).eq("status", "Açık"),
          ]);
          csv = `Metrik;Değer\nToplam RFQ;${r1.count ?? 0}\nToplam Sipariş;${r2.count ?? 0}\nAçık Sorun;${r3.count ?? 0}`;
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
