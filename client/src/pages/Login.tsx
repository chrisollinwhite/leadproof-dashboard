import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Eye, EyeOff, Lock, Zap } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 400));
    const success = login(password);
    if (success) {
      setLocation("/");
    } else {
      setError("Incorrect password. Try again.");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--lp-bg)" }}
    >
      {/* Ambient pink glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, oklch(0.60 0.28 0 / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-sm mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{
              background: "var(--lp-pink)",
              boxShadow: "0 8px 24px var(--lp-pink-glow)",
            }}
          >
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: "Montserrat, sans-serif", color: "var(--lp-text)" }}
          >
            LeadProof
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--lp-text-muted)" }}>
            Sales Team Dashboard
          </p>
        </div>

        {/* Card */}
        <div className="lp-card p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4" style={{ color: "var(--lp-pink)" }} />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--lp-text-mid)" }}
            >
              Team Access Only
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="lp-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter team password"
                  className="lp-input w-full px-4 py-3 pr-12"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded"
                  style={{ color: "var(--lp-text-muted)" }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="text-sm mt-2" style={{ color: "oklch(0.50 0.22 27)" }}>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="lp-btn-primary w-full flex items-center justify-center gap-2"
              style={{ opacity: isLoading || !password ? 0.6 : 1 }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                "ENTER DASHBOARD →"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "var(--lp-text-muted)" }}>
          LeadProof Websites · Internal Use Only
        </p>
      </div>
    </div>
  );
}
