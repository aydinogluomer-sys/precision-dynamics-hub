import { Search, Bell, Download, Menu, Activity } from "lucide-react";

const tabTitles: Record<string, string> = {
  dashboard: "Kontrol Paneli",
  rfq: "Talep Merkezi",
  orders: "Üretim Günlüğü",
  wbs: "İş Akış Hattı",
  scheduling: "Kaynak Yerleşimi",
  issues: "Olay Merkezi",
  customers: "Çözüm Ortakları",
  settings: "Sistem Ayarları",
};

interface Props {
  activeTab: string;
  onToggleSidebar: () => void;
  onExportCSV: () => void;
}

const AdminHeader = ({ activeTab, onToggleSidebar, onExportCSV }: Props) => {
  return (
    <header className="h-14 border-b border-[#334155] bg-[#0F172A] flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="text-slate-400 hover:text-white lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="font-black text-white text-sm tracking-wider uppercase">
          {tabTitles[activeTab] || "Dashboard"}
        </h2>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 tracking-wider">SİSTEM ÇEVRİMİÇİ</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Ara..."
            className="pl-9 pr-4 py-1.5 rounded-lg bg-[#1E293B] border border-[#334155] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0AA2CD] w-48"
          />
        </div>
        <button className="relative text-slate-400 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <button
          onClick={onExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0AA2CD]/10 text-[#0AA2CD] text-xs font-bold hover:bg-[#0AA2CD]/20 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Rapor Al
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
