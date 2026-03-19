"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, Lightbulb, RotateCcw } from "lucide-react";
import { SearchBar, type NutritionItem } from "./SearchBar";
import { DEFAULT_GOALS, type MacroProfile } from "@/lib/macro-utils";

interface LogEntry extends MacroProfile {
  id: string;
  name: string;
  time: string;
}

interface Suggestion {
  name: string;
  restaurant?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fitScore?: number;
}

const STORAGE_KEY_LOG = "macrocheck-daily-log";
const STORAGE_KEY_GOALS = "macrocheck-goals";
const STORAGE_KEY_DATE = "macrocheck-log-date";

export function DailyTracker() {
  const [goals, setGoals] = useState<MacroProfile>(DEFAULT_GOALS);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(STORAGE_KEY_DATE);

    // Reset log if it's a new day
    if (savedDate !== today) {
      localStorage.setItem(STORAGE_KEY_DATE, today);
      localStorage.setItem(STORAGE_KEY_LOG, "[]");
    }

    const savedGoals = localStorage.getItem(STORAGE_KEY_GOALS);
    if (savedGoals) {
      try { setGoals(JSON.parse(savedGoals)); } catch {}
    }

    const savedLog = localStorage.getItem(STORAGE_KEY_LOG);
    if (savedLog && savedDate === today) {
      try { setLog(JSON.parse(savedLog)); } catch {}
    }

    setMounted(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY_LOG, JSON.stringify(log));
  }, [log, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY_GOALS, JSON.stringify(goals));
  }, [goals, mounted]);

  const totals: MacroProfile = log.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const remaining: MacroProfile = {
    calories: Math.max(0, goals.calories - totals.calories),
    protein: Math.max(0, goals.protein - totals.protein),
    carbs: Math.max(0, goals.carbs - totals.carbs),
    fat: Math.max(0, goals.fat - totals.fat),
  };

  function addFood(item: NutritionItem) {
    const entry: LogEntry = {
      id: Date.now().toString(),
      name: item.name,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setLog((prev) => [...prev, entry]);
  }

  function removeEntry(id: string) {
    setLog((prev) => prev.filter((e) => e.id !== id));
  }

  const fetchSuggestions = useCallback(async () => {
    setLoadingSuggestions(true);
    try {
      const params = new URLSearchParams({
        protein: String(Math.round(remaining.protein)),
        carbs: String(Math.round(remaining.carbs)),
        fat: String(Math.round(remaining.fat)),
        calories: String(Math.round(remaining.calories)),
      });
      const res = await fetch(`/api/suggest?${params}`);
      const data = await res.json();
      const items = (data.fromDatabase || []).map((item: Suggestion & { fitScore?: number }) => ({
        name: item.name,
        restaurant: item.restaurant,
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat,
        fitScore: item.fitScore,
      }));
      setSuggestions(items);
    } catch {
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  }, [remaining.protein, remaining.carbs, remaining.fat, remaining.calories]);

  const progressBars = [
    { label: "Calories", current: totals.calories, goal: goals.calories, unit: "cal", color: "#22c55e" },
    { label: "Protein", current: totals.protein, goal: goals.protein, unit: "g", color: "#3b82f6" },
    { label: "Carbs", current: totals.carbs, goal: goals.carbs, unit: "g", color: "#eab308" },
    { label: "Fat", current: totals.fat, goal: goals.fat, unit: "g", color: "#ef4444" },
  ];

  if (!mounted) {
    return <div className="animate-pulse bg-card rounded-xl h-96" />;
  }

  return (
    <div className="space-y-6">
      {/* Goals */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-sm font-bold mb-3">Daily Goals</h3>
        <div className="grid grid-cols-4 gap-3">
          {(["calories", "protein", "carbs", "fat"] as const).map((key) => (
            <div key={key}>
              <label className="text-[10px] text-muted uppercase tracking-wider">{key}</label>
              <input
                type="number"
                value={goals[key]}
                onChange={(e) => setGoals((g) => ({ ...g, [key]: Number(e.target.value) || 0 }))}
                className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-1.5 text-sm outline-none focus:border-accent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Search to add food */}
      <div>
        <h3 className="text-sm font-bold mb-2">Add Food</h3>
        <SearchBar onSelect={addFood} compact placeholder="Search food to add..." />
      </div>

      {/* Progress */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold">Today&apos;s Progress</h3>
          <span className="text-xs text-muted">{log.length} items logged</span>
        </div>
        <div className="space-y-3">
          {progressBars.map((bar) => {
            const pct = Math.min(100, (bar.current / bar.goal) * 100);
            const over = bar.current > bar.goal;
            return (
              <div key={bar.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{bar.label}</span>
                  <span className={`text-xs ${over ? "text-red font-medium" : "text-muted"}`}>
                    {Math.round(bar.current)} / {bar.goal}{bar.unit}
                  </span>
                </div>
                <div className="h-2.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, pct)}%`,
                      backgroundColor: over ? "#ef4444" : bar.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Remaining */}
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-xs text-muted mb-1">Still need:</p>
          <div className="flex gap-4 text-xs font-medium">
            <span>{remaining.calories} cal</span>
            <span className="text-protein">{remaining.protein}g protein</span>
            <span className="text-carbs">{remaining.carbs}g carbs</span>
            <span className="text-fat">{remaining.fat}g fat</span>
          </div>
        </div>
      </div>

      {/* Food log */}
      {log.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">Food Log</h3>
            <button
              onClick={() => setLog([])}
              className="text-[10px] text-muted hover:text-red flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Clear all
            </button>
          </div>
          <div className="space-y-1">
            {log.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-card-hover"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium capitalize truncate">{entry.name}</p>
                  <p className="text-[10px] text-muted">{entry.time}</p>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono shrink-0 ml-3">
                  <span className="text-muted">{entry.calories}cal</span>
                  <span className="text-protein">P:{entry.protein}g</span>
                  <span className="text-carbs">C:{entry.carbs}g</span>
                  <span className="text-fat">F:{entry.fat}g</span>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="p-1 text-muted hover:text-red"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-accent" />
            What Should I Eat?
          </h3>
          <button
            onClick={fetchSuggestions}
            disabled={loadingSuggestions}
            className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-lg hover:bg-accent/20 transition-colors disabled:opacity-50"
          >
            {loadingSuggestions ? "Finding..." : "Get Suggestions"}
          </button>
        </div>
        {suggestions.length > 0 ? (
          <div className="space-y-1">
            {suggestions.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-card-hover">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{s.name}</p>
                  {s.restaurant && <p className="text-[10px] text-muted">{s.restaurant}</p>}
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono shrink-0 ml-3">
                  <span className="text-muted">{s.calories}cal</span>
                  <span className="text-protein">P:{s.protein}g</span>
                  <span className="text-carbs">C:{s.carbs}g</span>
                  <span className="text-fat">F:{s.fat}g</span>
                  {s.fitScore && <span className="text-accent text-[10px]">{s.fitScore}% match</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted">
            Click &quot;Get Suggestions&quot; to find foods that fill your remaining macros from our restaurant database.
          </p>
        )}
      </div>
    </div>
  );
}
