import { 
  LayoutDashboard, FileText, Package, GitBranch, CalendarDays, 
  AlertTriangle, Users, Settings, LogOut, Cpu
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Kontrol Paneli", icon: LayoutDashboard },
  { id: "rfq", label: "Talep Merkezi", icon: FileText },
  { id: "orders", label: "Üretim Günlüğü", icon: Package },
  { id: "wbs", label: "İş Akış Hattı", icon: GitBranch },
  { id: "scheduling", label: "Kaynak Yerleşimi", icon: CalendarDays },
  { id: "issues", label: "Olay Merkezi", icon: AlertTriangle },
  { id: "customers", label: "Çözüm Ortakları", icon: Users },
  { id: "settings", label: "Sistem Ayarları", icon: Settings },
];

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
  userEmail: string;
  onLogout: () => void;
}

const AdminSidebar = ({ activeTab, onTabChange, collapsed, userEmail, onLogout }: Props) => {
  return (
    <aside className={`${collapsed ? "w-16" : "w-64"} bg-[#0F172A] border-r border-[#334155] flex flex-col transition-all duration-300 shrink-0`}>
      {/* Logo */}
      <div className="p-4 border-b border-[#334155] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#0AA2CD]/20 flex items-center justify-center shrink-0">
          <Cpu className="w-5 h-5 text-[#0AA2CD]" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-black text-white text-sm tracking-widest">NEXUS</h1>
            <p className="text-[9px] text-slate-500 tracking-wider">v2.4 • MAS TECHNIC</p>
          </div>
        )}
      </div>

      {/* Menu */}
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
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0AA2CD]/20 flex items-center justify-center text-[#0AA2CD] font-bold text-xs shrink-0">
            {userEmail.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{userEmail}</p>
              <p className="text-[10px] text-slate-500">Yönetici</p>
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

export default AdminSidebar;
