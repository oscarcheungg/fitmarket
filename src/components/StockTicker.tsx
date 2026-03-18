"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export function StockTicker() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await fetch("/api/stocks");
        const data = await res.json();
        setStocks(data.stocks || []);
      } catch {
        /* ignore */
      }
    }
    fetchStocks();
    const interval = setInterval(fetchStocks, 60000);
    return () => clearInterval(interval);
  }, []);

  if (stocks.length === 0) {
    return <div className="w-full bg-surface border-b border-border h-10" />;
  }

  return (
    <div className="w-full bg-surface border-b border-border overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap py-2.5">
        {[...stocks, ...stocks].map((stock, i) => (
          <div
            key={`${stock.symbol}-${i}`}
            className="inline-flex items-center gap-2 px-5"
          >
            <span className="font-mono text-xs font-semibold text-foreground">
              {stock.symbol}
            </span>
            <span className="font-mono text-xs text-muted">
              ${stock.price?.toFixed(2)}
            </span>
            <span
              className={`inline-flex items-center gap-0.5 font-mono text-[11px] font-medium ${
                stock.change >= 0 ? "text-green" : "text-red"
              }`}
            >
              {stock.change >= 0 ? (
                <TrendingUp className="w-2.5 h-2.5" />
              ) : (
                <TrendingDown className="w-2.5 h-2.5" />
              )}
              {stock.changePercent?.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
