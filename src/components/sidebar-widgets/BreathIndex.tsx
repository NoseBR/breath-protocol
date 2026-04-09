"use client";

import { HelpCircle, Wind } from "lucide-react";

export default function BreathIndex() {
  return (
    <div className="relative rounded-2xl overflow-hidden animate-slide-in-right">
      {/* Background — dark surface with violet glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-surface via-[#1A0F2E] to-[#0D1A1F]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(123, 47, 190, 0.2) 0%, transparent 60%),
                            radial-gradient(circle at 70% 30%, rgba(0, 212, 170, 0.1) 0%, transparent 40%),
                            radial-gradient(circle at 30% 70%, rgba(255, 107, 157, 0.08) 0%, transparent 40%)`,
        }}
      />

      <div className="relative z-10 p-5 flex flex-col items-center text-center">
        {/* Animated rings — iridescent */}
        <div className="relative w-28 h-28 mb-3">
          <div className="absolute inset-0 rounded-full border-2 border-vital-violet/20 animate-breathe" />
          <div
            className="absolute inset-3 rounded-full border border-thermal-cyan/15"
            style={{ animation: "breathe 5s cubic-bezier(0.4,0,0.2,1) infinite 0.5s" }}
          />
          <div
            className="absolute inset-6 rounded-full border border-signal-rose/15"
            style={{ animation: "breathe 4s cubic-bezier(0.4,0,0.2,1) infinite 1s" }}
          />
          {/* Center icon */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-vital-violet/20 via-thermal-cyan/10 to-signal-rose/10 flex items-center justify-center animate-ring-pulse">
            <Wind className="w-8 h-8 text-breath-lavender/80" strokeWidth={1.5} />
          </div>
          {/* Floating dots */}
          <div
            className="absolute top-1 right-5 w-1.5 h-1.5 rounded-full bg-thermal-cyan/50"
            style={{ animation: "dotPulse 3s infinite" }}
          />
          <div
            className="absolute bottom-3 left-3 w-1 h-1 rounded-full bg-signal-rose/50"
            style={{ animation: "dotPulse 3s infinite 1.5s" }}
          />
        </div>

        <span className="text-[14px] font-semibold text-white/90 tracking-[-0.01em]">
          Breath index
        </span>

        {/* Help button */}
        <button className="absolute top-4 right-4 w-7 h-7 rounded-full bg-vital-violet/20 flex items-center justify-center hover:bg-vital-violet/30 transition-colors">
          <HelpCircle className="w-4 h-4 text-breath-lavender/70" />
        </button>
      </div>
    </div>
  );
}
