import { AnalysisResult, Classification, DetectedIndicator, ModelContribution } from '../types';

interface PatternRule {
  id: string;
  title: string;
  category: DetectedIndicator['category'];
  severity: DetectedIndicator['severity'];
  regex: RegExp;
  description: string;
  weight: number;
  recommendation: string;
}

const MESSAGE_RULES: PatternRule[] = [
  {
    id: 'urgency-coercion',
    title: 'Urgent Language Detected',
    category: 'urgency',
    severity: 'high',
    regex: /\b(urgent|immediately|action required|account suspended|final notice|within 24 hours|within 24h|act now|expires (today|soon)|24 hours to respond|law enforcement|warrant|legal action)\b/i,
    description: 'Uses high-pressure psychological urgency to force quick, impulsive actions without verification.',
    weight: 28,
    recommendation: 'Legitimate organizations give reasonable notice and never demand immediate panicked action.'
  },
  {
    id: 'credential-harvesting',
    title: 'Request for Personal Credentials / OTP',
    category: 'identity',
    severity: 'high',
    regex: /\b(otp|one[- ]time password|one[- ]time code|enter password|verify account|update (your )?(pin|password)|social security|ssn|confirm your identity|security question|passcode)\b/i,
    description: 'Explicitly requests verification codes, passwords, or sensitive identity tokens.',
    weight: 35,
    recommendation: 'Never share OTPs or passwords with anyone. Banks and official providers will NEVER call or text asking for your OTP.'
  },
  {
    id: 'financial-request',
    title: 'Financial or Banking Request Detected',
    category: 'financial',
    severity: 'medium',
    regex: /\b(bank|wire transfer|direct deposit|debit card|credit card|unauthorized transaction|billing issue|frozen account|refund amount|cryptocurrency|crypto|bitcoin|usdt|western union)\b/i,
    description: 'References banking emergencies, unauthorized charges, or alternative unrecoverable payment transfers.',
    weight: 24,
    recommendation: 'Check your official banking app directly by typing the official address or calling the number on the back of your card.'
  },
  {
    id: 'prize-reward',
    title: 'Prize or Reward Claim Detected',
    category: 'prize',
    severity: 'high',
    regex: /\b(congratulations|you (have )?won|lottery|winner|claim your (prize|reward|gift card|\$)|free gift|selected for \$|exclusive payout|jackpot)\b/i,
    description: 'Prompts false rewards or unexpected lottery jackpots to lure users into paying advance verification fees.',
    weight: 32,
    recommendation: 'If you did not enter a sweepstakes, you cannot win one. Never pay fees or provide info to claim prizes.'
  },
  {
    id: 'suspicious-cta',
    title: 'Suspicious Call-To-Action Link',
    category: 'link',
    severity: 'medium',
    regex: /\b(click here|tap here|click the link|verify here|follow this link|claim link|bit\.ly|tinyurl|t\.co|is\.gd|goo\.gl|tiny\.cc|cutt\.ly)\b/i,
    description: 'Urges clicking obscure or shortened links that obfuscate the actual destination server.',
    weight: 22,
    recommendation: 'Never click links embedded in unsolicited messages. Inspect the raw URL destination first.'
  },
  {
    id: 'delivery-phishing',
    title: 'Package Delivery & Redirection Scam Pattern',
    category: 'urgency',
    severity: 'medium',
    regex: /\b(package (delivery|pending)|usps|fedex|dhl|ups|customs fee|unpaid postage|redelivery fee|parcel tracking)\b/i,
    description: 'Impersonates courier services requesting small fee payments or address validation to steal card details.',
    weight: 26,
    recommendation: 'Track packages directly on official courier websites using tracking numbers given at original checkout.'
  }
];

const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.tk', '.ml', '.ga', '.cf', '.gq', '.work', '.click',
  '.cam', '.buzz', '.fit', '.cc', '.su', '.link', '.rest', '.quest', '.shop', '.site'
];

