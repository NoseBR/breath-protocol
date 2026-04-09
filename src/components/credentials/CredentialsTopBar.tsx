"use client";

import { useState } from "react";
import { LayoutGrid, Search, QrCode, ChevronDown, Menu, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfilePopup from "@/components/layout/ProfilePopup";
import { useAuth } from "@/components/auth/AuthProvider";

interface CredentialsTopBarProps {
  onMenuToggle: () => void;
  activeTab: "all" | "verified" | "unverified";
  onTabChange: (tab: "all" | "verified" | "unverified") => void;
  search: string;
  onSearchChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
}

const tabs = [
  { id: "all" as const, label: "All" },
  { id: "verified" as const, label: "Verified" },
  { id: "unverified" as const, label: "Unverified" },
];

export default function CredentialsTopBar({
  onMenuToggle,
  activeTab,
  onTabChange,
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: CredentialsTopBarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useAuth();

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "PS";
  const initials = displayName.slice(0, 2).toUpperCase();
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  return (
    <>
      <div className="border-b border-border-subtle bg-surface/60 backdrop-blur-md sticky top-0 z-30 animate-fade-in">
        {/* Top row */}
        <div className="h-[60px] flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-text-tertiary hover:bg-badge-violet-bg hover:text-vital-violet transition-all duration-200"
            >
              <Menu className="w-[18px] h-[18px]" strokeWidth={1.8} />
            </button>
            <LayoutGrid className="w-4 h-4 text-text-tertiary hidden lg:block" />
            <h1 className="text-[15px] font-semibold text-text-primary tracking-[-0.01em]">
              Credentials
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* QR code — links to BreathKYC app */}
            <a
              href="https://breathkyc.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-text-tertiary hover:bg-badge-violet-bg hover:text-vital-violet transition-all duration-200 hidden sm:flex"
              title="Open BreathKYC App"
            >
              <QrCode className="w-[18px] h-[18px]" strokeWidth={1.8} />
            </a>
            <div className="w-px h-5 bg-border mx-1" />
            {/* Profile button */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-surface-hover transition-all duration-200 group"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-lg object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-lg overflow-hidden gradient-iridescent-animated flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white">{initials}</span>
                </div>
              )}
              <ChevronDown
                className={`w-3.5 h-3.5 text-text-tertiary group-hover:text-text-secondary transition-all duration-200 hidden sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Filter row */}
        <div className="flex items-center justify-between px-4 md:px-6 pb-3 gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-vital-violet text-white shadow-sm shadow-vital-violet/20"
                    : "text-text-secondary hover:bg-badge-violet-bg/50 hover:text-vital-violet"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search + Category */}
          <div className="flex items-center gap-2.5">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search credential"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-[220px] h-9 pl-9 pr-3 rounded-xl border border-border bg-surface text-[13px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-vital-violet/40 focus:ring-2 focus:ring-vital-violet/10 transition-all"
              />
            </div>

            {/* Category dropdown */}
            <div className="relative">
              <button className="flex items-center gap-2 h-9 px-3 rounded-xl border border-border bg-surface text-[13px] font-medium text-text-secondary hover:border-vital-violet/30 transition-all">
                <span className="hidden sm:inline text-text-tertiary">Category:</span>
                <span className="text-text-primary">{category}</span>
                <SlidersHorizontal className="w-3.5 h-3.5 text-text-tertiary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile popup */}
      <ProfilePopup open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
