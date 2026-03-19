"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getMacroPercentages, type MacroProfile } from "@/lib/macro-utils";

interface MacroBreakdownProps {
  item: MacroProfile & { name?: string; fiber?: number; sodium?: number; sugar?: number; servingSize?: number };
}

const MACRO_COLORS = {
  protein: "#3b82f6",
  carbs: "#eab308",
  fat: "#ef4444",
};

export function MacroBreakdown({ item }: MacroBreakdownProps) {
  const pct = getMacroPercentages(item);
  const pieData = [
    { name: "Protein", value: pct.protein, color: MACRO_COLORS.protein },
    { name: "Carbs", value: pct.carbs, color: MACRO_COLORS.carbs },
    { name: "Fat", value: pct.fat, color: MACRO_COLORS.fat },
  ];

  const macros = [
    { label: "Protein", value: item.protein, unit: "g", pct: pct.protein, color: MACRO_COLORS.protein, bgColor: "bg-protein-light" },
    { label: "Carbs", value: item.carbs, unit: "g", pct: pct.carbs, color: MACRO_COLORS.carbs, bgColor: "bg-carbs-light" },
    { label: "Fat", value: item.fat, unit: "g", pct: pct.fat, color: MACRO_COLORS.fat, bgColor: "bg-fat-light" },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-5 animate-fade-in">
      {item.name && (
        <h3 className="text-sm font-bold capitalize mb-4">{item.name}</h3>
      )}

      <div className="flex items-center gap-6">
        {/* Donut chart */}
        <div className="relative w-32 h-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                dataKey="value"
                strokeWidth={0}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold">{item.calories}</span>
            <span className="text-[10px] text-muted">cal</span>
          </div>
        </div>

        {/* Macro bars */}
        <div className="flex-1 space-y-3">
          {macros.map((m) => (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">{m.label}</span>
                <span className="text-xs text-muted">
                  {m.value}{m.unit} · {m.pct}%
                </span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${m.pct}%`, backgroundColor: m.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary stats */}
      <div className="mt-4 pt-3 border-t border-border flex gap-4 text-[11px] text-muted">
        {item.fiber !== undefined && <span>Fiber: {item.fiber}g</span>}
        {item.sodium !== undefined && <span>Sodium: {item.sodium}mg</span>}
        {item.sugar !== undefined && <span>Sugar: {item.sugar}g</span>}
        {item.servingSize !== undefined && <span>Serving: {item.servingSize}g</span>}
      </div>
    </div>
  );
}
