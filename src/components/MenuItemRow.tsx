"use client";

import { Plus, Check } from "lucide-react";
import { MacroScore } from "./MacroScore";

interface MenuItemRowProps {
  name: string;
  restaurant?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  macroScore?: number;
  onAdd?: () => void;
  added?: boolean;
  onClick?: () => void;
}

export function MenuItemRow({
  name,
  restaurant,
  calories,
  protein,
  carbs,
  fat,
  macroScore,
  onAdd,
  added,
  onClick,
}: MenuItemRowProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-card-hover transition-colors ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        {restaurant && (
          <p className="text-[10px] text-muted">{restaurant}</p>
        )}
      </div>

      <div className="flex items-center gap-4 shrink-0 ml-3">
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="text-muted">{calories}cal</span>
          <span className="text-protein">P:{protein}g</span>
          <span className="text-carbs">C:{carbs}g</span>
          <span className="text-fat">F:{fat}g</span>
        </div>

        {macroScore !== undefined && <MacroScore score={macroScore} size="sm" />}

        {onAdd && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className={`p-1 rounded-md transition-colors ${
              added
                ? "bg-green/10 text-green"
                : "bg-card-hover text-muted hover:text-foreground"
            }`}
          >
            {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
}
