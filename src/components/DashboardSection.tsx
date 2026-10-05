import React from 'react';
import { 
  ShieldCheck, AlertTriangle, ShieldAlert, BarChart2, 
  PieChart, Activity, CheckCircle2, ArrowUpRight 
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface DashboardSectionProps {
  recentScans: AnalysisResult[];
  onSelectScan?: (scan: AnalysisResult) => void;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({ recentScans, onSelectScan }) => {
  // Aggregate statistics based on seeded data + dynamic user interactions
  const baseSafe = 1420;
  const baseSuspicious = 412;
  const baseScams = 638;

  // Add user's session scans
  const userSafe = recentScans.filter((s) => s.classification === 'SAFE').length;
  const userSuspicious = recentScans.filter((s) => s.classification === 'SUSPICIOUS').length;
  const userScams = recentScans.filter((s) => s.classification === 'LIKELY SCAM').length;

  const totalSafe = baseSafe + userSafe;
  const totalSuspicious = baseSuspicious + userSuspicious;
  const totalScams = baseScams + userScams;
  const totalAnalyzed = totalSafe + totalSuspicious + totalScams;
  const accuracy = '96.8%';

  // Proportions for Donut Chart
  const safePercent = Math.round((totalSafe / totalAnalyzed) * 100);
  const suspiciousPercent = Math.round((totalSuspicious / totalAnalyzed) * 100);
  const scamPercent = Math.round((totalScams / totalAnalyzed) * 100);

  // SVG Donut calculation
  const circumference = 2 * Math.PI * 40; // r = 40
  const safeOffset = 0;
  const safeDash = (safePercent / 100) * circumference;
  const suspiciousDash = (suspiciousPercent / 100) * circumference;
  const scamDash = (scamPercent / 100) * circumference;

  const riskBands = [
    { label: 'Low Risk (0 - 35%)', count: totalSafe, percent: safePercent, color: 'bg-emerald-500' },
    { label: 'Medium Risk (36 - 74%)', count: totalSuspicious, percent: suspiciousPercent, color: 'bg-amber-500' },
    { label: 'High Risk (75 - 100%)', count: totalScams, percent: scamPercent, color: 'bg-rose-500' },
  ];

  const threatCategories = [
    { category: 'Banking & Financial Fraud', share: 38, count: 242 },
    { category: 'Fake Delivery & Customs', share: 24, count: 153 },
    { category: 'Prize, Lottery & Gift Cards', share: 18, count: 115 },
    { category: 'Account Verification / OTP Stealers', share: 14, count: 89 },
    { category: 'Legal Coercion / Impersonation', share: 6, count: 39 },
  ];

  return (
    <section id="dashboard" className="relative py-16 md:py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-400 mb-3">
            <Activity className="h-3.5 w-3.5" />
            <span>Cybersecurity Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Scam Detection Analytics
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Real-time telemetry showing distribution of processed content, threat category patterns, and classification precision.
          </p>
        </div>

        {/* 5 Core Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm">
            <div className="text-xs font-medium text-slate-400">Total Analyzed</div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
              {totalAnalyzed.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] text-cyan-400 flex items-center gap-1 font-mono">
              <Activity className="h-3 w-3" /> Live Telemetry
            </div>
          </div>

          <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-4 shadow-sm">
            <div className="text-xs font-medium text-rose-300">Scams Detected</div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-rose-400 tabular-nums">
              {totalScams.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] text-rose-300/80 font-mono">
              {scamPercent}% of corpus
            </div>
          </div>

          <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-4 shadow-sm">
            <div className="text-xs font-medium text-amber-300">Suspicious Flagged</div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
              {totalSuspicious.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] text-amber-300/80 font-mono">
              {suspiciousPercent}% of corpus
            </div>
          </div>

          <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 shadow-sm">
            <div className="text-xs font-medium text-emerald-300">Safe Messages</div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
              {totalSafe.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] text-emerald-300/80 font-mono">
              {safePercent}% of corpus
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-4 shadow-sm">
            <div className="text-xs font-medium text-cyan-300">Detection Accuracy</div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 tabular-nums">
              {accuracy}
            </div>
            <div className="mt-1 text-[11px] text-cyan-300/80 font-mono">
              F1 Benchmark: 96.6%
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Chart 1: Donut Distribution (Scam vs Safe) */}
          <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-cyan-400" />
                  <span>Threat vs Safe Share</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">Distribution</span>
              </div>

              {/* Donut SVG */}
              <div className="relative my-4 flex items-center justify-center">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1e293b"
                    strokeWidth="14"
                  />
                  {/* Safe Segment (Green) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="14"
                    strokeDasharray={`${safeDash} ${circumference}`}
                    strokeDashoffset="0"
                  />
                  {/* Suspicious Segment (Yellow) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="14"
                    strokeDasharray={`${suspiciousDash} ${circumference}`}
                    strokeDashoffset={`-${safeDash}`}
                  />
                  {/* Scam Segment (Red) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f43f5e"
                    strokeWidth="14"
                    strokeDasharray={`${scamDash} ${circumference}`}
                    strokeDashoffset={`-${safeDash + suspiciousDash}`}
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold font-mono text-white tabular-nums">
                    {totalAnalyzed}
                  </span>
                  <span className="text-[11px] text-slate-400">Total Scans</span>
                </div>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>Safe Messages</span>
                </span>
                <span className="font-mono font-semibold text-emerald-400">{safePercent}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <span>Suspicious Alerts</span>
                </span>
                <span className="font-mono font-semibold text-amber-400">{suspiciousPercent}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span>Likely Scams</span>
                </span>
                <span className="font-mono font-semibold text-rose-400">{scamPercent}%</span>
              </div>
            </div>
          </div>

          {/* Chart 2: Risk-Level Distribution Bars */}
          <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-cyan-400" />
                  <span>Risk Severity Tiers</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">Breakdown</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Calibrated risk score spread across low, medium, and critical severity intervals.
              </p>

              <div className="space-y-4">
                {riskBands.map((band) => (
                  <div key={band.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{band.label}</span>
                      <span className="font-mono text-slate-400 tabular-nums">
                        {band.count.toLocaleString()} ({band.percent}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${band.color} transition-all duration-700`}
                        style={{ width: `${band.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-400">
              <span className="text-slate-300 font-semibold">Triage Rule:</span> Entries exceeding 75% risk threshold are automatically prioritized for defensive alerts.
            </div>
          </div>

          {/* Chart 3: Top Threat Categories */}
          <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-400" />
                <span>Observed Scam Vectors</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">Categorical</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Prevalence of social engineering tactics identified in flagged scam entries.
            </p>

            <div className="space-y-3">
              {threatCategories.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 truncate max-w-[200px]">{cat.category}</span>
                    <span className="font-mono text-cyan-400 tabular-nums font-semibold">
                      {cat.share}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{ width: `${cat.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Session Scans Log */}
        {recentScans.length > 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Your Analysis Session History</h3>
                <p className="text-xs text-slate-400">Messages and URLs inspected during this session</p>
              </div>
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded">
                {recentScans.length} recent
              </span>
            </div>

            <div className="divide-y divide-slate-800 overflow-x-auto">
              {recentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="py-3 flex items-center justify-between gap-4 text-xs hover:bg-slate-800/30 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`px-2 py-0.5 rounded-full font-mono font-semibold text-[10px] ${
                      scan.classification === 'SAFE'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : scan.classification === 'SUSPICIOUS'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {scan.classification}
                    </span>
                    <span className="font-mono text-slate-500 shrink-0">{scan.timestamp}</span>
                    <p className="text-slate-300 truncate max-w-md font-sans">
                      {scan.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono font-bold text-slate-200 tabular-nums">
                      Risk: {scan.riskScore}%
                    </span>
                    {onSelectScan && (
                      <button
                        type="button"
                        onClick={() => onSelectScan(scan)}
                        className="text-cyan-400 hover:text-cyan-300 p-1 flex items-center gap-1 cursor-pointer"
                        title="Re-inspect in analyzer"
                      >
                        <span className="hidden sm:inline">Inspect</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
