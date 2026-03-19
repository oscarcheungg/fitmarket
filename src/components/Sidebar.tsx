"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Store,
  Target,
  GitCompareArrows,
  UtensilsCrossed,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Search", icon: Search },
  { href: "/restaurants", label: "Restaurants", icon: Store },
  { href: "/track", label: "Track", icon: Target },
  { href: "/compare", label: "Compare", icon: GitCompareArrows },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-surface border-r border-border flex flex-col z-50">
      <div className="px-5 py-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5 text-accent" />
          <span className="text-sm font-bold tracking-tight">MacroCheck</span>
          <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse-dot" />
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all ${
                isActive
                  ? "bg-card text-foreground font-medium"
                  : "text-muted hover:text-foreground hover:bg-card"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-border">
        <div className="flex items-center gap-2 text-[11px] text-muted">
          <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse-dot" />
          CalorieNinjas API
        </div>
      </div>
    </aside>
  );
}
