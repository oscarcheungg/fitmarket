# Macrofy — One-Page Summary

**Live URL:** https://fitmarket-beta.vercel.app
**GitHub:** https://github.com/oscarcheungg/fitmarket
**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Recharts, CalorieNinjas API, Vercel

---

## Purpose & Functionality

Macrofy is a single-purpose tool that helps health-conscious consumers find the best macro-friendly menu items at any restaurant. Users search a restaurant, select their diet goal, and instantly see every menu item ranked by a 0-100 macro score. It combines real-time nutrition data from the CalorieNinjas API with a curated static database of 160+ menu items across 20 major restaurant chains. Key features include:

- **Restaurant Search & Ranking** — Search from 20 popular chains (Chipotle, McDonald's, Chick-fil-A, Subway, In-N-Out, Popeyes, Shake Shack, CAVA, and more). Every menu item is scored and ranked by the user's selected diet goal (Balanced, High Protein, Low Carb, or Low Calorie). Click any item to expand a detailed macro breakdown with a donut chart.
- **Meal Builder** — Add multiple items from any restaurant to build a complete meal. See combined macro totals and percentage breakdowns update in real time. Helps users plan an entire order, not just pick one item.
- **Real-Time API Search** — For foods not in the database, the CalorieNinjas API provides instant macro data via natural language queries (e.g., "grilled salmon with rice").

---

## Target Audience

**Primary users:** Fitness enthusiasts, dieters, meal preppers, and health-conscious consumers who frequently eat at restaurant chains.

**How they use it:** Before visiting a restaurant, users search its name in Macrofy and instantly see every menu item ranked for their diet. They tap items to see detailed macro breakdowns, then use the Meal Builder to plan their full order and see combined totals. The tool replaces 5 minutes of Googling nutrition PDFs with a 10-second search.

**Why over alternatives:** Apps like MyFitnessPal require tedious manual entry and have overwhelming databases. Macrofy is purpose-built for one thing: finding the best macro option at a restaurant. It ranks entire menus by a single score, making the decision instant. No account required, no tracking overhead — just search, see, decide.

---

## Sales Pitch & Monetization

Macrofy generates value for two market segments:

1. **Health-Conscious Consumers (B2C)** — Anyone tracking macros or following a diet (high protein, low carb, keto, etc.) benefits from instant restaurant menu scoring. The Meal Builder lets users plan orders before arriving, reducing decision fatigue and diet slip-ups.

2. **Restaurant Chains (B2B)** — Anonymized aggregate data on which menu items score highest for health-conscious users, which diet goals are most popular, and how a chain compares to competitors on protein density and calorie efficiency. This data helps chains optimize menus and market their healthier options more effectively.

**Monetization strategy:**
- **Freemium SaaS** — Free tier with basic search; Pro tier ($4.99/month) with unlimited meal building, saved favorites, multi-restaurant meal planning, and alerts when new items are added.
- **Affiliate Partnerships** — Integrate with meal delivery services (Factor, Trifecta) and recommend macro-optimized meals, earning a commission per signup.
- **B2B Data Licensing** — License anonymized nutrition preference analytics to restaurant chains for menu optimization ($200-500/month per chain).
