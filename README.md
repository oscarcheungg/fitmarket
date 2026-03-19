# Macrofy

Find the best macro-friendly menu items at any restaurant.

A single-purpose tool that ranks restaurant menu items by macro score based on your diet goal (balanced, high protein, low carb, or low calorie). Search a restaurant, see every item ranked, and build your ideal meal.

## Live Demo

> **Deployed URL:** [https://fitmarket-beta.vercel.app](https://fitmarket-beta.vercel.app)

## Features

### Restaurant Search & Ranking
- Search from 20 popular restaurant chains (Chipotle, McDonald's, Chick-fil-A, Subway, Sweetgreen, Wendy's, Taco Bell, Panda Express, Five Guys, Panera Bread, Popeyes, In-N-Out, Shake Shack, Qdoba, Wingstop, Jersey Mike's, CAVA, Raising Cane's)
- Every menu item scored 0-100 and ranked by your selected diet goal
- Expandable macro breakdown with donut chart for any item
- 160+ pre-loaded menu items with verified nutrition data

### Diet Goal Selector
- **Balanced** — optimal 30/40/30 protein/carbs/fat ratio
- **High Protein** — prioritizes protein > 30% of calories
- **Low Carb** — rewards carbs < 25% of calories
- **Low Calorie** — favors items under 500 calories

### Meal Builder
- Add items from any restaurant to build a complete meal
- Real-time combined macro totals (calories, protein, carbs, fat)
- Visual percentage breakdown bars
- Mix and match across restaurants

### Real-Time Food Search (API)
- CalorieNinjas API integration for searching any food not in the database
- Natural language queries (e.g. "grilled salmon with rice")
- Real-time macro data with 1-hour caching

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
- Node.js 18+
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

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `CALORIENINJAS_API_KEY` | Yes | Free key from [CalorieNinjas](https://calorieninjas.com/api) (10,000 req/month) |

### Deploy to Vercel

```bash
npx vercel
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── nutrition/route.ts     # CalorieNinjas API proxy
│   │   ├── restaurants/route.ts   # Static data with scoring
│   │   └── suggest/route.ts      # Macro-based suggestions
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Main search tool
│   └── globals.css                # Styles & animations
├── components/
│   ├── MacroBreakdown.tsx         # Donut chart + macro bars
│   ├── MacroScore.tsx             # Circular score badge
│   └── GoalSelector.tsx           # Diet goal picker
└── lib/
    ├── restaurant-data.ts         # 160+ menu items, 20 chains
    └── macro-utils.ts             # Scoring & calculation utils
```

## Target Audience

**Health-conscious consumers** who eat at restaurant chains and want to quickly find the best option for their diet without manually researching every menu item.

## Monetization Strategy

1. **Freemium:** Free basic search, Pro ($4.99/mo) for unlimited meal building, saved preferences, and alerts
2. **Affiliate Partnerships:** Meal delivery recommendations
3. **B2B Data:** Anonymized preference data for restaurant chains

## Data Sources

| Data | Source | Type |
|---|---|---|
| Food Nutrition | CalorieNinjas API | Real-time (cached 1 hour) |
| Restaurant Menus | Static Database | 160+ items across 20 chains |

## License

MIT
