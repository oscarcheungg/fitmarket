"use client";

import Link from "next/link";
import { MacroScore } from "./MacroScore";

interface RestaurantCardProps {
  id: string;
  name: string;
  emoji: string;
  itemCount: number;
  avgCalories: number;
  avgProtein: number;
  bestScore: number;
  goal: string;
}

export function RestaurantCard({
  id,
  name,
  emoji,
  itemCount,
  avgCalories,
  avgProtein,
  bestScore,
  goal,
}: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurants?id=${id}&goal=${goal}`}
      className="bg-card rounded-xl border border-border p-5 hover:bg-card-hover transition-all cursor-pointer group animate-fade-in"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{emoji}</span>
        <MacroScore score={bestScore} size="sm" />
      </div>
      <h3 className="text-sm font-bold group-hover:text-accent transition-colors">
        {name}
      </h3>
      <p className="text-[11px] text-muted mt-1">{itemCount} menu items</p>
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border text-[11px] text-muted">
        <span>Avg {avgCalories} cal</span>
        <span>Avg {avgProtein}g protein</span>
      </div>
    </Link>
  );
}
