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
  whyItMatters: string[];
  howToFix: string[];
  issues: RuleIssue[];
}
