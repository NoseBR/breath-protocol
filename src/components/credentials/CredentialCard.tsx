"use client";

import { Award } from "lucide-react";
import type { Credential } from "./credentialsData";
import { cn } from "@/lib/utils";

const badgeColors: Record<string, { bg: string; text: string }> = {
  Membership: { bg: "bg-badge-violet-bg", text: "text-badge-violet-text" },
  Finance: { bg: "bg-badge-rose-bg", text: "text-badge-rose-text" },
  Identity: { bg: "bg-badge-cyan-bg", text: "text-badge-cyan-text" },
};

export default function CredentialCard({ cred }: { cred: Credential }) {
  const badge = badgeColors[cred.category] || badgeColors.Membership;

  return (
    <div className="bg-surface border border-border rounded-2xl p-4 hover:border-vital-violet/20 hover:shadow-lg hover:shadow-vital-violet/5 transition-all duration-300 group hover:-translate-y-1 flex flex-col">
      {/* Status badge */}
      <span
        className={cn(
          "self-start px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md mb-3",
          cred.verified
            ? "bg-badge-cyan-bg text-badge-cyan-text"
            : "bg-badge-neutral-bg text-badge-neutral-text"
        )}
      >
        {cred.verified ? "Verified" : "Unverified"}
      </span>

      {/* Brand */}
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cred.gradient} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}
        >
          <span className="text-[11px] font-bold text-white">{cred.initial}</span>
        </div>
        <span className="text-[13px] font-semibold text-text-primary leading-tight line-clamp-1">
          {cred.name}
        </span>
      </div>

      {/* Type badge */}
      <div className="flex items-center gap-1.5 mb-2">
        <Award className="w-3 h-3 text-vital-violet" />
        <span className={cn("text-[11px] font-medium px-1.5 py-0.5 rounded-md", badge.bg, badge.text)}>
          {cred.type}
        </span>
      </div>

      {/* Description */}
      <p className="text-[12px] text-text-tertiary leading-relaxed mb-4 line-clamp-2 flex-1">
        {cred.description}
      </p>

      {/* CTA — subtle outlined, iridescent text */}
      <button className="w-full mt-auto py-2 px-4 rounded-xl text-[12.5px] font-semibold border border-border text-vital-violet bg-transparent hover:bg-vital-violet hover:text-white hover:border-vital-violet hover:-translate-y-px hover:shadow-lg hover:shadow-vital-violet/20 active:translate-y-0 transition-all duration-300 cursor-pointer">
        Get Proof
      </button>
    </div>
  );
}
