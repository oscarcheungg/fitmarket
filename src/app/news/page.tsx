import { NewsFeed } from "@/components/NewsFeed";
import { SentimentGauge } from "@/components/SentimentGauge";

export default function NewsPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">News & Sentiment</h1>
        <p className="text-sm text-muted mt-1">
          AI-powered sentiment analysis on fitness industry headlines
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NewsFeed limit={12} />
        </div>
        <div className="space-y-6">
          <SentimentGauge />

          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-sm font-semibold text-muted mb-3">
              How Sentiment Works
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Our AI analyzes article headlines and descriptions using
              natural language processing to determine market sentiment.
              Each article is scored on a scale from -1 (very bearish) to
              +1 (very bullish). The gauge shows the aggregate sentiment
              across all recent fitness industry articles.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-green" />
                <span className="text-muted">Positive: growth, expansion, innovation</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-yellow" />
                <span className="text-muted">Neutral: updates, announcements</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-red" />
                <span className="text-muted">Negative: decline, layoffs, risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
