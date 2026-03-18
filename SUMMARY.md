# FitMarket Intelligence Dashboard — One-Page Summary

**Live URL:** https://fitmarket-beta.vercel.app
**GitHub:** https://github.com/oscarcheungg/fitmarket
**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Recharts, Vercel

---

## Purpose & Functionality

FitMarket Intelligence is a real-time analytics dashboard that tracks the business side of the health and fitness industry. It aggregates data from three live public APIs (Yahoo Finance, Open-Meteo, Google News RSS) and combines them with a static historical dataset (2019-2024) to deliver actionable market insights. Key features include:

- **Live Stock Tracker** — Real-time prices for 6 major fitness companies (Nike, Peloton, Lululemon, Planet Fitness, Under Armour, Deckers/HOKA) with sparkline charts, refreshing every 60 seconds via Yahoo Finance.
- **Weather x Fitness Demand Forecaster** — Correlates live weather data across 5 US cities with proprietary Gym Activity and Outdoor Activity indices (0-100), producing 7-day demand forecasts and staffing recommendations.
- **News Feed with NLP Sentiment Analysis** — Pulls real-time fitness industry headlines from Google News RSS and classifies each as positive, negative, or neutral using a custom keyword-based sentiment engine. An aggregate gauge shows overall market mood.
- **Market Pulse Composite Score** — Combines stock health (35%), news sentiment (35%), and gym demand (30%) into a single 0-100 market health indicator.
- **Historical Context** — Static dataset of post-COVID industry recovery (2019-2024) across four segments: Gyms, Digital Fitness, Wearables, and Supplements.

---

## Target Audience

**Primary users:** Fitness startup founders, gym franchise owners/investors, and wellness brand marketers who need affordable market intelligence to make data-driven business decisions.

**How they use it:** Users visit the dashboard daily to monitor stock movements, check market sentiment from news, and use the weather-driven demand forecaster to adjust staffing, promotions, and marketing spend. The historical data provides context for whether current trends represent growth or decline relative to post-COVID recovery benchmarks.

**Why over alternatives:** Enterprise tools like Bloomberg Terminal or IBISWorld cost $20,000+/year. FitMarket provides fitness-specific insights at a fraction of the cost, combining financial, weather, and sentiment data into a single view — something no existing tool does for this vertical.

---

## Sales Pitch & Monetization

FitMarket generates value for three customer segments:

1. **Gym Owners & Franchise Operators** — The Demand Forecaster alone justifies the product: knowing that tomorrow's weather will push gym attendance up 30% means staffing up, running promotions, or adjusting class schedules proactively instead of reactively.

2. **Fitness Industry Investors & VCs** — Real-time stock tracking combined with sentiment analysis provides an at-a-glance view of market direction, helping investors time entries/exits and identify emerging trends (e.g., Ozempic's impact on fitness).

3. **Wellness Brand Marketers** — Trend analysis and competitive radar data help brands allocate marketing budgets to rising categories and benchmark against competitors.

**Monetization strategy:**
- **Freemium SaaS** — Free tier with 15-minute delayed data; Pro tier ($29/month) with real-time data, AI-generated market summaries, and custom alerts.
- **White-Label Licensing** — License the dashboard to fitness chains and wellness VC firms for internal use ($500/month).
- **API Access** — Sell processed fitness market data (sentiment scores, demand indices, trend signals) to developers and analysts via a paid API.
