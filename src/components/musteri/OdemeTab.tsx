import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, CreditCard, AlertCircle, Landmark, FileCheck, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Payment {
  id: string;
  doc_number: string | null;
  title: string | null;
  total_amount: number | null;
  currency: string | null;
  payment_status: string | null;
  due_date: string | null;
  doc_date: string | null;
}

const statusColor = (s: string | null) => {
  switch (s) {
    case "ödendi": return "bg-green-500/10 text-green-600 border-green-200";
    case "kısmi": return "bg-amber-500/10 text-amber-600 border-amber-200";
    default: return "bg-red-500/10 text-red-600 border-red-200";
  }
};
const statusLabel = (s: string | null) => {
  switch (s) {
    case "ödendi": return "Ödendi";
    case "kısmi": return "Kısmi";
    default: return "Ödenmedi";
  }
};

const BANK_ACCOUNTS = [
  { bank: "Ziraat Bankası", iban: "TR00 0000 0000 0000 0000 0000 01", branch: "Ankara Şubesi" },
  { bank: "İş Bankası", iban: "TR00 0000 0000 0000 0000 0000 02", branch: "OSB Şubesi" },
];

const OdemeTab = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "havale" | "cek" | null>(null);
  const [showMethodDialog, setShowMethodDialog] = useState(false);
  const [showHavaleDialog, setShowHavaleDialog] = useState(false);
  const [showCekDialog, setShowCekDialog] = useState(false);
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("financial_documents")
        .select("id, doc_number, title, total_amount, currency, payment_status, due_date, doc_date")
        .order("due_date", { ascending: true });
      setPayments((data as Payment[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  const handlePayClick = (p: Payment) => {
    setSelectedPayment(p);
    setPaymentMethod(null);
    setShowMethodDialog(true);
  };

  const handleMethodSelect = () => {
    setShowMethodDialog(false);
    if (paymentMethod === "card") {
      setShowCardDialog(true);
    } else if (paymentMethod === "havale") {
      setShowHavaleDialog(true);
    } else if (paymentMethod === "cek") {
      setShowCekDialog(true);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""));
    setCopied(id);
    toast.success("IBAN kopyalandı");
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={24} /></div>;

  const unpaid = payments.filter(p => p.payment_status !== "ödendi");
  const paid = payments.filter(p => p.payment_status === "ödendi");
  const totalUnpaid = unpaid.reduce((a, p) => a + (p.total_amount || 0), 0);
  const totalPaid = paid.reduce((a, p) => a + (p.total_amount || 0), 0);

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <CreditCard size={40} className="mb-3 opacity-30" />
        <p className="text-sm font-medium">Henüz ödeme kaydı bulunmuyor.</p>
        <p className="text-xs mt-1">Fatura ve ödeme durumlarınızı bu sekmeden takip edebileceksiniz.</p>
      </div>
    );
  }

  const isOverdue = (due: string | null) => {
    if (!due) return false;
    return new Date(due) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-background border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Toplam Ödeme</p>
          <p className="text-xl font-bold font-mono mt-1">{payments.length} adet</p>
        </div>
        <div className="bg-background border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Ödenen Toplam</p>
          <p className="text-xl font-bold font-mono mt-1 text-green-600">₺{totalPaid.toLocaleString("tr-TR")}</p>
        </div>
        <div className="bg-background border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Bekleyen Borç</p>
          <p className="text-xl font-bold font-mono mt-1 text-red-600">₺{totalUnpaid.toLocaleString("tr-TR")}</p>
        </div>
      </div>

      {/* Overdue warning */}
      {unpaid.some(p => isOverdue(p.due_date)) && (
        <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive p-3 text-sm">
          <AlertCircle size={16} />
          <span>Vadesi geçmiş ödemeniz bulunmaktadır.</span>
        </div>
      )}

      {/* Payment list */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
              <th className="pb-3 pr-4">Belge No</th>
              <th className="pb-3 pr-4">Açıklama</th>
              <th className="pb-3 pr-4">Fatura Tarihi</th>
              <th className="pb-3 pr-4">Vade</th>
              <th className="pb-3 pr-4 text-right">Tutar</th>
              <th className="pb-3 pr-4">Durum</th>
              <th className="pb-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id} className={`border-b border-border/50 last:border-0 ${p.payment_status !== "ödendi" && isOverdue(p.due_date) ? "bg-destructive/5" : ""}`}>
                <td className="py-3 pr-4 font-mono text-xs">{p.doc_number || p.id.slice(0, 8)}</td>
                <td className="py-3 pr-4">{p.title || "—"}</td>
                <td className="py-3 pr-4 text-muted-foreground">{p.doc_date || "—"}</td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {p.due_date || "—"}
                  {p.payment_status !== "ödendi" && isOverdue(p.due_date) && (
                    <span className="ml-1 text-destructive text-[10px] font-semibold">GECİKMİŞ</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-right font-mono font-semibold">
                  ₺{(p.total_amount || 0).toLocaleString("tr-TR")}
                </td>
                <td className="py-3 pr-4">
                  <Badge variant="outline" className={statusColor(p.payment_status)}>
                    {statusLabel(p.payment_status)}
                  </Badge>
                </td>
                <td className="py-3">
                  {p.payment_status !== "ödendi" ? (
                    <Button size="sm" variant="outline" onClick={() => handlePayClick(p)} className="text-xs">
                      Öde
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Method Selection Dialog */}
      <Dialog open={showMethodDialog} onOpenChange={setShowMethodDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ödeme Yöntemi Seçin</DialogTitle>
            <DialogDescription>
              {selectedPayment?.doc_number || ""} — ₺{(selectedPayment?.total_amount || 0).toLocaleString("tr-TR")}
            </DialogDescription>
          </DialogHeader>
          <RadioGroup value={paymentMethod || ""} onValueChange={(v) => setPaymentMethod(v as "card" | "havale" | "cek")} className="space-y-3 mt-2">
            <label className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors">
              <RadioGroupItem value="card" id="card" />
              <CreditCard size={18} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Kredi / Banka Kartı</p>
                <p className="text-xs text-muted-foreground">Visa, Mastercard — Stripe ile güvenli ödeme</p>
              </div>
            </label>
            <label className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors">
              <RadioGroupItem value="havale" id="havale" />
              <Landmark size={18} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Havale / EFT</p>
                <p className="text-xs text-muted-foreground">Banka hesap bilgilerini görüntüle</p>
              </div>
            </label>
            <label className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors">
              <RadioGroupItem value="cek" id="cek" />
              <FileCheck size={18} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Çek</p>
                <p className="text-xs text-muted-foreground">Çek bilgilerinizi bildirin</p>
              </div>
            </label>
          </RadioGroup>
          <Button className="w-full mt-4" disabled={!paymentMethod} onClick={handleMethodSelect}>
            Devam Et
          </Button>
        </DialogContent>
      </Dialog>

      {/* Card Payment Dialog (Stripe - placeholder) */}
      <Dialog open={showCardDialog} onOpenChange={setShowCardDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Kart ile Ödeme</DialogTitle>
            <DialogDescription>
              {selectedPayment?.doc_number || ""} — ₺{(selectedPayment?.total_amount || 0).toLocaleString("tr-TR")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 border border-border p-3">
              <AlertCircle size={14} />
              <span>Stripe entegrasyonu yakında aktif olacaktır. Şu an için havale veya çek ile ödeme yapabilirsiniz.</span>
            </div>
            <div className="flex gap-2">
              <img src="https://cdn.jsdelivr.net/gh/nicepay-dev/nicepay-assets/img/visa.svg" alt="Visa" className="h-8 opacity-40" />
              <img src="https://cdn.jsdelivr.net/gh/nicepay-dev/nicepay-assets/img/mastercard.svg" alt="Mastercard" className="h-8 opacity-40" />
            </div>
            <Button variant="outline" className="w-full" onClick={() => { setShowCardDialog(false); setShowMethodDialog(true); }}>
              Geri Dön
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Havale/EFT Dialog */}
      <Dialog open={showHavaleDialog} onOpenChange={setShowHavaleDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Havale / EFT Bilgileri</DialogTitle>
            <DialogDescription>
              Aşağıdaki hesaplardan birine ödemenizi yapabilirsiniz. Açıklama kısmına fatura numaranızı eklemeyi unutmayın.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="bg-muted/30 border border-border p-3 text-sm">
              <span className="font-medium">Fatura:</span> {selectedPayment?.doc_number || selectedPayment?.id.slice(0, 8)} — <span className="font-mono font-semibold">₺{(selectedPayment?.total_amount || 0).toLocaleString("tr-TR")}</span>
            </div>
            {BANK_ACCOUNTS.map((acc, i) => (
              <div key={i} className="border border-border p-4 space-y-2">
                <p className="font-semibold text-sm">{acc.bank}</p>
                <p className="text-xs text-muted-foreground">{acc.branch}</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 flex-1 font-mono">{acc.iban}</code>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(acc.iban, `iban-${i}`)}>
                    {copied === `iban-${i}` ? <CheckCircle2 size={14} className="text-green-600" /> : <Copy size={14} />}
                  </Button>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">Havale yaptıktan sonra dekontunuzu Destek sekmesinden iletebilirsiniz.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Çek Dialog */}
      <Dialog open={showCekDialog} onOpenChange={setShowCekDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Çek ile Ödeme</DialogTitle>
            <DialogDescription>
              Çek bilgilerinizi aşağıya girin. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="bg-muted/30 border border-border p-3 text-sm">
              <span className="font-medium">Fatura:</span> {selectedPayment?.doc_number || selectedPayment?.id.slice(0, 8)} — <span className="font-mono font-semibold">₺{(selectedPayment?.total_amount || 0).toLocaleString("tr-TR")}</span>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Çek Numarası</Label>
              <Input placeholder="Çek seri numarası" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Banka</Label>
              <Input placeholder="Çeki düzenleyen banka" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Vade Tarihi</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Tutar (₺)</Label>
              <Input type="number" defaultValue={selectedPayment?.total_amount || 0} />
            </div>
            <Button className="w-full" onClick={() => { setShowCekDialog(false); toast.success("Çek bilgileriniz iletildi. Ekibimiz sizinle iletişime geçecektir."); }}>
              Çek Bilgilerini Gönder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OdemeTab;
