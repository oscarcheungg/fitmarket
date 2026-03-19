export type DietGoal = "balanced" | "highProtein" | "lowCarb" | "lowCalorie";

export interface MacroProfile {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const DIET_GOALS: { value: DietGoal; label: string; description: string }[] = [
  { value: "balanced", label: "Balanced", description: "30/40/30 protein/carbs/fat" },
  { value: "highProtein", label: "High Protein", description: "Protein > 30% of calories" },
  { value: "lowCarb", label: "Low Carb", description: "Carbs < 25% of calories" },
  { value: "lowCalorie", label: "Low Calorie", description: "Under 500 calories" },
];

export function getMacroPercentages(item: MacroProfile): {
  protein: number;
  carbs: number;
  fat: number;
} {
  const proteinCal = item.protein * 4;
  const carbsCal = item.carbs * 4;
  const fatCal = item.fat * 9;
  const total = proteinCal + carbsCal + fatCal;
  if (total === 0) return { protein: 0, carbs: 0, fat: 0 };
  return {
    protein: Math.round((proteinCal / total) * 100),
    carbs: Math.round((carbsCal / total) * 100),
    fat: Math.round((fatCal / total) * 100),
  };
}

export function calculateMacroScore(item: MacroProfile, goal: DietGoal): number {
  const pct = getMacroPercentages(item);

  switch (goal) {
    case "balanced": {
      // Ideal: ~30% protein, ~40% carbs, ~30% fat
      const pDiff = Math.abs(pct.protein - 30);
      const cDiff = Math.abs(pct.carbs - 40);
      const fDiff = Math.abs(pct.fat - 30);
      const totalDiff = pDiff + cDiff + fDiff;
      return Math.max(0, Math.round(100 - totalDiff * 1.2));
    }
    case "highProtein": {
      // Reward protein > 30%, penalize low protein
      const proteinScore = Math.min(100, Math.round(pct.protein * 2.5));
      const calPenalty = item.calories > 800 ? 15 : item.calories > 600 ? 5 : 0;
      return Math.max(0, Math.min(100, proteinScore - calPenalty));
    }
    case "lowCarb": {
      // Reward low carbs, target < 25%
      const carbScore = pct.carbs <= 15 ? 100 : pct.carbs <= 25 ? 80 : pct.carbs <= 35 ? 55 : Math.max(0, 40 - pct.carbs);
      const proteinBonus = pct.protein > 30 ? 10 : 0;
      return Math.max(0, Math.min(100, carbScore + proteinBonus));
    }
    case "lowCalorie": {
      // Linear scale: 200cal = 100, 800cal = 0
      const score = Math.round(((800 - item.calories) / 600) * 100);
      const proteinBonus = pct.protein > 25 ? 10 : 0;
      return Math.max(0, Math.min(100, score + proteinBonus));
    }
  }
}

export function getScoreColor(score: number): string {
  if (score >= 70) return "text-green";
  if (score >= 40) return "text-yellow";
  return "text-red";
}

export function getScoreBgColor(score: number): string {
  if (score >= 70) return "bg-green";
  if (score >= 40) return "bg-yellow";
  return "bg-red";
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Poor";
}

export const DEFAULT_GOALS: MacroProfile = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 65,
};
