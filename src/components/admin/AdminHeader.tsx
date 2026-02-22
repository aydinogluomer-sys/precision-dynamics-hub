import { Search, Bell, Download, Menu, Activity, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const tabTitles: Record<string, string> = {
  dashboard: "Kontrol Paneli",
  rfq: "Talep Merkezi",
  orders: "Üretim Günlüğü",
  wbs: "İş Akış Hattı",
  scheduling: "Kaynak Yerleşimi",
  financial: "Finansal Analitik",
  pipeline: "Satış Pipeline",
  tpm: "TPM & Bakım",
  inventory: "Envanter & Takım",
  financedocs: "Nakit Akışı",
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
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="h-14 border-b border-[#334155] dark:bg-[#0F172A] bg-white flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button onClick={onToggleSidebar} className="text-slate-400 hover:text-white lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="font-black dark:text-white text-slate-800 text-xs sm:text-sm tracking-wider uppercase truncate">
          {tabTitles[activeTab] || "Dashboard"}
        </h2>
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 tracking-wider">SİSTEM ÇEVRİMİÇİ</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Ara..."
            className="pl-9 pr-4 py-1.5 rounded-lg dark:bg-[#1E293B] bg-slate-100 border dark:border-[#334155] border-slate-200 text-sm dark:text-white text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-[#0AA2CD] w-48"
          />
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-1.5 rounded-lg dark:text-slate-400 text-slate-500 hover:text-[#0AA2CD] dark:hover:bg-[#1E293B] hover:bg-slate-100 transition-colors"
          title={darkMode ? "Aydınlık Mod" : "Karanlık Mod"}
        >
          {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>
        <button className="relative dark:text-slate-400 text-slate-500 hover:text-[#0AA2CD]">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <button
          onClick={onExportCSV}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0AA2CD]/10 text-[#0AA2CD] text-xs font-bold hover:bg-[#0AA2CD]/20 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Rapor Al
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
