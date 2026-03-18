"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import { Thermometer, Wind, Droplets, Sun, Cloud, CloudRain, Snowflake } from "lucide-react";

interface CityWeather {
  city: string;
  current: { temperature: number; weatherCode: number; weatherLabel: string; windSpeed: number; humidity: number };
  gymActivityIndex: number;
  outdoorActivityIndex: number;
  forecast: { date: string; tempMax: number; tempMin: number; weatherLabel: string; gymActivity: number; outdoorActivity: number }[];
}

function WIcon({ code, className }: { code: number; className?: string }) {
  if (code === 0) return <Sun className={className} />;
  if (code <= 3) return <Cloud className={className} />;
  if (code <= 67) return <CloudRain className={className} />;
  return <Snowflake className={className} />;
}

const tooltipStyle = { borderRadius: "8px", border: "1px solid #27272a", backgroundColor: "#18181b", fontSize: "11px", color: "#fafafa" };

export function WeatherOverview() {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("/api/weather");
        const data = await res.json();
        setCities(data.cities || []);
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }
    fetchWeather();
  }, []);

  if (loading) return <div className="bg-card rounded-xl border border-border p-5 h-64 animate-pulse" />;

  const chartData = cities.map((c) => ({ city: c.city, Gym: c.gymActivityIndex, Outdoor: c.outdoorActivityIndex }));

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Weather x Activity</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="city" tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" />
          <YAxis tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" domain={[0, 100]} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: "10px", color: "#71717a" }} />
          <Bar dataKey="Gym" fill="#f97316" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Outdoor" fill="#22c55e" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WeatherFullPage() {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [sel, setSel] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("/api/weather");
        const data = await res.json();
        setCities(data.cities || []);
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }
    fetchWeather();
  }, []);

  if (loading) return <div className="p-6"><div className="h-96 bg-card rounded-xl animate-pulse" /></div>;

  const city = cities[sel];
  if (!city) return null;

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-bold">Weather Impact</h1>

      <div className="flex gap-1.5">
        {cities.map((c, i) => (
          <button key={c.city} onClick={() => setSel(i)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${i === sel ? "bg-accent text-white" : "text-muted bg-card border border-border hover:text-foreground"}`}>{c.city}</button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-card rounded-xl border border-border p-4">
          <Thermometer className="w-3.5 h-3.5 text-muted mb-1.5" />
          <p className="text-2xl font-bold font-mono">{city.current.temperature.toFixed(0)}°</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <WIcon code={city.current.weatherCode} className="w-3.5 h-3.5 text-muted mb-1.5" />
          <p className="text-sm font-semibold">{city.current.weatherLabel}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <Wind className="w-3.5 h-3.5 text-muted mb-1.5" />
          <p className="text-2xl font-bold font-mono">{city.current.windSpeed.toFixed(0)}<span className="text-xs text-muted ml-0.5">km/h</span></p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <Droplets className="w-3.5 h-3.5 text-muted mb-1.5" />
          <p className="text-2xl font-bold font-mono">{city.current.humidity}<span className="text-xs text-muted ml-0.5">%</span></p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted">Gym Activity</span>
            <span className="text-xl font-bold font-mono text-accent">{city.gymActivityIndex}</span>
          </div>
          <div className="w-full bg-border rounded-full h-1.5"><div className="bg-accent h-1.5 rounded-full" style={{ width: `${city.gymActivityIndex}%` }} /></div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted">Outdoor Activity</span>
            <span className="text-xl font-bold font-mono text-green">{city.outdoorActivityIndex}</span>
          </div>
          <div className="w-full bg-border rounded-full h-1.5"><div className="bg-green h-1.5 rounded-full" style={{ width: `${city.outdoorActivityIndex}%` }} /></div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">7-Day Forecast — {city.city}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={city.forecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" tickFormatter={(d) => new Date(d).toLocaleDateString("en-US", { weekday: "short" })} />
            <YAxis tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} labelFormatter={(d) => new Date(d).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })} />
            <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: "10px", color: "#71717a" }} />
            <Area type="monotone" dataKey="gymActivity" name="Gym" stroke="#f97316" fill="#f97316" fillOpacity={0.12} strokeWidth={2} />
            <Area type="monotone" dataKey="outdoorActivity" name="Outdoor" stroke="#22c55e" fill="#22c55e" fillOpacity={0.08} strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
