import { useAuth } from "@/contexts/AuthContext";
import { Section } from "@/pages/Dashboard";
import {
  Code2,
  PlayCircle,
  BookOpen,
  BarChart3,
  ExternalLink,
  LogOut,
  Zap,
  ClipboardList,
  CreditCard,
} from "lucide-react";

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

type NavItem = {
  id: Section;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  badge?: string;
  badgeColor?: string;
};

const toolsItems: NavItem[] = [
  { id: "builder", label: "Website Builder", icon: Code2, badge: "CORE" },
  { id: "training", label: "Training Videos", icon: PlayCircle },
  { id: "scripts", label: "Master Doc", icon: BookOpen },
  { id: "stats", label: "Daily Stats", icon: BarChart3 },
  { id: "links", label: "Quick Links", icon: ExternalLink },
];

const closingItems: NavItem[] = [
  { id: "notes", label: "Client Notes", icon: ClipboardList },
  { id: "payment", label: "Collect Payment", icon: CreditCard, badge: "SETUP", badgeColor: "oklch(0.72 0.18 260)" },
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
            style={{ background: "var(--lp-pink)" }}
          >
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div
              className="text-sm font-black leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif", color: "oklch(0.97 0.005 240)" }}
            >
              LeadProof
            </div>
            <div className="text-xs" style={{ color: "oklch(0.72 0.012 240)" }}>
              Team Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="mb-3">
          <span
            className="px-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.55 0.015 240)", fontFamily: "Montserrat, sans-serif" }}
          >
            Tools
          </span>
        </div>
        <div className="space-y-1 mb-5">
          {toolsItems.map((item) => {
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
                {item.badge && (
                  <span
                    className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--lp-pink-glow)",
                      color: "var(--lp-pink)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mb-3 pt-2 border-t" style={{ borderColor: "oklch(1 0 0 / 8%)" }}>
          <span
            className="px-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.55 0.015 240)", fontFamily: "Montserrat, sans-serif" }}
          >
            Closing
          </span>
        </div>
        <div className="space-y-1">
          {closingItems.map((item) => {
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
                {item.badge && (
                  <span
                    className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${item.badgeColor || "var(--lp-pink)"}20`,
                      color: item.badgeColor || "var(--lp-pink)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.06em",
                      border: `1px solid ${item.badgeColor || "var(--lp-pink)"}40`,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
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
            color: "oklch(0.65 0.012 240)",
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: "var(--lp-pink)", fontWeight: 700 }}>LeadProof</span> Websites
          <br />Internal Team Tool
        </div>
      </div>
    </div>
  );
}
