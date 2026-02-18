import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Shield, Calendar, Clock, Mail, Phone, Building, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Meeting {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  meeting_date: string;
  meeting_time: string;
  topic: string;
  notes: string | null;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? "");
    });
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    const { data, error } = await supabase
      .from("meetings")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setMeetings(data as Meeting[]);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("meetings").update({ status }).eq("id", id);
    if (error) {
      toast.error("Durum güncellenemedi.");
      return;
    }
    toast.success(`Toplantı durumu "${status}" olarak güncellendi.`);
    fetchMeetings();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Çıkış yapıldı.");
    navigate("/admin/login");
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    confirmed: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  const statusLabels: Record<string, string> = {
    pending: "Beklemede",
    confirmed: "Onaylandı",
    cancelled: "İptal",
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
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Çıkış
          </button>
        </div>
      </header>

      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Toplantı Talepleri</h2>
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{meetings.length} talep</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : meetings.length === 0 ? (
          <p className="text-white/50 text-center py-20">Henüz toplantı talebi yok.</p>
        ) : (
          <div className="grid gap-4">
            {meetings.map((m) => (
              <div key={m.id} className="border border-white/10 bg-white/5 p-5 rounded-lg">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{m.name}</h3>
                    <p className="text-sm text-primary font-medium">{m.topic}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[m.status] || statusColors.pending}`}>
                    {statusLabels[m.status] || m.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 text-sm text-white/70">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {m.meeting_date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {m.meeting_time}</div>
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {m.email}</div>
                  {m.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {m.phone}</div>}
                  {m.company && <div className="flex items-center gap-2"><Building className="w-4 h-4" /> {m.company}</div>}
                </div>

                {m.notes && <p className="text-xs text-white/40 mb-4 italic">"{m.notes}"</p>}

                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(m.id, "confirmed")}
                    className="flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-3 py-1.5 rounded hover:bg-green-500/30 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3" /> Onayla
                  </button>
                  <button
                    onClick={() => updateStatus(m.id, "cancelled")}
                    className="flex items-center gap-1 text-xs bg-red-500/20 text-red-400 px-3 py-1.5 rounded hover:bg-red-500/30 transition-colors"
                  >
                    <XCircle className="w-3 h-3" /> İptal
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
