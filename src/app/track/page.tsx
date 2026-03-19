import { DailyTracker } from "@/components/DailyTracker";

export default function TrackPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Daily Macro Tracker</h1>
      <p className="text-sm text-muted mb-6">
        Log meals and track your daily nutrition goals. Data persists in your browser.
      </p>
      <DailyTracker />
    </div>
  );
}
