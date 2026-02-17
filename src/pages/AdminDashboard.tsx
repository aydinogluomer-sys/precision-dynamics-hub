import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Shield } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? "");
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Çıkış yapıldı.");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold">Yönetim Paneli</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/50">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" /> Çıkış
          </button>
        </div>
      </header>
      <main className="p-8">
        <p className="text-white/60">Yönetim paneline hoş geldiniz. Bu alan yalnızca yetkili personel tarafından erişilebilir.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
