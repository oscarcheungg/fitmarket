# MacroCheck — Restaurant Menu Macro Analyzer

Search any food for instant macro breakdowns. Browse restaurant menus ranked by nutrition score. Track your daily macros. Compare meals side by side.

## Live Demo

> **Deployed URL:** [https://fitmarket-beta.vercel.app](https://fitmarket-beta.vercel.app)

## Features

### 1. Real-Time Food Search
- Type any food (e.g. "chicken breast", "big mac", "chipotle bowl") and get instant macro breakdowns
- Powered by CalorieNinjas API with natural language processing
- Visual donut chart showing protein/carbs/fat calorie distribution
- Macro score (0-100) based on your selected diet goal
- Data source: CalorieNinjas API (live, cached 1 hour)

### 2. Restaurant Explorer
- Browse 10 popular restaurant chains: Chipotle, McDonald's, Chick-fil-A, Subway, Sweetgreen, Wendy's, Taco Bell, Panda Express, Five Guys, Panera Bread
- 100+ pre-loaded menu items with verified nutrition data
- Filter by diet goal: Balanced, High Protein, Low Carb, Low Calorie
- Items ranked by macro score with category filters
- Data source: Static restaurant database

### 3. Daily Macro Tracker
- Set custom daily goals for calories, protein, carbs, and fat
- Search and log foods throughout the day
- Visual progress bars showing % of each goal hit
- "What Should I Eat?" AI-powered suggestions based on remaining macros
- Data persists in browser localStorage

### 4. Meal Comparison Tool
- Side-by-side comparison of 2-4 menu items
- Radar chart visualization of macro profiles
- Comparison table with winner highlighting
- Supports any food searchable via the API

### 5. Restaurant Analytics
- Average calories by restaurant (bar chart)
- Protein density ranking across chains (% of calories from protein)
- Healthiest menu items leaderboard (top 8 by macro score)
- All computed from the static restaurant database

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Icons:** Lucide React
- **API:** CalorieNinjas (real-time nutrition data)
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/oscarcheungg/fitmarket.git
cd fitmarket

# Install dependencies
npm install

# Add your CalorieNinjas API key (free)
cp .env.example .env.local
# Edit .env.local and add your key from https://calorieninjas.com/api

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `CALORIENINJAS_API_KEY` | Yes | Free API key from [CalorieNinjas](https://calorieninjas.com/api). Sign up for free (10,000 requests/month). |

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
│   │   ├── nutrition/route.ts     # CalorieNinjas API proxy
│   │   ├── restaurants/route.ts   # Static restaurant data with scoring
│   │   └── suggest/route.ts      # Macro-based meal suggestions
│   ├── restaurants/page.tsx       # Restaurant explorer
│   ├── track/page.tsx             # Daily macro tracker
│   ├── compare/page.tsx           # Meal comparison tool
│   ├── layout.tsx                 # Root layout with sidebar
│   ├── page.tsx                   # Main search & analytics page
│   └── globals.css                # Global styles & theme
├── components/
│   ├── Sidebar.tsx                # Navigation sidebar
│   ├── SearchBar.tsx              # Debounced food search
│   ├── MacroBreakdown.tsx         # Donut chart + macro bars
│   ├── MacroScore.tsx             # Circular score badge (0-100)
│   ├── GoalSelector.tsx           # Diet goal picker
│   ├── RestaurantCard.tsx         # Restaurant grid card
│   ├── MenuItemRow.tsx            # Menu item with inline macros
│   ├── DailyTracker.tsx           # Full daily tracking interface
│   ├── MealComparison.tsx         # Side-by-side radar comparison
│   └── RestaurantAnalytics.tsx    # Aggregate charts
└── lib/
    ├── restaurant-data.ts         # Static restaurant menu database
    └── macro-utils.ts             # Scoring & calculation utilities
```

## Target Audience

**Fitness enthusiasts, dieters, meal preppers, and health-conscious consumers** who eat at restaurant chains and want to make informed nutrition decisions without manually looking up every menu item.

## Monetization Strategy

1. **Freemium SaaS:** Free search with limits, Pro tier ($4.99/mo) for unlimited tracking, saved meal plans, and restaurant alerts
2. **Affiliate Partnerships:** Partner with meal delivery services and recommend macro-friendly options
3. **B2B Data Licensing:** Sell anonymized aggregate nutrition preference data to restaurant chains for menu optimization

## Data Sources

| Data | Source | Type |
|---|---|---|
| Food Nutrition | CalorieNinjas API | Real-time (cached 1 hour) |
| Restaurant Menus | Static Database | 100+ items across 10 chains |
| Meal Suggestions | CalorieNinjas + Database | Hybrid real-time + static |

## License

MIT
