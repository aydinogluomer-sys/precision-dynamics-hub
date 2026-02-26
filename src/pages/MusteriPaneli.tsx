import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  FileText, Package, Clock, MessageSquare,
  Home, Shield, ChevronRight, Loader2,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import MusteriHeader from "@/components/musteri/MusteriHeader";
import ProfilCard from "@/components/musteri/ProfilCard";
import SiparislerimTab from "@/components/musteri/SiparislerimTab";
import TekliflerimTab from "@/components/musteri/TekliflerimTab";
import OdemeTab from "@/components/musteri/OdemeTab";
import UretimTab from "@/components/musteri/UretimTab";

interface Profile {
  id: string;
  full_name: string | null;
  company: string | null;
  phone: string | null;
  city: string | null;
}

const StatCard = ({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) => (
  <div className="bg-card border border-border p-5 flex items-start gap-4">
    <div className={`w-10 h-10 flex items-center justify-center ${color}`}>
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
      <p className="text-2xl font-bold font-mono mt-1">{value}</p>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, title, description, href }: { icon: React.ElementType; title: string; description: string; href: string }) => (
  <Link to={href} className="flex items-center gap-4 bg-card border border-border p-5 hover:border-primary/30 transition-colors group">
    <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center shrink-0"><Icon size={18} /></div>
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
    </div>
    <ChevronRight size={16} className="text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
  </Link>
);

const MusteriPaneli = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: "", company: "", phone: "", city: "" });

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUser(session.user);
      const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (data) {
        setProfile(data as Profile);
        setEditForm({ full_name: data.full_name || "", company: data.company || "", phone: data.phone || "", city: data.city || "" });
      }
      setLoading(false);
    };
    getSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Çıkış yapıldı.");
    navigate("/giris");
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({ id: user.id, ...editForm });
    if (error) {
      toast.error("Profil güncellenemedi.");
    } else {
      setProfile({ id: user.id, ...editForm });
      toast.success("Profil güncellendi.");
      setEditing(false);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Müşteri";

  return (
    <div className="min-h-screen bg-background">
      <MusteriHeader displayName={displayName} onLogout={handleLogout} />

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-1">Müşteri Paneli</h1>
            <p className="text-sm text-muted-foreground">Projelerinizi takip edin, teklif isteyin ve profil bilgilerinizi yönetin.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left: Profile */}
            <div className="lg:col-span-1 space-y-4">
              <ProfilCard
                user={user!}
                profile={profile}
                editing={editing}
                saving={saving}
                editForm={editForm}
                setEditing={setEditing}
                setEditForm={setEditForm}
                onSave={handleSaveProfile}
              />
              <div className="space-y-2">
                <QuickAction icon={FileText} title="Yeni Teklif Talebi" description="CNC, kalıp veya imalat için teklif isteyin." href="/teklif-al" />
                <QuickAction icon={Home} title="Ana Sayfa" description="Hizmetlerimizi keşfedin." href="/" />
                <QuickAction icon={Shield} title="Destek" description="Mühendislerimizle iletişime geçin." href="/iletisim" />
              </div>
            </div>

            {/* Right: Tabs */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="genel" className="w-full">
                <TabsList className="w-full justify-start bg-card border border-border rounded-none h-auto p-0 gap-0">
                  <TabsTrigger value="genel" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-5 py-3 text-xs uppercase tracking-wider">Genel Bakış</TabsTrigger>
                  <TabsTrigger value="siparisler" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-5 py-3 text-xs uppercase tracking-wider">Siparişlerim</TabsTrigger>
                  <TabsTrigger value="teklifler" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-5 py-3 text-xs uppercase tracking-wider">Tekliflerim</TabsTrigger>
                  <TabsTrigger value="uretim" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-5 py-3 text-xs uppercase tracking-wider">Üretim</TabsTrigger>
                  <TabsTrigger value="odeme" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-5 py-3 text-xs uppercase tracking-wider">Ödeme</TabsTrigger>
                </TabsList>

                <TabsContent value="genel" className="mt-0">
                  <div className="bg-card border border-border border-t-0 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <StatCard icon={FileText} label="Teklif Taleplerim" value="—" color="bg-primary/10 text-primary" />
                      <StatCard icon={Package} label="Aktif Siparişler" value="—" color="bg-green-500/10 text-green-600" />
                      <StatCard icon={Clock} label="Bekleyen" value="—" color="bg-amber-500/10 text-amber-600" />
                      <StatCard icon={MessageSquare} label="Mesajlar" value="—" color="bg-blue-500/10 text-blue-600" />
                    </div>
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <Clock size={32} className="mb-3 opacity-30" />
                      <p className="text-sm">Henüz bir aktivite bulunmuyor.</p>
                      <p className="text-xs mt-1">Teklif talepleri ve siparişleriniz burada görünecek.</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="siparisler" className="mt-0">
                  <div className="bg-card border border-border border-t-0 p-6">
                    <SiparislerimTab />
                  </div>
                </TabsContent>

                <TabsContent value="teklifler" className="mt-0">
                  <div className="bg-card border border-border border-t-0 p-6">
                    <TekliflerimTab />
                  </div>
                </TabsContent>

                <TabsContent value="uretim" className="mt-0">
                  <div className="bg-card border border-border border-t-0 p-6">
                    <UretimTab />
                  </div>
                </TabsContent>

                <TabsContent value="odeme" className="mt-0">
                  <div className="bg-card border border-border border-t-0 p-6">
                    <OdemeTab />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default MusteriPaneli;
