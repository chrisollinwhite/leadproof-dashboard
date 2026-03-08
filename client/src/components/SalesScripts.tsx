import { useState } from "react";
import { FileText, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface Script {
  id: string;
  title: string;
  type: string;
  content: string;
}

const scripts: Script[] = [
  {
    id: "cold-door",
    title: "Door Knock Opening",
    type: "Cold Outreach",
    content: `Hey, how are you doing? My name is [YOUR NAME] — I work with LeadProof Websites. We specialize in building high-converting websites specifically for [NICHE] businesses in [CITY].

I was actually just in the area and pulled up your business online — I noticed you either don't have a website, or the one you have isn't really set up to bring in new customers from Google.

I actually built a free mock-up of what your website could look like — it takes about 60 seconds to show you on my phone. Would you mind taking a quick look?

[SHOW THE MOCK WEBSITE]

So what we do is build the full homepage, get it ranking on Google, and set it up so when someone searches "[NICHE] near me" — your business shows up. Most of our clients start seeing calls within the first 30 days.

We're running a special right now for businesses in [CITY] — I can get you started for just [PRICE]. Does that sound like something that would make sense for your business?`,
  },
  {
    id: "cold-call",
    title: "Cold Call Script",
    type: "Cold Outreach",
    content: `Hi, is this [OWNER NAME]? 

Hey [OWNER NAME], this is [YOUR NAME] calling from LeadProof Websites. I'll be quick — I was actually looking up [NICHE] businesses in [CITY] and I noticed your business came up, but your website either isn't showing up on Google or it's not set up to convert visitors into calls.

I actually put together a free mock-up of what a high-converting website would look like for your business. I can send it to you right now — takes 30 seconds to look at.

Can I text it to you real quick?

[SEND THE MOCK LINK / SCREENSHOT]

So what I do is build the full homepage, optimize it for Google, and set it up so when someone in [CITY] searches for a [NICHE], your business is the first thing they see. Most clients start getting calls within 30 days.

I'm running a special for [CITY] businesses right now — I can get you set up for [PRICE]. Does that work for you?`,
  },
  {
    id: "objection-website",
    title: "\"I Already Have a Website\"",
    type: "Objection Handler",
    content: `That's great — can I ask, is it bringing you new customers every month?

[PAUSE — let them answer]

Yeah, that's the thing — most websites look decent but aren't actually set up to rank on Google or convert visitors into calls. There's a big difference between a website that exists and a website that works.

What I built for you is specifically designed to rank for "[NICHE] near me" searches in [CITY] and get people to call you. It's not just a pretty page — it's a lead generation machine.

Can I show you the mock-up real quick? It'll take 60 seconds and you'll see exactly what I mean.`,
  },
  {
    id: "objection-think",
    title: "\"I Need to Think About It\"",
    type: "Objection Handler",
    content: `Totally understand — what specifically do you need to think about? Is it the price, the timing, or something else?

[LISTEN]

[If price:] I get it. Here's the thing — every day you don't have this up, someone in [CITY] is searching for a [NICHE] and calling your competitor instead. This pays for itself with one or two new customers.

[If timing:] I can get this live within 48 hours. You don't have to do anything — I handle everything. The only thing you need to do right now is say yes.

[If unsure:] What would make this a no-brainer for you? Let me see if I can make that happen.

What do you say — can we get you started today?`,
  },
  {
    id: "followup-text",
    title: "Follow-Up Text (Day 1)",
    type: "Follow-Up",
    content: `Hey [OWNER NAME], this is [YOUR NAME] from LeadProof Websites — we spoke earlier today about getting your business ranking on Google in [CITY].

I wanted to send over the mock-up I showed you so you can take another look: [MOCK WEBSITE LINK]

This is exactly what your homepage would look like. I can have the real version live within 48 hours.

Let me know if you have any questions — happy to jump on a quick call.`,
  },
  {
    id: "followup-day3",
    title: "Follow-Up Text (Day 3)",
    type: "Follow-Up",
    content: `Hey [OWNER NAME] — [YOUR NAME] again from LeadProof.

Just checking in on the website mock-up I sent over. I have a spot open this week to get your site live before the weekend.

Quick question — is the price the only thing holding you back, or is there something else I can help clarify?

Either way, I want to make sure you're not losing customers to competitors who already have their site set up. Let me know!`,
  },
];

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  "Cold Outreach": {
    bg: "oklch(0.68 0.195 42 / 0.12)",
    text: "var(--lp-pink)",
    border: "oklch(0.68 0.195 42 / 0.25)",
  },
  "Objection Handler": {
    bg: "oklch(0.55 0.18 260 / 0.15)",
    text: "oklch(0.72 0.18 260)",
    border: "oklch(0.55 0.18 260 / 0.3)",
  },
  "Follow-Up": {
    bg: "oklch(0.55 0.15 145 / 0.15)",
    text: "oklch(0.72 0.15 145)",
    border: "oklch(0.55 0.15 145 / 0.3)",
  },
};

