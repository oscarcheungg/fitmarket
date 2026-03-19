"use client";

import { useState } from "react";
import { SearchBar, type NutritionItem } from "@/components/SearchBar";
import { MacroBreakdown } from "@/components/MacroBreakdown";
import { MacroScore } from "@/components/MacroScore";
import { GoalSelector } from "@/components/GoalSelector";
import {
  AvgCaloriesChart,
  ProteinDensityChart,
  HealthiestLeaderboard,
} from "@/components/RestaurantAnalytics";
import { calculateMacroScore, type DietGoal } from "@/lib/macro-utils";
import { Zap } from "lucide-react";

export default function Home() {
  const [results, setResults] = useState<NutritionItem[]>([]);
  const [goal, setGoal] = useState<DietGoal>("balanced");

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">MacroCheck</h1>
          <p className="text-sm text-muted mt-1">
            Search any food for instant macro breakdowns. Compare restaurant
            menus. Track your daily nutrition.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full shrink-0">
          <Zap className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Live API</span>
        </div>
      </div>

      {/* Search */}
      <SearchBar onResult={setResults} />

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">
              {results.length} item{results.length > 1 ? "s" : ""} found
            </h2>
            <GoalSelector value={goal} onChange={setGoal} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {results.map((item, i) => (
              <div key={i} className="relative">
                <MacroBreakdown item={item} />
                <div className="absolute top-4 right-4">
                  <MacroScore
                    score={calculateMacroScore(item, goal)}
                    size="md"
                    showLabel
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics */}
      <div>
        <h2 className="text-lg font-bold mb-4">Restaurant Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AvgCaloriesChart />
          <ProteinDensityChart />
        </div>
      </div>

      <HealthiestLeaderboard goal={goal} />

      {/* Data source footer */}
      <footer className="border-t border-border pt-6 pb-4">
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
          Data Sources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSource
            name="CalorieNinjas API"
            description="Real-time nutrition data for any food via natural language search"
            refresh="Live (cached 1 hour)"
          />
          <DataSource
            name="Restaurant Database"
            description="100+ menu items across 10 major chains with verified nutrition data"
            refresh="Static dataset"
          />
        </div>
      </footer>
    </div>
  );
}

function DataSource({ name, description, refresh }: { name: string; description: string; refresh: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 bg-green rounded-full mt-1.5 shrink-0 animate-pulse-dot" />
      <div>
        <p className="text-xs font-semibold">{name}</p>
        <p className="text-[11px] text-muted mt-0.5">{description}</p>
        <p className="text-[10px] text-stone-400 mt-0.5">{refresh}</p>
      </div>
    </div>
  );
}