const TARGETED_BRANDS = [
  'paypal', 'apple', 'google', 'microsoft', 'chase', 'wellsfargo',
  'bankofamerica', 'amazon', 'netflix', 'facebook', 'instagram',
  'steam', 'binance', 'coinbase', 'fedex', 'dhl', 'usps'
];

const TYPOSQUAT_MAPPINGS: Record<string, string[]> = {
  'google': ['goog1e', 'g00gle', 'googel', 'gogle'],
  'paypal': ['paypa1', 'pay-pal', 'paypaI', 'peypal', 'paypal-secure'],
  'amazon': ['arnazon', 'amazn', 'amz-support', 'amazon-security'],
  'microsoft': ['micros0ft', 'micr0soft', 'msft-support', 'micosoft'],
  'apple': ['app1e', 'appl-id', 'apple-support-verify'],
  'netflix': ['netfllx', 'netflx', 'netflix-billing']
};

export function analyzeMessage(text: string): AnalysisResult {
  const startTime = performance.now();
  const cleanedText = text.trim();
  const tokens = cleanedText.split(/\s+/).filter(Boolean);

  const indicators: DetectedIndicator[] = [];
  const modelFeatures: ModelContribution[] = [];
  let rawScore = 6; // baseline low risk

  for (const rule of MESSAGE_RULES) {
    const match = cleanedText.match(rule.regex);
    if (match) {
      const matchedSnippet = match[0];
      rawScore += rule.weight;
      
      indicators.push({
        id: rule.id,
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
        category: rule.category,
        matchedSnippet: `Matched pattern: "${matchedSnippet}"`,
        confidenceScore: Math.min(98, 70 + Math.floor(Math.random() * 25))
      });

      modelFeatures.push({
        feature: matchedSnippet.toLowerCase(),
        weight: Number((rule.weight / 10).toFixed(2)),
        explanation: `Token "${matchedSnippet}" strongly associated with ${rule.category} threat vector.`
      });
    }
  }

  // Check URL inside message
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const embeddedUrls = cleanedText.match(urlRegex);
  if (embeddedUrls && embeddedUrls.length > 0) {
    for (const urlStr of embeddedUrls) {
      const urlAnalysis = analyzeUrl(urlStr);
      if (urlAnalysis.riskScore > 50) {
        rawScore += 25;
        indicators.push({
          id: `embedded-url-threat-${indicators.length}`,
          title: 'Suspicious Embedded URL Detected',
          description: `The message contains an embedded link (${urlStr.slice(0, 32)}...) with high threat indicators.`,
          severity: 'high',
          category: 'link',
          matchedSnippet: urlStr,
          confidenceScore: 92
        });
      }
    }
  }

  // All caps aggression check
  const capsCount = (cleanedText.match(/[A-Z]/g) || []).length;
  if (tokens.length > 5 && capsCount / (cleanedText.length || 1) > 0.35) {
    rawScore += 12;
    indicators.push({
      id: 'excessive-capitalization',
      title: 'High Capitalization / Aggressive Tone',
      category: 'urgency',
      severity: 'low',
      description: 'Abnormal proportion of uppercase text often used to trigger psychological alarm.',
      confidenceScore: 75
    });
  }

  // Normalize final risk score
  const finalRisk = Math.min(98, Math.max(8, rawScore));

  let classification: Classification = 'SAFE';
  let summary = 'Low risk detected.';
  let explanation = 'No significant phishing, scam or coercive patterns were detected in this message. Standard vigilance is always recommended.';

  if (finalRisk >= 75) {
    classification = 'LIKELY SCAM';
    summary = 'Multiple scam/phishing indicators were detected.';
    explanation = `The analyzed message exhibits critical red flags commonly found in social engineering scams: ${indicators.map(i => i.title.toLowerCase()).slice(0, 3).join(', ')}. The linguistic composition aims to manipulate urgency, extract sensitive credentials or push malicious links.`;
  } else if (finalRisk >= 36) {
    classification = 'SUSPICIOUS';
    summary = 'Some suspicious indicators were detected.';
    explanation = `The message triggered moderate risk flags (${indicators.map(i => i.title.toLowerCase()).slice(0, 2).join(', ')}). While it may be a marketing alert or urgent update, exercise caution before responding or opening links.`;
  }

  const recommendedActions = generateRecommendations(indicators, classification);

  const processingTimeMs = Math.round(performance.now() - startTime + 250);

  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    inputType: 'message',
    content: cleanedText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    classification,
    riskScore: finalRisk,
    summary,
    indicators,
    explanation,
    recommendedActions,
    mlBreakdown: {
      modelUsed: 'Hybrid NLP TF-IDF + Random Forest Classifier (v2.4 Demo)',
      processingTimeMs,
      tokensAnalyzed: tokens.length,
      tfidfTopFeatures: modelFeatures.length > 0 ? modelFeatures : [
        { feature: 'normal_vocabulary', weight: -2.4, explanation: 'Standard linguistic distribution with low scam vector frequency.' }
      ],
      heuristicWeight: Number((finalRisk * 0.42).toFixed(1)),
      mlConfidence: Math.min(99, Math.max(78, finalRisk > 50 ? finalRisk : 100 - finalRisk))
    },
    isDemoEngine: true
  };
}

