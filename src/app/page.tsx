"use client";

import { useState } from "react";
import { Search, Plus, X, ShoppingBag } from "lucide-react";
import { GoalSelector } from "@/components/GoalSelector";
import { MacroScore } from "@/components/MacroScore";
import { MacroBreakdown } from "@/components/MacroBreakdown";
import {
  restaurants,
  getMenuByRestaurant,
  type Restaurant,
  type MenuItem,
} from "@/lib/restaurant-data";
import {
  calculateMacroScore,
  getMacroPercentages,
  type DietGoal,
} from "@/lib/macro-utils";

interface ScoredItem extends MenuItem {
  macroScore: number;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [goal, setGoal] = useState<DietGoal>("balanced");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [rankedItems, setRankedItems] = useState<ScoredItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ScoredItem | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mealBuilder, setMealBuilder] = useState<ScoredItem[]>([]);
  const [showMealBuilder, setShowMealBuilder] = useState(false);

  const filtered = query.trim().length > 0
    ? restaurants.filter((r) =>
        r.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  function selectRestaurant(r: Restaurant) {
    setSelectedRestaurant(r);
    setQuery(r.name);
    setShowSuggestions(false);
    setSelectedItem(null);
    const items = getMenuByRestaurant(r.id).map((item) => ({
      ...item,
      macroScore: calculateMacroScore(item, goal),
    }));
    items.sort((a, b) => b.macroScore - a.macroScore);
    setRankedItems(items);
  }

  function handleGoalChange(newGoal: DietGoal) {
    setGoal(newGoal);
    if (selectedRestaurant) {
      const items = getMenuByRestaurant(selectedRestaurant.id).map((item) => ({
        ...item,
        macroScore: calculateMacroScore(item, newGoal),
      }));
      items.sort((a, b) => b.macroScore - a.macroScore);
      setRankedItems(items);
    }
  }

  function clearSearch() {
    setQuery("");
    setSelectedRestaurant(null);
    setRankedItems([]);
    setSelectedItem(null);
  }

  function addToMeal(item: ScoredItem) {
    setMealBuilder((prev) => [...prev, item]);
    setShowMealBuilder(true);
  }

  function removeFromMeal(index: number) {
    setMealBuilder((prev) => prev.filter((_, i) => i !== index));
  }

  const mealTotals = mealBuilder.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const hasResults = selectedRestaurant && rankedItems.length > 0;

  return (
    <div className="min-h-screen flex flex-col animated-bg">
      {/* Hero / Search */}
      <div className={`relative z-10 transition-all duration-500 ${hasResults ? "pt-6 pb-4" : "pt-24 pb-12"}`}>
        <div className="max-w-2xl mx-auto px-6">
          {/* Logo — simple wordmark */}
          <div className={`flex items-center justify-center transition-all duration-500 ${hasResults ? "mb-1 scale-[0.6] origin-top" : "mb-2"}`}>
            <h1 className="text-4xl font-extrabold tracking-tight">
              <span className="text-accent">m</span>acrofy
            </h1>
          </div>
          {!hasResults && (
            <p className="text-center text-muted text-sm mb-8">
              Find the best macro-friendly menu items at any restaurant.
            </p>
          )}

          {/* Search bar */}
          <div className="relative">
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-border shadow-sm transition-shadow hover:shadow-md">
              <Search className="w-4 h-4 text-muted shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                  if (!e.target.value.trim()) clearSearch();
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search a restaurant..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted text-[15px]"
              />
              {query && (
                <button onClick={clearSearch} className="text-xs text-muted hover:text-foreground transition-colors">
                  Clear
                </button>
              )}
            </div>

            {/* Dropdown */}
            {showSuggestions && filtered.length > 0 && !selectedRestaurant && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-border shadow-lg z-50 overflow-hidden animate-slide-down">
                {filtered.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => selectRestaurant(r)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-border last:border-b-0"
                  >
                    <span className="text-lg">{r.emoji}</span>
                    <span className="text-sm font-medium">{r.name}</span>
                    <span className="text-[11px] text-muted ml-auto">
                      {getMenuByRestaurant(r.id).length} items
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Goal selector */}
          <div className="flex justify-center mt-4">
            <GoalSelector value={goal} onChange={handleGoalChange} />
          </div>
        </div>
      </div>

      {/* Results */}
      {hasResults && (
        <div className="flex-1 max-w-2xl mx-auto w-full px-6 pb-12 relative z-10">
          <div className="flex items-center gap-3 mb-5 animate-fade-in">
            <span className="text-2xl">{selectedRestaurant.emoji}</span>
            <div className="flex-1">
              <h2 className="text-lg font-bold">{selectedRestaurant.name}</h2>
              <p className="text-[11px] text-muted">
                {rankedItems.length} items ranked by{" "}
                {goal === "balanced" ? "balanced macros" : goal === "highProtein" ? "protein" : goal === "lowCarb" ? "low carb" : "low calorie"}
              </p>
            </div>
            {mealBuilder.length > 0 && (
              <button
                onClick={() => setShowMealBuilder(!showMealBuilder)}
                className="flex items-center gap-1.5 text-xs font-medium text-accent bg-accent-light px-3 py-1.5 rounded-lg transition-colors hover:bg-accent/10"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Meal ({mealBuilder.length})
              </button>
            )}
          </div>

          <div className="space-y-2">
            {rankedItems.map((item, i) => {
              const inMeal = mealBuilder.some((m) => m.id === item.id);
              return (
                <div
                  key={item.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: "backwards" }}
                >
                  <div
                    className={`bg-white rounded-xl border transition-all duration-200 ${
                      selectedItem?.id === item.id
                        ? "border-accent shadow-md"
                        : "border-border hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      <span className={`text-base font-bold w-7 text-center tabular-nums ${
                        i === 0 ? "text-accent" : i < 3 ? "text-foreground" : "text-muted"
                      }`}>
                        {i + 1}
                      </span>

                      <button
                        onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                        className="flex-1 min-w-0 text-left"
                      >
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-[10px] text-muted mt-0.5">{item.category}</p>
                      </button>

                      <div className="flex items-center gap-2.5 text-[11px] font-mono shrink-0">
                        <span className="text-muted">{item.calories}</span>
                        <span className="text-protein">P:{item.protein}</span>
                        <span className="text-carbs">C:{item.carbs}</span>
                        <span className="text-fat">F:{item.fat}</span>
                      </div>

                      <MacroScore score={item.macroScore} size="sm" />

                      <button
                        onClick={() => addToMeal(item)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          inMeal ? "bg-accent/10 text-accent" : "hover:bg-gray-100 text-muted hover:text-foreground"
                        }`}
                        title="Add to meal"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {selectedItem?.id === item.id && (
                      <div className="px-4 pb-4 border-t border-border">
                        <div className="pt-3 animate-fade-in">
                          <MacroBreakdown item={{ ...item, name: undefined }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-5 border-t border-border flex items-center gap-5 text-[11px] text-muted">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green rounded-full animate-pulse-dot" />
              CalorieNinjas API
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              {restaurants.length * 8}+ verified menu items
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!hasResults && (
        <div className="max-w-3xl mx-auto px-6 pb-16 relative z-10">
          <p className="text-[11px] text-muted text-center mb-3 uppercase tracking-wider font-medium">Popular restaurants</p>
          <div className="flex flex-wrap justify-center gap-2">
            {restaurants.map((r, i) => (
              <button
                key={r.id}
                onClick={() => {
                  setQuery(r.name);
                  selectRestaurant(r);
                }}
                className="flex items-center gap-2 bg-white border border-border rounded-lg px-3.5 py-2 hover:shadow-sm hover:border-gray-300 transition-all text-sm animate-fade-in-up"
                style={{ animationDelay: `${i * 30}ms`, animationFillMode: "backwards" }}
              >
                <span>{r.emoji}</span>
                <span className="text-xs font-medium text-foreground">{r.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Meal Builder Panel */}
      {showMealBuilder && mealBuilder.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
          <div className="max-w-2xl mx-auto px-6 pb-6">
            <div className="bg-white rounded-2xl border border-border shadow-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-bold">Meal Builder</h3>
                  <span className="text-[10px] text-muted">({mealBuilder.length} items)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMealBuilder([])}
                    className="text-[10px] text-muted hover:text-red transition-colors"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setShowMealBuilder(false)}
                    className="text-muted hover:text-foreground p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items list */}
              <div className="space-y-1.5 mb-4 max-h-32 overflow-y-auto">
                {mealBuilder.map((item, i) => (
                  <div key={`${item.id}-${i}`} className="flex items-center gap-2 text-xs py-1">
                    <span className="flex-1 truncate font-medium">{item.name}</span>
                    <span className="text-muted font-mono">{item.calories}cal</span>
                    <button onClick={() => removeFromMeal(i)} className="text-muted hover:text-red p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold">Total</span>
                  <span className="text-lg font-bold">{mealTotals.calories} cal</span>
                </div>
                <div className="flex items-center gap-4">
                  {[
                    { label: "Protein", value: mealTotals.protein, color: "#3b82f6" },
                    { label: "Carbs", value: mealTotals.carbs, color: "#f59e0b" },
                    { label: "Fat", value: mealTotals.fat, color: "#ef4444" },
                  ].map((m) => {
                    const pct = getMacroPercentages(mealTotals);
                    const pctVal = m.label === "Protein" ? pct.protein : m.label === "Carbs" ? pct.carbs : pct.fat;
                    return (
                      <div key={m.label} className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] font-medium">{m.label}</span>
                          <span className="text-[10px] text-muted">{m.value}g · {pctVal}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{ width: `${pctVal}%`, backgroundColor: m.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
