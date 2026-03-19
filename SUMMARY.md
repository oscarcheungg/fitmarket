# MacroCheck — One-Page Summary

**Live URL:** https://fitmarket-beta.vercel.app
**GitHub:** https://github.com/oscarcheungg/fitmarket
**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Recharts, CalorieNinjas API, Vercel

---

## Purpose & Functionality

MacroCheck is a restaurant menu macro analyzer that helps health-conscious consumers make informed dining decisions. It combines real-time nutrition data from the CalorieNinjas API with a curated static database of 100+ menu items from 10 major restaurant chains to provide instant macro breakdowns, smart comparisons, and daily tracking. Key features include:

- **Real-Time Food Search** — Type any food in natural language (e.g., "grilled chicken breast", "chipotle bowl") and get an instant macro breakdown with a donut chart showing protein/carbs/fat distribution and a 0-100 macro score based on your diet goal. Powered by the CalorieNinjas API.
- **Restaurant Explorer** — Browse pre-loaded menus from Chipotle, McDonald's, Chick-fil-A, Subway, Sweetgreen, Wendy's, Taco Bell, Panda Express, Five Guys, and Panera Bread. Items are ranked by macro score and filterable by diet goal (Balanced, High Protein, Low Carb, Low Calorie).
- **Daily Macro Tracker** — Set personal calorie/protein/carbs/fat goals, log meals throughout the day, and see real-time progress bars. A "What Should I Eat?" feature queries the API and static database to suggest foods that best fill remaining macros.
- **Meal Comparison Tool** — Compare 2-4 foods side by side with a radar chart overlay, a comparison table highlighting winners per metric, and macro scores for each item.
- **Restaurant Analytics** — Aggregate charts showing average calories by restaurant, protein density rankings, and a healthiest menu items leaderboard computed from the static database.

---

## Target Audience

**Primary users:** Fitness enthusiasts, dieters, meal preppers, and health-conscious consumers who frequently eat at restaurant chains.

**How they use it:** Before or during a restaurant visit, users search the restaurant's menu to find options that fit their diet. Throughout the day, they log meals in the tracker to ensure they hit their macro targets. The comparison tool helps them decide between two similar options (e.g., Chipotle chicken bowl vs. Sweetgreen chicken pesto parm). The analytics section provides broader context on which chains are most macro-friendly overall.

**Why over alternatives:** Existing apps like MyFitnessPal require tedious manual entry and overwhelming databases. MacroCheck is purpose-built for restaurant dining — it ranks entire menus by macro score in one click, suggests what to eat based on remaining daily macros, and compares options with visual radar charts. It turns a 5-minute calorie-counting chore into a 10-second decision.

---

## Sales Pitch & Monetization

MacroCheck generates value for two market segments:

1. **Health-Conscious Consumers (B2C)** — The core product. Anyone tracking macros or following a diet plan (high protein, low carb, etc.) benefits from instant restaurant menu scoring. The daily tracker replaces spreadsheet-based macro counting with a visual, interactive tool.

2. **Restaurant Chains (B2B)** — Anonymized aggregate data on which menu items score highest for health-conscious users, which diet goals are most popular, and how their chain compares to competitors on protein density and calorie efficiency. This data helps chains optimize menus and market their healthier options.

**Monetization strategy:**
- **Freemium SaaS** — Free tier with basic search (limited API calls); Pro tier ($4.99/month) with unlimited searches, saved meal plans, multi-day tracking history, and restaurant alerts when new macro-friendly items launch.
- **Affiliate Partnerships** — Integrate with meal delivery services (e.g., Factor, Trifecta) and recommend macro-optimized meals, earning a commission per signup.
- **B2B Data Licensing** — License anonymized nutrition preference analytics to restaurant chains for menu optimization and marketing ($200-500/month per chain).
