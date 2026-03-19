import { NextRequest, NextResponse } from "next/server";
import { restaurants, menuItems, getMenuByRestaurant } from "@/lib/restaurant-data";
import { calculateMacroScore, DietGoal } from "@/lib/macro-utils";

export async function GET(request: NextRequest) {
  const restaurantId = request.nextUrl.searchParams.get("id");
  const goal = (request.nextUrl.searchParams.get("goal") || "balanced") as DietGoal;

  if (restaurantId) {
    const restaurant = restaurants.find((r) => r.id === restaurantId);
    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const items = getMenuByRestaurant(restaurantId).map((item) => ({
      ...item,
      macroScore: calculateMacroScore(item, goal),
    }));
    items.sort((a, b) => b.macroScore - a.macroScore);

    return NextResponse.json({
      restaurant,
      items,
      goal,
      timestamp: new Date().toISOString(),
    });
  }

  // Return all restaurants with summary stats
  const restaurantSummaries = restaurants.map((r) => {
    const items = menuItems.filter((m) => m.restaurant === r.name);
    const avgCalories = Math.round(items.reduce((s, i) => s + i.calories, 0) / items.length);
    const avgProtein = Math.round(items.reduce((s, i) => s + i.protein, 0) / items.length);
    const bestScore = Math.max(...items.map((i) => calculateMacroScore(i, goal)));
    return {
      ...r,
      itemCount: items.length,
      avgCalories,
      avgProtein,
      bestScore,
    };
  });

  return NextResponse.json({
    restaurants: restaurantSummaries,
    goal,
    timestamp: new Date().toISOString(),
  });
}
