"use client";

import { useState } from "react";
import { TrendingUp, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TokenWidget() {
  const [tab, setTab] = useState<"buy" | "swap">("buy");

  return (
    <div
      className="bg-surface rounded-2xl border border-border p-4 animate-slide-in-right"
      style={{ animationDelay: "0.14s" }}
    >
      {/* Toggle tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-proof-white mb-4">
        {(["buy", "swap"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-2 text-[12.5px] font-semibold rounded-lg transition-all duration-200",
              tab === t
                ? "bg-surface text-vital-violet shadow-sm"
                : "text-text-tertiary hover:text-text-secondary"
            )}
          >
            {t === "buy" ? "Buy $BTH" : "Swap $BTH"}
          </button>
        ))}
      </div>

      {/* Price */}
      <p className="text-[11px] text-text-tertiary font-medium mb-1">
        $BTH token price (24h)
      </p>
      <div className="flex items-baseline gap-2.5 mb-4">
        <span className="text-[26px] font-bold text-text-primary tracking-[-0.03em]">
          $0.0857
        </span>
        <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-badge-cyan-bg text-badge-cyan-text text-[11.5px] font-semibold">
          <TrendingUp className="w-3 h-3" />
          +1.94%
        </span>
      </div>

      {/* Available on */}
      <p className="text-[11px] text-text-tertiary font-medium mb-2">
        Available on
      </p>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-proof-white hover:bg-badge-yellow-bg transition-colors cursor-pointer">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 flex items-center justify-center">
            <span className="text-[8px] font-black text-white">B</span>
          </div>
          <span className="text-[11.5px] font-medium text-text-primary">Binance</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-proof-white hover:bg-badge-violet-bg transition-colors cursor-pointer">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-vital-violet to-breath-lavender flex items-center justify-center">
            <span className="text-[8px] font-black text-white">C</span>
          </div>
          <span className="text-[11.5px] font-medium text-text-primary">Crypto.com</span>
        </div>
      </div>

      {/* Explore more */}
      <button className="w-full py-2.5 rounded-xl border border-border text-[12.5px] font-semibold text-text-secondary hover:border-vital-violet/30 hover:text-vital-violet hover:bg-badge-violet-bg/30 transition-all duration-200 flex items-center justify-center gap-1.5">
        Explore more
        <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
