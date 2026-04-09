"use client";

import { useState } from "react";
import {
  Wind,
  ShieldCheck,
  Link2,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    icon: Wind,
    question: "What is Breath Protocol?",
    answer:
      "Breath Protocol's Breath ID allows you to prove personal information about yourself without revealing any private data to other people or organizations. You can use this ID to prove your identity, earn rewards, and verify things like ticket or asset ownership instantly, both online and in the real world.",
    defaultOpen: true,
    iconColor: "text-vital-violet",
    iconBg: "bg-badge-violet-bg",
  },
  {
    icon: ShieldCheck,
    question: "What are credentials?",
    answer:
      "Credentials are verified proofs of your real-world identity attributes — memberships, bank accounts, social profiles, and more — stored securely on-chain using zero-knowledge proofs.",
    iconColor: "text-thermal-cyan",
    iconBg: "bg-badge-cyan-bg",
  },
  {
    icon: Link2,
    question: "What are linked accounts?",
    answer:
      "Linked accounts are external services and platforms connected to your Breath ID. They allow seamless verification across different ecosystems while maintaining your privacy.",
    iconColor: "text-signal-rose",
    iconBg: "bg-badge-rose-bg",
  },
  {
    icon: EyeOff,
    question: "How do we verify personal information without storing your data?",
    answer:
      "We use zero-knowledge proof technology (zkTLS) that allows verification of claims without exposing underlying data. Your information never leaves your device — only cryptographic proofs are shared.",
    iconColor: "text-breath-lavender",
    iconBg: "bg-breath-lavender-light",
  },
];

export default function SupportFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: "0.32s" }}
    >
      <h3 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em] mb-4">
        We support you
      </h3>

      <div className="flex gap-5">
        {/* Illustration */}
        <div className="hidden lg:flex flex-shrink-0 w-[200px] h-[280px] rounded-2xl bg-gradient-to-br from-proof-white via-[#F0EAFF] to-badge-violet-bg overflow-hidden items-end justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-6 w-16 h-16 rounded-2xl bg-vital-violet/8 rotate-12" />
          <div className="absolute top-14 right-5 w-10 h-10 rounded-xl bg-thermal-cyan/8 -rotate-6" />
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-surface shadow-xl shadow-vital-violet/10 flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-vital-violet" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg gradient-iridescent flex items-center justify-center shadow-md">
              <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <span
              className="text-[9px] text-vital-violet/50 font-semibold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Secured by BtP
            </span>
          </div>
        </div>

        {/* Accordion */}
        <div className="flex-1 space-y-2">
          {faqs.map((faq, i) => {
            const Icon = faq.icon;
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className={cn(
                  "rounded-2xl border transition-all duration-300",
                  isOpen
                    ? "bg-surface border-vital-violet/15 shadow-sm"
                    : "bg-surface border-border hover:border-vital-violet/10"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 p-3.5"
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300",
                      faq.iconBg,
                      isOpen && "scale-110"
                    )}
                  >
                    <Icon className={cn("w-4.5 h-4.5", faq.iconColor)} strokeWidth={1.8} />
                  </div>
                  <span className="flex-1 text-left text-[13.5px] font-semibold text-text-primary">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-text-tertiary transition-transform duration-300 flex-shrink-0",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="px-3.5 pb-4 pl-[60px] text-[12.5px] text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