function ScriptCard({ script }: { script: Script }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const colors = typeColors[script.type] || typeColors["Cold Outreach"];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(script.content);
    setCopied(true);
    toast.success("Script copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="lp-card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div>
            <div
              className="font-bold text-sm"
              style={{ fontFamily: "Montserrat, sans-serif", color: "var(--lp-text)" }}
            >
              {script.title}
            </div>
            <span
              className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            >
              {script.type}
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: "var(--lp-text-muted)" }} />
        ) : (
          <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "var(--lp-text-muted)" }} />
        )}
      </button>

      {expanded && (
        <div className="border-t" style={{ borderColor: "var(--lp-border)" }}>
          <div className="px-5 py-4">
            <pre
              className="text-sm leading-relaxed whitespace-pre-wrap"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "var(--lp-text-mid)",
              }}
            >
              {script.content}
            </pre>
          </div>
          <div
            className="px-5 py-3 border-t flex justify-end"
            style={{ borderColor: "var(--lp-border)", background: "oklch(1 0 0 / 3%)" }}
          >
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: copied ? "oklch(0.55 0.15 145 / 0.2)" : "var(--lp-pink)",
                color: copied ? "oklch(0.75 0.15 145)" : "oklch(0.10 0.01 240)",
                border: copied ? "1px solid oklch(0.55 0.15 145 / 0.4)" : "none",
              }}
            >
              {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Script</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SalesScripts() {
  const [filter, setFilter] = useState("all");
  const types = ["all", "Cold Outreach", "Objection Handler", "Follow-Up"];
  const filtered = filter === "all" ? scripts : scripts.filter(s => s.type === filter);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-6 h-6" style={{ color: "var(--lp-pink)" }} />
          <h1 className="lp-section-title text-2xl">Sales Scripts</h1>
        </div>
        <p className="text-sm" style={{ color: "var(--lp-text-mid)" }}>
          Click any script to expand it. Copy and customize with the prospect's details before using.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {types.map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              background: filter === type ? "var(--lp-pink)" : "oklch(1 0 0 / 6%)",
              color: filter === type ? "oklch(0.10 0.01 240)" : "var(--lp-slate-light)",
              border: `1px solid ${filter === type ? "transparent" : "oklch(1 0 0 / 10%)"}`,
            }}
          >
            {type === "all" ? "All Scripts" : type}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(script => (
          <ScriptCard key={script.id} script={script} />
        ))}
      </div>

      <div
        className="mt-6 p-4 rounded-lg"
        style={{
          background: "oklch(0.68 0.195 42 / 0.06)",
          border: "1px dashed oklch(0.68 0.195 42 / 0.3)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--lp-text-mid)" }}>
          <span style={{ color: "var(--lp-pink)", fontWeight: 700 }}>Pro tip:</span> Always replace the bracketed placeholders [OWNER NAME], [CITY], [NICHE], and [PRICE] before using any script.
        </p>
      </div>
    </div>
  );
}
