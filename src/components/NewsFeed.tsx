"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

interface Article {
  title: string;
  description: string | null;
  url: string;
  source: string;
  publishedAt: string;
  sentiment: { score: number; label: "positive" | "negative" | "neutral" };
}

const icons = { positive: TrendingUp, negative: TrendingDown, neutral: Minus };
const colors = {
  positive: "text-green",
  negative: "text-red",
  neutral: "text-muted",
};

export function NewsFeed({ limit = 6 }: { limit?: number }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setArticles((data.articles || []).slice(0, limit));
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }
    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, [limit]);

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4 h-16 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {articles.map((article, i) => {
        const Icon = icons[article.sentiment.label];
        return (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-card rounded-xl border border-border p-3.5 hover:bg-card-hover transition-colors group animate-fade-in"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <Icon className={`w-3.5 h-3.5 shrink-0 ${colors[article.sentiment.label]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium leading-snug truncate group-hover:text-accent-dark transition-colors">
                {article.title}
              </p>
              <p className="text-[10px] text-muted mt-0.5">
                {article.source} · {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
              </p>
            </div>
            <ExternalLink className="w-3 h-3 text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>
        );
      })}
    </div>
  );
}
