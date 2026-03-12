import { useState, useEffect } from "react";
import {
  Code2,
  Copy,
  Check,
  ChevronDown,
  AlertCircle,
  Loader2,
  Download,
  RefreshCw,
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  Palette,
  Image,
  Send,
} from "lucide-react";
import { toast } from "sonner";

// GitHub raw content base URL
const GITHUB_RAW = "https://raw.githubusercontent.com/chrisollinwhite/leadproof-templates/main";
const CONFIG_URL = `${GITHUB_RAW}/config.json`;

// GHL Webhook placeholder
const GHL_WEBHOOK_URL = "YOUR_GHL_WEBHOOK_URL_HERE"; // ← Replace with real webhook

interface Niche {
  id: string;
  label: string;
  versions: { id: string; label: string }[];
}

interface FormData {
  // Lead info (GHL)
  firstName: string;
  lastName: string;
  email: string;
  ownerPhone: string;
  // Business info (website)
  businessName: string;
  businessPhone: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  // Google Maps
  googleMapsEmbed: string;
  // Website config
  niche: string;
  version: string;
}

const defaultForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  ownerPhone: "",
  businessName: "",
  businessPhone: "",
  businessAddress: "",
  businessCity: "",
  businessState: "",
  logoUrl: "",
  googleMapsEmbed: "",
  primaryColor: "#0A1F44",
  secondaryColor: "#FF6B00",
  niche: "",
  version: "",
};

function injectBusinessData(template: string, form: FormData): string {
  let result = template;

  // Determine placeholder names based on niche/version
  const isVintage = form.version === "vintage";
  const placeholderName = isVintage ? "Old Faithful Plumbing" : "ProFlow Plumbing";
  const placeholderPhoneDisplay = isVintage ? "(303) 555-0174" : "(303) 555-0187";
  const placeholderPhoneDigits = isVintage ? "3035550174" : "3035550187";

  // Format phone for display
  const phoneDigits = form.businessPhone.replace(/\D/g, "");
  const phoneDisplay = form.businessPhone || placeholderPhoneDisplay;

  // Replace business name
  result = result.split(placeholderName).join(form.businessName || placeholderName);

  // Replace phone display
  result = result.split(placeholderPhoneDisplay).join(phoneDisplay);

  // Replace phone digits
  result = result.split(placeholderPhoneDigits).join(phoneDigits || placeholderPhoneDigits);

  // Replace city
  result = result.split("Denver").join(form.businessCity || "Denver");

  // Replace state
  result = result.split('"CO"').join(`"${form.businessState || "CO"}"`);
  result = result.split(", CO").join(`, ${form.businessState || "CO"}`);
  result = result.split(" CO ").join(` ${form.businessState || "CO"} `);

  // Replace colors
  if (form.primaryColor) {
    result = result.split("#0A1F44").join(form.primaryColor);
    result = result.split("#1A1008").join(form.primaryColor);
  }
  if (form.secondaryColor) {
    result = result.split("#FF6B00").join(form.secondaryColor);
    result = result.split("#C9A84C").join(form.secondaryColor);
  }

  // Replace Google Maps embed
  if (form.googleMapsEmbed) {
    // Replace any existing iframe src that looks like a maps embed
    result = result.replace(/src="https:\/\/www\.google\.com\/maps\/embed[^"]*"/gi, `src="${form.googleMapsEmbed}"`);
    // Also replace placeholder text if template uses one
    result = result.split("[[GOOGLE_MAPS_EMBED]]").join(form.googleMapsEmbed);
  }

  // Replace logo URL if provided
  if (form.logoUrl) {
    result = result.replace(/src="https:\/\/[^"]*logo[^"]*"/gi, `src="${form.logoUrl}"`);
    result = result.replace(/src="https:\/\/[^"]*\.(png|jpg|jpeg|svg|webp)"/gi, (match) => {
      if (match.toLowerCase().includes("logo")) return `src="${form.logoUrl}"`;
      return match;
    });
  }

  return result;
}

