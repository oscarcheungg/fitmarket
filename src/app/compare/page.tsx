import { MealComparison } from "@/components/MealComparison";

export default function ComparePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Meal Comparison</h1>
      <p className="text-sm text-muted mb-6">
        Compare nutrition across menu items side by side with radar charts.
      </p>
      <MealComparison />
    </div>
  );
}
