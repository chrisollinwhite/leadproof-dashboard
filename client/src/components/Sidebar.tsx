import { useAuth } from "@/contexts/AuthContext";
import { Section } from "@/pages/Dashboard";
import {
  Code2,
  PlayCircle,
  FileText,
  BarChart3,
  ExternalLink,
  LogOut,
  Zap,
} from "lucide-react";

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const navItems: { id: Section; label: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }[] = [
  { id: "builder", label: "Website Builder", icon: Code2 },
  { id: "training", label: "Training Videos", icon: PlayCircle },
  { id: "scripts", label: "Sales Scripts", icon: FileText },
  { id: "stats", label: "Daily Stats", icon: BarChart3 },
  { id: "links", label: "Quick Links", icon: ExternalLink },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { logout } = useAuth();

  return (
    <div
      className="h-full flex flex-col border-r"
      style={{
        background: "var(--lp-navy)",
        borderColor: "oklch(1 0 0 / 8%)",
        width: "256px",
      }}
    >
      {/* Logo */}
      <div className="px-5 py-6 border-b" style={{ borderColor: "oklch(1 0 0 / 8%)" }}>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
            style={{ background: "var(--lp-orange)" }}
          >
            <Zap className="w-5 h-5" style={{ color: "oklch(0.10 0.01 240)" }} />
          </div>
          <div>
            <div
              className="text-sm font-black leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--lp-white)" }}
            >
              LeadProof
            </div>
            <div className="text-xs" style={{ color: "var(--lp-slate-light)" }}>
              Sales Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="mb-3">
          <span
            className="px-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--lp-slate)", fontFamily: "Montserrat, sans-serif" }}
          >
            Tools
          </span>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`lp-nav-item w-full text-left ${isActive ? "active" : ""}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              {item.id === "builder" && (
                <span
                  className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "var(--lp-orange-glow)",
                    color: "var(--lp-orange)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  CORE
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t" style={{ borderColor: "oklch(1 0 0 / 8%)" }}>
        <button
          onClick={logout}
          className="lp-nav-item w-full text-left"
          style={{ color: "oklch(0.65 0.15 27)" }}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sign Out</span>
        </button>
        <div
          className="mt-4 px-3 py-2 rounded-lg text-xs"
          style={{
            background: "oklch(1 0 0 / 4%)",
            color: "var(--lp-slate)",
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: "var(--lp-orange)", fontWeight: 700 }}>LeadProof</span> Websites
          <br />Internal Team Tool
        </div>
      </div>
    </div>
  );
}
