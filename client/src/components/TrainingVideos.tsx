import { useState } from "react";
import { PlayCircle, Lock } from "lucide-react";

const categories = [
  { id: "all", label: "All Videos" },
  { id: "pitch", label: "The Pitch" },
  { id: "objections", label: "Objections" },
  { id: "demo", label: "Demo & Close" },
  { id: "followup", label: "Follow-Up" },
];

const videos = [
  {
    id: 1,
    title: "The LeadProof Pitch — Full Walkthrough",
    description: "Complete door-to-door and cold call pitch from intro to demo request.",
    category: "pitch",
    duration: "12:34",
    placeholder: true,
  },
  {
    id: 2,
    title: "Handling 'I Already Have a Website'",
    description: "The most common objection. Here's exactly how to pivot and keep the conversation going.",
    category: "objections",
    duration: "8:15",
    placeholder: true,
  },
  {
    id: 3,
    title: "Live Demo Walkthrough — Plumbing Vintage",
    description: "How to show the mock website on your phone and get the business owner excited.",
    category: "demo",
    duration: "15:02",
    placeholder: true,
  },
  {
    id: 4,
    title: "Handling 'I Need to Think About It'",
    description: "Turn the slow no into a yes. Follow-up scripts and timing strategies.",
    category: "objections",
    duration: "6:48",
    placeholder: true,
  },
  {
    id: 5,
    title: "The 3-Day Follow-Up Sequence",
    description: "Exact texts and calls to send after the first meeting to close the deal.",
    category: "followup",
    duration: "9:20",
    placeholder: true,
  },
  {
    id: 6,
    title: "Closing the Deal — Trial Close Techniques",
    description: "Assumptive closes, trial closes, and how to ask for the credit card.",
    category: "demo",
    duration: "11:05",
    placeholder: true,
  },
];

export default function TrainingVideos() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? videos
    : videos.filter(v => v.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <PlayCircle className="w-6 h-6" style={{ color: "var(--lp-orange)" }} />
          <h1 className="lp-section-title text-2xl">Training Videos</h1>
        </div>
        <p className="text-sm" style={{ color: "var(--lp-slate-light)" }}>
          Watch these before your first day in the field. New videos added regularly.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              background: activeCategory === cat.id ? "var(--lp-orange)" : "oklch(1 0 0 / 6%)",
              color: activeCategory === cat.id ? "oklch(0.10 0.01 240)" : "var(--lp-slate-light)",
              border: `1px solid ${activeCategory === cat.id ? "transparent" : "oklch(1 0 0 / 10%)"}`,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(video => (
          <div
            key={video.id}
            className="lp-card p-5 group cursor-pointer transition-all hover:border-orange-500/30"
            style={{ borderColor: "oklch(1 0 0 / 8%)" }}
          >
            {/* Thumbnail placeholder */}
            <div
              className="relative rounded-lg mb-4 overflow-hidden flex items-center justify-center"
              style={{
                background: "oklch(1 0 0 / 5%)",
                height: "140px",
                border: "1px solid oklch(1 0 0 / 8%)",
              }}
            >
              <div
                className="flex flex-col items-center gap-2"
                style={{ color: "var(--lp-slate)" }}
              >
                <Lock className="w-8 h-8" />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Video Coming Soon
                </span>
              </div>
              <div
                className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-mono font-bold"
                style={{ background: "oklch(0 0 0 / 0.6)", color: "var(--lp-white)" }}
              >
                {video.duration}
              </div>
            </div>

            <h3
              className="font-bold text-sm mb-1 leading-snug"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--lp-white)" }}
            >
              {video.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lp-slate-light)" }}>
              {video.description}
            </p>

            <div className="flex items-center justify-between mt-3">
              <span
                className="lp-badge"
                style={{
                  background: "oklch(1 0 0 / 6%)",
                  color: "var(--lp-slate-light)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                  fontSize: "0.65rem",
                }}
              >
                {categories.find(c => c.id === video.category)?.label}
              </span>
              <span className="text-xs" style={{ color: "var(--lp-slate)" }}>
                {video.duration}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-6 p-4 rounded-lg text-center"
        style={{
          background: "oklch(0.68 0.195 42 / 0.06)",
          border: "1px dashed oklch(0.68 0.195 42 / 0.3)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--lp-slate-light)" }}>
          <span style={{ color: "var(--lp-orange)", fontWeight: 700 }}>Videos will be added here</span> as training content is recorded.
          Contact your team lead to request specific topics.
        </p>
      </div>
    </div>
  );
}
