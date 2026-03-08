import { CreditCard, Zap, CheckCircle, Clock, ArrowRight, Lock } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Client Agrees to Move Forward",
    description: "You've shown the mock website, handled objections, and the client is ready to pay.",
  },
  {
    step: "02",
    title: "Open This Tab on Your Phone",
    description: "Hand your phone to the client or pull up the payment link on their device.",
  },
  {
    step: "03",
    title: "Client Enters Payment Info",
    description: "They enter their card details directly. Payment processes instantly via Stripe.",
  },
  {
    step: "04",
    title: "Receipt Sent Automatically",
    description: "Stripe emails the client a receipt. You're done — the deal is closed.",
  },
];

const packageOptions = [
  {
    name: "Homepage Package",
    price: "$497",
    description: "Custom homepage built and live within 48 hours. Optimized for Google.",
    features: ["Custom homepage design", "Mobile responsive", "Google-optimized", "Live in 48 hrs"],
    recommended: true,
  },
  {
    name: "Full Website Package",
    price: "$997",
    description: "Full multi-page website with all service pages, contact form, and SEO setup.",
    features: ["5-page website", "All service pages", "Contact form", "Full SEO setup", "Live in 5 days"],
    recommended: false,
  },
];

export default function CollectPayment() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard className="w-6 h-6" style={{ color: "var(--lp-orange)" }} />
          <h1 className="lp-section-title text-2xl">Collect Payment</h1>
          <span
            className="lp-badge text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.55 0.18 260 / 0.15)",
              color: "oklch(0.72 0.18 260)",
              border: "1px solid oklch(0.55 0.18 260 / 0.3)",
            }}
          >
            Setup Required
          </span>
        </div>
        <p className="text-sm" style={{ color: "var(--lp-slate-light)" }}>
          Close the deal on the spot. Once configured, this tab gives you a one-tap payment link to hand to the client.
        </p>
      </div>

      {/* Setup notice */}
      <div
        className="p-5 rounded-xl mb-8"
        style={{
          background: "oklch(0.55 0.18 260 / 0.08)",
          border: "1px solid oklch(0.55 0.18 260 / 0.25)",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
            style={{ background: "oklch(0.55 0.18 260 / 0.15)" }}
          >
            <Clock className="w-5 h-5" style={{ color: "oklch(0.72 0.18 260)" }} />
          </div>
          <div>
            <h3 className="font-bold text-sm mb-1" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--lp-white)" }}>
              Stripe + GoHighLevel Integration — Coming Soon
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--lp-slate-light)" }}>
              Payment collection will be wired up in the next session. Once configured, this tab will display a live payment button your clients can tap to pay instantly via Stripe, with the transaction automatically logged in GoHighLevel.
            </p>
          </div>
        </div>
      </div>

      {/* Package options preview */}
      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--lp-orange)", fontFamily: "Montserrat, sans-serif" }}>
          Package Options (Preview)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {packageOptions.map(pkg => (
            <div
              key={pkg.name}
              className="lp-card p-5 relative"
              style={{
                border: pkg.recommended ? "1px solid oklch(0.68 0.195 42 / 0.4)" : undefined,
              }}
            >
              {pkg.recommended && (
                <div
                  className="absolute -top-3 left-5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: "var(--lp-orange)",
                    color: "oklch(0.10 0.01 240)",
                  }}
                >
                  Most Popular
                </div>
              )}
              <div className="mb-3">
                <div className="font-black text-2xl mb-0.5" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--lp-orange)" }}>
                  {pkg.price}
                </div>
                <div className="font-bold text-sm" style={{ color: "var(--lp-white)" }}>{pkg.name}</div>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--lp-slate-light)" }}>{pkg.description}</p>
              </div>
              <ul className="space-y-1.5 mb-4">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--lp-slate-light)" }}>
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "oklch(0.72 0.15 145)" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 opacity-40 cursor-not-allowed"
                style={{
                  background: pkg.recommended ? "var(--lp-orange)" : "oklch(1 0 0 / 8%)",
                  color: pkg.recommended ? "oklch(0.10 0.01 240)" : "var(--lp-slate-light)",
                  border: pkg.recommended ? "none" : "1px solid oklch(1 0 0 / 12%)",
                }}
              >
                <Lock className="w-4 h-4" />
                Payment Setup Required
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* How it will work */}
      <div className="lp-card p-5 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: "var(--lp-orange)", fontFamily: "Montserrat, sans-serif" }}>
          How It Will Work
        </h2>
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div key={s.step} className="flex items-start gap-4">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 font-black text-xs"
                style={{
                  background: "var(--lp-orange-glow)",
                  color: "var(--lp-orange)",
                  fontFamily: "Montserrat, sans-serif",
                  border: "1px solid oklch(0.68 0.195 42 / 0.2)",
                }}
              >
                {s.step}
              </div>
              <div className="flex-1 pt-1">
                <div className="font-bold text-sm mb-0.5" style={{ color: "var(--lp-white)", fontFamily: "Montserrat, sans-serif" }}>
                  {s.title}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--lp-slate-light)" }}>
                  {s.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 flex-shrink-0 mt-2.5 hidden sm:block" style={{ color: "var(--lp-slate)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reminder callout */}
      <div
        className="p-4 rounded-lg flex items-start gap-3"
        style={{
          background: "oklch(0.68 0.195 42 / 0.06)",
          border: "1px dashed oklch(0.68 0.195 42 / 0.3)",
        }}
      >
        <Zap className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--lp-orange)" }} />
        <p className="text-sm" style={{ color: "var(--lp-slate-light)" }}>
          <span style={{ color: "var(--lp-orange)", fontWeight: 700 }}>Next step:</span> Connect your Stripe account and GoHighLevel to activate payment collection. A reminder has been set — come back to this session to get it wired up.
        </p>
      </div>
    </div>
  );
}
