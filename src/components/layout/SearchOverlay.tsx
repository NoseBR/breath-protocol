"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  ArrowRight,
  ShieldCheck,
  Blocks,
  Gift,
  HelpCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const quickLinks = [
  {
    label: "Credentials",
    description: "Verify and manage your proofs",
    icon: ShieldCheck,
    href: "/credentials",
    color: "text-vital-violet",
    bg: "bg-badge-violet-bg",
  },
  {
    label: "Block Explorer",
    description: "Track on-chain activity",
    icon: Blocks,
    href: "#",
    color: "text-thermal-cyan",
    bg: "bg-badge-cyan-bg",
  },
  {
    label: "Rewards",
    description: "Earn $BTH token rewards",
    icon: Gift,
    href: "#",
    color: "text-signal-rose",
    bg: "bg-badge-rose-bg",
  },
  {
    label: "Help Center",
    description: "FAQs and support articles",
    icon: HelpCircle,
    href: "#",
    color: "text-badge-yellow-text",
    bg: "bg-badge-yellow-bg",
  },
];

const recentSearches = [
  "Accor Live Limitless",
  "KYC verification",
  "wallet connect",
];

const trendingTopics = [
  "Bridge credentials",
  "$BTH staking",
  "Zero-knowledge proofs",
  "Developer API",
];

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-dark-surface/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search panel */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center pt-[10vh] px-4 pointer-events-none">
        <div
          className="w-full max-w-[560px] bg-surface rounded-2xl border border-border shadow-2xl shadow-dark-surface/20 pointer-events-auto animate-fade-in-up overflow-hidden"
          style={{ animationDuration: "0.25s" }}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border-subtle">
            <Search className="w-5 h-5 text-text-tertiary flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search credentials, pages, or help articles..."
              className="flex-1 bg-transparent text-[15px] text-text-primary placeholder:text-text-tertiary/60 outline-none font-medium tracking-[-0.01em]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="w-6 h-6 rounded-md flex items-center justify-center text-text-tertiary hover:bg-badge-violet-bg hover:text-vital-violet transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd className="hidden sm:flex items-center px-2 py-1 rounded-md bg-badge-neutral-bg text-[10px] font-medium text-text-tertiary tracking-wider">
              ESC
            </kbd>
          </div>

          {/* Results area */}
          <div className="max-h-[400px] overflow-y-auto">
            {!query ? (
              <div className="p-4 space-y-5">
                {/* Quick links */}
                <div>
                  <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-2.5 px-1">
                    Quick links
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center gap-2.5 p-3 rounded-xl border border-border-subtle hover:border-vital-violet/15 hover:bg-badge-violet-bg/30 transition-all duration-200 group"
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                              link.bg
                            )}
                          >
                            <Icon className={cn("w-4 h-4", link.color)} strokeWidth={1.8} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[12.5px] font-semibold text-text-primary truncate">
                              {link.label}
                            </p>
                            <p className="text-[10.5px] text-text-tertiary truncate">
                              {link.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Recent searches */}
                <div>
                  <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-2 px-1">
                    Recent
                  </p>
                  <div className="space-y-0.5">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-text-secondary hover:bg-surface-hover transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5 text-text-tertiary/50" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending */}
                <div>
                  <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-2 px-1">
                    Trending
                  </p>
                  <div className="flex flex-wrap gap-2 px-1">
                    {trendingTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setQuery(topic)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-badge-neutral-bg/60 text-[12px] font-medium text-text-secondary hover:bg-badge-violet-bg hover:text-vital-violet transition-all duration-200"
                      >
                        <TrendingUp className="w-3 h-3" />
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                {/* Filtered results */}
                <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-3 px-1">
                  Results for &ldquo;{query}&rdquo;
                </p>
                {quickLinks
                  .filter(
                    (l) =>
                      l.label.toLowerCase().includes(query.toLowerCase()) ||
                      l.description.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-hover transition-colors group"
                      >
                        <div
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                            link.bg
                          )}
                        >
                          <Icon className={cn("w-4 h-4", link.color)} strokeWidth={1.8} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-text-primary">
                            {link.label}
                          </p>
                          <p className="text-[11.5px] text-text-tertiary">
                            {link.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-text-tertiary/30 group-hover:text-vital-violet transition-colors" />
                      </Link>
                    );
                  })}
                {quickLinks.filter(
                  (l) =>
                    l.label.toLowerCase().includes(query.toLowerCase()) ||
                    l.description.toLowerCase().includes(query.toLowerCase())
                ).length === 0 && (
                  <div className="text-center py-8">
                    <Search className="w-8 h-8 text-text-tertiary/30 mx-auto mb-3" />
                    <p className="text-[13px] text-text-tertiary">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-[12px] text-text-tertiary/60 mt-1">
                      Try a different search term
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
