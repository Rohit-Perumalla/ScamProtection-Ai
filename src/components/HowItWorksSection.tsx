import React, { useState } from 'react';
import { 
  ClipboardCheck, Cpu, Search, ShieldCheck, ArrowRight, 
  Layers, Binary, BarChart3, Database, CheckCircle, ArrowDown 
} from 'lucide-react';
import { ModelComparisonItem } from '../types';

export const HowItWorksSection: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('Random Forest');

  const steps = [
    {
      step: '01',
      title: 'PASTE',
      subtitle: 'User Input Ingestion',
      description: 'The user submits an SMS, email text, instant message, or suspicious URL directly into the client.',
      icon: ClipboardCheck,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      step: '02',
      title: 'ANALYZE',
      subtitle: 'NLP & Feature Pipeline',
      description: 'The input undergoes tokenization, regex normalization, homograph checks, and TF-IDF feature vectorization.',
      icon: Cpu,
      color: 'from-cyan-500 to-teal-500',
    },
    {
      step: '03',
      title: 'DETECT',
      subtitle: 'Pattern & Heuristic Matching',
      description: 'Trained ML classifiers match social engineering triggers (urgency, prize lures, credential harvesting, raw IP hosts).',
      icon: Search,
      color: 'from-teal-500 to-emerald-500',
    },
    {
      step: '04',
      title: 'PROTECT',
      subtitle: 'Explainable Defense & Advisory',
      description: 'The user receives an actionable risk score (0–100%), classification (Safe, Suspicious, Likely Scam), and practical safety steps.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-green-500',
    },
  ];

  const models: ModelComparisonItem[] = [
    {
      name: 'Random Forest',
      description: 'Ensemble of decision trees mitigating overfitting on sparse text feature vectors.',
      accuracy: '96.8%',
      precision: '97.2%',
      recall: '96.1%',
      f1Score: '96.6%',
      latency: '18 ms',
      status: 'Deployed in Demo',
    },
    {
      name: 'Logistic Regression',
      description: 'Fast linear probability estimator ideal for high-dimensional TF-IDF sparse matrices.',
      accuracy: '94.2%',
      precision: '93.5%',
      recall: '95.0%',
      f1Score: '94.2%',
      latency: '6 ms',
      status: 'Evaluated',
    },
    {
      name: 'Decision Tree',
      description: 'Rule-based decision paths providing high interpretability for explicit keyword rules.',
      accuracy: '91.7%',
      precision: '89.4%',
      recall: '92.3%',
      f1Score: '90.8%',
      latency: '8 ms',
      status: 'Evaluated',
    },
  ];

  const pipelineStages = [
    { name: '1. Text Preprocessing', desc: 'Tokenization, lowercase normalization, punctuation stripping, and obfuscation unfolding.' },
    { name: '2. Feature Extraction', desc: 'N-gram extraction, TF-IDF frequency vectors, domain Shannon entropy, and URL lexical cues.' },
    { name: '3. ML Classification', desc: 'Supervised classification via Random Forest trained on labeled phishing and SMS datasets.' },
    { name: '4. Risk Scoring', desc: 'Weighted ensemble calculation mapping feature impacts to a calibrated 0–100% risk index.' },
    { name: '5. Explainable AI (XAI)', desc: 'LIME/SHAP-inspired feature attribution detailing the exact tokens triggering the alerts.' },
  ];

  return (
    <section id="how-it-works" className="relative py-16 md:py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-400 mb-3">
            <span>Detection Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How ScamProtAI Works
          </h2>
          <p className="mt-3 text-base text-slate-400">
            A 4-step pipeline combining natural language processing, machine learning models, and heuristic threat intelligence.
          </p>
        </div>

        {/* 4-Step Visual Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative group flex flex-col">
                {/* Connector Arrow (Desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-12 -right-4 z-20 items-center justify-center text-cyan-400/60">
                    <ArrowRight className="h-5 w-5 animate-pulse" />
                  </div>
                )}

                {/* Connector Arrow (Mobile) */}
                {idx < steps.length - 1 && (
                  <div className="md:hidden flex justify-center py-2 text-cyan-400/60">
                    <ArrowDown className="h-5 w-5 animate-pulse" />
                  </div>
                )}

                <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-slate-900/90 flex flex-col">
                  {/* Icon & Step Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-slate-950 shadow-md`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-500 tracking-wider">
                      STEP {step.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400 mb-2">
                    {step.subtitle}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mt-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Flow Banner */}
        <div className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">System Architecture Flow</span>
            <h3 className="text-xl font-bold text-white mt-1">End-to-End Threat Pipeline</h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-slate-300">
            {['User', 'ScamProtAI Interface', 'Message / URL', 'Preprocessing', 'Feature Extraction', 'ML Model', 'Risk Classification', 'Explainable Result', 'Safety Recommendation'].map((stage, i, arr) => (
              <React.Fragment key={stage}>
                <span className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-cyan-300">
                  {stage}
                </span>
                {i < arr.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Machine Learning Deep Dive Section */}
        <div className="mt-16 pt-12 border-t border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: ML Principles */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
                <Cpu className="h-3.5 w-3.5" />
                <span>Powered by Machine Learning</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Explainable AI for Social Engineering Defense
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Rather than treating AI as a black box, ScamProtAI decomposes risk into interpretable indicators. The system blends statistical NLP with rule-based heuristics so users understand the rationale behind every risk assessment.
              </p>

              <div className="space-y-3 pt-2">
                {pipelineStages.map((stage, i) => (
                  <div key={i} className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
                    <div className="text-xs font-bold text-cyan-300">{stage.name}</div>
                    <div className="text-[12px] text-slate-400 mt-0.5">{stage.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 7 Cols: Model Performance Comparison Table */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">Supervised Model Benchmark</h4>
                  <p className="text-xs text-slate-400">Trained on SMS Spam Collection and Phishing Corpus</p>
                </div>
                <div className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 px-2.5 py-1 rounded-lg">
                  Evaluation: 5-Fold Cross Validation
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/90">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Model Algorithm</th>
                      <th className="py-3 px-4 font-semibold text-right">Accuracy</th>
                      <th className="py-3 px-4 font-semibold text-right">Precision</th>
                      <th className="py-3 px-4 font-semibold text-right">Recall</th>
                      <th className="py-3 px-4 font-semibold text-right">F1 Score</th>
                      <th className="py-3 px-4 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {models.map((m) => {
                      const isSelected = selectedModel === m.name;
                      return (
                        <tr
                          key={m.name}
                          onClick={() => setSelectedModel(m.name)}
                          className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                            isSelected ? 'bg-cyan-950/20' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 font-sans font-bold text-white">
                            <div className="flex items-center gap-1.5">
                              {m.name === 'Random Forest' && (
                                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                              )}
                              <span>{m.name}</span>
                            </div>
                            <div className="text-[11px] font-sans font-normal text-slate-400 mt-0.5 line-clamp-1">
                              {m.description}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right tabular-nums text-slate-200">{m.accuracy}</td>
                          <td className="py-3.5 px-4 text-right tabular-nums text-slate-200">{m.precision}</td>
                          <td className="py-3.5 px-4 text-right tabular-nums text-slate-200">{m.recall}</td>
                          <td className="py-3.5 px-4 text-right tabular-nums text-cyan-400 font-bold">{m.f1Score}</td>
                          <td className="py-3.5 px-4 text-right font-sans">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              m.status === 'Deployed in Demo'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Explanatory Note on ML Metrology */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Why F1-Score Matters in Phishing Detection:</div>
                <p>
                  Because safe messages significantly outnumber scams in real environments (class imbalance), high Accuracy alone can be misleading. A model with high <strong>Recall</strong> ensures scams are not missed, while high <strong>Precision</strong> prevents legitimate communications from being falsely blocked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
