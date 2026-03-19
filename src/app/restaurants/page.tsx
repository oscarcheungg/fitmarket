"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RestaurantCard } from "@/components/RestaurantCard";
import { MenuItemRow } from "@/components/MenuItemRow";
import { GoalSelector } from "@/components/GoalSelector";
import { MacroScore } from "@/components/MacroScore";
import { type DietGoal, calculateMacroScore } from "@/lib/macro-utils";
import { restaurants, getMenuByRestaurant } from "@/lib/restaurant-data";
import { menuItems } from "@/lib/restaurant-data";
import { ArrowLeft, Filter } from "lucide-react";

export default function RestaurantsPage() {
  return (
    <Suspense fallback={<div className="p-8 animate-pulse"><div className="h-8 bg-card rounded w-48 mb-4" /><div className="h-64 bg-card rounded" /></div>}>
      <RestaurantsContent />
    </Suspense>
  );
}

function RestaurantsContent() {
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("id");
  const [goal, setGoal] = useState<DietGoal>(
    (searchParams.get("goal") as DietGoal) || "balanced"
  );
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Reset category filter when restaurant changes
  useEffect(() => {
    setCategoryFilter(null);
  }, [restaurantId]);

  if (restaurantId) {
    return (
      <RestaurantDetail
        restaurantId={restaurantId}
        goal={goal}
        onGoalChange={setGoal}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Restaurants</h1>
        <p className="text-sm text-muted mt-1">
          Browse restaurant menus ranked by macro score for your diet goal.
        </p>
      </div>

      <GoalSelector value={goal} onChange={setGoal} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((r) => {
          const items = menuItems.filter((m) => m.restaurant === r.name);
          const avgCalories = Math.round(
            items.reduce((s, i) => s + i.calories, 0) / items.length
          );
          const avgProtein = Math.round(
            items.reduce((s, i) => s + i.protein, 0) / items.length
          );
          const bestScore = Math.max(
            ...items.map((i) => calculateMacroScore(i, goal))
          );
          return (
            <RestaurantCard
              key={r.id}
              id={r.id}
              name={r.name}
              emoji={r.emoji}
              itemCount={items.length}
              avgCalories={avgCalories}
              avgProtein={avgProtein}
              bestScore={bestScore}
              goal={goal}
            />
          );
        })}
      </div>
    </div>
  );
}

function RestaurantDetail({
  restaurantId,
  goal,
  onGoalChange,
  categoryFilter,
  onCategoryChange,
}: {
  restaurantId: string;
  goal: DietGoal;
  onGoalChange: (g: DietGoal) => void;
  categoryFilter: string | null;
  onCategoryChange: (c: string | null) => void;
}) {
  const restaurant = restaurants.find((r) => r.id === restaurantId);
  if (!restaurant) {
    return (
      <div className="p-8">
        <p className="text-muted">Restaurant not found.</p>
        <Link href="/restaurants" className="text-accent text-sm mt-2 inline-block">
          Back to restaurants
        </Link>
      </div>
    );
  }

  const allItems = getMenuByRestaurant(restaurantId)
    .map((item) => ({
      ...item,
      macroScore: calculateMacroScore(item, goal),
    }))
    .sort((a, b) => b.macroScore - a.macroScore);

  const categories = [...new Set(allItems.map((i) => i.category))];
  const filteredItems = categoryFilter
    ? allItems.filter((i) => i.category === categoryFilter)
    : allItems;

  const avgScore = Math.round(
    allItems.reduce((s, i) => s + i.macroScore, 0) / allItems.length
  );

  return (
    <div className="p-8 space-y-6">
      <Link
        href="/restaurants"
        className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Restaurants
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{restaurant.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <p className="text-sm text-muted">
              {allItems.length} items · Avg score: {avgScore}/100
            </p>
          </div>
        </div>
        <MacroScore score={avgScore} size="lg" showLabel />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <GoalSelector value={goal} onChange={onGoalChange} />
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-muted" />
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
              !categoryFilter ? "bg-accent text-white" : "text-muted hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                categoryFilter === cat
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border divide-y divide-border">
        {filteredItems.map((item) => (
          <MenuItemRow
            key={item.id}
            name={item.name}
            calories={item.calories}
            protein={item.protein}
            carbs={item.carbs}
            fat={item.fat}
            macroScore={item.macroScore}
          />
        ))}
      </div>
    </div>
  );
}
