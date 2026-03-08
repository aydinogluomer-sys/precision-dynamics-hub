import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

import MusteriSidebar from "@/components/musteri/MusteriSidebar";
import MusteriMobileSidebar from "@/components/musteri/MusteriMobileSidebar";
import MusteriHeader from "@/components/musteri/MusteriHeader";
import GenelBakisTab from "@/components/musteri/GenelBakisTab";
import TekliflerimTab from "@/components/musteri/TekliflerimTab";
import SiparislerimTab from "@/components/musteri/SiparislerimTab";
import UretimTab from "@/components/musteri/UretimTab";
import TeknikArsivTab from "@/components/musteri/TeknikArsivTab";
import KaliteRaporTab from "@/components/musteri/KaliteRaporTab";
import FinansTab from "@/components/musteri/FinansTab";
import OdemeTab from "@/components/musteri/OdemeTab";
import DestekTab from "@/components/musteri/DestekTab";
import BildirimTercihleri from "@/components/musteri/BildirimTercihleri";
import ProfilAyarlari from "@/components/musteri/ProfilAyarlari";

interface Profile {
  id: string;
  full_name: string | null;
  company: string | null;
  phone: string | null;
  city: string | null;
}

const MusteriPaneli = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("genel");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/giris"); return; }
      setUser(session.user);
      const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (data) setProfile(data as Profile);
      setLoading(false);
    };
    getSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Çıkış yapıldı.");
    navigate("/giris");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#0F172A] bg-slate-50">
        <Loader2 size={32} className="animate-spin text-[#0AA2CD]" />
      </div>
    );
  }

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Müşteri";
  const userEmail = user?.email || "";

  const renderContent = () => {
    switch (activeTab) {
      case "genel": return <GenelBakisTab />;
      case "teklifler": return <TekliflerimTab />;
      case "siparisler": return <SiparislerimTab />;
      case "uretim": return <UretimTab />;
      case "arsiv": return <TeknikArsivTab />;
      case "kalite": return <KaliteRaporTab />;
      case "finans": return <FinansTab />;
      case "odeme": return <OdemeTab />;
      case "destek": return <DestekTab />;
      case "bildirimler": return <BildirimTercihleri />;
      case "profil": return <ProfilAyarlari />;
      default: return <GenelBakisTab />;
    }
  };

  return (
    <div className="min-h-screen flex dark:bg-[#0F172A] bg-slate-50 dark:text-white text-slate-800">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <MusteriSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          collapsed={sidebarCollapsed}
          displayName={displayName}
          userEmail={userEmail}
          onLogout={handleLogout}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <MusteriHeader
          activeTab={activeTab}
          mobileSidebar={
            <MusteriMobileSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              displayName={displayName}
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

export default MusteriPaneli;
