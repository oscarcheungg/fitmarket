"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Sun, Cloud, CloudRain, Snowflake, Megaphone, Calendar } from "lucide-react";

interface ForecastDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  weatherLabel: string;
  weatherCode: number;
  gymDemand: number;
  outdoorDemand: number;
  action: string;
  actionType: "staff-up" | "promo" | "outdoor" | "normal";
}

interface CityForecast {
  city: string;
  forecast: ForecastDay[];
  summary: string;
  peakDay: string;
}

function WIcon({ code, className }: { code: number; className?: string }) {
  if (code === 0) return <Sun className={className} />;
  if (code <= 3) return <Cloud className={className} />;
  if (code <= 67) return <CloudRain className={className} />;
  return <Snowflake className={className} />;
}

function getAction(gym: number, outdoor: number, day: string, weather: string): { text: string; type: ForecastDay["actionType"] } {
  const weekend = day === "Sat" || day === "Sun";
  if (gym >= 75) return { text: weekend ? "Staff up — schedule extra classes" : `${weather} driving indoor demand — staff up`, type: "staff-up" };
  if (outdoor >= 70 && gym <= 50) return { text: "Push outdoor bootcamps & park sessions", type: "outdoor" };
  if (gym <= 40) return { text: "Run flash promo to boost traffic", type: "promo" };
  return { text: "Standard operations", type: "normal" };
}

export function DemandForecaster() {
  const [forecasts, setForecasts] = useState<CityForecast[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch_() {
      try {
        const res = await fetch("/api/weather");
        const data = await res.json();
        const processed: CityForecast[] = (data.cities || []).map(
          (city: { city: string; forecast: { date: string; tempMax: number; tempMin: number; weatherLabel: string; weatherCode: number; gymActivity: number; outdoorActivity: number }[] }) => {
            const forecast: ForecastDay[] = city.forecast.map((d) => {
              const dayName = new Date(d.date).toLocaleDateString("en-US", { weekday: "short" });
              const act = getAction(d.gymActivity, d.outdoorActivity, dayName, d.weatherLabel);
              return { date: d.date, dayName, tempMax: d.tempMax, tempMin: d.tempMin, weatherLabel: d.weatherLabel, weatherCode: d.weatherCode, gymDemand: d.gymActivity, outdoorDemand: d.outdoorActivity, action: act.text, actionType: act.type };
            });
            const peak = forecast.reduce((m, d) => d.gymDemand > m.gymDemand ? d : m);
            const avg = Math.round(forecast.reduce((s, d) => s + d.gymDemand, 0) / forecast.length);
            const summary = avg >= 65 ? "Strong week — maximize premium offerings" : avg >= 45 ? "Moderate demand — focus on retention" : "Soft week — deploy promotions";
            return { city: city.city, forecast, summary, peakDay: `${peak.dayName} (${peak.gymDemand})` };
          }
        );
        setForecasts(processed);
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }
    fetch_();
  }, []);

  if (loading || forecasts.length === 0) return <div className="bg-card rounded-xl border border-border p-5 h-96 animate-pulse" />;

  const city = forecasts[selected];
  const chartData = city.forecast.map((d) => ({ day: d.dayName, Gym: d.gymDemand, Outdoor: d.outdoorDemand }));

  const actionIcons = { "staff-up": Users, promo: Megaphone, outdoor: Sun, normal: Calendar };
  const actionColors = { "staff-up": "text-accent", promo: "text-blue", outdoor: "text-green", normal: "text-muted" };

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">7-Day Demand Forecast</h3>
        <div className="flex gap-1">
          {forecasts.map((f, i) => (
            <button key={f.city} onClick={() => setSelected(i)} className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${i === selected ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}>{f.city}</button>
          ))}
        </div>
      </div>

      <div className="bg-accent-light rounded-lg px-3 py-2 mb-4 flex items-center justify-between">
        <span className="text-[11px] font-medium text-accent-dark">{city.summary}</span>
        <span className="text-[10px] text-muted">Peak: {city.peakDay}</span>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" />
          <YAxis tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" domain={[0, 100]} />
          <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #27272a", backgroundColor: "#18181b", fontSize: "11px", color: "#fafafa" }} />
          <Area type="monotone" dataKey="Gym" stroke="#f97316" fill="#f97316" fillOpacity={0.12} strokeWidth={2} />
          <Area type="monotone" dataKey="Outdoor" stroke="#22c55e" fill="#22c55e" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-1">
        {city.forecast.map((day) => {
          const AIcon = actionIcons[day.actionType];
          return (
            <div key={day.date} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-card-hover transition-colors">
              <span className="text-[11px] font-mono font-semibold w-8">{day.dayName}</span>
              <WIcon code={day.weatherCode} className="w-3.5 h-3.5 text-muted" />
              <span className="text-[10px] font-mono text-muted w-10">{Math.round(day.tempMax)}°/{Math.round(day.tempMin)}°</span>
              <div className="flex-1 flex items-center gap-1.5">
                <div className="w-16 bg-border rounded-full h-1">
                  <div className="bg-accent h-1 rounded-full" style={{ width: `${day.gymDemand}%` }} />
                </div>
                <span className="text-[10px] font-mono w-5">{day.gymDemand}</span>
              </div>
              <AIcon className={`w-3 h-3 shrink-0 ${actionColors[day.actionType]}`} />
              <span className="text-[10px] text-muted truncate max-w-48">{day.action}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
