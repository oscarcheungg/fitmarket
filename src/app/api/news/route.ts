import { NextResponse } from "next/server";

function analyzeSentiment(text: string): {
  score: number;
  label: "positive" | "negative" | "neutral";
} {
  const positiveWords = [
    "growth", "surge", "rise", "gain", "boost", "record", "strong", "expand",
    "profit", "success", "bullish", "outperform", "beat", "high", "soar",
    "innovation", "launch", "milestone", "revenue", "partnership", "deal",
    "popular", "demand", "healthy", "wellness", "breakthrough", "recover",
    "upgrade", "buy", "top", "best", "win", "positive", "improve", "new",
  ];
  const negativeWords = [
    "decline", "drop", "fall", "loss", "cut", "weak", "slump", "crash",
    "bearish", "miss", "down", "low", "struggle", "layoff", "close",
    "bankruptcy", "debt", "lawsuit", "recall", "warning", "concern",
    "risk", "threat", "downturn", "recession", "inflation", "sell",
    "worst", "fail", "shrink", "downgrade", "plunge", "trouble",
  ];

  const lower = text.toLowerCase();
  let score = 0;
  positiveWords.forEach((w) => {
    if (lower.includes(w)) score += 1;
  });
  negativeWords.forEach((w) => {
    if (lower.includes(w)) score -= 1;
  });

  const normalized = Math.max(-1, Math.min(1, score / 3));
  return {
    score: normalized,
    label: normalized > 0.15 ? "positive" : normalized < -0.15 ? "negative" : "neutral",
  };
}

function extractSource(title: string): { cleanTitle: string; source: string } {
  const parts = title.split(" - ");
  if (parts.length > 1) {
    const source = parts.pop()!.trim();
    return { cleanTitle: parts.join(" - ").trim(), source };
  }
  return { cleanTitle: title, source: "Google News" };
}

function parseRSSDate(dateStr: string): string {
  try {
    return new Date(dateStr).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export async function GET() {
  try {
    // Fetch from Google News RSS — free, no API key needed, real-time data
    const queries = [
      "fitness+industry+OR+gym+business",
      "peloton+OR+lululemon+OR+nike+fitness",
      "wellness+market+OR+fitness+wearable",
    ];

    const allArticles: {
      title: string;
      description: string | null;
      url: string;
      source: string;
      publishedAt: string;
      sentiment: { score: number; label: "positive" | "negative" | "neutral" };
    }[] = [];
    const seenTitles = new Set<string>();

    await Promise.all(
      queries.map(async (q) => {
        try {
          const rssUrl = `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;
          const response = await fetch(rssUrl, { next: { revalidate: 300 } });

          if (!response.ok) return;

          const xml = await response.text();

          // Parse RSS items with regex (lightweight, no XML parser needed)
          const itemRegex = /<item>([\s\S]*?)<\/item>/g;
          const titleRegex = /<title>([\s\S]*?)<\/title>/;
          const linkRegex = /<link>([\s\S]*?)<\/link>/;
          const pubDateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/;

          let match;
          while ((match = itemRegex.exec(xml)) !== null) {
            const itemXml = match[1];
            const titleMatch = titleRegex.exec(itemXml);
            const linkMatch = linkRegex.exec(itemXml);
            const dateMatch = pubDateRegex.exec(itemXml);

            if (!titleMatch) continue;

            const rawTitle = titleMatch[1]
              .replace(/<!\[CDATA\[/g, "")
              .replace(/\]\]>/g, "")
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .trim();

            if (seenTitles.has(rawTitle)) continue;
            seenTitles.add(rawTitle);

            const { cleanTitle, source } = extractSource(rawTitle);
            const sentiment = analyzeSentiment(cleanTitle);

            const url = linkMatch
              ? linkMatch[1].replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "").trim()
              : "#";

            allArticles.push({
              title: cleanTitle,
              description: null,
              url,
              source,
              publishedAt: dateMatch ? parseRSSDate(dateMatch[1].trim()) : new Date().toISOString(),
              sentiment,
            });
          }
        } catch (err) {
          console.error(`RSS fetch error for query "${q}":`, err);
        }
      })
    );

    // Sort by date, most recent first
    allArticles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Take top 15
    const articles = allArticles.slice(0, 15);

    return NextResponse.json({
      articles,
      timestamp: new Date().toISOString(),
      live: true,
      source: "Google News RSS",
    });
  } catch (error) {
    console.error("News fetch error:", error);
    return NextResponse.json(
      { articles: [], error: "Failed to fetch news", live: false },
      { status: 500 }
    );
  }
}
