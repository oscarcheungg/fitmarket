"use client";

import { getScoreColor, getScoreLabel } from "@/lib/macro-utils";

interface MacroScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function MacroScore({ score, size = "md", showLabel = false }: MacroScoreProps) {
  const sizes = {
    sm: { w: 36, stroke: 3, text: "text-[10px]", label: "text-[8px]" },
    md: { w: 56, stroke: 4, text: "text-sm", label: "text-[10px]" },
    lg: { w: 80, stroke: 5, text: "text-xl", label: "text-xs" },
  };
  const s = sizes[size];
  const r = (s.w - s.stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);
  const strokeColor = color.replace("text-", "");

  const colorMap: Record<string, string> = {
    green: "#22c55e",
    yellow: "#eab308",
    red: "#ef4444",
  };

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={s.w} height={s.w} className="-rotate-90">
        <circle
          cx={s.w / 2}
          cy={s.w / 2}
          r={r}
          fill="none"
          stroke="#27272a"
          strokeWidth={s.stroke}
        />
        <circle
          cx={s.w / 2}
          cy={s.w / 2}
          r={r}
          fill="none"
          stroke={colorMap[strokeColor] || "#22c55e"}
          strokeWidth={s.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
        <text
          x={s.w / 2}
          y={s.w / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fafafa"
          className={`${s.text} font-bold`}
          transform={`rotate(90, ${s.w / 2}, ${s.w / 2})`}
        >
          {score}
        </text>
      </svg>
      {showLabel && (
        <span className={`${s.label} ${color} font-medium`}>{getScoreLabel(score)}</span>
      )}
    </div>
  );
}
