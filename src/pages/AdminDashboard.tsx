import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChevronRight, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import { exportExcelReport } from "@/utils/excelExport";
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
import ChatbotAnalyticsView from "@/components/admin/ChatbotAnalyticsView";

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

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      const fileName = await exportExcelReport(activeTab);
      toast.success(`${fileName} indirildi`);
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
      case "chatbot-analytics": return <ChatbotAnalyticsView />;
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
          onExportCSV={handleExportExcel}
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
        {/* Breadcrumb */}
        {activeTab !== "dashboard" && (
          <div className="px-3 sm:px-6 pt-3 pb-0 flex items-center gap-1.5 text-[11px]">
            <button onClick={() => setActiveTab("dashboard")} className="flex items-center gap-1 dark:text-slate-500 text-slate-400 hover:text-[#0AA2CD] transition-colors">
              <LayoutDashboard className="w-3 h-3" />
              <span>Kontrol Paneli</span>
            </button>
            <ChevronRight className="w-3 h-3 dark:text-slate-600 text-slate-300" />
            <span className="font-bold dark:text-white text-slate-700 truncate">
              {({
                rfq: "Talep Merkezi", orders: "Üretim Günlüğü", wbs: "İş Akış Hattı",
                scheduling: "Kaynak Yerleşimi", financial: "Finansal Analitik", pipeline: "Satış Pipeline",
                tpm: "TPM & Bakım", inventory: "Envanter & Takım", financedocs: "Nakit Akışı",
                support: "Destek Talepleri", "chatbot-analytics": "Chatbot Analitik", issues: "Olay Merkezi", customers: "Çözüm Ortakları",
                settings: "Sistem Ayarları",
              } as Record<string, string>)[activeTab] || "Dashboard"}
            </span>
          </div>
        )}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
