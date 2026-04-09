"use client";

import {
  Home,
  ShieldCheck,
  Blocks,
  ArrowLeftRight,
  Code2,
  TerminalSquare,
  Gift,
  Compass,
  Wind,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
  { label: "Home", icon: Home, id: "home", href: "/" },
  { label: "Credentials", icon: ShieldCheck, id: "credentials", href: "/credentials" },
  { label: "Block explorer", icon: Blocks, id: "block-explorer", href: "#" },
  { label: "Bridge", icon: ArrowLeftRight, id: "bridge", href: "#" },
  { label: "Developers", icon: Code2, id: "developers", href: "#", badge: "New" },
  { label: "Developer Portal", icon: TerminalSquare, id: "developer-portal", href: "#" },
  { label: "Rewards", icon: Gift, id: "rewards", href: "#", badge: "Coming soon" },
  { label: "Discover", icon: Compass, id: "discover", href: "#", badge: "Coming soon" },
];

interface SidebarProps {
  activePage?: string;
}

export default function Sidebar({ activePage = "home" }: SidebarProps) {
  return (
    <aside className="w-[232px] min-w-[232px] bg-surface border-r border-border flex flex-col z-40 animate-slide-in-left h-screen sticky top-0">
      {/* Logo */}
      <Link href="/" className="px-6 py-5 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl gradient-iridescent-animated flex items-center justify-center shadow-md shadow-vital-violet/20">
          <Wind className="w-5 h-5 text-white" />
        </div>
        <span className="text-[17px] font-bold tracking-[-0.02em] text-text-primary">
          BREATH
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-2 stagger-children">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activePage;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-200 group mb-0.5",
                isActive
                  ? "bg-badge-violet-bg text-vital-violet shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                  : "text-text-secondary hover:bg-badge-violet-bg/50 hover:text-text-primary"
              )}
            >
              <Icon
                className={cn(
                  "w-[18px] h-[18px] transition-colors",
                  isActive
                    ? "text-vital-violet"
                    : "text-text-tertiary group-hover:text-vital-violet"
                )}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge === "New" && (
                <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-md bg-badge-cyan-bg text-badge-cyan-text leading-none">
                  New
                </span>
              )}
              {item.badge === "Coming soon" && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-badge-neutral-bg text-badge-neutral-text leading-none">
                  Soon
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mx-6 mb-5">
        <div className="h-px gradient-iridescent opacity-20 rounded-full" />
        <p className="text-[10.5px] text-text-tertiary mt-3 text-center tracking-wide">
          Breath Protocol v1.0
        </p>
      </div>
    </aside>
  );
}
