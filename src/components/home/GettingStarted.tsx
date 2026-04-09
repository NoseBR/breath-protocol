"use client";

import {
  Fingerprint,
  Wallet,
  Share2,
  Landmark,
  ArrowRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";

const steps = [
  {
    icon: Fingerprint,
    title: "Prove your Identity",
    subtitle: "Quick breath verification flow",
    color: "from-vital-violet/15 to-breath-lavender/10",
    iconColor: "text-vital-violet",
  },
  {
    icon: Wallet,
    title: "Add your wallet",
    subtitle: "Any of crypto wallet",
    color: "from-thermal-cyan/15 to-thermal-cyan/5",
    iconColor: "text-thermal-cyan",
  },
  {
    icon: Share2,
    title: "Connect your social media",
    subtitle: "Link your social media accounts",
    color: "from-signal-rose/15 to-signal-rose/5",
    iconColor: "text-signal-rose",
  },
  {
    icon: Landmark,
    title: "Verify your bank accounts",
    subtitle: "Secured by Mastercard",
    color: "from-breath-lavender/15 to-vital-violet/5",
    iconColor: "text-breath-lavender",
    hasMastercard: true,
  },
];

export default function GettingStarted() {
  const { session } = useAuth();
  const completedCount = 0;

  const launchKYC = () => {
    const token = session?.access_token;
    if (token) {
      window.open(`https://breathkyc.vercel.app/verify?token=${token}`, "_blank");
    }
  };

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: "0.2s" }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
          Getting started
        </h3>
        <span className="text-[12.5px] text-text-tertiary font-medium">
          {completedCount}/{steps.length} Steps completed
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-5">
        {steps.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-border-subtle">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                i < completedCount
                  ? "gradient-iridescent w-full"
                  : i === 0
                    ? "bg-vital-violet/30 w-[8%]"
                    : "w-0"
              )}
            />
          </div>
        ))}
      </div>

      {/* Steps list */}
      <div className="space-y-2 stagger-children">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <button
              key={step.title}
              onClick={step.title === "Prove your Identity" ? launchKYC : undefined}
              className="w-full flex items-center gap-4 p-3.5 rounded-2xl bg-surface border border-border hover:border-vital-violet/20 hover:shadow-md hover:shadow-vital-violet/5 transition-all duration-300 group hover:-translate-y-px"
            >
              {/* Icon */}
              <div
                className={cn(
                  "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105",
                  step.color
                )}
              >
                <Icon className={cn("w-5 h-5", step.iconColor)} strokeWidth={1.8} />
              </div>

              {/* Text */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13.5px] font-semibold text-text-primary">
                    {step.title}
                  </span>
                  <Info className="w-3.5 h-3.5 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[12px] text-text-tertiary mt-0.5 flex items-center gap-1.5">
                  {step.subtitle}
                  {step.hasMastercard && (
                    <span className="inline-flex items-center gap-0.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-red-500 to-amber-500 inline-block" />
                    </span>
                  )}
                </span>
              </div>

              {/* Action — iridescent button */}
              <div className="w-9 h-9 rounded-xl gradient-iridescent flex items-center justify-center flex-shrink-0 shadow-md shadow-vital-violet/20 group-hover:shadow-lg group-hover:shadow-vital-violet/30 transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.2} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
