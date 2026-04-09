"use client";

import { useState, useEffect } from "react";
import { Wind, ArrowRight, Wallet, Fingerprint, Shield, X, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { useConnect, useAccount, useSignMessage, useDisconnect } from "wagmi";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, signInWithGoogle, signInWithWallet } = useAuth();
  const [authLoading, setAuthLoading] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);

  // Wagmi hooks
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // When wallet connects, sign message and authenticate with Supabase
  useEffect(() => {
    if (isConnected && address && authLoading === "wallet") {
      handleWalletSign(address);
    }
  }, [isConnected, address]);

  const handleWalletSign = async (walletAddress: string) => {
    try {
      const message = `Sign in to Breath Protocol\n\nWallet: ${walletAddress}\nTimestamp: ${Date.now()}`;
      const signature = await signMessageAsync({ message });
      await signInWithWallet(walletAddress, signature, message);
      router.push("/dashboard");
    } catch (err) {
      setWalletError("Signature rejected or authentication failed.");
      disconnect();
      setAuthLoading(null);
    }
  };

  const handleGoogle = async () => {
    setAuthLoading("google");
    try {
      await signInWithGoogle();
    } catch {
      setAuthLoading(null);
    }
  };

  const handleWalletConnect = (connectorIndex: number) => {
    setWalletError(null);
    setAuthLoading("wallet");
    const connector = connectors[connectorIndex];
    if (connector) {
      connect({ connector });
    }
  };

  // Show nothing while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-dark-surface flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl gradient-iridescent-animated flex items-center justify-center shadow-2xl shadow-vital-violet/30">
          <Wind className="w-6 h-6 text-white animate-breathe" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-surface relative overflow-hidden flex items-center justify-center">
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 600px 400px at 25% 30%, rgba(123, 47, 190, 0.25) 0%, transparent 70%),
              radial-gradient(ellipse 500px 350px at 75% 60%, rgba(0, 212, 170, 0.15) 0%, transparent 70%),
              radial-gradient(ellipse 400px 300px at 50% 80%, rgba(255, 107, 157, 0.1) 0%, transparent 60%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(196,161,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196,161,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-[15%] w-3 h-3 rounded-full bg-vital-violet/40 animate-float-orb" />
      <div className="absolute bottom-32 right-[20%] w-2 h-2 rounded-full bg-thermal-cyan/50 animate-float-orb" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[40%] right-[10%] w-1.5 h-1.5 rounded-full bg-signal-rose/40 animate-float-orb" style={{ animationDelay: "4s" }} />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-[420px] mx-4 animate-fade-in-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl gradient-iridescent-animated flex items-center justify-center shadow-2xl shadow-vital-violet/30 mb-5">
            <Wind className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em] mb-1.5">
            Breath Protocol
          </h1>
          <p className="text-[14px] text-white/40 text-center max-w-[280px] leading-relaxed">
            Your decentralized identity hub. Prove, verify, and own your credentials on-chain.
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl p-6 md:p-8">
          <h2 className="text-[18px] font-semibold text-white/90 mb-1 tracking-[-0.01em]">
            Sign in
          </h2>
          <p className="text-[13px] text-white/35 mb-7">
            Choose a method to access your dashboard
          </p>

          <div className="space-y-3">
            {/* Google */}
            <button
              onClick={handleGoogle}
              disabled={authLoading !== null}
              className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1] hover:border-white/[0.14] transition-all duration-300 hover:-translate-y-px hover:shadow-lg hover:shadow-vital-violet/5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="flex-1 text-left text-[14px] font-semibold">Continue with Google</span>
              {authLoading === "google" ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[11px] text-white/25 font-medium uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Web3 Wallet */}
            <button
              onClick={() => {
                setShowWalletModal(true);
                setWalletError(null);
              }}
              disabled={authLoading !== null}
              className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl bg-gradient-to-r from-vital-violet/20 to-thermal-cyan/10 border border-vital-violet/20 text-white hover:from-vital-violet/30 hover:to-thermal-cyan/15 hover:border-vital-violet/35 transition-all duration-300 hover:-translate-y-px hover:shadow-lg hover:shadow-vital-violet/15 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Wallet className="w-5 h-5 text-breath-lavender flex-shrink-0" />
              <span className="flex-1 text-left text-[14px] font-semibold">Connect Web3 Wallet</span>
              {authLoading === "wallet" ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-breath-lavender rounded-full animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4 text-breath-lavender/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          </div>

          {/* Wallet support note */}
          <div className="mt-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-[#F6851B]/20 border-2 border-dark-surface flex items-center justify-center">
                <span className="text-[8px]">🦊</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#3B99FC]/20 border-2 border-dark-surface flex items-center justify-center">
                <span className="text-[8px]">🔗</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#0052FF]/20 border-2 border-dark-surface flex items-center justify-center">
                <span className="text-[8px]">🔵</span>
              </div>
            </div>
            <span className="text-[11px] text-white/30 leading-snug">
              MetaMask, WalletConnect, Coinbase Wallet & more
            </span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-thermal-cyan/50" />
            <span className="text-[11px] text-white/25">End-to-end encrypted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fingerprint className="w-3.5 h-3.5 text-vital-violet/50" />
            <span className="text-[11px] text-white/25">Zero-knowledge proofs</span>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-[11px] text-white/20 mt-5 leading-relaxed">
          By continuing, you agree to Breath Protocol&apos;s{" "}
          <button className="text-breath-lavender/40 hover:text-breath-lavender/60 transition-colors underline underline-offset-2">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-breath-lavender/40 hover:text-breath-lavender/60 transition-colors underline underline-offset-2">
            Privacy Policy
          </button>
        </p>
      </div>

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <>
          <div
            className="fixed inset-0 z-50 bg-dark-surface/60 backdrop-blur-sm"
            onClick={() => {
              setShowWalletModal(false);
              setAuthLoading(null);
            }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="w-full max-w-[380px] rounded-2xl border border-white/[0.08] bg-[#1A1525] shadow-2xl shadow-dark-surface/50 pointer-events-auto animate-fade-in-up overflow-hidden"
              style={{ animationDuration: "0.25s" }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-5 pb-3">
                <div>
                  <h3 className="text-[16px] font-semibold text-white tracking-[-0.01em]">
                    Connect Wallet
                  </h3>
                  <p className="text-[12px] text-white/35 mt-0.5">
                    Choose your preferred wallet
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowWalletModal(false);
                    setAuthLoading(null);
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:bg-white/[0.06] hover:text-white/60 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Error message */}
              {walletError && (
                <div className="mx-5 mb-3 px-3 py-2 rounded-lg bg-signal-rose/10 border border-signal-rose/20">
                  <p className="text-[12px] text-signal-rose">{walletError}</p>
                </div>
              )}

              {/* Wallet options */}
              <div className="px-4 pb-5 space-y-1.5">
                {connectors.map((connector, index) => (
                  <button
                    key={connector.uid}
                    onClick={() => handleWalletConnect(index)}
                    disabled={isConnecting}
                    className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-vital-violet/20 transition-all duration-200 group disabled:opacity-50"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                      {connector.name.toLowerCase().includes("metamask") ? (
                        <span className="text-[20px]">🦊</span>
                      ) : connector.name.toLowerCase().includes("walletconnect") ? (
                        <span className="text-[20px]">🔗</span>
                      ) : connector.name.toLowerCase().includes("coinbase") ? (
                        <span className="text-[20px]">🔵</span>
                      ) : (
                        <Wallet className="w-5 h-5 text-breath-lavender" />
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-[13.5px] font-semibold text-white/90">
                        {connector.name}
                      </p>
                      <p className="text-[11px] text-white/30">
                        {connector.name.toLowerCase().includes("metamask")
                          ? "Browser extension wallet"
                          : connector.name.toLowerCase().includes("walletconnect")
                          ? "Scan with mobile wallet"
                          : connector.name.toLowerCase().includes("coinbase")
                          ? "Coinbase Wallet app"
                          : "Connect wallet"}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/15 group-hover:text-vital-violet/60 transition-colors" />
                  </button>
                ))}

                {connectors.length === 0 && (
                  <div className="text-center py-6">
                    <Wallet className="w-8 h-8 text-white/15 mx-auto mb-2" />
                    <p className="text-[13px] text-white/30">No wallets detected</p>
                    <p className="text-[11px] text-white/20 mt-1">
                      Install MetaMask or another Web3 wallet
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/[0.04]">
                <p className="text-[10.5px] text-white/20 text-center">
                  By connecting, you agree to sign a message to verify wallet ownership
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
