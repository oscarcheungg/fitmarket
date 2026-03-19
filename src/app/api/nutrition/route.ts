import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  if (!query) {
    return NextResponse.json(
      { error: "query parameter required", items: [] },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.CALORIENINJAS_API_KEY;
    if (!apiKey) {
      throw new Error("CALORIENINJAS_API_KEY not configured");
    }

    const res = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
      {
        headers: { "X-Api-Key": apiKey },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`CalorieNinjas API error: ${res.status}`);
    }

    const data = await res.json();

    const items = (data.items || []).map(
      (item: {
        name: string;
        calories: number;
        protein_g: number;
        carbohydrates_total_g: number;
        fat_total_g: number;
        fiber_g: number;
        sodium_mg: number;
        sugar_g: number;
        serving_size_g: number;
      }) => ({
        name: item.name,
        calories: Math.round(item.calories),
        protein: Math.round(item.protein_g * 10) / 10,
        carbs: Math.round(item.carbohydrates_total_g * 10) / 10,
        fat: Math.round(item.fat_total_g * 10) / 10,
        fiber: Math.round(item.fiber_g * 10) / 10,
        sodium: Math.round(item.sodium_mg),
        sugar: Math.round(item.sugar_g * 10) / 10,
        servingSize: Math.round(item.serving_size_g),
      })
    );

    return NextResponse.json({
      items,
      query,
      timestamp: new Date().toISOString(),
      live: true,
    });
  } catch (error) {
    console.error("Nutrition API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch nutrition data", items: [], live: false },
      { status: 500 }
    );
  }
}
