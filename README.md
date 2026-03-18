# FitMarket Intelligence Dashboard

Real-time Health & Fitness Industry Analytics for Business Decision-Makers.

A live, interactive dashboard that tracks the business side of the fitness and health industry by combining real-time data from multiple free public APIs to surface actionable market insights. Think of it as a Bloomberg Terminal for the fitness market.

## Live Demo

> **Deployed URL:** [https://fitmarket-beta.vercel.app](https://fitmarket-beta.vercel.app)

## Features

### 1. Fitness Stock Tracker
- Live prices for major fitness brands: Nike, Peloton, Lululemon, Planet Fitness, Under Armour, Deckers (HOKA)
- Animated ticker bar with real-time price updates
- Individual stock cards showing price, change %, volume, and market cap
- Data source: Yahoo Finance API (with intelligent fallback)

### 2. Fitness Trends Analysis
- Google Trends-style interest tracker for 10 fitness topics
- Interactive topic selector (compare up to 5 topics simultaneously)
- 12-month trend lines with seasonal patterns
- Topics include: gym membership, home workout, yoga, HIIT, CrossFit, ozempic, wearables, pilates, and more

### 3. Weather x Fitness Activity Correlation
- Live weather data for 5 major US cities (New York, LA, Chicago, Miami, Denver)
- Proprietary Gym Activity Index and Outdoor Activity Index (0-100)
- 7-day forecast with predicted fitness behavior
- Cross-city comparison view
- Data source: Open-Meteo API (free, no key required)

### 4. News Feed with AI Sentiment Analysis
- Live fitness industry news headlines
- AI-powered sentiment analysis classifying each article as Positive, Neutral, or Negative
- Aggregate sentiment gauge showing overall market mood
- Data source: NewsAPI (optional key) with curated fallback data

### 5. Historical Market Data
- Static dataset of post-COVID fitness industry recovery trends (2019-2024)
- Revenue by segment: Gym & Health Clubs, Digital Fitness, Wearables, Supplements
- Market share breakdown (pie chart)
- Year-over-year growth rates by segment
- Contextualizes real-time data with historical benchmarks

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Icons:** Lucide React
- **APIs:** Yahoo Finance, Open-Meteo, NewsAPI
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/fitmarket.git
cd fitmarket

# Install dependencies
npm install

# (Optional) Add your NewsAPI key
cp .env.example .env.local
# Edit .env.local and add your key from https://newsapi.org/register

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEWS_API_KEY` | No | Free API key from [NewsAPI.org](https://newsapi.org/register) for live news. Falls back to curated data if not provided. |

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── stocks/route.ts    # Yahoo Finance stock data
│   │   ├── news/route.ts      # News + sentiment analysis
│   │   ├── weather/route.ts   # Open-Meteo weather data
│   │   └── trends/route.ts    # Fitness search trends
│   ├── trends/page.tsx        # Full trends page
│   ├── news/page.tsx          # Full news page
│   ├── weather/page.tsx       # Full weather page
│   ├── layout.tsx             # Root layout with sidebar
│   ├── page.tsx               # Main overview dashboard
│   └── globals.css            # Global styles
├── components/
│   ├── Sidebar.tsx            # Navigation sidebar
│   ├── StockTicker.tsx        # Animated stock ticker
│   ├── StockCards.tsx         # Stock detail cards
│   ├── NewsFeed.tsx           # News article list
│   ├── SentimentGauge.tsx     # SVG sentiment gauge
│   ├── TrendsChart.tsx        # Trends line charts
│   ├── WeatherImpact.tsx      # Weather correlation charts
│   └── MarketOverviewCharts.tsx # Historical data charts
└── lib/
    └── historical-data.ts     # Static baseline dataset
```

## Target Audience

**Fitness startup founders, gym franchise investors, and wellness brand marketers** who need market intelligence to make data-driven business decisions but cannot afford enterprise analytics tools.

## Monetization Strategy

1. **Freemium Model:** Free tier with delayed data, paid tier ($29/mo) with real-time data + AI-powered summaries
2. **White-label:** License the dashboard to fitness chains and wellness VC firms ($500/mo)
3. **API Access:** Sell processed fitness market data via API to developers and analysts

## Data Sources & Refresh Rates

| Data | Source | Refresh Rate |
|---|---|---|
| Stock Prices | Yahoo Finance API | Every 60 seconds |
| Weather & Activity | Open-Meteo API | Every 10 minutes |
| News & Sentiment | NewsAPI / Fallback | Every 5 minutes |
| Search Trends | Algorithmic model | On page load |
| Historical Data | Static dataset | Baseline (2019-2024) |

## License

MIT
