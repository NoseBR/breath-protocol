"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";

const slides = [
  {
    title: "Mastercard X Breath Protocol",
    description:
      "Access on-chain loans and more by connecting your Breath ID to your bank accounts.",
    cta: "Get Proof",
  },
  {
    title: "Verify & Earn Rewards",
    description:
      "Complete your credential verifications and earn $BTH token rewards for each milestone.",
    cta: "Start Earning",
  },
  {
    title: "Bridge Your Identity",
    description:
      "Bring your verified credentials cross-chain. One identity, every network.",
    cta: "Learn More",
  },
];

export default function PromoCarousel() {
  const { session } = useAuth();
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setActive((i) => (i === slides.length - 1 ? 0 : i + 1));

  const launchKYC = () => {
    const token = session?.access_token;
    if (token) {
      window.open(`https://breathkyc.vercel.app/verify?token=${token}`, "_blank");
    }
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden animate-fade-in-up"
      style={{ animationDelay: "0.14s" }}
    >
      {/* Background — deep violet to dark surface */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-surface via-[#1A0F2E] to-[#0D1A1F]" />
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 50%, rgba(123, 47, 190, 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 30% 70%, rgba(0, 212, 170, 0.2) 0%, transparent 40%),
                            radial-gradient(circle at 90% 20%, rgba(255, 107, 157, 0.15) 0%, transparent 35%)`,
        }}
      />

      {/* Decorative floating iridescent elements */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-40 hidden md:block">
        <div className="relative w-48 h-48">
          {/* Orbiting circles with brand colors */}
          <div className="absolute inset-0 rounded-full border border-vital-violet/20 animate-breathe" />
          <div
            className="absolute inset-4 rounded-full border border-thermal-cyan/20"
            style={{ animation: "breathe 5s cubic-bezier(0.4,0,0.2,1) infinite reverse" }}
          />
          <div className="absolute inset-8 rounded-full border border-signal-rose/20 animate-breathe" style={{ animationDelay: "1s" }} />
          {/* Center glow — iridescent */}
          <div className="absolute inset-14 rounded-full bg-gradient-to-br from-vital-violet/30 via-thermal-cyan/20 to-signal-rose/20 blur-md" />
          {/* Dots */}
          <div className="absolute top-4 right-12 w-2 h-2 rounded-full bg-thermal-cyan/60" style={{ animation: "dotPulse 3s infinite" }} />
          <div className="absolute bottom-8 left-6 w-1.5 h-1.5 rounded-full bg-signal-rose/60" style={{ animation: "dotPulse 3s infinite 1s" }} />
          <div className="absolute top-16 left-2 w-1 h-1 rounded-full bg-breath-lavender/40" style={{ animation: "dotPulse 3s infinite 2s" }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 md:p-7 md:pr-64">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-thermal-cyan" />
          <span className="text-[11px] font-semibold text-thermal-cyan/80 uppercase tracking-widest">
            Featured
          </span>
        </div>
        <h3 className="text-[20px] font-bold text-white tracking-[-0.02em] mb-2">
          {slides[active].title}
        </h3>
        <p className="text-[13.5px] text-white/50 max-w-sm leading-relaxed mb-5">
          {slides[active].description}
        </p>
        <button
          onClick={slides[active].cta === "Get Proof" || slides[active].cta === "Start Earning" ? launchKYC : undefined}
          className="px-5 py-2.5 bg-white/95 text-dark-surface text-[13px] font-semibold rounded-xl hover:bg-white transition-all duration-300 shadow-lg shadow-black/15 hover:-translate-y-px active:translate-y-0 backdrop-blur-sm border border-white/20"
        >
          {slides[active].cta}
        </button>
      </div>

      {/* Pagination dots + arrows */}
      <div className="relative z-10 flex items-center gap-3 px-7 pb-5">
        <button
          onClick={prev}
          className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-white/70" />
        </button>
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? "w-6 gradient-iridescent"
                  : "w-1.5 bg-white/25 hover:bg-white/40"
              )}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-white/70" />
        </button>
      </div>
    </div>
  );
}
