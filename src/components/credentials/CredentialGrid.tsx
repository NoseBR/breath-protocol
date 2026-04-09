"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { credentials } from "./credentialsData";
import CredentialCard from "./CredentialCard";
import { cn } from "@/lib/utils";

interface CredentialGridProps {
  activeTab: "all" | "verified" | "unverified";
  search: string;
  category: string;
}

const categories = ["Membership", "Finance", "Identity"] as const;

export default function CredentialGrid({ activeTab, search, category }: CredentialGridProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    return credentials.filter((c) => {
      if (activeTab === "verified" && !c.verified) return false;
      if (activeTab === "unverified" && c.verified) return false;
      if (category !== "All" && c.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTab, search, category]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof credentials> = {};
    for (const cat of categories) {
      const items = filtered.filter((c) => c.category === cat);
      if (items.length > 0) map[cat] = items;
    }
    return map;
  }, [filtered]);

  if (Object.keys(grouped).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl gradient-iridescent opacity-20 mb-4" />
        <p className="text-[15px] font-semibold text-text-primary mb-1">No credentials found</p>
        <p className="text-[13px] text-text-tertiary">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {categories.map((cat) => {
        const items = grouped[cat];
        if (!items) return null;
        const isCollapsed = collapsed[cat];

        return (
          <section key={cat}>
            {/* Category header */}
            <button
              onClick={() =>
                setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }))
              }
              className="flex items-center justify-between w-full mb-4 group"
            >
              <div className="flex items-center gap-2.5">
                <h2 className="text-[18px] font-bold text-text-primary tracking-[-0.02em]">
                  {cat}
                </h2>
                <span className="text-[13px] font-medium text-text-tertiary bg-badge-neutral-bg px-2 py-0.5 rounded-md">
                  {items.length}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-text-tertiary group-hover:text-vital-violet transition-all duration-300",
                  isCollapsed && "-rotate-90"
                )}
              />
            </button>

            {/* Grid */}
            {!isCollapsed && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 stagger-children">
                {items.map((cred) => (
                  <CredentialCard key={cred.name} cred={cred} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
