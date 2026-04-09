"use client";

import { Link2, Plus } from "lucide-react";

export default function UserProfileStrip() {
  return (
    <div
      className="flex flex-wrap items-center gap-4 md:gap-5 bg-surface rounded-2xl border border-border p-4 animate-fade-in-up"
      style={{ animationDelay: "0.08s" }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden gradient-iridescent-animated shadow-lg shadow-vital-violet/15">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-lg md:text-xl font-bold text-white/90">PS</span>
          </div>
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-thermal-cyan rounded-full border-2 border-surface" />
      </div>

      {/* User info */}
      <div className="flex-shrink-0">
        <p className="text-[14px] md:text-[15px] font-semibold text-text-primary tracking-[-0.01em]">
          @psychedelia
        </p>
        <button className="flex items-center gap-1 text-[12px] text-vital-violet font-medium hover:text-vital-violet/80 transition-colors mt-0.5">
          <Link2 className="w-3 h-3" />
          connect wallet
        </button>
      </div>

      {/* Divider — hidden on small */}
      <div className="w-px h-10 bg-border hidden md:block" />

      {/* Accounts — hidden on mobile */}
      <div className="flex-shrink-0 hidden sm:block">
        <p className="text-[11px] text-text-tertiary font-medium uppercase tracking-wider mb-1.5">
          Accounts
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-vital-violet to-breath-lavender border-2 border-surface shadow-sm" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-thermal-cyan to-[#00A88A] border-2 border-surface shadow-sm -ml-1.5" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-signal-rose to-[#E05585] border-2 border-surface shadow-sm -ml-1.5" />
          <button className="w-6 h-6 rounded-full border-2 border-dashed border-border flex items-center justify-center hover:border-vital-violet hover:bg-badge-violet-bg transition-all duration-200 ml-0.5">
            <Plus className="w-3 h-3 text-text-tertiary" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-border hidden md:block" />

      {/* Token price */}
      <div className="flex-shrink-0">
        <p className="text-[11px] text-text-tertiary font-medium uppercase tracking-wider mb-0.5">
          $BTH price
        </p>
        <p className="text-[16px] md:text-[18px] font-bold text-text-primary tracking-[-0.02em]">
          $0.0857
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-w-0" />

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="px-3 md:px-4 py-2 rounded-xl text-[12px] md:text-[13px] font-semibold text-white bg-gradient-to-r from-[#6B28A6] via-vital-violet to-[#8B3DD0] hover:-translate-y-px hover:shadow-lg hover:shadow-vital-violet/25 active:translate-y-0 transition-all duration-300 cursor-pointer">
          Buy $BTH
        </button>
        <button className="px-3 md:px-4 py-2 rounded-xl text-[12px] md:text-[13px] font-semibold text-vital-violet border-[1.5px] border-vital-violet bg-transparent hover:bg-badge-violet-bg hover:border-breath-lavender hover:-translate-y-px hover:shadow-md hover:shadow-vital-violet/10 active:translate-y-0 transition-all duration-300 cursor-pointer">
          Swap $BTH
        </button>
      </div>
    </div>
  );
}
