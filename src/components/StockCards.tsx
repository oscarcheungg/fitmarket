"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  high52?: number;
  low52?: number;
  dayHigh?: number;
  dayLow?: number;
  sparkline?: number[];
  live?: boolean;
}

function fmt(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
}

export function StockCards() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await fetch("/api/stocks");
        const data = await res.json();
        setStocks(data.stocks || []);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
    const interval = setInterval(fetchStocks, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4 h-36 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {stocks.map((stock, i) => {
        const sparkData = (stock.sparkline || []).map((v, idx) => ({ v, i: idx }));
        const isUp = stock.change >= 0;
        return (
          <div
            key={stock.symbol}
            className="bg-card rounded-xl border border-border p-4 hover:bg-card-hover transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-semibold">{stock.symbol}</span>
              <span className="text-[10px] text-muted">{stock.sector}</span>
            </div>

            {sparkData.length > 2 && (
              <div className="h-10 -mx-1 my-1.5">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparkData}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={isUp ? "#22c55e" : "#ef4444"}
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="flex items-end justify-between">
              <div>
                <p className="text-lg font-bold font-mono">${stock.price?.toFixed(2)}</p>
                <span
                  className={`inline-flex items-center gap-0.5 text-[11px] font-medium ${
                    isUp ? "text-green" : "text-red"
                  }`}
                >
                  {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {isUp ? "+" : ""}{stock.changePercent?.toFixed(2)}%
                </span>
              </div>
              {stock.volume ? (
                <span className="text-[10px] font-mono text-muted">{fmt(stock.volume)}</span>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
