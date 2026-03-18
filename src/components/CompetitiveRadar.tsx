"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StockData { symbol: string; name: string; price: number; change: number; changePercent: number; high52?: number; low52?: number; }
interface BrandMomentum { name: string; symbol: string; momentum: number; priceVs52High: number; dayChange: number; }

export function CompetitiveRadar() {
  const [brands, setBrands] = useState<BrandMomentum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/stocks");
        const data = await res.json();
        const stocks: StockData[] = data.stocks || [];
        const processed: BrandMomentum[] = stocks.map((s) => {
          const range = s.high52 && s.low52 ? s.high52 - s.low52 : 0;
          const pos = range > 0 && s.low52 ? ((s.price - s.low52) / range) * 100 : 50;
          const momentum = Math.max(0, Math.min(100, Math.round(pos * 0.7 + Math.min(30, Math.max(-30, s.changePercent * 10)) * 0.3)));
          const vs52 = s.high52 ? +((s.price - s.high52) / s.high52 * 100).toFixed(1) : 0;
          return { name: s.name, symbol: s.symbol, momentum, priceVs52High: vs52, dayChange: s.changePercent };
        }).sort((a, b) => b.momentum - a.momentum);
        setBrands(processed);
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }
    fetchData();
  }, []);

  if (loading) return <div className="bg-card rounded-xl border border-border p-5 h-80 animate-pulse" />;

  const chartData = brands.map((b) => ({ name: b.symbol, Momentum: b.momentum }));

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Brand Momentum</h3>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" />
          <YAxis type="category" dataKey="name" width={42} tick={{ fontSize: 10, fontWeight: 600, fill: "#a1a1aa" }} stroke="#27272a" />
          <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #27272a", backgroundColor: "#18181b", fontSize: "11px", color: "#fafafa" }} formatter={(value) => [`${value}/100`, "Momentum"]} />
          <ReferenceLine x={50} stroke="#3f3f46" strokeDasharray="3 3" />
          <Bar dataKey="Momentum" radius={[0, 4, 4, 0]} barSize={16}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.Momentum >= 60 ? "#22c55e" : entry.Momentum >= 40 ? "#eab308" : "#ef4444"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-3 space-y-1">
        {brands.map((b, i) => (
          <div key={b.symbol} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-card-hover transition-colors">
            <span className="text-[10px] font-mono text-muted w-3">{i + 1}</span>
            <span className="text-[11px] font-semibold flex-1">{b.name}</span>
            <span className={`inline-flex items-center gap-0.5 text-[10px] font-mono ${b.dayChange >= 0 ? "text-green" : "text-red"}`}>
              {b.dayChange >= 0 ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
              {b.dayChange >= 0 ? "+" : ""}{b.dayChange.toFixed(2)}%
            </span>
            <span className="text-[10px] font-mono text-muted w-14 text-right">{b.priceVs52High}% vs H</span>
            <span className="text-[11px] font-mono font-bold w-6 text-right">{b.momentum}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
