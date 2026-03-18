import { NextResponse } from "next/server";

// Simulated Google Trends-style data for fitness topics
// In production, this would connect to Google Trends API or SerpAPI
const TOPICS = [
  "gym membership",
  "home workout",
  "yoga classes",
  "running shoes",
  "protein powder",
  "HIIT workout",
  "CrossFit",
  "ozempic fitness",
  "wearable fitness",
  "pilates",
];

function generateTrendData(topic: string) {
  // Seed-based pseudo-random for consistency
  let seed = 0;
  for (let i = 0; i < topic.length; i++) {
    seed = ((seed << 5) - seed + topic.charCodeAt(i)) | 0;
  }

  const baseInterest: Record<string, number> = {
    "gym membership": 82,
    "home workout": 45,
    "yoga classes": 58,
    "running shoes": 71,
    "protein powder": 65,
    "HIIT workout": 38,
    "CrossFit": 34,
    "ozempic fitness": 88,
    "wearable fitness": 72,
    "pilates": 76,
  };

  const base = baseInterest[topic] || 50;
  const trend: { month: string; interest: number }[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);
    const monthStr = date.toISOString().slice(0, 7);

    // Seasonality: gym peaks in Jan, outdoor peaks in summer
    const month = date.getMonth();
    let seasonal = 0;
    if (topic.includes("gym") || topic.includes("workout") || topic.includes("CrossFit")) {
      seasonal = month === 0 ? 20 : month === 1 ? 12 : month >= 5 && month <= 7 ? -15 : 0;
    } else if (topic.includes("running") || topic.includes("yoga") || topic.includes("pilates")) {
      seasonal = month >= 3 && month <= 8 ? 10 : -5;
    }

    // Add some deterministic variation
    const variation = ((Math.sin(seed + i * 1.7) * 10) | 0);
    const value = Math.max(5, Math.min(100, base + seasonal + variation));

    trend.push({ month: monthStr, interest: value });
  }

  // Calculate trend direction
  const recent = trend.slice(-3).reduce((s, d) => s + d.interest, 0) / 3;
  const earlier = trend.slice(0, 3).reduce((s, d) => s + d.interest, 0) / 3;
  const trendDirection = recent > earlier + 5 ? "rising" : recent < earlier - 5 ? "falling" : "stable";

  return {
    topic,
    currentInterest: trend[trend.length - 1].interest,
    trendDirection,
    changePercent: +(((recent - earlier) / earlier) * 100).toFixed(1),
    data: trend,
  };
}

export async function GET() {
  const trends = TOPICS.map(generateTrendData);

  // Sort by current interest
  trends.sort((a, b) => b.currentInterest - a.currentInterest);

  return NextResponse.json({
    trends,
    timestamp: new Date().toISOString(),
  });
}
