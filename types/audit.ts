export enum RuleStatus {
  PASS = "PASS",
  WARNING = "WARNING",
  FAIL = "FAIL",
}

export interface RuleIssue {
  selector: string;
  issue: string;
}

export interface RuleResult {
  id: string;
  title: string;
  status: RuleStatus;
  score: number;
  whyItMatters: readonly string[];
  howToFix: readonly string[];
  issues: RuleIssue[];
}

export interface AuditResult {
  url: string;
  overallScore: number; // 0–100
  summary: {
    pass: number;
    warning: number;
    fail: number;
  };
  rules: RuleResult[]; // exactly 10 items
  auditedAt: string; // ISO timestamp
}
