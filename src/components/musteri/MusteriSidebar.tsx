import {
  LayoutDashboard, FileText, Package, Factory, FolderArchive,
  ShieldCheck, DollarSign, CreditCard, MessageSquare, LogOut
} from "lucide-react";
import masLogo from "@/assets/mas-technic-logo.png";

const menuItems = [
  { id: "genel", label: "Genel Bakış", icon: LayoutDashboard },
  { id: "teklifler", label: "Tekliflerim", icon: FileText },
  { id: "siparisler", label: "Siparişlerim", icon: Package },
  { id: "uretim", label: "Üretim Takip", icon: Factory },
  { id: "arsiv", label: "Teknik Arşiv", icon: FolderArchive },
  { id: "kalite", label: "Kalite Raporları", icon: ShieldCheck },
  { id: "finans", label: "Finans", icon: DollarSign },
  { id: "odeme", label: "Ödeme", icon: CreditCard },
  { id: "destek", label: "Destek", icon: MessageSquare },
];

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  displayName: string;
  userEmail: string;
  onLogout: () => void;
}

const MusteriSidebar = ({ activeTab, onTabChange, collapsed, displayName, userEmail, onLogout }: Props) => {
  return (
    <aside className={`${collapsed ? "w-0 lg:w-16 overflow-hidden" : "w-64"} dark:bg-[#0F172A] bg-white border-r dark:border-[#334155] border-slate-200 flex flex-col transition-all duration-300 shrink-0 fixed lg:relative inset-y-0 left-0 z-40 ${collapsed ? "lg:overflow-visible" : ""}`}>
      {/* Brand */}
      <div className="p-4 border-b dark:border-[#334155] border-slate-200 flex items-center gap-3">
        <img src={masLogo} alt="MAS TECHNIC" className="w-9 h-9 rounded-xl object-contain shrink-0" />
        {!collapsed && (
          <div>
            <h1 className="font-black dark:text-white text-slate-800 text-sm tracking-widest">MAS TECHNIC</h1>
            <p className="text-[9px] text-slate-500 tracking-wider">MÜŞTERİ PORTALI</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
        {menuItems.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? "bg-[#0AA2CD]/10 text-[#0AA2CD] border-l-4 border-[#0AA2CD] pl-2"
                  : "dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-slate-800 dark:hover:bg-white/5 hover:bg-slate-100"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t dark:border-[#334155] border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0AA2CD]/20 flex items-center justify-center text-[#0AA2CD] font-bold text-xs shrink-0">
            {displayName.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium dark:text-white text-slate-800 truncate">{displayName}</p>
              <p className="text-[10px] text-slate-500 truncate">{userEmail}</p>
            </div>
          )}
          <button onClick={onLogout} className="text-slate-500 hover:text-red-400 transition-colors shrink-0">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default MusteriSidebar;
