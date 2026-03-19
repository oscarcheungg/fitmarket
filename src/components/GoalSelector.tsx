"use client";

import { DietGoal, DIET_GOALS } from "@/lib/macro-utils";

interface GoalSelectorProps {
  value: DietGoal;
  onChange: (goal: DietGoal) => void;
}

export function GoalSelector({ value, onChange }: GoalSelectorProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {DIET_GOALS.map((goal) => (
        <button
          key={goal.value}
          onClick={() => onChange(goal.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
            value === goal.value
              ? "bg-accent text-white shadow-sm"
              : "bg-white border border-border text-muted hover:text-foreground hover:border-gray-300"
          }`}
          title={goal.description}
        >
          {goal.label}
        </button>
      ))}
    </div>
  );
}
