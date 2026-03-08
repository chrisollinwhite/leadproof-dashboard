import { useState } from "react";
import { ClipboardList, Send, Check, RefreshCw, User, Building2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const DEV_EMAIL = "leadproofwebsites@gmail.com";

interface NotesForm {
  salesRepName: string;
  salesRepEmail: string;
  businessName: string;
  niche: string;
  websiteVersion: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  // Website update details
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  tagline: string;
  serviceAreas: string;
  servicesOffered: string;
  yearsInBusiness: string;
  jobsCompleted: string;
  googleMapsEmbed: string;
  googleReviewUrl: string;
  testimonials: string;
  additionalNotes: string;
}

const defaultForm: NotesForm = {
  salesRepName: "",
  salesRepEmail: "",
  businessName: "",
  niche: "",
  websiteVersion: "",
  ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
  logoUrl: "",
  primaryColor: "",
  accentColor: "",
  tagline: "",
  serviceAreas: "",
  servicesOffered: "",
  yearsInBusiness: "",
  jobsCompleted: "",
  googleMapsEmbed: "",
  googleReviewUrl: "",
  testimonials: "",
  additionalNotes: "",
};

function buildEmailBody(form: NotesForm): string {
  return `NEW CLIENT WEBSITE HANDOFF
================================

SALES REP
---------
Name: ${form.salesRepName || "N/A"}
Email: ${form.salesRepEmail || "N/A"}

CLIENT / BUSINESS INFO
----------------------
Business Name: ${form.businessName || "N/A"}
Niche: ${form.niche || "N/A"}
Website Version: ${form.websiteVersion || "N/A"}
Owner Name: ${form.ownerName || "N/A"}
Owner Phone: ${form.ownerPhone || "N/A"}
Owner Email: ${form.ownerEmail || "N/A"}

WEBSITE DETAILS
---------------
Logo URL: ${form.logoUrl || "N/A — needs to be sourced"}
Primary Color: ${form.primaryColor || "N/A"}
Accent Color: ${form.accentColor || "N/A"}
Tagline / Slogan: ${form.tagline || "N/A"}
Service Areas: ${form.serviceAreas || "N/A"}
Services Offered: ${form.servicesOffered || "N/A"}
Years in Business: ${form.yearsInBusiness || "N/A"}
Jobs Completed: ${form.jobsCompleted || "N/A"}

INTEGRATIONS
------------
Google Maps Embed URL: ${form.googleMapsEmbed || "N/A"}
Google Review URL: ${form.googleReviewUrl || "N/A"}

TESTIMONIALS
------------
${form.testimonials || "N/A"}

ADDITIONAL NOTES FROM CLOSING CALL
-----------------------------------
${form.additionalNotes || "None"}

================================
Sent from LeadProof Sales Dashboard`;
}

export default function ClientNotes() {
  const [form, setForm] = useState<NotesForm>(defaultForm);
  const [sent, setSent] = useState(false);

  const update = (field: keyof NotesForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSent(false);
  };

  const handleSend = () => {
    if (!form.businessName) {
      toast.error("Business name is required before sending.");
      return;
    }
    if (!form.salesRepName) {
      toast.error("Please enter your name so the dev team knows who sent this.");
      return;
    }

    const subject = encodeURIComponent(`Dev | ${form.businessName}`);
    const body = encodeURIComponent(buildEmailBody(form));
    const mailtoLink = `mailto:${DEV_EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
    setSent(true);
    toast.success("Email client opened! Review and hit Send.");
  };

  const handleReset = () => {
    setForm(defaultForm);
    setSent(false);
  };

  const inputClass = "lp-input w-full px-4 py-3";
  const labelClass = "lp-label";

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList className="w-6 h-6" style={{ color: "var(--lp-pink)" }} />
          <h1 className="lp-section-title text-2xl">Client Notes</h1>
          <span className="lp-badge lp-badge-orange">Dev Handoff</span>
        </div>
        <p className="text-sm" style={{ color: "var(--lp-text-mid)" }}>
          Fill this out after closing a deal. Hit "Send to Dev Team" and it opens your email pre-filled — just review and send.
        </p>
      </div>

      {/* Info banner */}
      <div
        className="flex items-start gap-3 p-4 rounded-lg mb-6"
        style={{
          background: "oklch(0.68 0.195 42 / 0.08)",
          border: "1px solid oklch(0.68 0.195 42 / 0.25)",
        }}
      >
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--lp-pink)" }} />
        <p className="text-xs leading-relaxed" style={{ color: "var(--lp-text-mid)" }}>
          This sends a formatted email to <span style={{ color: "var(--lp-pink)", fontWeight: 700 }}>{DEV_EMAIL}</span> with subject line{" "}
          <span style={{ color: "var(--lp-text)", fontWeight: 700 }}>Dev | [Business Name]</span>. Fill in as much as you know — the more detail, the faster the dev team can build.
        </p>
      </div>

      <div className="space-y-5">
        {/* Sales Rep Info */}
        <div className="lp-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--lp-pink)", fontFamily: "Montserrat, sans-serif" }}>
            1. Your Info (Sales Rep)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Your Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--lp-text-muted)" }} />
                <input type="text" value={form.salesRepName} onChange={e => update("salesRepName", e.target.value)}
                  placeholder="Your full name" className="lp-input w-full pl-10 pr-4 py-3" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Your Email</label>
              <input type="email" value={form.salesRepEmail} onChange={e => update("salesRepEmail", e.target.value)}
                placeholder="you@email.com" className={inputClass} />
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="lp-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--lp-pink)", fontFamily: "Montserrat, sans-serif" }}>
            2. Business Info
          </h2>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Business Name *</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--lp-text-muted)" }} />
                <input type="text" value={form.businessName} onChange={e => update("businessName", e.target.value)}
                  placeholder="e.g. Smith Plumbing LLC" className="lp-input w-full pl-10 pr-4 py-3" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Niche</label>
                <input type="text" value={form.niche} onChange={e => update("niche", e.target.value)}
                  placeholder="e.g. Plumbing" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Website Version Sold</label>
                <input type="text" value={form.websiteVersion} onChange={e => update("websiteVersion", e.target.value)}
                  placeholder="e.g. Vintage" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Owner Name</label>
              <input type="text" value={form.ownerName} onChange={e => update("ownerName", e.target.value)}
                placeholder="e.g. John Smith" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Owner Phone</label>
                <input type="tel" value={form.ownerPhone} onChange={e => update("ownerPhone", e.target.value)}
                  placeholder="(720) 555-0100" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Owner Email</label>
                <input type="email" value={form.ownerEmail} onChange={e => update("ownerEmail", e.target.value)}
                  placeholder="owner@business.com" className={inputClass} />
              </div>
            </div>
          </div>
        </div>

        {/* Website Details */}
        <div className="lp-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--lp-pink)", fontFamily: "Montserrat, sans-serif" }}>
            3. Website Details
          </h2>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Logo URL</label>
              <input type="url" value={form.logoUrl} onChange={e => update("logoUrl", e.target.value)}
                placeholder="https://... (link to their logo file)" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Primary Color</label>
                <input type="text" value={form.primaryColor} onChange={e => update("primaryColor", e.target.value)}
                  placeholder="e.g. #0A1F44 or Navy Blue" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Accent Color</label>
                <input type="text" value={form.accentColor} onChange={e => update("accentColor", e.target.value)}
                  placeholder="e.g. #FF6B00 or Orange" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Tagline / Slogan</label>
              <input type="text" value={form.tagline} onChange={e => update("tagline", e.target.value)}
                placeholder="e.g. Trusted Plumbing Since 1998" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Service Areas</label>
              <input type="text" value={form.serviceAreas} onChange={e => update("serviceAreas", e.target.value)}
                placeholder="e.g. Denver, Aurora, Lakewood, Englewood" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Services Offered</label>
              <textarea value={form.servicesOffered} onChange={e => update("servicesOffered", e.target.value)}
                placeholder="e.g. Drain Cleaning, Water Heater Install, Leak Repair, Emergency Plumbing..."
                rows={3} className="lp-input w-full px-4 py-3 resize-none text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Years in Business</label>
                <input type="text" value={form.yearsInBusiness} onChange={e => update("yearsInBusiness", e.target.value)}
                  placeholder="e.g. 12" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Jobs Completed</label>
                <input type="text" value={form.jobsCompleted} onChange={e => update("jobsCompleted", e.target.value)}
                  placeholder="e.g. 2,000+" className={inputClass} />
              </div>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="lp-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--lp-pink)", fontFamily: "Montserrat, sans-serif" }}>
            4. Integrations
          </h2>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Google Maps Embed URL</label>
              <textarea value={form.googleMapsEmbed} onChange={e => update("googleMapsEmbed", e.target.value)}
                placeholder="Paste the Google Maps embed src URL (Google Maps > Share > Embed a map > copy the src URL)"
                rows={2} className="lp-input w-full px-4 py-3 resize-none text-xs" />
            </div>
            <div>
              <label className={labelClass}>Google Review Page URL</label>
              <input type="url" value={form.googleReviewUrl} onChange={e => update("googleReviewUrl", e.target.value)}
                placeholder="https://g.page/r/..." className={inputClass} />
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="lp-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--lp-pink)", fontFamily: "Montserrat, sans-serif" }}>
            5. Testimonials
          </h2>
          <textarea value={form.testimonials} onChange={e => update("testimonials", e.target.value)}
            placeholder={`Paste any real customer reviews here. Format:\n\n"Great service, fixed our leak same day!" — Mike R.\n"Professional and affordable." — Sarah T.`}
            rows={5} className="lp-input w-full px-4 py-3 resize-none text-sm" />
        </div>

        {/* Notes from closing call */}
        <div className="lp-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "var(--lp-pink)", fontFamily: "Montserrat, sans-serif" }}>
            6. Notes from Closing Call
          </h2>
          <p className="text-xs mb-3" style={{ color: "var(--lp-text-muted)" }}>
            Anything the client mentioned that the dev team should know — special requests, things to avoid, specific wording they want, etc.
          </p>
          <textarea value={form.additionalNotes} onChange={e => update("additionalNotes", e.target.value)}
            placeholder="e.g. Owner wants the phone number really prominent. He specifically said he hates the color green. He mentioned his main competitor is ABC Plumbing and wants to look more premium than them..."
            rows={5} className="lp-input w-full px-4 py-3 resize-none text-sm" />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSend}
            className="lp-btn-primary flex items-center justify-center gap-2 flex-1 py-4 text-base"
            style={{ background: sent ? "oklch(0.55 0.15 145)" : undefined }}
          >
            {sent ? (
              <><Check className="w-5 h-5" /> Email Opened — Check Your Email App</>
            ) : (
              <><Send className="w-5 h-5" /> Send to Dev Team</>
            )}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: "var(--lp-surface-2)",
              border: "1px solid var(--lp-border)",
              color: "var(--lp-text-mid)",
            }}
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
        </div>

        <p className="text-xs text-center" style={{ color: "var(--lp-text-muted)" }}>
          Clicking "Send to Dev Team" opens your default email app with the form pre-filled. Review it and hit Send.
        </p>
      </div>
    </div>
  );
}