export default function WebsiteBuilder() {
  const [niches, setNiches] = useState<Niche[]>([]);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [output, setOutput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isGHLSending, setIsGHLSending] = useState(false);
  const [ghlSent, setGhlSent] = useState(false);
  const [configError, setConfigError] = useState(false);

  // Load config from GitHub
  useEffect(() => {
    fetch(CONFIG_URL)
      .then(r => r.json())
      .then(data => setNiches(data.niches || []))
      .catch(() => setConfigError(true));
  }, []);

  const selectedNiche = niches.find(n => n.id === form.niche);
  const versions = selectedNiche?.versions || [];

  const updateForm = (field: keyof FormData, value: string) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      if (field === "niche") updated.version = "";
      return updated;
    });
    setOutput("");
    setGhlSent(false);
  };

  const handleGenerate = async () => {
    if (!form.niche || !form.version) {
      toast.error("Please select a niche and website version first.");
      return;
    }
    if (!form.businessName) {
      toast.error("Business name is required.");
      return;
    }

    setIsGenerating(true);
    setOutput("");

    try {
      const templateUrl = `${GITHUB_RAW}/${form.niche}/${form.version}.html`;
      const response = await fetch(templateUrl);
      if (!response.ok) throw new Error("Template not found");
      const template = await response.text();
      const injected = injectBusinessData(template, form);
      setOutput(injected);
      toast.success("Website code generated! Ready to copy.");
    } catch (err) {
      toast.error("Failed to load template. Check your connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setIsCopied(true);
    toast.success("Copied to clipboard! Paste into GHL.");
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.businessName.replace(/\s+/g, "-").toLowerCase() || "website"}-leadproof.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded!");
  };

  const handleGHLPush = async () => {
    if (!form.firstName || !form.lastName || !form.email) {
      toast.error("First name, last name, and email are required to push to CRM.");
      return;
    }

    if (GHL_WEBHOOK_URL === "YOUR_GHL_WEBHOOK_URL_HERE") {
      toast.warning("⚠️ GHL webhook not configured yet. Contact your admin to set this up.");
      return;
    }

    setIsGHLSending(true);
    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.ownerPhone,
          businessName: form.businessName,
          businessPhone: form.businessPhone,
          businessAddress: `${form.businessAddress}, ${form.businessCity}, ${form.businessState}`,
          niche: form.niche,
          websiteVersion: form.version,
          source: "LeadProof Team Dashboard",
        }),
      });
      setGhlSent(true);
      toast.success("Lead pushed to GoHighLevel CRM!");
    } catch {
      toast.error("Failed to push to GHL. Check webhook URL.");
    } finally {
      setIsGHLSending(false);
    }
  };

  const handleReset = () => {
    setForm(defaultForm);
    setOutput("");
    setGhlSent(false);
    setIsCopied(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Code2 className="w-6 h-6" style={{ color: "var(--lp-pink)" }} />
          <h1 className="lp-section-title text-2xl">Website Builder</h1>
          <span className="lp-badge lp-badge-orange">Core Tool</span>
        </div>
        <p className="text-sm" style={{ color: "var(--lp-text-mid)" }}>
          Fill in the prospect's details to generate a ready-to-paste GHL website and push the lead to CRM.
        </p>
      </div>

      {configError && (
        <div
          className="flex items-center gap-3 p-4 rounded-lg mb-6"
          style={{ background: "oklch(0.577 0.245 27.325 / 0.15)", border: "1px solid oklch(0.577 0.245 27.325 / 0.3)" }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: "oklch(0.65 0.2 27)" }} />
          <p className="text-sm" style={{ color: "oklch(0.65 0.2 27)" }}>
            Could not load template config from GitHub. Check your internet connection.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-5">
          {/* Section: Website Config */}
          <div className="lp-card p-5">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--lp-pink)", fontFamily: "Montserrat, sans-serif" }}>
              1. Website Selection
            </h2>
            <div className="space-y-4">
              <div>
                <label className="lp-label">Niche</label>
                <div className="relative">
                  <select
                    value={form.niche}
                    onChange={e => updateForm("niche", e.target.value)}
                    className="lp-input w-full px-4 py-3 pr-10 appearance-none"
                    style={{ background: "var(--lp-surface-2)" }}
                  >
                    <option value="">— Select a niche —</option>
                    {niches.map(n => (
                      <option key={n.id} value={n.id} style={{ background: "var(--lp-surface)" }}>
                        {n.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--lp-text-muted)" }} />
                </div>
              </div>
              <div>
                <label className="lp-label">Website Version</label>
                <div className="relative">
                  <select
                    value={form.version}
                    onChange={e => updateForm("version", e.target.value)}
                    disabled={!form.niche}
                    className="lp-input w-full px-4 py-3 pr-10 appearance-none disabled:opacity-40"
                    style={{ background: "var(--lp-surface-2)" }}
                  >
                    <option value="">— Select a version —</option>
                    {versions.map(v => (
                      <option key={v.id} value={v.id} style={{ background: "var(--lp-surface)" }}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--lp-text-muted)" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Business Info */}
          <div className="lp-card p-5">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--lp-pink)", fontFamily: "Montserrat, sans-serif" }}>
              2. Business Info
            </h2>
            <div className="space-y-3">
              <div>
                <label className="lp-label">Business Name *</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--lp-text-muted)" }} />
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={e => updateForm("businessName", e.target.value)}
                    placeholder="e.g. Smith Plumbing LLC"
                    className="lp-input w-full pl-10 pr-4 py-3"
                  />
                </div>
              </div>
              <div>
                <label className="lp-label">Business Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--lp-text-muted)" }} />
                  <input
                    type="tel"
                    value={form.businessPhone}
                    onChange={e => updateForm("businessPhone", e.target.value)}
                    placeholder="e.g. (720) 555-0100"
                    className="lp-input w-full pl-10 pr-4 py-3"
                  />
                </div>
              </div>
              <div>
                <label className="lp-label">Street Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--lp-text-muted)" }} />
                  <input
                    type="text"
                    value={form.businessAddress}
                    onChange={e => updateForm("businessAddress", e.target.value)}
                    placeholder="e.g. 123 Main St"
                    className="lp-input w-full pl-10 pr-4 py-3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="lp-label">City</label>
                  <input
                    type="text"
                    value={form.businessCity}
                    onChange={e => updateForm("businessCity", e.target.value)}
                    placeholder="Denver"
                    className="lp-input w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label className="lp-label">State</label>
                  <input
                    type="text"
                    value={form.businessState}
                    onChange={e => updateForm("businessState", e.target.value)}
                    placeholder="CO"
                    className="lp-input w-full px-4 py-3"
                    maxLength={2}
                  />
                </div>
              </div>
              <div>
                <label className="lp-label">Google Maps Embed URL (optional)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4" style={{ color: "var(--lp-text-muted)" }} />
                  <textarea
                    value={form.googleMapsEmbed}
                    onChange={e => updateForm("googleMapsEmbed", e.target.value)}
                    placeholder="Paste the Google Maps embed src URL here (from Google Maps - Share - Embed a map - copy the src URL)"
                    rows={3}
                    className="lp-input w-full pl-10 pr-4 py-3 resize-none text-xs"
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--lp-text-muted)" }}>
                  Google Maps → Share → Embed a map → copy only the URL inside src="..."
                </p>
              </div>
              <div>
                <label className="lp-label">Logo URL (optional)</label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--lp-text-muted)" }} />
                  <input
                    type="url"
                    value={form.logoUrl}
                    onChange={e => updateForm("logoUrl", e.target.value)}
                    placeholder="https://..."
                    className="lp-input w-full pl-10 pr-4 py-3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="lp-label">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.primaryColor}
                      onChange={e => updateForm("primaryColor", e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0 p-0.5"
                      style={{ background: "var(--lp-surface-2)", border: "1px solid var(--lp-border)" }}
                    />
                    <input
                      type="text"
                      value={form.primaryColor}
                      onChange={e => updateForm("primaryColor", e.target.value)}
                      className="lp-input flex-1 px-3 py-2 text-sm font-mono"
                      placeholder="#0A1F44"
                    />
                  </div>
                </div>
                <div>
                  <label className="lp-label">Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.secondaryColor}
                      onChange={e => updateForm("secondaryColor", e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0 p-0.5"
                      style={{ background: "var(--lp-surface-2)", border: "1px solid var(--lp-border)" }}
                    />
                    <input
                      type="text"
                      value={form.secondaryColor}
                      onChange={e => updateForm("secondaryColor", e.target.value)}
                      className="lp-input flex-1 px-3 py-2 text-sm font-mono"
                      placeholder="#FF6B00"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Lead Info for GHL */}
          <div className="lp-card p-5">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: "var(--lp-pink)", fontFamily: "Montserrat, sans-serif" }}>
              3. Owner Info
            </h2>
            <p className="text-xs mb-4" style={{ color: "var(--lp-text-muted)" }}>
              Used to push the lead into GoHighLevel CRM.
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="lp-label">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--lp-text-muted)" }} />
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={e => updateForm("firstName", e.target.value)}
                      placeholder="John"
                      className="lp-input w-full pl-10 pr-4 py-3"
                    />
                  </div>
                </div>
                <div>
                  <label className="lp-label">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => updateForm("lastName", e.target.value)}
                    placeholder="Smith"
                    className="lp-input w-full px-4 py-3"
                  />
                </div>
              </div>
              <div>
                <label className="lp-label">Owner Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--lp-text-muted)" }} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => updateForm("email", e.target.value)}
                    placeholder="john@smithplumbing.com"
                    className="lp-input w-full pl-10 pr-4 py-3"
                  />
                </div>
              </div>
              <div>
                <label className="lp-label">Owner Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--lp-text-muted)" }} />
                  <input
                    type="tel"
                    value={form.ownerPhone}
                    onChange={e => updateForm("ownerPhone", e.target.value)}
                    placeholder="(720) 555-0100"
                    className="lp-input w-full pl-10 pr-4 py-3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !form.niche || !form.version || !form.businessName}
              className="lp-btn-primary flex items-center justify-center gap-2 w-full py-4 text-base"
              style={{ opacity: isGenerating || !form.niche || !form.version || !form.businessName ? 0.5 : 1 }}
            >
              {isGenerating ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Generating Website...</>
              ) : (
                <><Code2 className="w-5 h-5" /> Generate Website Code</>
              )}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleGHLPush}
                disabled={isGHLSending || ghlSent}
                className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: ghlSent ? "oklch(0.55 0.15 145 / 0.2)" : "oklch(1 0 0 / 8%)",
                  border: `1px solid ${ghlSent ? "oklch(0.55 0.15 145 / 0.4)" : "oklch(1 0 0 / 12%)"}`,
                  color: ghlSent ? "oklch(0.75 0.15 145)" : "var(--lp-white)",
                  opacity: isGHLSending ? 0.6 : 1,
                }}
              >
                {isGHLSending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : ghlSent ? (
                  <><Check className="w-4 h-4" /> Sent to CRM</>
                ) : (
                  <><Send className="w-4 h-4" /> Push to GHL</>
                )}
              </button>

              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: "var(--lp-surface-2)",
                  border: "1px solid var(--lp-border)",
                  color: "var(--lp-text-mid)",
                }}
              >
                <RefreshCw className="w-4 h-4" /> Reset Form
              </button>
            </div>
          </div>
        </div>

        {/* Right: Output */}
        <div className="flex flex-col">
          <div className="lp-card flex-1 flex flex-col" style={{ minHeight: "500px" }}>
            {/* Output header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: "var(--lp-border)" }}
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4" style={{ color: "var(--lp-pink)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--lp-text)" }}>
                  Generated HTML/CSS
                </span>
                {output && (
                  <span className="lp-badge lp-badge-green">Ready</span>
                )}
              </div>
              {output && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: "var(--lp-surface-2)",
                      border: "1px solid var(--lp-border)",
                      color: "var(--lp-text-mid)",
                    }}
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: isCopied ? "oklch(0.55 0.15 145 / 0.2)" : "var(--lp-pink)",
                      border: `1px solid ${isCopied ? "oklch(0.55 0.15 145 / 0.4)" : "transparent"}`,
                      color: isCopied ? "oklch(0.45 0.15 145)" : "#ffffff",
                    }}
                  >
                    {isCopied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy All</>}
                  </button>
                </div>
              )}
            </div>

            {/* Output body */}
            <div className="flex-1 relative overflow-hidden">
              {!output ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "var(--lp-surface-2)" }}
                  >
                    <Code2 className="w-8 h-8" style={{ color: "var(--lp-text-muted)" }} />
                  </div>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--lp-text-mid)" }}>
                    No code generated yet
                  </p>
                  <p className="text-xs" style={{ color: "var(--lp-text-muted)" }}>
                    Fill in the form and click "Generate Website Code" to get the ready-to-paste GHL HTML/CSS.
                  </p>
                </div>
              ) : (
                <textarea
                  readOnly
                  value={output}
                  className="absolute inset-0 w-full h-full lp-mono p-5 resize-none"
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "oklch(0.30 0.08 150)",
                  }}
                />
              )}
            </div>

            {/* Output footer */}
            {output && (
              <div
                className="px-5 py-3 border-t flex items-center justify-between"
                style={{ borderColor: "var(--lp-border)" }}
              >
                <span className="text-xs" style={{ color: "var(--lp-text-muted)" }}>
                  {output.length.toLocaleString()} characters · Paste into GHL Custom Code Block
                </span>
                <span className="lp-badge lp-badge-orange text-xs">
                  {form.niche} / {form.version}
                </span>
              </div>
            )}
          </div>

          {/* Instructions card */}
          {output && (
            <div
              className="mt-4 p-4 rounded-lg"
              style={{
                background: "var(--lp-pink-light)",
                border: "1px solid oklch(0.60 0.28 0 / 0.2)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--lp-pink)" }}>
                How to paste into GoHighLevel
              </p>
              <ol className="text-xs space-y-1" style={{ color: "var(--lp-text-mid)" }}>
                <li>1. Click "Copy All" above</li>
                <li>2. In GHL, open the funnel/website editor</li>
                <li>3. Add a "Custom Code" element to the page</li>
                <li>4. Paste the code and save</li>
                <li>5. Preview to confirm everything looks correct</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
