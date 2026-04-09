"use client";

export default function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-proof-white via-surface to-[#F0EAFF] p-6 pb-5 animate-fade-in-up">
      {/* Decorative orbs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-vital-violet/5 blur-2xl animate-float-orb" />
      <div
        className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-thermal-cyan/5 blur-2xl animate-float-orb"
        style={{ animationDelay: "2s" }}
      />

      <h2 className="text-[22px] font-bold text-text-primary tracking-[-0.03em] relative z-10">
        Welcome back, psychedelia{" "}
        <span className="inline-block animate-breathe origin-bottom-right">
          👋
        </span>
      </h2>
      <p className="text-[13.5px] text-text-secondary mt-1 relative z-10">
        Here&apos;s where you left off
      </p>
    </div>
  );
}
