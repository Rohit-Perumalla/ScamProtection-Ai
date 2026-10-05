import React from 'react';
import { Shield, Link2, Lightbulb, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

interface HeroSectionProps {
  onAnalyzeClick: () => void;
  onHowItWorksClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAnalyzeClick,
  onHowItWorksClick,
}) => {
  const featureCards = [
    {
      title: 'AI Scam Detection',
      description: 'Analyze suspicious messages using AI/ML.',
      icon: Shield,
      emoji: '🛡️',
      color: 'border-cyan-500/30 hover:border-cyan-400/50 bg-cyan-950/20 text-cyan-400',
    },
    {
      title: 'URL Analysis',
      description: 'Check suspicious URLs for phishing indicators.',
      icon: Link2,
      emoji: '🔗',
      color: 'border-blue-500/30 hover:border-blue-400/50 bg-blue-950/20 text-blue-400',
    },
    {
      title: 'Explainable Results',
      description: 'Understand why the content was classified as suspicious.',
      icon: Lightbulb,
      emoji: '💡',
      color: 'border-emerald-500/30 hover:border-emerald-400/50 bg-emerald-950/20 text-emerald-400',
    },
  ];

  return (
    <div className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-radial-gradient pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-To-Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Next-Gen Cybersecurity Awareness Prototype</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Protect Yourself From <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                Online Scams With AI
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              ScamProtAI analyzes suspicious messages and URLs to identify potential scam and phishing threats.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={onAnalyzeClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
              >
                <span>Analyze Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onHowItWorksClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
              >
                <span>How It Works</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Zero Installation Required</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Instant NLP Heuristics</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Privacy-First Client Processing</span>
              </span>
            </div>
          </div>

          {/* Right Column: Cybersecurity Visual Dashboard */}
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>

        {/* Below the Hero: Three Feature Cards */}
        <div className="mt-20 pt-10 border-t border-slate-800/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`group relative rounded-2xl border p-6 transition-all duration-200 backdrop-blur-sm ${card.color}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl" role="img" aria-label={card.title}>
                      {card.emoji}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
