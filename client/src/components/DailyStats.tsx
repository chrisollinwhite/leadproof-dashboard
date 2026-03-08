import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Save, Check, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";

interface DayStats {
  date: string;
  calls: number;
  doors: number;
  demos: number;
  closes: number;
  notes: string;
}

const STATS_KEY = "lp_daily_stats";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function DailyStats() {
  const [todayStats, setTodayStats] = useState<DayStats>({
    date: getTodayKey(),
    calls: 0,
    doors: 0,
    demos: 0,
    closes: 0,
    notes: "",
  });
  const [history, setHistory] = useState<DayStats[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      const all: DayStats[] = JSON.parse(stored);
      const today = all.find(s => s.date === getTodayKey());
      if (today) setTodayStats(today);
      setHistory(all.filter(s => s.date !== getTodayKey()).slice(-14).reverse());
    }
  }, []);

  const handleSave = () => {
    const stored = localStorage.getItem(STATS_KEY);
    const all: DayStats[] = stored ? JSON.parse(stored) : [];
    const filtered = all.filter(s => s.date !== todayStats.date);
    const updated = [...filtered, todayStats];
    localStorage.setItem(STATS_KEY, JSON.stringify(updated));
    setHistory(updated.filter(s => s.date !== getTodayKey()).slice(-14).reverse());
    setSaved(true);
    toast.success("Stats saved for today!");
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClear = () => {
    localStorage.removeItem(STATS_KEY);
    setHistory([]);
    setTodayStats({ date: getTodayKey(), calls: 0, doors: 0, demos: 0, closes: 0, notes: "" });
    toast.info("All stats cleared.");
  };

  const statFields: { key: keyof DayStats; label: string; color: string; emoji: string }[] = [
    { key: "calls", label: "Calls Made", color: "var(--lp-orange)", emoji: "📞" },
    { key: "doors", label: "Doors Knocked", color: "oklch(0.72 0.18 260)", emoji: "🚪" },
    { key: "demos", label: "Demos Set", color: "oklch(0.72 0.15 145)", emoji: "📱" },
    { key: "closes", label: "Closes", color: "oklch(0.75 0.2 60)", emoji: "🏆" },
  ];

  // Totals from history + today
  const allStats = [...history, todayStats];
  const totals = allStats.reduce(
    (acc, s) => ({
      calls: acc.calls + (s.calls || 0),
      doors: acc.doors + (s.doors || 0),
      demos: acc.demos + (s.demos || 0),
      closes: acc.closes + (s.closes || 0),
    }),
    { calls: 0, doors: 0, demos: 0, closes: 0 }
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-6 h-6" style={{ color: "var(--lp-orange)" }} />
          <h1 className="lp-section-title text-2xl">Daily Stats</h1>
        </div>
        <p className="text-sm" style={{ color: "var(--lp-slate-light)" }}>
          Log your activity every day. Consistency is the key to closing.
        </p>
      </div>

      {/* Today's entry */}
      <div className="lp-card p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: "var(--lp-orange)" }} />
            <span className="font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--lp-white)" }}>
              Today — {formatDate(getTodayKey())}
            </span>
          </div>
          <span className="lp-badge lp-badge-orange">Today</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          {statFields.map(field => (
            <div key={field.key}>
              <label className="lp-label">{field.emoji} {field.label}</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTodayStats(prev => ({ ...prev, [field.key]: Math.max(0, (prev[field.key] as number) - 1) }))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold transition-all"
                  style={{ background: "oklch(1 0 0 / 6%)", color: "var(--lp-white)", border: "1px solid oklch(1 0 0 / 10%)" }}
                >
                  −
                </button>
                <input
                  type="number"
                  min={0}
                  value={todayStats[field.key] as number}
                  onChange={e => setTodayStats(prev => ({ ...prev, [field.key]: Math.max(0, parseInt(e.target.value) || 0) }))}
                  className="lp-input flex-1 text-center py-2 text-xl font-black"
                  style={{ fontFamily: "Montserrat, sans-serif", color: field.color }}
                />
                <button
                  onClick={() => setTodayStats(prev => ({ ...prev, [field.key]: (prev[field.key] as number) + 1 }))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold transition-all"
                  style={{ background: "oklch(1 0 0 / 6%)", color: "var(--lp-white)", border: "1px solid oklch(1 0 0 / 10%)" }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <label className="lp-label">📝 Notes (optional)</label>
          <textarea
            value={todayStats.notes}
            onChange={e => setTodayStats(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any wins, challenges, or follow-ups to remember..."
            rows={3}
            className="lp-input w-full px-4 py-3 resize-none text-sm"
          />
        </div>

        <button
          onClick={handleSave}
          className="lp-btn-primary flex items-center justify-center gap-2 w-full py-3"
          style={{ background: saved ? "oklch(0.55 0.15 145)" : undefined }}
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Today's Stats</>}
        </button>
      </div>

      {/* All-time totals */}
      <div className="lp-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4" style={{ color: "var(--lp-orange)" }} />
          <span className="font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--lp-white)" }}>
            All-Time Totals
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {statFields.map(field => (
            <div key={field.key} className="text-center">
              <div
                className="text-2xl font-black"
                style={{ fontFamily: "Montserrat, sans-serif", color: field.color }}
              >
                {totals[field.key as keyof typeof totals]}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--lp-slate)" }}>
                {field.label}
              </div>
            </div>
          ))}
        </div>
        {totals.demos > 0 && (
          <div
            className="mt-4 pt-4 border-t text-center text-xs"
            style={{ borderColor: "oklch(1 0 0 / 8%)", color: "var(--lp-slate-light)" }}
          >
            Close rate: <span style={{ color: "var(--lp-orange)", fontWeight: 700 }}>
              {Math.round((totals.closes / totals.demos) * 100)}%
            </span> · Demo-to-close ratio
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="lp-card p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--lp-white)" }}>
              Recent History
            </span>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
              style={{
                color: "oklch(0.65 0.15 27)",
                background: "oklch(0.577 0.245 27.325 / 0.1)",
                border: "1px solid oklch(0.577 0.245 27.325 / 0.2)",
              }}
            >
              <Trash2 className="w-3 h-3" /> Clear All
            </button>
          </div>
          <div className="space-y-2">
            {history.map(day => (
              <div
                key={day.date}
                className="flex items-center justify-between py-2 px-3 rounded-lg"
                style={{ background: "oklch(1 0 0 / 4%)" }}
              >
                <span className="text-sm" style={{ color: "var(--lp-slate-light)" }}>
                  {formatDate(day.date)}
                </span>
                <div className="flex items-center gap-4 text-xs">
                  {statFields.map(f => (
                    <span key={f.key} style={{ color: "var(--lp-slate)" }}>
                      <span style={{ color: f.color, fontWeight: 700 }}>{day[f.key] as number}</span> {f.label.split(" ")[0]}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
