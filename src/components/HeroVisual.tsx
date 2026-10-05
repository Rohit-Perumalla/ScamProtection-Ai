import React, { useState } from 'react';
import { ShieldCheck, Lock, Activity, Eye, Zap, CheckCircle2, AlertTriangle, Radio } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number>(0);

  const telemetryNodes = [
    { title: 'NLP Syntactic Scanner', value: 'Nominal', status: 'safe', icon: Eye, metric: '0.04 ms' },
    { title: 'Brand Homograph Filter', value: '17 Spoofs Flagged', status: 'alert', icon: AlertTriangle, metric: '99.4% acc' },
    { title: 'Heuristic Vector Engine', value: 'Active', status: 'safe', icon: Zap, metric: 'v2.4 ML' },
    { title: 'Domain Entropy Matrix', value: 'Monitoring', status: 'safe', icon: Activity, metric: '42 TLDs' },
  ];

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Outer Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-emerald-500/20 blur-xl opacity-75 animate-pulse" />

      {/* Main Glassmorphism Visual Console */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
        {/* Top Console Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs text-slate-400">DEFENSE_MATRIX // LIVE</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded-full">
            <Radio className="h-3 w-3 animate-spin text-cyan-400" />
            <span>AI ENGINE ACTIVE</span>
          </div>
        </div>

        {/* Central Holographic Shield Display */}
        <div className="relative my-6 flex flex-col items-center justify-center py-6">
          {/* Radar Circles */}
          <div className="absolute h-56 w-56 rounded-full border border-cyan-500/10 animate-ping duration-1000" />
          <div className="absolute h-48 w-48 rounded-full border border-dashed border-cyan-500/20 animate-spin duration-3000" />
          <div className="absolute h-36 w-36 rounded-full border border-blue-500/30" />
          <div className="absolute h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/20 backdrop-blur-sm" />

          {/* Central Shield Icon */}
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-emerald-500/20 border border-cyan-400/50 shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="h-10 w-10 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          </div>

          <div className="mt-4 text-center z-10">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Heuristic Threat Assessment
            </h4>
            <div className="mt-1 flex items-center justify-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Class:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> MULTI-LAYER SCANNER READY
              </span>
            </div>
          </div>
        </div>

        {/* Live Detection Indicators Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {telemetryNodes.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = activeNode === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveNode(idx)}
                className={`relative flex flex-col items-start rounded-xl p-3 text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'border-cyan-500/60 bg-cyan-950/30 shadow-md shadow-cyan-500/10'
                    : 'border-slate-800/80 bg-slate-950/50 hover:border-slate-700'
                }`}
              >
                <div className="flex w-full items-center justify-between mb-1.5">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 tabular-nums">
                    {node.metric}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-200 line-clamp-1">{node.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{node.value}</div>
              </button>
            );
          })}
        </div>

        {/* Live Diagnostic Preview Banner */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Simulated Pipeline:</span>
            <span className="font-mono text-cyan-400">TF-IDF + Random Forest + Heuristic Rules</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500 rounded-full w-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
