import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, GitBranch, Pause, Play } from "lucide-react";
import { toast } from "sonner";

interface WBS {
  id: string;
  customer: string | null;
  part_name: string | null;
  machine: string | null;
  current_step: number | null;
  status: string | null;
  deadline: string | null;
  total_qty: number | null;
}

const steps = ["Hammadde", "Hazırlık", "İşleme", "Final", "K. Kontrol", "Tamamlandı"];

const statusColors: Record<string, string> = {
  active: "bg-emerald-500",
  paused: "bg-amber-500",
  waiting: "bg-blue-500",
  issue: "bg-red-500",
};

const statusLabels: Record<string, string> = {
  active: "ÜRETİMDE",
  paused: "DURAKLADI",
  waiting: "BEKLEMEDE",
  issue: "SORUN VAR",
};

const WBSView = () => {
  const [wbsList, setWbsList] = useState<WBS[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const { data } = await supabase.from("wbs").select("*").order("created_at", { ascending: false });
    if (data) setWbsList(data as WBS[]);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const togglePause = async (w: WBS) => {
    const newStatus = w.status === "paused" ? "active" : "paused";
    await supabase.from("wbs").update({ status: newStatus }).eq("id", w.id);
    toast.success(newStatus === "paused" ? "İş duraklatıldı" : "İş devam ettirildi");
    fetch();
  };

  const advanceStep = async (w: WBS) => {
    const next = Math.min((w.current_step || 0) + 1, 5);
    const update: Record<string, unknown> = { current_step: next };
    if (next === 5) update.status = "active";
    await supabase.from("wbs").update(update).eq("id", w.id);
    toast.success(`Adım ${next + 1}: ${steps[next]}`);
    fetch();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-[#0AA2CD]" /></div>;

  if (wbsList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 animate-[fadeInUp_0.4s_ease-out]">
        <GitBranch className="w-12 h-12 mb-3" />
        <p className="font-medium">Henüz iş akışı yok</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 animate-[fadeInUp_0.4s_ease-out]">
      {wbsList.map((w) => {
        const step = w.current_step || 0;
        const st = w.status || "active";
        return (
          <div key={w.id} className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden hover:border-[#0AA2CD]/30 transition-all">
            {/* Status bar */}
            <div className={`h-1 ${statusColors[st] || "bg-slate-500"}`} />
            <div className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-[#0AA2CD]">{w.id}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-black text-white ${statusColors[st]}`}>
                      {statusLabels[st] || st}
                    </span>
                  </div>
                  <h3 className="font-bold text-white">{w.part_name || "—"}</h3>
                  <p className="text-xs text-slate-400">{w.customer} • Makine: {w.machine || "Atanmadı"} • Termin: {w.deadline || "—"}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => togglePause(w)} className="px-3 py-1.5 rounded-lg bg-[#0F172A] text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1">
                    {st === "paused" ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                    {st === "paused" ? "Devam" : "Duraklat"}
                  </button>
                  {step < 5 && (
                    <button onClick={() => advanceStep(w)} className="px-3 py-1.5 rounded-lg bg-[#0AA2CD]/10 text-xs font-bold text-[#0AA2CD] hover:bg-[#0AA2CD]/20">
                      Sonraki Adım →
                    </button>
                  )}
                </div>
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-1">
                {steps.map((s, i) => (
                  <div key={s} className="flex-1 flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black mb-1 ${
                      i < step ? "bg-[#0AA2CD] text-white" :
                      i === step ? "bg-[#0AA2CD]/30 text-[#0AA2CD] ring-2 ring-[#0AA2CD]" :
                      "bg-[#0F172A] text-slate-500"
                    }`}>
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span className={`text-[9px] font-bold ${i <= step ? "text-[#0AA2CD]" : "text-slate-500"}`}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WBSView;
