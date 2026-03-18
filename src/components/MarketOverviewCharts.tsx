"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";
import { industryRecoveryData, marketSegments } from "@/lib/historical-data";

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #27272a",
  backgroundColor: "#18181b",
  fontSize: "11px",
  color: "#fafafa",
};

export function IndustryRecoveryChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Industry Recovery (2019-2024)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={industryRecoveryData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" />
          <YAxis tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="gymRevenue" name="Gym" stroke="#f97316" strokeWidth={2} dot={{ r: 3, fill: "#f97316" }} />
          <Line type="monotone" dataKey="digitalFitness" name="Digital" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: "#3b82f6" }} />
          <Line type="monotone" dataKey="wearables" name="Wearables" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: "#22c55e" }} />
          <Line type="monotone" dataKey="supplements" name="Supplements" stroke="#eab308" strokeWidth={2} dot={{ r: 3, fill: "#eab308" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MarketShareChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Market Share</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={marketSegments} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="share" nameKey="segment" paddingAngle={3}>
            {marketSegments.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, "Share"]} />
          <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: "10px", color: "#71717a" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SegmentGrowthChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">YoY Growth</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={marketSegments} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" />
          <YAxis type="category" dataKey="segment" width={100} tick={{ fontSize: 10, fill: "#71717a" }} stroke="#27272a" />
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, "Growth"]} />
          <Bar dataKey="growth" radius={[0, 4, 4, 0]}>
            {marketSegments.map((entry, i) => (
              <Cell key={i} fill={entry.growth >= 0 ? entry.color : "#ef4444"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