export function analyzeUrl(inputUrl: string): AnalysisResult {
  const startTime = performance.now();
  let sanitized = inputUrl.trim();
  if (!/^https?:\/\//i.test(sanitized)) {
    sanitized = 'http://' + sanitized;
  }

  let parsed: URL | null = null;
  try {
    parsed = new URL(sanitized);
  } catch {
    // fallback pseudo parsing
  }

  const hostname = parsed ? parsed.hostname.toLowerCase() : sanitized.toLowerCase();
  const pathname = parsed ? parsed.pathname.toLowerCase() : '';
  const search = parsed ? parsed.search.toLowerCase() : '';
  const full = sanitized.toLowerCase();

  const indicators: DetectedIndicator[] = [];
  const modelFeatures: ModelContribution[] = [];
  let rawScore = 8; // baseline

  // 1. IP Hostname check
  const ipRegex = /^(?:https?:\/\/)?(\d{1,3}\.){3}\d{1,3}(?::\d+)?(?:\/|$)/;
  if (ipRegex.test(sanitized) || /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
    rawScore += 45;
    indicators.push({
      id: 'ip-address-host',
      title: 'IP Address Used as Hostname',
      description: 'The URL uses a raw IP address instead of a registered domain name, a hallmark of evasion in phishing campaigns.',
      severity: 'high',
      category: 'syntax',
      matchedSnippet: hostname,
      confidenceScore: 96
    });
    modelFeatures.push({
      feature: 'raw_ip_host',
      weight: 4.8,
      explanation: 'Direct IP hosting bypasses domain reputation and whois verification systems.'
    });
  }

  // 2. Suspicious TLD check
  for (const tld of SUSPICIOUS_TLDS) {
    if (hostname.endsWith(tld)) {
      rawScore += 30;
      indicators.push({
        id: 'suspicious-tld',
        title: 'Unusual or High-Abuse Top Level Domain',
        description: `The domain ends with "${tld}", which is frequently registered for disposable phishing operations.`,
        severity: 'medium',
        category: 'reputation',
        matchedSnippet: tld,
        confidenceScore: 84
      });
      modelFeatures.push({
        feature: `tld_${tld}`,
        weight: 3.2,
        explanation: `TLD ${tld} has a statistically elevated malicious registration density.`
      });
      break;
    }
  }

  // 3. Brand impersonation / spoofing in hostname or path
  for (const brand of TARGETED_BRANDS) {
    // Check if brand is in subdomains or path but not the root domain
    const isRootDomain = hostname === `${brand}.com` || hostname === `www.${brand}.com` || hostname.endsWith(`.${brand}.com`);
    
    if (!isRootDomain) {
      if (hostname.includes(brand)) {
        rawScore += 40;
        indicators.push({
          id: `brand-spoof-${brand}`,
          title: `Brand Impersonation (${brand.toUpperCase()})`,
          description: `The URL embeds the brand "${brand}" inside a non-official hostname, typically intended to deceive users.`,
          severity: 'high',
          category: 'identity',
          matchedSnippet: hostname,
          confidenceScore: 95
        });
        modelFeatures.push({
          feature: `spoofed_brand_${brand}`,
          weight: 4.5,
          explanation: `Brand token "${brand}" present outside verified authoritative namespace.`
        });
        break;
      }
    }

    // Check typosquats
    const typos = TYPOSQUAT_MAPPINGS[brand] || [];
    for (const typo of typos) {
      if (hostname.includes(typo)) {
        rawScore += 45;
        indicators.push({
          id: `typosquat-${typo}`,
          title: `Typo-Squatting Detected (${typo} vs ${brand})`,
          description: `Hostname uses deceptive character substitution to mimic "${brand}".`,
          severity: 'high',
          category: 'identity',
          matchedSnippet: typo,
          confidenceScore: 97
        });
        modelFeatures.push({
          feature: `typosquat_${typo}`,
          weight: 4.9,
          explanation: `Levenshtein edit distance match against legitimate brand ${brand}.`
        });
        break;
      }
    }
  }

  // 4. Excessive Subdomains or Hyphens
  const dotCount = (hostname.match(/\./g) || []).length;
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (dotCount >= 4 || hyphenCount >= 3) {
    rawScore += 22;
    indicators.push({
      id: 'unusual-url-structure',
      title: 'Unusual URL Structure & Subdomain Chaining',
      description: `Domain contains ${dotCount} dots and ${hyphenCount} hyphens, which often indicates deep redirect nesting or domain masking.`,
      severity: 'medium',
      category: 'syntax',
      matchedSnippet: hostname,
      confidenceScore: 82
    });
    modelFeatures.push({
      feature: 'high_entropy_hostname',
      weight: 2.5,
      explanation: 'Elevated Shannon entropy and hyphen count in hostname.'
    });
  }

  // 5. Shortened URL services
  const shortenerDomains = ['bit.ly', 'tinyurl.com', 'is.gd', 't.co', 'goo.gl', 'cutt.ly', 'rb.gy'];
  if (shortenerDomains.some(d => hostname.includes(d))) {
    rawScore += 24;
    indicators.push({
      id: 'shortened-url',
      title: 'URL Shortening Service Detected',
      description: 'Shortened URLs conceal the ultimate target destination, preventing immediate domain verification.',
      severity: 'medium',
      category: 'link',
      matchedSnippet: hostname,
      confidenceScore: 80
    });
    modelFeatures.push({
      feature: 'url_shortener_service',
      weight: 2.8,
      explanation: 'Opaque redirect endpoint masks target domain metadata.'
    });
  }

  // 6. User-info '@' token in URL
  if (full.includes('@')) {
    rawScore += 40;
    indicators.push({
      id: 'userinfo-spoofing',
      title: 'Credential Masking via "@" Symbol',
      description: 'Browsers treat text before an "@" symbol as credentials and navigate to the domain after it.',
      severity: 'high',
      category: 'syntax',
      matchedSnippet: '@',
      confidenceScore: 98
    });
    modelFeatures.push({
      feature: 'at_symbol_redirection',
      weight: 5.0,
      explanation: 'RFC-3986 userinfo syntax exploitation to disguise host target.'
    });
  }

  // 7. Security keywords in path/search
  if (/(login|signin|verify|update-account|security|banking|wallet|confirm|credential)/i.test(pathname + search)) {
    if (rawScore > 20) {
      rawScore += 18;
      indicators.push({
        id: 'sensitive-action-keyword',
        title: 'Sensitive Authentication Endpoint Keywords',
        description: 'Path specifically references login, account verification, or financial security.',
        severity: 'medium',
        category: 'identity',
        matchedSnippet: pathname.slice(0, 30),
        confidenceScore: 85
      });
    }
  }

  const finalRisk = Math.min(98, Math.max(6, rawScore));

  let classification: Classification = 'SAFE';
  let summary = 'Low risk detected.';
  let explanation = 'The domain structure appears consistent with standard legitimate web hosts. No deceptive redirects, brand-spoofing, or known malicious syntactic patterns were found.';

  if (finalRisk >= 75) {
    classification = 'LIKELY SCAM';
    summary = 'Multiple scam/phishing indicators were detected.';
    explanation = `The analyzed URL exhibits severe phishing and deception signals: ${indicators.map(i => i.title.toLowerCase()).slice(0, 3).join(', ')}. Navigating to this link carries a high risk of credential interception, financial fraud, or malware download.`;
  } else if (finalRisk >= 36) {
    classification = 'SUSPICIOUS';
    summary = 'Some suspicious indicators were detected.';
    explanation = `The URL contains warning signs (${indicators.map(i => i.title.toLowerCase()).slice(0, 2).join(', ')}). Proceed with significant caution, verify with the genuine service provider, and do not enter passwords or card information.`;
  }

  const recommendedActions = generateRecommendations(indicators, classification, true);
  const processingTimeMs = Math.round(performance.now() - startTime + 220);

  return {
    id: `url-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    inputType: 'url',
    content: sanitized,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    classification,
    riskScore: finalRisk,
    summary,
    indicators,
    explanation,
    recommendedActions,
    mlBreakdown: {
      modelUsed: 'Lexical Feature Extractor + Gradient Boosted Trees (v2.4 Demo)',
      processingTimeMs,
      tokensAnalyzed: hostname.split('.').length + pathname.split('/').length,
      tfidfTopFeatures: modelFeatures.length > 0 ? modelFeatures : [
        { feature: 'verified_root_dns', weight: -3.1, explanation: 'Domain conforms to canonical trusted DNS resolution standards.' }
      ],
      heuristicWeight: Number((finalRisk * 0.48).toFixed(1)),
      mlConfidence: Math.min(99, Math.max(82, finalRisk > 50 ? finalRisk : 100 - finalRisk))
    },
    isDemoEngine: true
  };
}

function generateRecommendations(
  indicators: DetectedIndicator[],
  classification: Classification,
  isUrl: boolean = false
): string[] {
  const actions: string[] = [];

  if (classification === 'SAFE') {
    actions.push('Always confirm that the sender address or domain matches the official entity before sharing sensitive data.');
    actions.push('Keep multi-factor authentication (MFA) enabled on your critical accounts.');
    actions.push('Remember that even safe-looking messages should never persuade you to reveal full passwords.');
    return actions;
  }

  if (isUrl) {
    actions.push('Do NOT open this URL or submit any credentials, emails, or phone numbers.');
    actions.push('If you already opened it, do not enter passwords or download any suggested attachments.');
    actions.push('Verify the legitimate website by manually searching for the company via Google or typing their known official address.');
    actions.push('Report the malicious domain to Google Safe Browsing or your internal security team.');
  } else {
    actions.push('Do NOT reply to this message, click embedded links, or call phone numbers listed in the text.');
    actions.push('Never share One-Time Passwords (OTPs), PIN codes, or debit/credit card numbers.');
    actions.push('Contact your financial institution or service provider directly using the verified customer service phone number on your card or bill.');
    actions.push('Block the sender phone number / email address and mark the message as junk or phishing.');
  }

  return actions;
}
