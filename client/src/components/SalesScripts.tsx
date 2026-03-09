import { BookOpen, ExternalLink } from "lucide-react";

const MASTER_DOC_URL =
  "https://docs.google.com/document/d/1_Cr_Kr0qvDPJ21bbo4YtBnGNESbJDRFzD4ZAq85U3ws/edit?usp=sharing";

const MASTER_DOC_EMBED =
  "https://docs.google.com/document/d/1_Cr_Kr0qvDPJ21bbo4YtBnGNESbJDRFzD4ZAq85U3ws/preview";

export default function SalesScripts() {
  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6" style={{ color: "var(--lp-pink)" }} />
            <h1 className="lp-section-title text-2xl">Master Doc</h1>
          </div>
          <a
            href={MASTER_DOC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: "var(--lp-pink)",
              color: "oklch(0.10 0.01 240)",
              textDecoration: "none",
            }}
          >
            <ExternalLink className="w-4 h-4" />
            Open in Google Docs
          </a>
        </div>
        <p className="text-sm" style={{ color: "var(--lp-text-mid)" }}>
          Your complete sales playbook — scripts, objection handlers, follow-ups, and more.
        </p>
      </div>

      {/* Embedded Google Doc */}
      <div
        className="flex-1 rounded-xl overflow-hidden"
        style={{
          border: "1px solid var(--lp-border)",
          minHeight: "600px",
        }}
      >
        <iframe
          src={MASTER_DOC_EMBED}
          title="Master Doc"
          width="100%"
          height="100%"
          style={{
            border: "none",
            minHeight: "600px",
            display: "block",
          }}
          allow="autoplay"
        />
      </div>

      <p
        className="mt-3 text-xs text-center"
        style={{ color: "var(--lp-text-muted)" }}
      >
        If the document doesn't load, click{" "}
        <a
          href={MASTER_DOC_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--lp-pink)", textDecoration: "underline" }}
        >
          Open in Google Docs
        </a>{" "}
        to view it directly.
      </p>
    </div>
  );
}
