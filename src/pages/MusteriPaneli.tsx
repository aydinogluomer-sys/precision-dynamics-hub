import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  FileText,
  Package,
  Clock,
  User,
  Building2,
  Phone,
  MapPin,
  Mail,
  ChevronRight,
  Edit2,
  Save,
  X,
  Loader2,
  Home,
  MessageSquare,
  Shield,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import type { User as SupaUser } from "@supabase/supabase-js";

interface Profile {
  id: string;
  full_name: string | null;
  company: string | null;
  phone: string | null;
  city: string | null;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}) => (
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
      if (!session) {
        navigate("/giris");
        return;
      }
      setUser(session.user);
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      if (data) {
        setProfile(data as Profile);
        setEditForm({
          full_name: data.full_name || "",
          company: data.company || "",
          phone: data.phone || "",
          city: data.city || "",
        });
      }
      setLoading(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/giris");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Çıkış yapıldı.");
    navigate("/giris");
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, ...editForm });
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
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MT</span>
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight">MAS TECHNIC</div>
              <div className="text-[9px] text-muted-foreground uppercase tracking-widest">Müşteri Portalı</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Merhaba, <span className="font-semibold text-foreground">{displayName}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground hover:text-destructive">
              <LogOut size={16} />
              <span className="hidden sm:inline">Çıkış</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-1">Müşteri Paneli</h1>
            <p className="text-sm text-muted-foreground">
              Projelerinizi takip edin, teklif isteyin ve profil bilgilerinizi yönetin.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={FileText} label="Teklif Taleplerim" value="—" color="bg-primary/10 text-primary" />
            <StatCard icon={Package} label="Aktif Siparişler" value="—" color="bg-green-500/10 text-green-600" />
            <StatCard icon={Clock} label="Bekleyen" value="—" color="bg-amber-500/10 text-amber-600" />
            <StatCard icon={MessageSquare} label="Mesajlar" value="—" color="bg-blue-500/10 text-blue-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1 bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Profil Bilgileri</h2>
                {!editing ? (
                  <Button variant="ghost" size="sm" onClick={() => setEditing(true)} className="gap-1.5 text-xs">
                    <Edit2 size={14} /> Düzenle
                  </Button>
                ) : (
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => setEditing(false)} className="text-xs">
                      <X size={14} />
                    </Button>
                    <Button size="sm" onClick={handleSaveProfile} disabled={saving} className="text-xs gap-1.5">
                      {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      Kaydet
                    </Button>
                  </div>
                )}
              </div>

              {editing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Ad Soyad</label>
                    <Input value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} className="h-9" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Firma</label>
                    <Input value={editForm.company} onChange={(e) => setEditForm({ ...editForm, company: e.target.value })} className="h-9" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Telefon</label>
                    <Input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="h-9" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Şehir</label>
                    <Input value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} className="h-9" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <ProfileRow icon={User} label="Ad Soyad" value={profile?.full_name} />
                  <ProfileRow icon={Mail} label="E-posta" value={user?.email} />
                  <ProfileRow icon={Building2} label="Firma" value={profile?.company} />
                  <ProfileRow icon={Phone} label="Telefon" value={profile?.phone} />
                  <ProfileRow icon={MapPin} label="Şehir" value={profile?.city} />
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">Hızlı İşlemler</h2>

              <QuickAction
                icon={FileText}
                title="Yeni Teklif Talebi"
                description="CNC, kalıp veya imalat hizmetleri için teklif isteyin."
                href="/teklif-al"
              />
              <QuickAction
                icon={Home}
                title="Ana Sayfaya Dön"
                description="Hizmetlerimizi, kabiliyetlerimizi ve malzeme kütüphanemizi keşfedin."
                href="/"
              />
              <QuickAction
                icon={Shield}
                title="Destek & İletişim"
                description="Mühendislerimizle doğrudan iletişime geçin."
                href="/iletisim"
              />

              {/* Recent activity placeholder */}
              <div className="bg-card border border-border p-6 mt-6">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Son Aktiviteler</h3>
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Clock size={32} className="mb-3 opacity-30" />
                  <p className="text-sm">Henüz bir aktivite bulunmuyor.</p>
                  <p className="text-xs mt-1">Teklif taleplerini ve siparişleriniz burada görünecek.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

/* ── Helper components ── */
const ProfileRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
}) => (
  <div className="flex items-center gap-3">
    <Icon size={15} className="text-muted-foreground/50 shrink-0" />
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-medium truncate">{value || "—"}</p>
    </div>
  </div>
);

const QuickAction = ({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}) => (
  <Link
    to={href}
    className="flex items-center gap-4 bg-card border border-border p-5 hover:border-primary/30 transition-colors group"
  >
    <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center shrink-0">
      <Icon size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
    </div>
    <ChevronRight size={16} className="text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
  </Link>
);

export default MusteriPaneli;
