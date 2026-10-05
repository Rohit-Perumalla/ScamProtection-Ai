import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AnalyzeSection } from './components/AnalyzeSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DashboardSection } from './components/DashboardSection';
import { SafetyTipsSection } from './components/SafetyTipsSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { AnalysisResult } from './types';
import { Shield, Sparkles, ArrowRight } from 'lucide-react';

const INITIAL_SCANS: AnalysisResult[] = [
  {
    id: 'seed-1',
    inputType: 'message',
    content: 'URGENT: Chase Bank Security Alert! Unauthorized login detected. Verify immediately at: http://chase-security-verify.xyz',
    timestamp: '21:42:15',
    classification: 'LIKELY SCAM',
    riskScore: 94,
    summary: 'Multiple scam/phishing indicators were detected.',
    indicators: [
      {
        id: 'urg',
        title: 'Urgent Language Detected',
        description: 'Uses high-pressure psychological urgency.',
        severity: 'high',
        category: 'urgency',
        confidenceScore: 95
      },
      {
        id: 'tld',
        title: 'Suspicious .xyz TLD & Brand Spoofing',
        description: 'Impersonates Chase Bank on disposable non-official domain.',
        severity: 'high',
        category: 'identity',
        confidenceScore: 98
      }
    ],
    explanation: 'Contains aggressive panic-inducing triggers combined with unauthorized brand spoofing on a suspicious TLD.',
    recommendedActions: [
      'Do NOT click the link or provide credentials.',
      'Check your Chase account directly using the verified mobile application.'
    ],
    mlBreakdown: {
      modelUsed: 'Hybrid NLP TF-IDF + Random Forest Classifier (v2.4 Demo)',
      processingTimeMs: 230,
      tokensAnalyzed: 14,
      tfidfTopFeatures: [{ feature: 'urgent', weight: 4.2, explanation: 'High urgency frequency' }],
      heuristicWeight: 42,
      mlConfidence: 96
    },
    isDemoEngine: true
  },
  {
    id: 'seed-2',
    inputType: 'url',
    content: 'https://bit.ly/claim-free-iphone-gift-card',
    timestamp: '21:28:40',
    classification: 'SUSPICIOUS',
    riskScore: 64,
    summary: 'Some suspicious indicators were detected.',
    indicators: [
      {
        id: 'short',
        title: 'URL Shortening Service Detected',
        description: 'Opaque redirect masks target domain.',
        severity: 'medium',
        category: 'link',
        confidenceScore: 82
      }
    ],
    explanation: 'Uses a link shortener combined with prize lure keywords to mask true redirect destination.',
    recommendedActions: [
      'Expand the shortened URL with an unshortener tool before browsing.',
      'Do not enter personal identity numbers.'
    ],
    mlBreakdown: {
      modelUsed: 'Lexical Feature Extractor + Gradient Boosted Trees (v2.4 Demo)',
      processingTimeMs: 195,
      tokensAnalyzed: 8,
      tfidfTopFeatures: [{ feature: 'bit.ly', weight: 2.8, explanation: 'Masked redirection endpoint' }],
      heuristicWeight: 31,
      mlConfidence: 84
    },
    isDemoEngine: true
  },
  {
    id: 'seed-3',
    inputType: 'message',
    content: 'Hi Alex, the project slides for tomorrow morning’s cybersecurity presentation are in the shared drive. Let me know if you have feedback!',
    timestamp: '21:12:02',
    classification: 'SAFE',
    riskScore: 12,
    summary: 'Low risk detected.',
    indicators: [],
    explanation: 'Normal conversational collaboration with absence of coercive, financial, or credential-harvesting indicators.',
    recommendedActions: [
      'Standard corporate sharing hygiene applies.'
    ],
    mlBreakdown: {
      modelUsed: 'Hybrid NLP TF-IDF + Random Forest Classifier (v2.4 Demo)',
      processingTimeMs: 210,
      tokensAnalyzed: 18,
      tfidfTopFeatures: [{ feature: 'normal_vocabulary', weight: -2.4, explanation: 'Standard linguistic distribution' }],
      heuristicWeight: 5,
      mlConfidence: 92
    },
    isDemoEngine: true
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [recentScans, setRecentScans] = useState<AnalysisResult[]>(INITIAL_SCANS);

  const handleScanCompleted = (newResult: AnalysisResult) => {
    setRecentScans((prev) => [newResult, ...prev.slice(0, 19)]);
  };

  const handleSelectRecentScan = (scan: AnalysisResult) => {
    setActiveTab('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 bg-grid-cyber">
      {/* Top Prototype Awareness Ribbon */}
      <div className="w-full bg-slate-900/90 border-b border-slate-800 text-[11px] text-slate-400 py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>
          <strong>ScamProtAI:</strong> Educational AI/ML Cybersecurity Prototype · Supporting UN SDG 16 (Peace, Justice &amp; Strong Institutions)
        </span>
      </div>

      {/* Main Responsive Header Navigation */}
      <Navbar activeTab={activeTab} onSelectTab={handleNavigate} />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <HeroSection
              onAnalyzeClick={() => handleNavigate('analyze')}
              onHowItWorksClick={() => handleNavigate('how-it-works')}
            />

            {/* Quick Interactive Analyzer on Home Page */}
            <div className="border-t border-slate-900">
              <AnalyzeSection onScanCompleted={handleScanCompleted} />
            </div>

            {/* How It Works Overview */}
            <HowItWorksSection />

            {/* Live Analytics Dashboard */}
            <DashboardSection
              recentScans={recentScans}
              onSelectScan={handleSelectRecentScan}
            />

            {/* Essential Safety Tips Highlights */}
            <SafetyTipsSection />

            {/* About & SDG 16 Section */}
            <AboutSection />
          </div>
        )}

        {activeTab === 'analyze' && (
          <div className="py-6">
            <AnalyzeSection onScanCompleted={handleScanCompleted} />
            <DashboardSection
              recentScans={recentScans}
              onSelectScan={handleSelectRecentScan}
            />
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <div>
            <HowItWorksSection />
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
              <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 to-blue-950/30 p-8">
                <h3 className="text-xl font-bold text-white mb-2">Ready to test a suspicious message?</h3>
                <p className="text-sm text-slate-300 mb-6">Put our machine learning feature extraction engine to the test.</p>
                <button
                  type="button"
                  onClick={() => handleNavigate('analyze')}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
                >
                  Start Analysis Now
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <DashboardSection
              recentScans={recentScans}
              onSelectScan={handleSelectRecentScan}
            />
          </div>
        )}

        {activeTab === 'safety-tips' && (
          <div>
            <SafetyTipsSection />
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <AboutSection />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer onSelectTab={handleNavigate} />
    </div>
  );
}
