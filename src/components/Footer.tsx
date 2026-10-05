import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'analyze', label: 'Analyze' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'safety-tips', label: 'Safety Tips' },
    { id: 'about', label: 'About' },
  ];

  const handleLinkClick = (id: string) => {
    onSelectTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-2 text-lg font-bold text-white hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Shield className="h-4 w-4" />
              </span>
              <span>ScamProtAI 🛡️</span>
            </button>
            <p className="mt-1 text-xs text-slate-400">
              AI-powered scam awareness and detection.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs font-medium">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="hover:text-cyan-400 transition-colors cursor-pointer focus:outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* SDG 16 Notice & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            Built as an AI/ML project supporting{' '}
            <button
              onClick={() => handleLinkClick('about')}
              className="text-cyan-400 hover:underline focus:outline-none"
            >
              SDG 16 – Peace, Justice &amp; Strong Institutions
            </button>.
          </p>
          <div className="flex items-center gap-4">
            <span>Educational Cybersecurity Prototype</span>
            <span aria-hidden="true">·</span>
            <span>&copy; {new Date().getFullYear()} ScamProtAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
