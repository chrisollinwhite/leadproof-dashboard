import { ExternalLink, Monitor, BookOpen, HelpCircle, Globe, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string | null;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  badge?: string;
  placeholder?: boolean;
}

const links: LinkItem[] = [
  {
    id: "crm",
    title: "Login to CRM",
    description: "Access your GoHighLevel dashboard to manage leads, pipelines, and follow-ups.",
    url: "https://app.gohighlevel.com",
    icon: Monitor,
    color: "var(--lp-pink)",
    badge: "GoHighLevel",
  },
  {
    id: "website",
    title: "LeadProof Website",
    description: "Visit the main LeadProof Websites marketing site.",
    url: "https://www.leadproofwebsites.com",
    icon: Globe,
    color: "oklch(0.72 0.18 260)",
    badge: "Public Site",
  },
  {
    id: "manus",
    title: "Build in Manus AI",
    description: "Open Manus to build a new custom website or a new niche template.",
    url: "https://manus.im",
    icon: BookOpen,
    color: "oklch(0.72 0.15 145)",
    badge: "AI Builder",
  },
  {
    id: "support",
    title: "Submit a Support Ticket",
    description: "Having an issue with the dashboard or a client website? Let the team know.",
    url: null,
    icon: HelpCircle,
    color: "oklch(0.75 0.2 60)",
    badge: "Coming Soon",
    placeholder: true,
  },
  {
    id: "chat",
    title: "Team Chat",
    description: "Connect with your team lead or other reps for help and motivation.",
    url: null,
    icon: MessageSquare,
    color: "oklch(0.72 0.18 320)",
    badge: "Coming Soon",
    placeholder: true,
  },
];

export default function QuickLinks() {
  const handleClick = (link: LinkItem) => {
    if (link.placeholder || !link.url) {
      toast.info("This link will be configured by your admin soon.");
      return;
    }
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ExternalLink className="w-6 h-6" style={{ color: "var(--lp-pink)" }} />
          <h1 className="lp-section-title text-2xl">Quick Links</h1>
        </div>
        <p className="text-sm" style={{ color: "var(--lp-text-mid)" }}>
          Everything you need, one tap away. No more hunting for URLs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map(link => {
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              onClick={() => handleClick(link)}
              className="lp-card p-5 text-left group transition-all hover:scale-[1.01]"
              style={{
                opacity: link.placeholder ? 0.6 : 1,
                cursor: link.placeholder ? "default" : "pointer",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 transition-all"
                  style={{
                    background: `${link.color}20`,
                    border: `1px solid ${link.color}40`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: link.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-bold text-sm"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "var(--lp-text)" }}
                    >
                      {link.title}
                    </span>
                    {link.badge && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: link.placeholder ? "oklch(1 0 0 / 6%)" : `${link.color}20`,
                          color: link.placeholder ? "var(--lp-slate)" : link.color,
                          border: `1px solid ${link.placeholder ? "oklch(1 0 0 / 10%)" : `${link.color}30`}`,
                          fontSize: "0.65rem",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--lp-text-mid)" }}>
                    {link.description}
                  </p>
                </div>
                {!link.placeholder && (
                  <ExternalLink
                    className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--lp-text-muted)" }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="mt-6 p-4 rounded-lg"
        style={{
          background: "oklch(0.68 0.195 42 / 0.06)",
          border: "1px dashed oklch(0.68 0.195 42 / 0.3)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--lp-text-mid)" }}>
          <span style={{ color: "var(--lp-pink)", fontWeight: 700 }}>Need a link added?</span>{" "}
          Contact your team lead and they can add it to this page for the whole team.
        </p>
      </div>
    </div>
  );
}
