"use client";

import { ChevronRight, Plus, Settings } from "lucide-react";

export default function MyCredentials() {
  return (
    <div
      className="bg-surface rounded-2xl border border-border p-4 animate-slide-in-right"
      style={{ animationDelay: "0.08s" }}
    >
      <button className="w-full flex items-center justify-between mb-3 group">
        <h4 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em]">
          My credentials
        </h4>
        <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-vital-violet group-hover:translate-x-0.5 transition-all" />
      </button>

      <div className="flex items-center gap-2 mb-3">
        <Settings className="w-3.5 h-3.5 text-text-tertiary flex-shrink-0" />
        <p className="text-[11.5px] text-text-tertiary leading-snug">
          No credentials selected. Click settings to customize.
        </p>
      </div>

      <button className="w-full flex items-center justify-between p-2.5 rounded-xl bg-proof-white hover:bg-badge-violet-bg/50 transition-all duration-200 group">
        <span className="text-[12.5px] font-medium text-text-secondary group-hover:text-vital-violet transition-colors">
          Verify more
        </span>
        <div className="w-7 h-7 rounded-lg gradient-iridescent flex items-center justify-center shadow-sm shadow-vital-violet/20 group-hover:shadow-md transition-shadow">
          <Plus className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>
      </button>
    </div>
  );
}
