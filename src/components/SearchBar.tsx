"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, X } from "lucide-react";

export interface NutritionItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  sugar?: number;
  servingSize?: number;
}

interface SearchBarProps {
  onResult?: (items: NutritionItem[]) => void;
  onSelect?: (item: NutritionItem) => void;
  placeholder?: string;
  compact?: boolean;
}

export function SearchBar({ onResult, onSelect, placeholder, compact }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<NutritionItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/nutrition?query=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        const items: NutritionItem[] = data.items || [];
        setResults(items);
        setShowResults(items.length > 0);
        onResult?.(items);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, onResult]);

  function handleSelect(item: NutritionItem) {
    onSelect?.(item);
    setShowResults(false);
    if (compact) setQuery("");
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className={`flex items-center gap-3 bg-card border border-border rounded-xl ${compact ? "px-3 py-2" : "px-5 py-4"}`}>
        {loading ? (
          <Loader2 className={`${compact ? "w-4 h-4" : "w-5 h-5"} text-muted animate-spin`} />
        ) : (
          <Search className={`${compact ? "w-4 h-4" : "w-5 h-5"} text-muted`} />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder={placeholder || "Search any food (e.g. chicken breast, big mac, chipotle bowl)..."}
          className={`flex-1 bg-transparent outline-none text-foreground placeholder:text-muted ${compact ? "text-sm" : "text-base"}`}
        />
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); setShowResults(false); }}>
            <X className="w-4 h-4 text-muted hover:text-foreground" />
          </button>
        )}
      </div>

      {showResults && onSelect && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl z-40 max-h-64 overflow-y-auto">
          {results.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(item)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-card-hover transition-colors text-left border-b border-border last:border-b-0"
            >
              <span className="text-sm font-medium capitalize">{item.name}</span>
              <div className="flex items-center gap-3 text-[11px] text-muted">
                <span>{item.calories} cal</span>
                <span className="text-protein">P:{item.protein}g</span>
                <span className="text-carbs">C:{item.carbs}g</span>
                <span className="text-fat">F:{item.fat}g</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
