import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const machines = ["CNC-01", "CNC-02", "CNC-03", "Lazer-01", "Abkant-01", "CMM-01"];
const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];

type Job = { id: string; name: string; hours: number; progress: number } | null;

interface Order {
  id: string;
  part_name: string | null;
  customer: string | null;
  quantity: number | null;
  status: string | null;
  progress: number | null;
}

const initialJobs: Record<string, Record<string, Job>> = {
  "CNC-01": { Pazartesi: { id: "PO-9928", name: "Dişli Mili", hours: 4, progress: 75 }, Salı: { id: "PO-9928", name: "Dişli Mili", hours: 4, progress: 75 }, Çarşamba: null, Perşembe: { id: "PO-9932", name: "Flanş", hours: 3, progress: 10 }, Cuma: null },
  "CNC-02": { Pazartesi: null, Salı: { id: "PO-9931", name: "Bağlantı Plakası", hours: 6, progress: 40 }, Çarşamba: { id: "PO-9931", name: "Bağlantı Plakası", hours: 6, progress: 40 }, Perşembe: null, Cuma: null },
  "CNC-03": { Pazartesi: null, Salı: null, Çarşamba: null, Perşembe: null, Cuma: null },
  "Lazer-01": { Pazartesi: { id: "PO-9930", name: "Panel Kesim", hours: 2, progress: 90 }, Salı: null, Çarşamba: null, Perşembe: null, Cuma: { id: "PO-9935", name: "Lazer Parça", hours: 3, progress: 0 } },
  "Abkant-01": { Pazartesi: null, Salı: null, Çarşamba: null, Perşembe: null, Cuma: null },
  "CMM-01": { Pazartesi: null, Salı: null, Çarşamba: { id: "QC-101", name: "CMM Ölçüm", hours: 1, progress: 50 }, Perşembe: null, Cuma: null },
};

const SchedulingView = () => {
  const [hours, setHours] = useState("3.2");
  const rate = 450;
  const cost = (parseFloat(hours) || 0) * rate;

  const [jobs, setJobs] = useState<Record<string, Record<string, Job>>>(initialJobs);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ machine: string; day: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const openAssignModal = (machine: string, day: string) => {
    setSelectedCell({ machine, day });
    setModalOpen(true);
    fetchOrders();
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    const { data } = await supabase
      .from("orders")
      .select("id, part_name, customer, quantity, status, progress")
      .order("created_at", { ascending: false });
    setOrders((data as Order[]) || []);
    setLoadingOrders(false);
  };

  const assignOrder = (order: Order) => {
    if (!selectedCell) return;
    const { machine, day } = selectedCell;
    setJobs((prev) => ({
      ...prev,
      [machine]: {
        ...prev[machine],
        [day]: {
          id: order.id,
          name: order.part_name || "İsimsiz Parça",
          hours: 4,
          progress: order.progress || 0,
        },
      },
    }));
    setModalOpen(false);
    toast.success(`${order.id} → ${machine} / ${day} atandı`);
  };

  return (
    <div className="space-y-4 animate-[fadeInUp_0.4s_ease-out]">
      <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 dark:bg-[#1E293B] bg-white z-10">
              <tr className="dark:border-[#334155] border-slate-200 border-b">
                <th className="text-left p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest w-28">Makine</th>
                {days.map((d) => (
                  <th key={d} className="text-center p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {machines.map((m) => (
                <tr key={m} className="dark:border-[#334155]/50 border-slate-100 border-b">
                  <td className="p-4 font-bold dark:text-white text-slate-800 text-xs">{m}</td>
                  {days.map((d) => {
                    const job = jobs[m]?.[d];
                    return (
                      <td key={d} className="p-2">
                        {job ? (
                          <div className="bg-[#0AA2CD]/10 border border-[#0AA2CD]/20 rounded-lg p-2 text-center hover:bg-[#0AA2CD]/20 transition-colors cursor-pointer">
                            <p className="text-[10px] font-black text-[#0AA2CD]">{job.id}</p>
                            <p className="text-[9px] dark:text-slate-300 text-slate-600">{job.name}</p>
                            <p className="text-[9px] text-slate-500">{job.hours} saat</p>
                            <div className="w-full h-1 dark:bg-[#0F172A] bg-slate-100 rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-[#0AA2CD] rounded-full" style={{ width: `${job.progress}%` }} />
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => openAssignModal(m, d)}
                            className="h-16 rounded-lg border border-dashed dark:border-[#334155] border-slate-200 flex items-center justify-center group hover:border-[#0AA2CD]/40 hover:bg-[#0AA2CD]/5 transition-all cursor-pointer"
                          >
                            <span className="text-[9px] dark:text-slate-600 text-slate-400 group-hover:text-[#0AA2CD] transition-colors">+ Ata</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-5 max-w-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Üretim Süresi Hesaplayıcı</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-24 px-3 py-2 rounded-lg dark:bg-[#0F172A] bg-slate-50 dark:border-[#334155] border-slate-200 border dark:text-white text-slate-800 focus:outline-none focus:border-[#0AA2CD] text-sm font-mono tabular-nums"
          />
          <span className="text-xs dark:text-slate-400 text-slate-500">saat × {rate}₺/saat =</span>
          <span className="text-sm font-black text-[#0AA2CD] font-mono tabular-nums">{cost.toLocaleString("tr-TR")}₺</span>
        </div>
      </div>

      {/* İş Atama Modalı */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="dark:bg-[#1E293B] dark:border-[#334155] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-black dark:text-white">
              İş Ata — {selectedCell?.machine} / {selectedCell?.day}
            </DialogTitle>
          </DialogHeader>

          {loadingOrders ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-[#0AA2CD]" />
            </div>
          ) : orders.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-6">Atanabilecek sipariş bulunamadı.</p>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {orders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => assignOrder(o)}
                  className="w-full text-left p-3 rounded-lg dark:bg-[#0F172A] bg-slate-50 border dark:border-[#334155] border-slate-200 hover:border-[#0AA2CD]/50 hover:bg-[#0AA2CD]/5 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0AA2CD]">{o.id}</span>
                    {o.status && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#0AA2CD]/10 text-[#0AA2CD] font-bold">{o.status}</span>
                    )}
                  </div>
                  <p className="text-xs dark:text-white text-slate-800 mt-1">{o.part_name || "—"}</p>
                  <p className="text-[10px] text-slate-500">{o.customer || "—"} • {o.quantity || 0} adet</p>
                  <div className="w-full h-1 dark:bg-[#1E293B] bg-slate-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-[#0AA2CD] rounded-full" style={{ width: `${o.progress || 0}%` }} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulingView;
