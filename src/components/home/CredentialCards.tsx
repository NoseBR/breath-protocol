"use client";

import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import { useRef } from "react";

const credentials = [
  {
    name: "Accor Live Limitless",
    type: "Membership",
    description:
      "Unlock exclusive deals and promotions, personalized offers, and seamless stays with your Accor Live",
    gradient: "from-signal-rose to-[#E05585]",
    initial: "AL",
  },
  {
    name: "Caesars Rewards",
    type: "Membership",
    description:
      "Maximize your entertainment with exciting deals and promotions! Access special deals and promotions",
    gradient: "from-vital-violet to-[#5E22A0]",
    initial: "CR",
  },
  {
    name: "MGM Rewards",
    type: "Membership",
    description:
      "Experience the best of MGM Resorts with exclusive deals and offers. Your MGM Rewards membership",
    gradient: "from-thermal-cyan to-[#00A88A]",
    initial: "MR",
  },
  {
    name: "SkyMiles",
    type: "Membership",
    description:
      "Your passport to extraordinary travel experiences. Earn member deals and exclusive rewards",
    gradient: "from-breath-lavender to-vital-violet",
    initial: "SM",
  },
  {
    name: "Hilton Honors",
    type: "Membership",
    description:
      "Unlock premium hotel experiences worldwide. Enjoy member-only rates and complimentary upgrades",
    gradient: "from-[#FF8C6B] to-signal-rose",
    initial: "HH",
  },
];

export default function CredentialCards() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -280 : 280;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: "0.26s" }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
          Verify more credentials
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:bg-surface-hover hover:border-vital-violet/30 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4 text-text-secondary" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:bg-surface-hover hover:border-vital-violet/30 transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto hide-scrollbar pb-1"
      >
        {credentials.map((cred) => (
          <div
            key={cred.name}
            className="flex-shrink-0 w-[230px] bg-surface border border-border rounded-2xl p-4 hover:border-vital-violet/20 hover:shadow-lg hover:shadow-vital-violet/5 transition-all duration-300 group hover:-translate-y-1"
          >
            {/* Badge */}
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-badge-neutral-bg text-badge-neutral-text mb-3">
              Unverified
            </span>

            {/* Brand */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cred.gradient} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}
              >
                <span className="text-[11px] font-bold text-white">
                  {cred.initial}
                </span>
              </div>
              <span className="text-[13.5px] font-semibold text-text-primary leading-tight">
                {cred.name}
              </span>
            </div>

            {/* Type badge */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <Award className="w-3 h-3 text-vital-violet" />
              <span className="text-[11px] font-medium text-badge-violet-text bg-badge-violet-bg px-1.5 py-0.5 rounded-md">
                {cred.type}
              </span>
            </div>

            {/* Description */}
            <p className="text-[12px] text-text-tertiary leading-relaxed mb-4 line-clamp-2">
              {cred.description}
            </p>

            {/* CTA */}
            <button className="w-full py-2 px-4 rounded-xl text-[12.5px] font-semibold border border-border text-vital-violet bg-transparent hover:bg-vital-violet hover:text-white hover:border-vital-violet hover:-translate-y-px hover:shadow-lg hover:shadow-vital-violet/20 active:translate-y-0 transition-all duration-300 cursor-pointer">
              Get Proof
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
