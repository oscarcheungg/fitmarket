"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { restaurants, menuItems } from "@/lib/restaurant-data";
import { calculateMacroScore, type DietGoal } from "@/lib/macro-utils";
import { MacroScore } from "./MacroScore";

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #27272a",
  backgroundColor: "#18181b",
  fontSize: "11px",
  color: "#fafafa",
};

export function AvgCaloriesChart() {
  const data = restaurants.map((r) => {
    const items = menuItems.filter((m) => m.restaurant === r.name);
    return {
      name: r.name.length > 10 ? r.name.slice(0, 10) + "..." : r.name,
      calories: Math.round(items.reduce((s, i) => s + i.calories, 0) / items.length),
    };
  }).sort((a, b) => a.calories - b.calories);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-sm font-bold mb-4">Average Calories by Restaurant</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fill: "#71717a", fontSize: 10 }} width={90} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="calories" fill="#22c55e" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ProteinDensityChart() {
  const data = restaurants.map((r) => {
    const items = menuItems.filter((m) => m.restaurant === r.name);
    const avgProtein = items.reduce((s, i) => s + i.protein, 0) / items.length;
    const avgCalories = items.reduce((s, i) => s + i.calories, 0) / items.length;
    return {
      name: r.name.length > 10 ? r.name.slice(0, 10) + "..." : r.name,
      density: Math.round((avgProtein * 4 / avgCalories) * 100),
    };
  }).sort((a, b) => b.density - a.density);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-sm font-bold mb-1">Protein Density Ranking</h3>
      <p className="text-[10px] text-muted mb-4">% of calories from protein</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 40]} />
          <YAxis type="category" dataKey="name" tick={{ fill: "#71717a", fontSize: 10 }} width={90} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
          <Bar dataKey="density" fill="#3b82f6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HealthiestLeaderboard({ goal = "balanced" as DietGoal }) {
  const scored = menuItems
    .map((item) => ({
      ...item,
      score: calculateMacroScore(item, goal),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-sm font-bold mb-1">Healthiest Menu Items</h3>
      <p className="text-[10px] text-muted mb-4">Top 8 by balanced macro score</p>
      <div className="space-y-1">
        {scored.map((item, i) => (
          <div key={item.id} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-card-hover">
            <span className="text-xs font-bold text-muted w-4">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.name}</p>
              <p className="text-[10px] text-muted">{item.restaurant}</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono shrink-0">
              <span className="text-muted">{item.calories}cal</span>
              <span className="text-protein">P:{item.protein}g</span>
            </div>
            <MacroScore score={item.score} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
