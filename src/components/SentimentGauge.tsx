"use client";

import { useEffect, useState } from "react";

interface Article {
  sentiment: { score: number; label: string };
}

export function SentimentGauge() {
  const [data, setData] = useState<{
    avg: number;
    positive: number;
    negative: number;
    neutral: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const json = await res.json();
        const articles: Article[] = json.articles || [];
        const total = articles.length;
        if (total === 0) return;
        const avg = articles.reduce((s, a) => s + a.sentiment.score, 0) / total;
        const positive = articles.filter((a) => a.sentiment.label === "positive").length;
        const negative = articles.filter((a) => a.sentiment.label === "negative").length;
        const neutral = articles.filter((a) => a.sentiment.label === "neutral").length;
        setData({ avg, positive, negative, neutral, total });
      } catch { /* ignore */ }
    }
    fetchNews();
  }, []);

  if (!data) return <div className="bg-card rounded-xl border border-border p-5 h-44 animate-pulse" />;

  const label = data.avg > 0.15 ? "Bullish" : data.avg < -0.15 ? "Bearish" : "Neutral";
  const color = data.avg > 0.15 ? "text-green" : data.avg < -0.15 ? "text-red" : "text-yellow";
  const rotation = data.avg * 90;

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Sentiment</h3>
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-14 mb-2">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <path d="M 20 95 A 80 80 0 0 1 67 30" fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="round" opacity="0.25" />
            <path d="M 67 30 A 80 80 0 0 1 133 30" fill="none" stroke="#eab308" strokeWidth="10" strokeLinecap="round" opacity="0.25" />
            <path d="M 133 30 A 80 80 0 0 1 180 95" fill="none" stroke="#22c55e" strokeWidth="10" strokeLinecap="round" opacity="0.25" />
            <line x1="100" y1="95" x2="100" y2="30" stroke="#fafafa" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${rotation}, 100, 95)`} className="transition-all duration-1000" />
            <circle cx="100" cy="95" r="5" fill="#fafafa" />
          </svg>
        </div>
        <p className={`text-lg font-bold ${color}`}>{label}</p>
        <p className="text-[10px] text-muted mt-0.5">{data.total} articles</p>
        <div className="w-full mt-3 flex gap-3 text-[10px]">
          <div className="flex-1 text-center">
            <p className="font-mono font-bold text-green">{data.positive}</p>
            <p className="text-muted">Pos</p>
          </div>
          <div className="flex-1 text-center border-x border-border">
            <p className="font-mono font-bold text-yellow">{data.neutral}</p>
            <p className="text-muted">Neu</p>
          </div>
          <div className="flex-1 text-center">
            <p className="font-mono font-bold text-red">{data.negative}</p>
            <p className="text-muted">Neg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
