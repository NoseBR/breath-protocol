"use client";

import { useState, useCallback } from "react";
import { LayoutGrid, QrCode, ChevronDown, Menu } from "lucide-react";
import ProfilePopup from "./ProfilePopup";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase";

interface TopBarProps {
  onMenuToggle?: () => void;
  pageTitle?: string;
}

export default function TopBar({ onMenuToggle, pageTitle = "Home" }: TopBarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useAuth();

  const launchKYC = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (token) {
      window.open(`https://breathkyc.vercel.app/verify?token=${token}`, "_blank");
    }
  }, []);

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "PS";
  const initials = displayName.slice(0, 2).toUpperCase();
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  return (
    <>
      <header className="h-[60px] flex items-center justify-between px-4 md:px-6 border-b border-border-subtle bg-surface/60 backdrop-blur-md sticky top-0 z-30 animate-fade-in">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-text-tertiary hover:bg-badge-violet-bg hover:text-vital-violet transition-all duration-200"
          >
            <Menu className="w-[18px] h-[18px]" strokeWidth={1.8} />
          </button>
          <LayoutGrid className="w-4 h-4 text-text-tertiary hidden lg:block" />
          <h1 className="text-[15px] font-semibold text-text-primary tracking-[-0.01em]">
            {pageTitle}
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* QR code — launches BreathKYC with auth token */}
          <button
            onClick={launchKYC}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-text-tertiary hover:bg-badge-violet-bg hover:text-vital-violet transition-all duration-200"
            title="Open BreathKYC App"
          >
            <QrCode className="w-[18px] h-[18px]" strokeWidth={1.8} />
          </button>
          <div className="w-px h-5 bg-border mx-1" />
          {/* Profile button */}
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-surface-hover transition-all duration-200 group"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-8 h-8 rounded-lg object-cover"
              />
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
      </header>

      {/* Profile popup */}
      <ProfilePopup open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
