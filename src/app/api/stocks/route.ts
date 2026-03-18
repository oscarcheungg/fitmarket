import { NextResponse } from "next/server";

const STOCKS = [
  { symbol: "NKE", name: "Nike", sector: "Apparel" },
  { symbol: "PTON", name: "Peloton", sector: "Digital Fitness" },
  { symbol: "LULU", name: "Lululemon", sector: "Apparel" },
  { symbol: "PLNT", name: "Planet Fitness", sector: "Gym Chains" },
  { symbol: "UAA", name: "Under Armour", sector: "Apparel" },
  { symbol: "DECK", name: "Deckers (HOKA)", sector: "Footwear" },
];

interface ChartMeta {
  symbol?: string;
  regularMarketPrice?: number;
  chartPreviousClose?: number;
  regularMarketVolume?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  marketCap?: number;
  longName?: string;
}

async function fetchStockQuote(symbol: string) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`;
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Chart API error for ${symbol}: ${response.status}`);
  }

  const data = await response.json();
  const meta: ChartMeta = data.chart?.result?.[0]?.meta || {};
  const timestamps = data.chart?.result?.[0]?.timestamp || [];
  const closes = data.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];

  // Build sparkline from last 30 days of close prices
  const sparkline = closes
    .filter((c: number | null) => c !== null)
    .slice(-20)
    .map((c: number) => +c.toFixed(2));

  const price = meta.regularMarketPrice || 0;
  const previousClose = meta.chartPreviousClose || price;
  const change = +(price - previousClose).toFixed(2);
  const changePercent = previousClose > 0 ? +((change / previousClose) * 100).toFixed(2) : 0;

  return {
    price,
    change,
    changePercent,
    previousClose,
    volume: meta.regularMarketVolume || 0,
    high52: meta.fiftyTwoWeekHigh || 0,
    low52: meta.fiftyTwoWeekLow || 0,
    dayHigh: meta.regularMarketDayHigh || 0,
    dayLow: meta.regularMarketDayLow || 0,
    sparkline,
    lastUpdated: timestamps.length > 0
      ? new Date(timestamps[timestamps.length - 1] * 1000).toISOString()
      : new Date().toISOString(),
  };
}

export async function GET() {
  try {
    const results = await Promise.all(
      STOCKS.map(async (stock) => {
        try {
          const quote = await fetchStockQuote(stock.symbol);
          return { ...stock, ...quote, live: true };
        } catch (err) {
          console.error(`Failed to fetch ${stock.symbol}:`, err);
          return null;
        }
      })
    );

    const stockData = results.filter((r) => r !== null);

    if (stockData.length === 0) {
      throw new Error("All stock fetches failed");
    }

    return NextResponse.json({
      stocks: stockData,
      timestamp: new Date().toISOString(),
      live: true,
    });
  } catch (error) {
    console.error("Stock API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data", stocks: [], live: false },
      { status: 500 }
    );
  }
}
