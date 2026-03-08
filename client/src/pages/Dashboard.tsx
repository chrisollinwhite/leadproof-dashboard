import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import WebsiteBuilder from "@/components/WebsiteBuilder";
import TrainingVideos from "@/components/TrainingVideos";
import SalesScripts from "@/components/SalesScripts";
import DailyStats from "@/components/DailyStats";
import QuickLinks from "@/components/QuickLinks";
import { Menu, X } from "lucide-react";

export type Section = "builder" | "training" | "scripts" | "stats" | "links";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>("builder");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "builder": return <WebsiteBuilder />;
      case "training": return <TrainingVideos />;
      case "scripts": return <SalesScripts />;
      case "stats": return <DailyStats />;
      case "links": return <QuickLinks />;
      default: return <WebsiteBuilder />;
    }
  };

  return (
    <div className="flex min-h-screen" style={{ background: "var(--lp-navy-deep)" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "oklch(0 0 0 / 0.6)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          activeSection={activeSection}
          onSectionChange={(s: Section) => {
            setActiveSection(s);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div
          className="lg:hidden flex items-center justify-between px-4 py-3 border-b"
          style={{ background: "var(--lp-navy)", borderColor: "oklch(1 0 0 / 8%)" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg"
            style={{ color: "var(--lp-white)" }}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-black"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--lp-orange)" }}
            >
              LeadProof
            </span>
            <span className="text-sm font-semibold" style={{ color: "var(--lp-white)" }}>
              Dashboard
            </span>
          </div>
          <div className="w-9" />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
