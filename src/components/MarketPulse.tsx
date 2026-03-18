"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PulseData {
  score: number;
  stockScore: number;
  sentimentScore: number;
  weatherScore: number;
  label: string;
  signals: { text: string; type: "positive" | "negative" | "neutral" }[];
}

export function MarketPulse() {
  const [pulse, setPulse] = useState<PulseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function computePulse() {
      try {
        const [stockRes, newsRes, weatherRes] = await Promise.all([
          fetch("/api/stocks"),
          fetch("/api/news"),
          fetch("/api/weather"),
        ]);
        const stockData = await stockRes.json();
        const newsData = await newsRes.json();
        const weatherData = await weatherRes.json();

        const stocks = stockData.stocks || [];
        const upStocks = stocks.filter((s: { change: number }) => s.change > 0).length;
        const stockScore = stocks.length > 0 ? Math.round((upStocks / stocks.length) * 100) : 50;

        const articles = newsData.articles || [];
        const posArticles = articles.filter((a: { sentiment: { label: string } }) => a.sentiment.label === "positive").length;
        const sentimentScore = articles.length > 0 ? Math.round((posArticles / articles.length) * 100) : 50;

        const cities = weatherData.cities || [];
        const weatherScore = cities.length > 0
          ? Math.round(cities.reduce((s: number, c: { gymActivityIndex: number }) => s + c.gymActivityIndex, 0) / cities.length)
          : 50;

        const score = Math.round(stockScore * 0.35 + sentimentScore * 0.35 + weatherScore * 0.3);

        const signals: PulseData["signals"] = [];
        signals.push({
          text: `${upStocks}/${stocks.length} stocks up`,
          type: stockScore >= 50 ? "positive" : "negative",
        });
        signals.push({
          text: `${posArticles}/${articles.length} articles bullish`,
          type: sentimentScore >= 50 ? "positive" : sentimentScore >= 35 ? "neutral" : "negative",
        });
        signals.push({
          text: `Gym demand index: ${weatherScore}`,
          type: weatherScore >= 60 ? "positive" : weatherScore >= 40 ? "neutral" : "negative",
        });

        const label = score >= 70 ? "Strong" : score >= 55 ? "Bullish" : score >= 45 ? "Neutral" : score >= 30 ? "Weak" : "Bearish";

        setPulse({ score, stockScore, sentimentScore, weatherScore, label, signals });
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }
    computePulse();
  }, []);

  if (loading || !pulse) {
    return <div className="bg-card rounded-xl border border-border p-5 h-48 animate-pulse" />;
  }

  const scoreColor = pulse.score >= 55 ? "text-green" : pulse.score >= 45 ? "text-yellow" : "text-red";
  const arcColor = pulse.score >= 55 ? "#22c55e" : pulse.score >= 45 ? "#eab308" : "#ef4444";
  const circumference = 2 * Math.PI * 42;
  const filled = (pulse.score / 100) * circumference;

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Market Pulse</h3>
        <span className={`text-xs font-bold ${scoreColor}`}>{pulse.label}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
            <circle cx="48" cy="48" r="42" fill="none" stroke="#27272a" strokeWidth="6" />
            <circle cx="48" cy="48" r="42" fill="none" stroke={arcColor} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${filled} ${circumference}`} className="transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold font-mono ${scoreColor}`}>{pulse.score}</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <Bar label="Stocks" value={pulse.stockScore} />
          <Bar label="Sentiment" value={pulse.sentimentScore} />
          <Bar label="Gym Demand" value={pulse.weatherScore} />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border space-y-1.5">
        {pulse.signals.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-[11px]">
            {s.type === "positive" ? <TrendingUp className="w-3 h-3 text-green" /> : s.type === "negative" ? <TrendingDown className="w-3 h-3 text-red" /> : <Minus className="w-3 h-3 text-muted" />}
            <span className="text-muted">{s.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  const color = value >= 55 ? "bg-green" : value >= 45 ? "bg-yellow" : "bg-red";
  return (
    <div>
      <div className="flex justify-between text-[10px] mb-0.5">
        <span className="text-muted">{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="w-full bg-border rounded-full h-1">
        <div className={`${color} h-1 rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
