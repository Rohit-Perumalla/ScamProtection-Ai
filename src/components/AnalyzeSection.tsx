import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, ShieldAlert, Sparkles, 
  RotateCcw, ArrowRight, CheckCircle2, Copy, Check, 
  ExternalLink, Info, AlertCircle, FileText, Globe
} from 'lucide-react';
import { AnalysisResult, Classification } from '../types';
import { analyzeMessage, analyzeUrl } from '../lib/detector';
import { MESSAGE_PRESETS, URL_PRESETS, PresetExample } from '../lib/presets';

interface AnalyzeSectionProps {
  onScanCompleted?: (result: AnalysisResult) => void;
}

export const AnalyzeSection: React.FC<AnalyzeSectionProps> = ({ onScanCompleted }) => {
  const [activeTab, setActiveTab] = useState<'message' | 'url'>('message');
  const [messageInput, setMessageInput] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleRunAnalysis = async () => {
    const content = activeTab === 'message' ? messageInput.trim() : urlInput.trim();
    if (!content) return;

    setIsAnalyzing(true);
    setResult(null);

    // Multi-phase scanner simulation for explainable ML pipeline
    setAnalysisStep('Normalizing & tokenizing input vector...');
    await new Promise((r) => setTimeout(r, 260));

    setAnalysisStep('Extracting syntactic, lexical & entropy features...');
    await new Promise((r) => setTimeout(r, 280));

    setAnalysisStep('Evaluating ML classification model & risk weighting...');
    await new Promise((r) => setTimeout(r, 260));

    const analysisOutput = activeTab === 'message'
      ? analyzeMessage(content)
      : analyzeUrl(content);

    setResult(analysisOutput);
    setIsAnalyzing(false);
    setAnalysisStep('');

    if (onScanCompleted) {
      onScanCompleted(analysisOutput);
    }
  };

  const handleSelectPreset = (preset: PresetExample) => {
    if (preset.type === 'message') {
      setActiveTab('message');
      setMessageInput(preset.content);
    } else {
      setActiveTab('url');
      setUrlInput(preset.content);
    }
    setResult(null);
  };

  const handleReset = () => {
    setResult(null);
    if (activeTab === 'message') {
      setMessageInput('');
    } else {
      setUrlInput('');
    }
  };

  const handleCopyExplanation = () => {
    if (!result) return;
    const reportText = `[ScamProtAI Analysis Report]\nType: ${result.inputType.toUpperCase()}\nClassification: ${result.classification}\nRisk Score: ${result.riskScore}%\nSummary: ${result.summary}\n\nAI Explanation:\n${result.explanation}\n\nRecommended Actions:\n${result.recommendedActions.map((a, i) => `${i + 1}. ${a}`).join('\n')}`;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper styles based on classification
  const getBadgeStyle = (classification: Classification) => {
    switch (classification) {
      case 'SAFE':
        return {
          bg: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
          indicatorBg: 'bg-emerald-500',
          textColor: 'text-emerald-400',
          glow: 'shadow-emerald-500/10 border-emerald-500/30',
          icon: ShieldCheck,
          label: 'SAFE',
          emoji: '🟢'
        };
      case 'SUSPICIOUS':
        return {
          bg: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
          indicatorBg: 'bg-amber-500',
          textColor: 'text-amber-400',
          glow: 'shadow-amber-500/10 border-amber-500/30',
          icon: AlertTriangle,
          label: 'SUSPICIOUS',
          emoji: '🟡'
        };
      case 'LIKELY SCAM':
      default:
        return {
          bg: 'bg-rose-950/60 border-rose-500/40 text-rose-300',
          indicatorBg: 'bg-rose-500',
          textColor: 'text-rose-400',
          glow: 'shadow-rose-500/10 border-rose-500/30',
          icon: ShieldAlert,
          label: 'LIKELY SCAM',
          emoji: '🔴'
        };
    }
  };

  return (
    <section id="analyze" className="relative py-12 md:py-20">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Threat Inspection Terminal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Analyze Suspicious Content
          </h2>
          <p className="mt-3 text-base text-slate-400 max-w-2xl mx-auto">
            Paste an SMS, email, social message, or suspicious URL. ScamProtAI scans lexical patterns, deceptive syntax, and domain anomalies in real-time.
          </p>
        </div>

        {/* Main Analysis Card with Tabs */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
          {/* Header Segmented Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 sm:p-3">
            <div className="grid grid-cols-2 w-full max-w-md mx-auto gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('message');
                  setResult(null);
                }}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'message'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Message Analysis</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('url');
                  setResult(null);
                }}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'url'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>URL Analysis</span>
              </button>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="p-5 sm:p-8">
            {activeTab === 'message' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="message-input" className="block text-sm font-semibold text-slate-200">
                    Suspicious Message Content
                  </label>
                  <span className="text-xs font-mono text-slate-500">
                    {messageInput.length} chars · ~{messageInput ? messageInput.trim().split(/\s+/).length : 0} tokens
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    id="message-input"
                    rows={6}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Paste a suspicious SMS, email or social media message here..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-sans resize-y"
                  />
                  {messageInput && (
                    <button
                      type="button"
                      onClick={() => setMessageInput('')}
                      className="absolute top-3 right-3 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-700 rounded px-2 py-1"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Quick Presets for Messages */}
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-400">
                    <span>Try realistic examples:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {MESSAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className="rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="font-medium">{preset.label}</span>
                        <span className="text-[10px] text-slate-500">({preset.tag})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>ScamProtAI runs deterministic NLP feature extraction + ML classification.</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleRunAnalysis}
                    disabled={isAnalyzing || !messageInput.trim()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <span>{isAnalyzing ? 'Analyzing Message...' : 'Analyze Message'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="url-input" className="block text-sm font-semibold text-slate-200">
                    Suspicious Link or Website URL
                  </label>
                  <span className="text-xs font-mono text-slate-500">Domain & Syntactic Scanner</span>
                </div>

                <div className="relative">
                  <input
                    id="url-input"
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                  />
                  {urlInput && (
                    <button
                      type="button"
                      onClick={() => setUrlInput('')}
                      className="absolute top-2.5 right-3 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-700 rounded px-2 py-1"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Quick Presets for URLs */}
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-400">
                    <span>Try realistic URL tests:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {URL_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className="rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
                      >
                        <span>{preset.label}</span>
                        <span className="text-[10px] text-slate-500">({preset.tag})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>Analyzes homographs, typosquatting, raw IP hosts, and abuse TLDs.</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleRunAnalysis}
                    disabled={isAnalyzing || !urlInput.trim()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <span>{isAnalyzing ? 'Analyzing URL...' : 'Analyze URL'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Loading Indicator Animation */}
            {isAnalyzing && (
              <div className="mt-8 rounded-xl border border-cyan-500/30 bg-slate-950/90 p-6 text-center shadow-lg">
                <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                  <div className="absolute h-12 w-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                  <Sparkles className="h-6 w-6 text-cyan-400 animate-pulse" />
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  AI Scam & Phishing Engine Processing
                </div>
                <div className="mt-1 font-mono text-xs text-cyan-400 animate-pulse">
                  {analysisStep}
                </div>
                <div className="mx-auto mt-4 max-w-md h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full w-full animate-pulse" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RESULTS CARD */}
        {result && (
          <div className="mt-8 relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
            {/* Demo AI Analysis Badge banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950/80 px-6 py-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-semibold text-cyan-300">Demo AI Analysis</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 font-mono">Timestamp: {result.timestamp}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyExplanation}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied Report' : 'Copy Report'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer font-semibold"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Analyze Another</span>
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Primary Classification & Risk Gauge Row */}
              {(() => {
                const badge = getBadgeStyle(result.classification);
                const Icon = badge.icon;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center rounded-xl border border-slate-800 bg-slate-950/60 p-6">
                    {/* Left: Classification Badge */}
                    <div className="md:col-span-2 space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{badge.emoji}</span>
                        <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${badge.textColor}`}>
                          {badge.label}
                        </h3>
                      </div>
                      <p className="text-base font-semibold text-slate-200">
                        {result.summary}
                      </p>
                      <p className="text-xs text-slate-400 max-w-xl">
                        Evaluated across linguistic urgency vectors, credential solicitation triggers, and known deceptive hosting patterns.
                      </p>
                    </div>

                    {/* Right: Risk Score Radial/Metric Display */}
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Risk Score
                      </div>
                      <div className="relative flex items-center justify-center">
                        <div className={`text-4xl sm:text-5xl font-extrabold font-mono tabular-nums ${badge.textColor}`}>
                          {result.riskScore}%
                        </div>
                      </div>
                      <div className="mt-2 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${badge.indicatorBg}`}
                          style={{ width: `${result.riskScore}%` }}
                        />
                      </div>
                      <div className="mt-1 flex w-full justify-between text-[10px] font-mono text-slate-500">
                        <span>0% Safe</span>
                        <span>50%</span>
                        <span>100% High Risk</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Detected Indicators Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-cyan-400" />
                    <span>Detected Indicators ({result.indicators.length})</span>
                  </h4>
                  <span className="text-xs text-slate-500">Automated pattern extraction</span>
                </div>

                {result.indicators.length === 0 ? (
                  <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 text-sm text-emerald-300 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span>No elevated risk indicators or malicious syntax were detected in this submission.</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.indicators.map((indicator) => {
                      const isHigh = indicator.severity === 'high';
                      return (
                        <div
                          key={indicator.id}
                          className={`rounded-xl border p-4 space-y-1.5 transition-colors ${
                            isHigh
                              ? 'border-rose-900/50 bg-rose-950/20'
                              : 'border-amber-900/40 bg-amber-950/20'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-slate-100 flex items-center gap-2">
                              <span className={isHigh ? 'text-rose-400 font-bold' : 'text-amber-400 font-bold'}>✓</span>
                              {indicator.title}
                            </span>
                            <span
                              className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full ${
                                isHigh
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {indicator.severity} severity
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {indicator.description}
                          </p>
                          {indicator.matchedSnippet && (
                            <div className="mt-1 rounded bg-slate-900/80 px-2 py-1 font-mono text-[11px] text-cyan-300 truncate border border-slate-800">
                              {indicator.matchedSnippet}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* AI Explanation Box */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                  <Sparkles className="h-4 w-4" />
                  <span>AI Explanation</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {result.explanation}
                </p>
                <div className="pt-2 text-[11px] text-slate-400 border-t border-cyan-900/40 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span><strong>Model:</strong> {result.mlBreakdown.modelUsed}</span>
                  <span><strong>Latency:</strong> {result.mlBreakdown.processingTimeMs}ms</span>
                  <span><strong>Confidence:</strong> {result.mlBreakdown.mlConfidence}%</span>
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Recommended Action</span>
                </h4>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 divide-y divide-slate-800/80">
                  {result.recommendedActions.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold font-mono">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Educational Disclaimer */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 text-xs text-slate-400 flex items-start gap-3">
                <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300">Cybersecurity Prototype Notice: </strong>
                  ScamProtAI is an educational detection prototype and does not claim 100% accuracy. Sophisticated attackers constantly evolve evasion tactics. Always independently verify suspicious communications through official channels.
                </div>
              </div>

              {/* CTA Row */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 text-sm font-semibold transition-colors cursor-pointer border border-slate-700"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Analyze Another</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
