import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, X, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface RFQ {
  id: string;
  customer: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  service: string | null;
  material: string | null;
  quantity: number | null;
  date: string | null;
  status: string | null;
  notes: string | null;
  files: string[] | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  Yeni: "bg-blue-500/20 text-blue-400",
  "Fiyat Verildi": "bg-amber-500/20 text-amber-400",
  Onaylandı: "bg-emerald-500/20 text-emerald-400",
  Reddedildi: "bg-red-500/20 text-red-400",
  pending: "bg-blue-500/20 text-blue-400",
};

const RFQManager = () => {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Tümü");
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [priceModal, setPriceModal] = useState<RFQ | null>(null);
  const [priceForm, setPriceForm] = useState({ price: "", days: "7", notes: "" });

  const fetchRFQs = async () => {
    const { data } = await supabase.from("rfqs").select("*").order("created_at", { ascending: false });
    if (data) setRfqs(data as RFQ[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchRFQs();
    const channel = supabase
      .channel("rfqs-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "rfqs" }, () => fetchRFQs())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("rfqs").update({ status }).eq("id", id);
    if (error) { toast.error("Güncelleme hatası"); return; }
    toast.success(`Durum "${status}" olarak güncellendi`);
    fetchRFQs();
    setSelectedRFQ(null);
  };

  const sendQuote = async () => {
    if (!priceModal) return;
    await updateStatus(priceModal.id, "Fiyat Verildi");
    setPriceModal(null);
    setPriceForm({ price: "", days: "7", notes: "" });
  };

  const filters = ["Tümü", "Yeni", "Fiyat Verildi", "Onaylandı", "Reddedildi"];
  const filtered = filter === "Tümü" ? rfqs : rfqs.filter((r) => r.status === filter);

  return (
    <div className="space-y-4 animate-[fadeInUp_0.4s_ease-out]">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filter === f ? "bg-[#0AA2CD] text-white" : "bg-[#1E293B] text-slate-400 hover:text-white"
            }`}
          >
            {f} {f !== "Tümü" && `(${rfqs.filter((r) => r.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-[#0AA2CD]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <FileText className="w-10 h-10 mb-3" />
            <p className="text-sm font-medium">Henüz teklif talebi yok</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-[#334155]">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Müşteri</th>
                  <th className="text-left p-4">Firma</th>
                  <th className="text-left p-4">Hizmet</th>
                  <th className="text-left p-4">Malzeme</th>
                  <th className="text-left p-4">Adet</th>
                  <th className="text-left p-4">Tarih</th>
                  <th className="text-left p-4">Durum</th>
                  <th className="text-left p-4">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedRFQ(r)}
                    className="border-b border-[#334155]/50 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="p-4 font-bold text-[#0AA2CD]">{r.id}</td>
                    <td className="p-4 text-white">{r.customer || "-"}</td>
                    <td className="p-4 text-slate-400">{r.company || "-"}</td>
                    <td className="p-4 text-slate-300">{r.service || "-"}</td>
                    <td className="p-4 text-slate-300">{r.material || "-"}</td>
                    <td className="p-4 text-white font-bold">{r.quantity || "-"}</td>
                    <td className="p-4 text-slate-400">{r.date || "-"}</td>
                    <td className="p-4">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${statusColors[r.status || ""] || statusColors.Yeni}`}>
                        {r.status || "Yeni"}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); setPriceModal(r); }}
                        className="text-xs bg-[#0AA2CD]/10 text-[#0AA2CD] px-3 py-1 rounded font-bold hover:bg-[#0AA2CD]/20"
                      >
                        Fiyat Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selectedRFQ && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSelectedRFQ(null)}>
          <div className="bg-[#1E293B] rounded-xl border border-[#334155] w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-white">{selectedRFQ.id}</h3>
              <button onClick={() => setSelectedRFQ(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ["Müşteri", selectedRFQ.customer], ["Firma", selectedRFQ.company], ["E-posta", selectedRFQ.email],
                ["Telefon", selectedRFQ.phone], ["Hizmet", selectedRFQ.service], ["Malzeme", selectedRFQ.material],
                ["Adet", selectedRFQ.quantity], ["Notlar", selectedRFQ.notes],
              ].map(([k, v]) => (
                <div key={k as string} className="flex justify-between">
                  <span className="text-slate-400">{k}</span>
                  <span className="text-white font-medium">{v || "-"}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => updateStatus(selectedRFQ.id, "Onaylandı")} className="flex-1 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold hover:bg-emerald-500/30">Onayla</button>
              <button onClick={() => updateStatus(selectedRFQ.id, "Reddedildi")} className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/30">Reddet</button>
              <button onClick={() => { setPriceModal(selectedRFQ); setSelectedRFQ(null); }} className="flex-1 py-2 bg-[#0AA2CD]/20 text-[#0AA2CD] rounded-lg text-xs font-bold hover:bg-[#0AA2CD]/30">Fiyat Ver</button>
            </div>
          </div>
        </div>
      )}

      {/* Price Modal */}
      {priceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setPriceModal(null)}>
          <div className="bg-[#1E293B] rounded-xl border border-[#334155] w-full max-w-md p-6 animate-[scaleIn_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-black text-white mb-4">Teklif Oluştur — {priceModal.id}</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Teklif Fiyatı (TRY)</label>
                <input
                  type="number"
                  value={priceForm.price}
                  onChange={(e) => setPriceForm({ ...priceForm, price: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0F172A] border border-[#334155] text-white focus:outline-none focus:border-[#0AA2CD]"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Teslim Süresi (Gün)</label>
                <input
                  type="number"
                  value={priceForm.days}
                  onChange={(e) => setPriceForm({ ...priceForm, days: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0F172A] border border-[#334155] text-white focus:outline-none focus:border-[#0AA2CD]"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notlar</label>
                <textarea
                  value={priceForm.notes}
                  onChange={(e) => setPriceForm({ ...priceForm, notes: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0F172A] border border-[#334155] text-white focus:outline-none focus:border-[#0AA2CD] min-h-[60px]"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setPriceModal(null)} className="flex-1 py-2 bg-slate-700 text-slate-300 rounded-lg text-xs font-bold">İptal</button>
              <button onClick={sendQuote} className="flex-1 py-2 bg-[#0AA2CD] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> Teklifi Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFQManager;
