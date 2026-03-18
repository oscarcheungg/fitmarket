"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TrendData {
  topic: string;
  currentInterest: number;
  trendDirection: string;
  changePercent: number;
  data: { month: string; interest: number }[];
}

const COLORS = ["#f97316", "#3b82f6", "#22c55e", "#eab308", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f59e0b"];
const tooltipStyle = { borderRadius: "8px", border: "1px solid #27272a", backgroundColor: "#18181b", fontSize: "11px", color: "#fafafa" };

export function TrendsOverview() {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const res = await fetch("/api/trends");
        const data = await res.json();
        setTrends(data.trends || []);
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }
    fetchTrends();
  }, []);

  if (loading) return <div className="bg-card rounded-xl border border-border p-5 h-64 animate-pulse" />;

  const top5 = trends.slice(0, 5);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Trending Topics</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="month" allowDuplicatedCategory={false} tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" />
          <YAxis tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" domain={[0, 100]} />
          <Tooltip contentStyle={tooltipStyle} />
          {top5.map((t, i) => (
            <Line key={t.topic} data={t.data} type="monotone" dataKey="interest" name={t.topic} stroke={COLORS[i]} strokeWidth={1.5} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {top5.map((t, i) => (
          <div key={t.topic} className="text-center px-1 py-1.5 rounded-lg bg-surface">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
              <span className="text-[10px] font-medium truncate">{t.topic}</span>
            </div>
            <span className={`text-[10px] font-mono ${t.trendDirection === "rising" ? "text-green" : t.trendDirection === "falling" ? "text-red" : "text-muted"}`}>
              {t.changePercent > 0 ? "+" : ""}{t.changePercent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrendsFullPage() {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const res = await fetch("/api/trends");
        const data = await res.json();
        const t = data.trends || [];
        setTrends(t);
        setSelected(t.slice(0, 3).map((tr: TrendData) => tr.topic));
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }
    fetchTrends();
  }, []);

  const toggleTopic = (topic: string) => {
    setSelected((prev) => prev.includes(topic) ? prev.filter((t) => t !== topic) : prev.length < 5 ? [...prev, topic] : prev);
  };

  if (loading) return <div className="p-6"><div className="h-96 bg-card rounded-xl animate-pulse" /></div>;

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-bold">Trends</h1>

      <div className="flex flex-wrap gap-1.5">
        {trends.map((t, i) => (
          <button key={t.topic} onClick={() => toggleTopic(t.topic)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${selected.includes(t.topic) ? "text-white" : "text-muted bg-card border border-border hover:text-foreground"}`} style={selected.includes(t.topic) ? { backgroundColor: COLORS[i % COLORS.length] } : {}}>
            {t.topic}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="month" allowDuplicatedCategory={false} tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" />
            <YAxis tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} />
            {trends.filter(t => selected.includes(t.topic)).map((t) => {
              const idx = trends.findIndex(tr => tr.topic === t.topic);
              return <Line key={t.topic} data={t.data} type="monotone" dataKey="interest" name={t.topic} stroke={COLORS[idx % COLORS.length]} strokeWidth={2} dot={{ r: 2 }} />;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
        {trends.map((t, i) => (
          <div key={t.topic} className="bg-card rounded-xl border border-border p-3 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium truncate capitalize">{t.topic}</span>
              {t.trendDirection === "rising" ? <TrendingUp className="w-3 h-3 text-green" /> : t.trendDirection === "falling" ? <TrendingDown className="w-3 h-3 text-red" /> : <Minus className="w-3 h-3 text-muted" />}
            </div>
            <p className="text-xl font-bold font-mono">{t.currentInterest}</p>
            <p className="text-[10px] text-muted">{t.changePercent > 0 ? "+" : ""}{t.changePercent}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
