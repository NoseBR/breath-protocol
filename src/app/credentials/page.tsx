"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wind } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import Sidebar from "@/components/layout/Sidebar";
import CredentialsTopBar from "@/components/credentials/CredentialsTopBar";
import CredentialGrid from "@/components/credentials/CredentialGrid";

export default function CredentialsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-proof-white flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl gradient-iridescent-animated flex items-center justify-center shadow-2xl shadow-vital-violet/30">
          <Wind className="w-6 h-6 text-white animate-breathe" />
        </div>
      </div>
    );
  }
  const [activeTab, setActiveTab] = useState<"all" | "verified" | "unverified">("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  return (
    <div className="flex h-screen bg-proof-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-dark-surface/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar activePage="credentials" />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-screen">
        <CredentialsTopBar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
        />
        <main className="flex-1 overflow-y-auto min-h-0 p-4 md:p-6">
          <CredentialGrid
            activeTab={activeTab}
            search={search}
            category={category}
          />
        </main>
      </div>
    </div>
  );
}
