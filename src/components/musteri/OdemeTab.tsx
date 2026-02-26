import { CreditCard } from "lucide-react";

const OdemeTab = () => (
  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
    <CreditCard size={40} className="mb-3 opacity-30" />
    <p className="text-sm font-medium">Ödeme takibi yakında aktif olacak.</p>
    <p className="text-xs mt-1">Fatura ve ödeme durumlarınızı bu sekmeden takip edebileceksiniz.</p>
  </div>
);

export default OdemeTab;
