import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText, Package, Headphones, DollarSign, Loader2 } from "lucide-react";

type ModalType = "rfq" | "order" | "support" | "pipeline" | null;

interface Props {
  activeModal: ModalType;
  onClose: () => void;
}

const QuickActionModals = ({ activeModal, onClose }: Props) => {
  const [saving, setSaving] = useState(false);

  // RFQ form
  const [rfq, setRfq] = useState({ customer: "", service: "", material: "", quantity: "", notes: "" });
  // Order form
  const [order, setOrder] = useState({ id: "", part_name: "", customer: "", quantity: "", machine: "" });
  // Support form  
  const [ticket, setTicket] = useState({ subject: "", message: "", priority: "normal" });
  // Pipeline form
  const [lead, setLead] = useState({ company: "", contact_name: "", contact_email: "", value: "", stage: "prospect" });

  const inputCls = "w-full px-3 py-2 rounded-lg dark:bg-[#0F172A] bg-slate-50 border dark:border-[#334155] border-slate-200 text-sm dark:text-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0AA2CD] focus:ring-1 focus:ring-[#0AA2CD]/30";
  const labelCls = "text-[11px] font-bold dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-1 block";

  const handleSaveRfq = async () => {
    if (!rfq.customer.trim()) { toast.error("Müşteri adı zorunlu"); return; }
    setSaving(true);
    const id = `RFQ-${Date.now().toString(36).toUpperCase()}`;
    const { error } = await supabase.from("rfqs").insert({
      id, customer: rfq.customer, service: rfq.service, material: rfq.material,
      quantity: rfq.quantity ? parseInt(rfq.quantity) : null, notes: rfq.notes,
      status: "Yeni", date: new Date().toISOString().split("T")[0],
    });
    setSaving(false);
    if (error) { toast.error("Kayıt başarısız: " + error.message); return; }
    toast.success(`${id} oluşturuldu`);
    setRfq({ customer: "", service: "", material: "", quantity: "", notes: "" });
    onClose();
  };

  const handleSaveOrder = async () => {
    if (!order.id.trim() || !order.part_name.trim()) { toast.error("Sipariş No ve Parça Adı zorunlu"); return; }
    setSaving(true);
    const { error } = await supabase.from("orders").insert({
      id: order.id, part_name: order.part_name, customer: order.customer,
      quantity: order.quantity ? parseInt(order.quantity) : null, machine: order.machine,
      status: "Hazırlık", order_date: new Date().toISOString().split("T")[0],
    });
    setSaving(false);
    if (error) { toast.error("Kayıt başarısız: " + error.message); return; }
    toast.success(`Sipariş ${order.id} oluşturuldu`);
    setOrder({ id: "", part_name: "", customer: "", quantity: "", machine: "" });
    onClose();
  };

  const handleSaveTicket = async () => {
    if (!ticket.subject.trim() || !ticket.message.trim()) { toast.error("Konu ve mesaj zorunlu"); return; }
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { toast.error("Oturum bulunamadı"); setSaving(false); return; }
    const { error } = await supabase.from("support_tickets").insert({
      subject: ticket.subject, message: ticket.message, priority: ticket.priority,
      user_id: session.user.id,
    });
    setSaving(false);
    if (error) { toast.error("Kayıt başarısız: " + error.message); return; }
    toast.success("Destek talebi oluşturuldu");
    setTicket({ subject: "", message: "", priority: "normal" });
    onClose();
  };

  const handleSaveLead = async () => {
    if (!lead.company.trim()) { toast.error("Firma adı zorunlu"); return; }
    setSaving(true);
    const { error } = await supabase.from("pipeline_leads").insert({
      company: lead.company, contact_name: lead.contact_name, contact_email: lead.contact_email,
      value: lead.value ? parseFloat(lead.value) : 0, stage: lead.stage,
    });
    setSaving(false);
    if (error) { toast.error("Kayıt başarısız: " + error.message); return; }
    toast.success("Lead eklendi");
    setLead({ company: "", contact_name: "", contact_email: "", value: "", stage: "prospect" });
    onClose();
  };

  return (
    <>
      {/* RFQ Modal */}
      <Dialog open={activeModal === "rfq"} onOpenChange={(o) => !o && onClose()}>
        <DialogContent className="dark:bg-[#1E293B] bg-white dark:border-[#334155] border-slate-200 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 dark:text-white text-slate-800">
              <div className="w-8 h-8 rounded-lg bg-[#0AA2CD]/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#0AA2CD]" />
              </div>
              Hızlı Teklif Talebi
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div><label className={labelCls}>Müşteri *</label><input className={inputCls} value={rfq.customer} onChange={(e) => setRfq({ ...rfq, customer: e.target.value })} placeholder="Firma / kişi adı" /></div>
            <div><label className={labelCls}>Hizmet</label><input className={inputCls} value={rfq.service} onChange={(e) => setRfq({ ...rfq, service: e.target.value })} placeholder="CNC Frezeleme, Tornalama..." /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Malzeme</label><input className={inputCls} value={rfq.material} onChange={(e) => setRfq({ ...rfq, material: e.target.value })} placeholder="Al 6061, Çelik..." /></div>
              <div><label className={labelCls}>Adet</label><input className={inputCls} type="number" value={rfq.quantity} onChange={(e) => setRfq({ ...rfq, quantity: e.target.value })} placeholder="100" /></div>
            </div>
            <div><label className={labelCls}>Notlar</label><textarea className={`${inputCls} resize-none h-16`} value={rfq.notes} onChange={(e) => setRfq({ ...rfq, notes: e.target.value })} placeholder="Ek bilgi..." /></div>
          </div>
          <DialogFooter className="mt-4">
            <button onClick={onClose} className="px-4 py-2 text-xs font-bold dark:text-slate-400 text-slate-500 hover:text-[#0AA2CD]">İptal</button>
            <button onClick={handleSaveRfq} disabled={saving} className="px-5 py-2 rounded-lg bg-[#0AA2CD] text-white text-xs font-bold hover:bg-[#0AA2CD]/90 disabled:opacity-50 flex items-center gap-2">
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Kaydet
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Modal */}
      <Dialog open={activeModal === "order"} onOpenChange={(o) => !o && onClose()}>
        <DialogContent className="dark:bg-[#1E293B] bg-white dark:border-[#334155] border-slate-200 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 dark:text-white text-slate-800">
              <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 flex items-center justify-center">
                <Package className="w-4 h-4 text-[#F97316]" />
              </div>
              Hızlı Sipariş Ekle
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Sipariş No *</label><input className={inputCls} value={order.id} onChange={(e) => setOrder({ ...order, id: e.target.value })} placeholder="SP-001" /></div>
              <div><label className={labelCls}>Parça Adı *</label><input className={inputCls} value={order.part_name} onChange={(e) => setOrder({ ...order, part_name: e.target.value })} placeholder="Braket X" /></div>
            </div>
            <div><label className={labelCls}>Müşteri</label><input className={inputCls} value={order.customer} onChange={(e) => setOrder({ ...order, customer: e.target.value })} placeholder="Firma adı" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Adet</label><input className={inputCls} type="number" value={order.quantity} onChange={(e) => setOrder({ ...order, quantity: e.target.value })} placeholder="50" /></div>
              <div><label className={labelCls}>Makine</label><input className={inputCls} value={order.machine} onChange={(e) => setOrder({ ...order, machine: e.target.value })} placeholder="CNC-01" /></div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <button onClick={onClose} className="px-4 py-2 text-xs font-bold dark:text-slate-400 text-slate-500 hover:text-[#0AA2CD]">İptal</button>
            <button onClick={handleSaveOrder} disabled={saving} className="px-5 py-2 rounded-lg bg-[#F97316] text-white text-xs font-bold hover:bg-[#F97316]/90 disabled:opacity-50 flex items-center gap-2">
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Kaydet
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Support Ticket Modal */}
      <Dialog open={activeModal === "support"} onOpenChange={(o) => !o && onClose()}>
        <DialogContent className="dark:bg-[#1E293B] bg-white dark:border-[#334155] border-slate-200 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 dark:text-white text-slate-800">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Headphones className="w-4 h-4 text-purple-500" />
              </div>
              Destek Talebi Oluştur
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div><label className={labelCls}>Konu *</label><input className={inputCls} value={ticket.subject} onChange={(e) => setTicket({ ...ticket, subject: e.target.value })} placeholder="Talep konusu" /></div>
            <div>
              <label className={labelCls}>Öncelik</label>
              <select className={inputCls} value={ticket.priority} onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}>
                <option value="low">Düşük</option>
                <option value="normal">Normal</option>
                <option value="high">Yüksek</option>
                <option value="urgent">Acil</option>
              </select>
            </div>
            <div><label className={labelCls}>Mesaj *</label><textarea className={`${inputCls} resize-none h-24`} value={ticket.message} onChange={(e) => setTicket({ ...ticket, message: e.target.value })} placeholder="Detaylı açıklama..." /></div>
          </div>
          <DialogFooter className="mt-4">
            <button onClick={onClose} className="px-4 py-2 text-xs font-bold dark:text-slate-400 text-slate-500 hover:text-[#0AA2CD]">İptal</button>
            <button onClick={handleSaveTicket} disabled={saving} className="px-5 py-2 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-600/90 disabled:opacity-50 flex items-center gap-2">
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Gönder
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pipeline Lead Modal */}
      <Dialog open={activeModal === "pipeline"} onOpenChange={(o) => !o && onClose()}>
        <DialogContent className="dark:bg-[#1E293B] bg-white dark:border-[#334155] border-slate-200 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 dark:text-white text-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              Pipeline Lead Ekle
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div><label className={labelCls}>Firma *</label><input className={inputCls} value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} placeholder="Firma adı" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Yetkili</label><input className={inputCls} value={lead.contact_name} onChange={(e) => setLead({ ...lead, contact_name: e.target.value })} placeholder="İsim" /></div>
              <div><label className={labelCls}>E-posta</label><input className={inputCls} value={lead.contact_email} onChange={(e) => setLead({ ...lead, contact_email: e.target.value })} placeholder="email@..." /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Değer (₺)</label><input className={inputCls} type="number" value={lead.value} onChange={(e) => setLead({ ...lead, value: e.target.value })} placeholder="50000" /></div>
              <div>
                <label className={labelCls}>Aşama</label>
                <select className={inputCls} value={lead.stage} onChange={(e) => setLead({ ...lead, stage: e.target.value })}>
                  <option value="prospect">Prospect</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <button onClick={onClose} className="px-4 py-2 text-xs font-bold dark:text-slate-400 text-slate-500 hover:text-[#0AA2CD]">İptal</button>
            <button onClick={handleSaveLead} disabled={saving} className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-500/90 disabled:opacity-50 flex items-center gap-2">
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Kaydet
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickActionModals;
export type { ModalType };
