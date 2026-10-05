import React from 'react';
import { 
  Shield, Scale, Globe2, Code2, Server, Database, 
  Cpu, Rocket, AlertTriangle, CheckCircle 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const techStack = [
    {
      category: 'Frontend Client',
      items: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Lucide Icons', 'Vite 8'],
      icon: Code2,
      desc: 'High-performance responsive single-page application with glassmorphic cybersecurity styling.'
    },
    {
      category: 'AI & Machine Learning',
      items: ['Python', 'Scikit-learn', 'NLP Preprocessing', 'TF-IDF Vectorizer', 'Random Forest & Logistic Regression'],
      icon: Cpu,
      desc: 'Supervised classifiers and lexical entropy analyzers trained on phishing and social engineering datasets.'
    },
    {
      category: 'Backend & Services',
      items: ['Python', 'FastAPI', 'REST Endpoints', 'Asynchronous Inference Pipeline'],
      icon: Server,
      desc: 'High-throughput microservice architecture facilitating sub-millisecond heuristic scoring.'
    },
    {
      category: 'Database & Storage',
      items: ['SQLite', 'In-memory telemetry caching', 'Structured Threat Intelligence Logs'],
      icon: Database,
      desc: 'Lightweight, reproducible relational persistence for incident metadata and detection metrics.'
    },
    {
      category: 'Cloud & Deployment',
      items: ['Google AI Studio', 'Cloud Run Containerization', 'Automated Health Monitoring'],
      icon: Rocket,
      desc: 'Cloud-native deployment ensuring rapid global availability and low-latency interaction.'
    },
  ];

  return (
    <section id="about" className="relative py-16 md:py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-400 mb-3">
            <Shield className="h-3.5 w-3.5" />
            <span>Cybersecurity Initiative</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            About ScamProtAI
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            ScamProtAI is an AI/ML-based cybersecurity awareness and scam detection prototype designed to help users identify suspicious online messages and URLs.
          </p>
        </div>

        {/* SDG 16 Banner */}
        <div className="mb-16 rounded-2xl border border-blue-500/40 bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900/60 p-6 md:p-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20">
              <Scale className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                <Globe2 className="h-3.5 w-3.5" />
                <span>United Nations Sustainable Development Goals</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Supporting SDG 16 – Peace, Justice & Strong Institutions
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                By democratizing cybersecurity literacy and giving everyday citizens tools to verify deceptive digital communication, ScamProtAI contributes to target 16.4 and 16.10: combating cyber-enabled illicit financial flows, protecting vulnerable populations from predatory fraud, and ensuring public access to secure, transparent information in the digital sphere.
              </p>
            </div>
          </div>
        </div>

        {/* Project Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
              <Shield className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">1. Democratized Verification</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides simple, instant threat analysis to students, senior citizens, and professionals alike without requiring complex security training.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
              <Cpu className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">2. Explainable Intelligence</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Demystifies machine learning decisions with transparent feature attributions that teach users how to spot red flags independently.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">3. Actionable Defense</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Translates risk ratings directly into clear preventative actions: reporting procedures, channel verification, and credential hygiene.
            </p>
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">System Architecture</span>
            <h3 className="text-2xl font-bold text-white mt-1">Complete Technology Specification</h3>
            <p className="text-xs text-slate-400 mt-1">
              Engineered with modern full-stack web and machine learning standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack) => {
              const Icon = stack.icon;
              return (
                <div key={stack.category} className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white">{stack.category}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stack.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prototype Legal / Disclaimer Box */}
        <div className="mt-8 rounded-xl border border-amber-900/30 bg-amber-950/10 p-5 flex items-start gap-3 text-xs text-slate-400">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-200">Prototype Disclaimer & Safety Boundary: </strong>
            ScamProtAI is an educational research and awareness prototype. While the system utilizes machine learning and pattern heuristics, it does not guarantee 100% detection accuracy. Zero-day phishing campaigns and targeted spear-phishing may evade automated detection. Users must always verify transactions and identity requests directly with official organizations.
          </div>
        </div>
      </div>
    </section>
  );
};
