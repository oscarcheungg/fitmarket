"use client";

import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SearchBar, type NutritionItem } from "./SearchBar";
import { GoalSelector } from "./GoalSelector";
import { MacroScore } from "./MacroScore";
import { calculateMacroScore, type DietGoal, getMacroPercentages } from "@/lib/macro-utils";
import { Trophy, X } from "lucide-react";

const COLORS = ["#3b82f6", "#22c55e", "#eab308", "#ef4444"];

export function MealComparison() {
  const [items, setItems] = useState<(NutritionItem | null)[]>([null, null]);
  const [goal, setGoal] = useState<DietGoal>("balanced");

  function setItem(index: number, item: NutritionItem) {
    setItems((prev) => {
      const next = [...prev];
      next[index] = item;
      return next;
    });
  }

  function removeItem(index: number) {
    setItems((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }

  function addSlot() {
    if (items.length < 4) setItems((prev) => [...prev, null]);
  }

  const filled = items.filter((i): i is NutritionItem => i !== null);
  const scores = filled.map((item) => calculateMacroScore(item, goal));
  const bestIndex = scores.length > 0 ? scores.indexOf(Math.max(...scores)) : -1;

  // Normalize for radar chart
  const radarData = (() => {
    if (filled.length === 0) return [];
    const maxVals = {
      calories: Math.max(...filled.map((i) => i.calories), 1),
      protein: Math.max(...filled.map((i) => i.protein), 1),
      carbs: Math.max(...filled.map((i) => i.carbs), 1),
      fat: Math.max(...filled.map((i) => i.fat), 1),
      fiber: Math.max(...filled.map((i) => i.fiber || 0), 1),
    };

    return [
      { metric: "Calories", ...Object.fromEntries(filled.map((item, i) => [`item${i}`, Math.round((item.calories / maxVals.calories) * 100)])) },
      { metric: "Protein", ...Object.fromEntries(filled.map((item, i) => [`item${i}`, Math.round((item.protein / maxVals.protein) * 100)])) },
      { metric: "Carbs", ...Object.fromEntries(filled.map((item, i) => [`item${i}`, Math.round((item.carbs / maxVals.carbs) * 100)])) },
      { metric: "Fat", ...Object.fromEntries(filled.map((item, i) => [`item${i}`, Math.round((item.fat / maxVals.fat) * 100)])) },
      { metric: "Fiber", ...Object.fromEntries(filled.map((item, i) => [`item${i}`, Math.round(((item.fiber || 0) / maxVals.fiber) * 100)])) },
    ];
  })();

  return (
    <div className="space-y-6">
      {/* Goal selector */}
      <div className="flex items-center justify-between">
        <GoalSelector value={goal} onChange={setGoal} />
        {items.length < 4 && (
          <button
            onClick={addSlot}
            className="text-xs text-accent hover:text-accent-dark"
          >
            + Add slot
          </button>
        )}
      </div>

      {/* Search slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted font-medium">Item {i + 1}</span>
              {item && (
                <button onClick={() => removeItem(i)} className="text-muted hover:text-red">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {item ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold capitalize">{item.name}</p>
                  <div className="flex items-center gap-2">
                    {bestIndex === filled.indexOf(item) && filled.length > 1 && (
                      <Trophy className="w-3.5 h-3.5 text-accent" />
                    )}
                    <MacroScore score={calculateMacroScore(item, goal)} size="sm" />
                  </div>
                </div>
                <div className="flex gap-3 text-[11px] font-mono">
                  <span className="text-muted">{item.calories}cal</span>
                  <span className="text-protein">P:{item.protein}g</span>
                  <span className="text-carbs">C:{item.carbs}g</span>
                  <span className="text-fat">F:{item.fat}g</span>
                </div>
                <div className="mt-2 text-[10px] text-muted">
                  {(() => {
                    const pct = getMacroPercentages(item);
                    return `${pct.protein}% protein · ${pct.carbs}% carbs · ${pct.fat}% fat`;
                  })()}
                </div>
              </div>
            ) : (
              <SearchBar
                onSelect={(selected) => setItem(i, selected)}
                compact
                placeholder="Search a food..."
              />
            )}
          </div>
        ))}
      </div>

      {/* Radar chart */}
      {filled.length >= 2 && (
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-bold mb-4">Macro Profile Comparison</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#27272a" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: "#71717a", fontSize: 11 }}
              />
              {filled.map((item, i) => (
                <Radar
                  key={i}
                  name={item.name}
                  dataKey={`item${i}`}
                  stroke={COLORS[i]}
                  fill={COLORS[i]}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              ))}
              <Legend
                wrapperStyle={{ fontSize: "11px", color: "#71717a" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Comparison table */}
      {filled.length >= 2 && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs text-muted font-medium">Metric</th>
                {filled.map((item, i) => (
                  <th key={i} className="text-right px-4 py-3 text-xs font-medium capitalize">
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(["calories", "protein", "carbs", "fat", "fiber"] as const).map((key) => {
                const values = filled.map((item) => key === "fiber" ? (item.fiber || 0) : item[key]);
                const bestVal = key === "calories"
                  ? Math.min(...values)
                  : key === "fat" ? Math.min(...values) : Math.max(...values);
                return (
                  <tr key={key} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-2.5 text-xs text-muted capitalize">{key}</td>
                    {values.map((val, i) => (
                      <td
                        key={i}
                        className={`text-right px-4 py-2.5 text-xs font-mono ${
                          val === bestVal && filled.length > 1 ? "text-accent font-medium" : ""
                        }`}
                      >
                        {val}{key === "calories" ? "" : "g"}
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr className="bg-background/50">
                <td className="px-4 py-2.5 text-xs font-medium">Score</td>
                {filled.map((item, i) => (
                  <td key={i} className="text-right px-4 py-2.5 text-xs font-mono font-medium">
                    {calculateMacroScore(item, goal)}/100
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
