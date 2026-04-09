"use client";

import { useRef, useEffect } from "react";
import {
  X,
  ChevronRight,
  Sun,
  Moon,
  Monitor,
  Plus,
  Pencil,
  Link2,
  LogOut,
  Fingerprint,
  AppWindow,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";

interface ProfilePopupProps {
  open: boolean;
  onClose: () => void;
}

type ThemeOption = "light" | "dark" | "system";

export default function ProfilePopup({ open, onClose }: ProfilePopupProps) {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Derive display info from Supabase user or fallback
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "psychedelia";
  const initials = displayName.slice(0, 2).toUpperCase();
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const emailOrAddress = user?.email || "0x7a3b...f29d";

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClick);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleLogout = async () => {
    onClose();
    await signOut();
    router.push("/login");
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-dark-surface/20 backdrop-blur-[2px]" />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 md:pr-6 pointer-events-none">
        <div
          ref={popupRef}
          className="w-full max-w-[340px] bg-surface rounded-2xl border border-border shadow-2xl shadow-dark-surface/15 pointer-events-auto animate-fade-in-up overflow-hidden"
          style={{ animationDuration: "0.3s" }}
        >
          {/* Header — Avatar + Username */}
          <div className="flex items-center gap-3.5 p-5 pb-4">
            <div className="relative">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-14 h-14 rounded-full object-cover shadow-lg shadow-vital-violet/15"
                />
              ) : (
                <div className="w-14 h-14 rounded-full gradient-iridescent-animated flex items-center justify-center shadow-lg shadow-vital-violet/15">
                  <span className="text-lg font-bold text-white/90">{initials}</span>
                </div>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-thermal-cyan rounded-full border-[2.5px] border-surface" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-text-primary tracking-[-0.01em]">
                @{displayName}
              </p>
              <p className="text-[12px] text-text-tertiary mt-0.5 truncate">
                {emailOrAddress}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-badge-violet-bg hover:text-vital-violet transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mx-5" />

          {/* Menu items */}
          <div className="p-3">
            {/* Verify Identity */}
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[13.5px] font-medium text-text-primary hover:bg-badge-violet-bg/50 transition-all duration-200 group">
              <Fingerprint className="w-[18px] h-[18px] text-text-tertiary group-hover:text-vital-violet transition-colors" strokeWidth={1.8} />
              <span className="flex-1 text-left">Verify Identity</span>
              <ChevronRight className="w-4 h-4 text-text-tertiary/50" />
            </button>

            {/* Divider */}
            <div className="h-px bg-border-subtle mx-1 my-1" />

            {/* Theme */}
            <div className="px-3 py-3">
              <div className="flex items-center gap-3 mb-3">
                <Sun className="w-[18px] h-[18px] text-text-tertiary" strokeWidth={1.8} />
                <span className="text-[13.5px] font-medium text-text-primary">
                  Theme
                </span>
              </div>
              <div className="flex items-center gap-1.5 ml-[30px]">
                {([
                  { value: "dark" as ThemeOption, icon: Moon, label: "Dark" },
                  { value: "system" as ThemeOption, icon: Monitor, label: "System" },
                  { value: "light" as ThemeOption, icon: Sun, label: "Light" },
                ]).map(({ value, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                      theme === value
                        ? "bg-badge-violet-bg border border-vital-violet/20 text-vital-violet shadow-sm"
                        : "text-text-tertiary hover:bg-surface-hover border border-transparent"
                    )}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.8} />
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border-subtle mx-1 my-1" />

            {/* Accounts */}
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[13.5px] font-medium text-text-primary hover:bg-badge-violet-bg/50 transition-all duration-200 group">
              <div className="w-[18px] h-[18px] flex items-center justify-center">
                <div className="flex items-center -space-x-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-vital-violet to-breath-lavender border border-surface" />
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-thermal-cyan to-[#00A88A] border border-surface" />
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-signal-rose to-[#E05585] border border-surface" />
                </div>
              </div>
              <span className="flex-1 text-left">Accounts</span>
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1.5 mr-1">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-vital-violet to-breath-lavender border-2 border-surface" />
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-thermal-cyan to-[#00A88A] border-2 border-surface" />
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-signal-rose to-[#E05585] border-2 border-surface" />
                  <div className="w-5 h-5 rounded-full border border-dashed border-text-tertiary/30 flex items-center justify-center bg-surface">
                    <Plus className="w-2.5 h-2.5 text-text-tertiary" />
                  </div>
                </div>
                <Pencil className="w-3.5 h-3.5 text-text-tertiary/50" />
              </div>
            </button>

            {/* Divider */}
            <div className="h-px bg-border-subtle mx-1 my-1" />

            {/* Connected apps */}
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[13.5px] font-medium text-text-primary hover:bg-badge-violet-bg/50 transition-all duration-200 group">
              <AppWindow className="w-[18px] h-[18px] text-text-tertiary group-hover:text-vital-violet transition-colors" strokeWidth={1.8} />
              <span className="flex-1 text-left">Connected apps</span>
              <Link2 className="w-3.5 h-3.5 text-text-tertiary/50" />
            </button>

            {/* Divider */}
            <div className="h-px bg-border-subtle mx-1 my-1" />

            {/* Connected wallets */}
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[13.5px] font-medium text-text-primary hover:bg-badge-violet-bg/50 transition-all duration-200 group">
              <Wallet className="w-[18px] h-[18px] text-text-tertiary group-hover:text-vital-violet transition-colors" strokeWidth={1.8} />
              <span className="flex-1 text-left">Connected wallets</span>
              <Plus className="w-3.5 h-3.5 text-text-tertiary/50" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mx-5" />

          {/* Logout */}
          <div className="p-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold text-signal-rose/80 border border-signal-rose/10 bg-signal-rose/[0.03] hover:bg-signal-rose/[0.08] hover:border-signal-rose/20 hover:text-signal-rose transition-all duration-200"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.8} />
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
