import { NextRequest, NextResponse } from "next/server";
import { menuItems } from "@/lib/restaurant-data";

export async function GET(request: NextRequest) {
  const targetProtein = Number(request.nextUrl.searchParams.get("protein") || 30);
  const targetCarbs = Number(request.nextUrl.searchParams.get("carbs") || 50);
  const targetFat = Number(request.nextUrl.searchParams.get("fat") || 20);
  const targetCalories = Number(request.nextUrl.searchParams.get("calories") || 500);

  // Score each menu item by how well it fills remaining macros
  const scored = menuItems
    .filter((item) => item.calories <= targetCalories + 100)
    .map((item) => {
      const proteinFit = Math.min(1, item.protein / Math.max(1, targetProtein));
      const carbsFit = Math.min(1, item.carbs / Math.max(1, targetCarbs));
      const fatFit = Math.min(1, item.fat / Math.max(1, targetFat));
      const calFit = item.calories <= targetCalories ? 1 : 0.5;

      // Weighted: protein matters most, then don't exceed calories
      const score = proteinFit * 0.4 + carbsFit * 0.2 + fatFit * 0.15 + calFit * 0.25;
      return { ...item, fitScore: Math.round(score * 100) };
    })
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 6);

  // Also try CalorieNinjas for real-time suggestions
  let apiSuggestions: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodium: number;
    source: string;
  }[] = [];

  try {
    const apiKey = process.env.CALORIENINJAS_API_KEY;
    if (apiKey) {
      const queryParts = [];
      if (targetProtein > 25) queryParts.push("high protein");
      if (targetCarbs < 30) queryParts.push("low carb");
      if (targetFat < 15) queryParts.push("low fat");
      queryParts.push("meal");
      const query = queryParts.join(" ");

      const res = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
        {
          headers: { "X-Api-Key": apiKey },
          next: { revalidate: 3600 },
        }
      );

      if (res.ok) {
        const data = await res.json();
        apiSuggestions = (data.items || []).slice(0, 3).map(
          (item: {
            name: string;
            calories: number;
            protein_g: number;
            carbohydrates_total_g: number;
            fat_total_g: number;
            fiber_g: number;
            sodium_mg: number;
          }) => ({
            name: item.name,
            calories: Math.round(item.calories),
            protein: Math.round(item.protein_g),
            carbs: Math.round(item.carbohydrates_total_g),
            fat: Math.round(item.fat_total_g),
            fiber: Math.round(item.fiber_g),
            sodium: Math.round(item.sodium_mg),
            source: "CalorieNinjas API",
          })
        );
      }
    }
  } catch (err) {
    console.error("Suggest API error:", err);
  }

  return NextResponse.json({
    fromDatabase: scored,
    fromApi: apiSuggestions,
    target: { protein: targetProtein, carbs: targetCarbs, fat: targetFat, calories: targetCalories },
    timestamp: new Date().toISOString(),
  });
}
