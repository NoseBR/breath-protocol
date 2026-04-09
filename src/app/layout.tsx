import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import AuthProvider from "@/components/auth/AuthProvider";
import Web3Provider from "@/components/auth/Web3Provider";

export const metadata: Metadata = {
  title: "Breath Protocol — Dashboard",
  description: "Your decentralized identity hub. Prove, verify, and own your credentials on-chain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Prevent FOUC: apply dark class before paint if saved in localStorage */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('breath-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="h-full overflow-hidden">
        <Web3Provider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
