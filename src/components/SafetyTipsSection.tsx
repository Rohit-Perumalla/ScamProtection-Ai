import React, { useState } from 'react';
import { 
  KeyRound, Link2, DollarSign, Gift, Lock, UserCheck, 
  CheckCircle2, XCircle, HelpCircle, Shield, AlertTriangle, Globe
} from 'lucide-react';

export const SafetyTipsSection: React.FC = () => {
  const [activeQuizQuestion, setActiveQuizQuestion] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const tips = [
    {
      title: 'Never share OTPs',
      subtitle: 'One-Time Passwords are for your eyes only',
      description: 'Banks and service providers will NEVER call, text, or email you asking for your OTP or verification code. If someone asks for it, it is a guaranteed scam.',
      icon: KeyRound,
      color: 'border-rose-500/30 bg-rose-950/20 text-rose-400',
      actionableRule: 'Rule: Hang up immediately if anyone asks for your security code.'
    },
    {
      title: 'Check links before clicking',
      subtitle: 'Inspect raw URLs and domains',
      description: 'Hover over hyperlinks or examine the domain name carefully. Attackers use lookalike domains (e.g., paypa1.com, secure-bank-login.xyz) and URL shorteners to mask true destinations.',
      icon: Link2,
      color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-400',
      actionableRule: 'Rule: Navigate directly by typing the official address into your browser.'
    },
    {
      title: 'Do not trust urgent money requests',
      subtitle: 'Scammers manufacture panic',
      description: 'Fraudsters create artificial emergencies—such as family distress, impending arrest, or frozen bank accounts—to bypass critical thinking before you can verify facts.',
      icon: DollarSign,
      color: 'border-amber-500/30 bg-amber-950/20 text-amber-400',
      actionableRule: 'Rule: Pause and contact the person or company via a trusted separate phone line.'
    },
    {
      title: 'Verify unexpected prize messages',
      subtitle: 'You cannot win a contest you never entered',
      description: 'If you receive an alert claiming you won a lottery, gift card, or cash prize, notice if they ask for an "advance processing fee" or banking details to deliver it.',
      icon: Gift,
      color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400',
      actionableRule: 'Rule: Real prizes never require you to pay money to receive winnings.'
    },
    {
      title: 'Never share passwords',
      subtitle: 'Use password managers and unique credentials',
      description: 'No legitimate customer support agent will ever ask for your plaintext password. Never enter your password on pages opened via unsolicited text or email links.',
      icon: Lock,
      color: 'border-blue-500/30 bg-blue-950/20 text-blue-400',
      actionableRule: 'Rule: Enable Passkeys or multi-factor authentication (MFA) everywhere.'
    },
    {
      title: 'Check the sender carefully',
      subtitle: 'Spot forged display names and spoofed domains',
      description: 'Scammers spoof display names (e.g. "CEO" or "Netflix Support") while the actual underlying email address is a random Gmail, Outlook, or foreign domain.',
      icon: UserCheck,
      color: 'border-purple-500/30 bg-purple-950/20 text-purple-400',
      actionableRule: 'Rule: Expand the full email address header to inspect the actual sending domain.'
    },
    {
      title: 'Use official websites for verification',
      subtitle: 'Bypass unverified inbound messages',
      description: 'Whenever in doubt about an account alert, bill, or package notification, search for the official organization independently or use your bookmarked official portal.',
      icon: Globe,
      color: 'border-teal-500/30 bg-teal-950/20 text-teal-400',
      actionableRule: 'Rule: Never trust the phone number or link inside a suspicious inbound message.'
    },
  ];

  const quizQuestions = [
    {
      scenario: 'You receive an SMS from "ChaseBank Alert": "Unauthorized $420 charge. Call 1-800-555-0199 or reply with your OTP to cancel."',
      options: [
        { text: 'Reply immediately with the OTP to cancel the charge quickly.', isCorrect: false, feedback: 'Incorrect! Banks never ask you to reply with your OTP. Replying gives the scammer access to authorize the charge.' },
        { text: 'Call the number inside the text message.', isCorrect: false, feedback: 'Incorrect! The phone number inside the text is controlled by the scammer.' },
        { text: 'Ignore the text, open your official Chase app or call the number on your physical debit card.', isCorrect: true, feedback: 'Correct! Always use verified official channels from your card or app, never links or numbers sent to you.' },
      ]
    },
    {
      scenario: 'A friend sends you an Instagram DM saying they are locked out of their account and need you to receive a text code for them.',
      options: [
        { text: 'Accept and send them the code that arrives on your phone.', isCorrect: false, feedback: 'Incorrect! The code arriving on your phone is for YOUR own account. The friend’s account was hacked, and they are stealing yours!' },
        { text: 'Refuse to send the code and call your friend directly via voice/phone.', isCorrect: true, feedback: 'Correct! This is a classic account-takeover relay scam.' },
        { text: 'Click the link in the message to see if it is real.', isCorrect: false, feedback: 'Incorrect! Never click unverified links from compromised accounts.' },
      ]
    },
    {
      scenario: 'An email with the subject "USPS: Redelivery scheduled" contains a link: "http://usps-parcel-redeliver.top/fee". What is the immediate red flag?',
      options: [
        { text: 'The URL uses ".top" instead of ".com", which is an abuse-prone top-level domain.', isCorrect: true, feedback: 'Correct! Official USPS services operate strictly on usps.com, never on suspicious generic TLDs like .top.' },
        { text: 'The email was sent during the weekend.', isCorrect: false, feedback: 'While delivery schedules vary, the deceptive domain is the critical indicator.' },
        { text: 'It has the USPS logo in the email header.', isCorrect: false, feedback: 'Scammers frequently copy logos directly to deceive victims.' },
      ]
    }
  ];

  const handleSelectOption = (idx: number) => {
    setSelectedQuizOption(idx);
    if (quizQuestions[activeQuizQuestion].options[idx].isCorrect) {
      setQuizScore(quizScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (activeQuizQuestion < quizQuestions.length - 1) {
      setActiveQuizQuestion(activeQuizQuestion + 1);
      setSelectedQuizOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setActiveQuizQuestion(0);
    setSelectedQuizOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="safety-tips" className="relative py-16 md:py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-400 mb-3">
            <Shield className="h-3.5 w-3.5" />
            <span>Cybersecurity Hygiene</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Essential Scam Defense Guidelines
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Social engineering succeeds by exploiting cognitive biases, fear, and urgency. Memorize these golden rules to stay secure.
          </p>
        </div>

        {/* 6 Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.title}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-slate-900/90 flex flex-col justify-between"
              >
                <div>
                  <div className={`mb-4 inline-flex p-3 rounded-xl border ${tip.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    "{tip.title}"
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400 mb-3">
                    {tip.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {tip.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-medium text-slate-300">
                  {tip.actionableRule}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Scam Spotting Quiz */}
        <div className="mt-16 rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-6 md:p-8 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                <HelpCircle className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Interactive Scam Spotter Test</h3>
                <p className="text-xs text-slate-400">Can you identify the right response in real-world phishing scenarios?</p>
              </div>
            </div>
            {!quizFinished && (
              <div className="font-mono text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-3 py-1 rounded-full">
                Question {activeQuizQuestion + 1} of {quizQuestions.length}
              </div>
            )}
          </div>

          {!quizFinished ? (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5">
                <div className="text-xs font-mono uppercase text-slate-500 mb-1">Scenario</div>
                <p className="text-sm sm:text-base font-semibold text-slate-100">
                  {quizQuestions[activeQuizQuestion].scenario}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {quizQuestions[activeQuizQuestion].options.map((opt, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  const showResult = selectedQuizOption !== null;
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={showResult}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left rounded-xl p-4 text-xs sm:text-sm transition-all border cursor-pointer ${
                        showResult
                          ? opt.isCorrect
                            ? 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200'
                            : isSelected
                            ? 'border-rose-500/60 bg-rose-950/30 text-rose-200'
                            : 'border-slate-800/80 bg-slate-950/40 text-slate-500'
                          : 'border-slate-800 bg-slate-950/70 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-950'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                        {showResult && opt.isCorrect && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                        )}
                        {showResult && isSelected && !opt.isCorrect && (
                          <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Next */}
              {selectedQuizOption !== null && (
                <div className="mt-4 p-4 rounded-xl border border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs sm:text-sm text-slate-300">
                    {quizQuestions[activeQuizQuestion].options[selectedQuizOption].feedback}
                  </p>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="shrink-0 rounded-lg bg-cyan-500 text-slate-950 font-bold px-5 py-2 text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
                  >
                    {activeQuizQuestion < quizQuestions.length - 1 ? 'Next Scenario →' : 'See Score →'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-2xl font-bold text-white">Quiz Completed!</h4>
              <p className="text-base text-slate-300 font-mono">
                Your Score: <span className="text-cyan-400 font-bold">{quizScore}</span> / {quizQuestions.length}
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {quizScore === quizQuestions.length
                  ? 'Outstanding! You have sharp cyber situational awareness and know how to verify communications safely.'
                  : 'Good effort! Review the six golden security tips above to protect yourself against evolving deception techniques.'}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
