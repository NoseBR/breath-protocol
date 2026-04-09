"use client";

import { ExternalLink, Wind } from "lucide-react";

const articles = [
  {
    title: "What is zkTLS and how does it work?",
    author: "Team Breath",
    readTime: "10 min read",
    gradient: "from-vital-violet to-breath-lavender",
  },
  {
    title: "What are verifiable credentials?",
    author: "Team Breath",
    readTime: "10 min read",
    gradient: "from-thermal-cyan to-[#00A88A]",
  },
  {
    title: "How will Breath Protocol change identity?",
    author: "Team Breath",
    readTime: "15 min read",
    gradient: "from-signal-rose to-[#E05585]",
  },
  {
    title: "The New Breath: what comes next?",
    author: "Team Breath",
    readTime: "15 min read",
    gradient: "from-breath-lavender to-vital-violet",
  },
];

export default function HelpCenter() {
  return (
    <div
      className="bg-surface rounded-2xl border border-border p-4 animate-slide-in-right"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em]">
          Help center
        </h4>
        <ExternalLink className="w-3.5 h-3.5 text-text-tertiary" />
      </div>

      <div className="space-y-1.5">
        {articles.map((article) => (
          <button
            key={article.title}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-proof-white transition-all duration-200 group"
          >
            <div
              className={`w-9 h-9 rounded-lg bg-gradient-to-br ${article.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}
            >
              <Wind className="w-4 h-4 text-white/80" strokeWidth={1.8} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[12.5px] font-medium text-text-primary truncate group-hover:text-vital-violet transition-colors">
                {article.title}
              </p>
              <p className="text-[10.5px] text-text-tertiary mt-0.5">
                {article.author} · {article.readTime}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
