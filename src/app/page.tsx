import { StockTicker } from "@/components/StockTicker";
import { StockCards } from "@/components/StockCards";
import { NewsFeed } from "@/components/NewsFeed";
import { SentimentGauge } from "@/components/SentimentGauge";
import { TrendsOverview } from "@/components/TrendsChart";
import { MarketPulse } from "@/components/MarketPulse";
import { DemandForecaster } from "@/components/DemandForecaster";
import { CompetitiveRadar } from "@/components/CompetitiveRadar";
import {
  IndustryRecoveryChart,
  MarketShareChart,
} from "@/components/MarketOverviewCharts";
import { Radio } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Live ticker */}
      <StockTicker />

      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">FitMarket Intelligence</h1>
            <p className="text-sm text-muted mt-1">
              AI-powered fitness market analytics — actionable insights for
              gym owners, investors & brand marketers
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green/10 text-green px-3 py-1.5 rounded-full shrink-0">
            <Radio className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">3 Live APIs</span>
          </div>
        </div>

        {/* Row 1: Market Pulse + Demand Forecaster — the two hero features */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <MarketPulse />
          </div>
          <div className="lg:col-span-3">
            <DemandForecaster />
          </div>
        </div>

        {/* Row 2: Competitive Radar + Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CompetitiveRadar />
          </div>
          <SentimentGauge />
        </div>

        {/* Row 3: Stocks */}
        <section>
          <h2 className="text-lg font-bold mb-4">
            Fitness Stocks — Live Market Data
          </h2>
          <StockCards />
        </section>

        {/* Row 4: Trends + News */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TrendsOverview />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted mb-3">
              Latest Headlines
            </h3>
            <NewsFeed limit={4} />
          </div>
        </div>

        {/* Row 5: Historical context */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IndustryRecoveryChart />
          <MarketShareChart />
        </div>

        {/* Data Sources Footer */}
        <footer className="border-t border-border pt-6 pb-4">
          <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
            Live Data Sources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DataSource
              name="Yahoo Finance"
              description="Real-time stock prices, 52-week ranges, volume for 6 fitness companies"
              endpoint="v8/finance/chart API"
              refresh="Every 60 seconds"
            />
            <DataSource
              name="Open-Meteo"
              description="7-day weather forecast for 5 US cities powering the Demand Forecaster"
              endpoint="Open-Meteo Forecast API"
              refresh="Every 10 minutes"
            />
            <DataSource
              name="Google News"
              description="Real-time fitness industry headlines with NLP sentiment scoring"
              endpoint="Google News RSS"
              refresh="Every 5 minutes"
            />
          </div>
        </footer>
      </div>
    </div>
  );
}

function DataSource({
  name,
  description,
  endpoint,
  refresh,
}: {
  name: string;
  description: string;
  endpoint: string;
  refresh: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 bg-green rounded-full mt-1.5 shrink-0 animate-pulse-dot" />
      <div>
        <p className="text-xs font-semibold">{name}</p>
        <p className="text-[11px] text-muted mt-0.5">{description}</p>
        <p className="text-[10px] text-stone-400 mt-0.5">
          {endpoint} · {refresh}
        </p>
      </div>
    </div>
  );
}
