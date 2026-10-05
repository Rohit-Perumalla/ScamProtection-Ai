export type Classification = 'SAFE' | 'SUSPICIOUS' | 'LIKELY SCAM';

export interface DetectedIndicator {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: 'urgency' | 'link' | 'financial' | 'identity' | 'prize' | 'syntax' | 'reputation';
  matchedSnippet?: string;
  confidenceScore: number;
}

export interface ModelContribution {
  feature: string;
  weight: number; // positive = pushes to scam, negative = pushes to safe
  explanation: string;
}

export interface AnalysisResult {
  id: string;
  inputType: 'message' | 'url';
  content: string;
  timestamp: string;
  classification: Classification;
  riskScore: number; // 0 to 100
  summary: string;
  indicators: DetectedIndicator[];
  explanation: string;
  recommendedActions: string[];
  mlBreakdown: {
    modelUsed: string;
    processingTimeMs: number;
    tokensAnalyzed: number;
    tfidfTopFeatures: ModelContribution[];
    heuristicWeight: number;
    mlConfidence: number;
  };
  isDemoEngine: boolean;
}

export interface ModelComparisonItem {
  name: string;
  description: string;
  accuracy: string;
  precision: string;
  recall: string;
  f1Score: string;
  latency: string;
  status: 'Deployed in Demo' | 'Evaluated' | 'Experimental';
}

export interface RecentScanItem {
  id: string;
  timestamp: string;
  type: 'message' | 'url';
  preview: string;
  classification: Classification;
  riskScore: number;
}
