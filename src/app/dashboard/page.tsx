"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wind } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import WelcomeBanner from "@/components/home/WelcomeBanner";
import UserProfileStrip from "@/components/home/UserProfileStrip";
import PromoCarousel from "@/components/home/PromoCarousel";
import GettingStarted from "@/components/home/GettingStarted";
import CredentialCards from "@/components/home/CredentialCards";
import SupportFAQ from "@/components/home/SupportFAQ";
import BreathIndex from "@/components/sidebar-widgets/BreathIndex";
import MyCredentials from "@/components/sidebar-widgets/MyCredentials";
import TokenWidget from "@/components/sidebar-widgets/TokenWidget";
import HelpCenter from "@/components/sidebar-widgets/HelpCenter";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  // Show loading while checking auth
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-proof-white flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl gradient-iridescent-animated flex items-center justify-center shadow-2xl shadow-vital-violet/30">
          <Wind className="w-6 h-6 text-white animate-breathe" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-proof-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-dark-surface/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar — hidden on mobile, drawer when toggled */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row min-w-0 min-h-0">
        {/* Center column */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 h-screen">
          <TopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto min-h-0 p-4 md:p-6 space-y-4 md:space-y-5">
            <WelcomeBanner />
            <UserProfileStrip />
            <PromoCarousel />
            <GettingStarted />
            <CredentialCards />
            <SupportFAQ />

            {/* Right sidebar widgets — stacked below on mobile/tablet */}
            <div className="xl:hidden space-y-3 mt-2">
              <BreathIndex />
              <MyCredentials />
              <TokenWidget />
              <HelpCenter />
            </div>

            <div className="h-4" />
          </main>
        </div>

        {/* Right Sidebar — hidden below xl */}
        <aside className="hidden xl:block w-[300px] flex-shrink-0 border-l border-border-subtle bg-proof-white/50 overflow-y-auto p-4 space-y-3">
          <BreathIndex />
          <MyCredentials />
          <TokenWidget />
          <HelpCenter />
        </aside>
      </div>
    </div>
  );
}
