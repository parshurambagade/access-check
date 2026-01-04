import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Code,
  Lightbulb,
  Wrench,
  XCircle,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { RuleIssue, RuleResult } from "@/types";

interface IndividualScoreCardProps {
  rule: RuleResult;
  index: number;
  expandedRules: Set<string>;
  toggleRule: (id: string) => void;
}

const IndividualScoreCard = ({
  rule,
  index,
  expandedRules,
  toggleRule,
}: IndividualScoreCardProps) => {
  const isExpanded = expandedRules.has(rule.id);
  const statusConfig = {
    PASS: {
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200/50 dark:border-emerald-800/50",
      badgeVariant: "default" as const,
    },
    WARNING: {
      icon: AlertTriangle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200/50 dark:border-amber-800/50",
      badgeVariant: "secondary" as const,
    },
    FAIL: {
      icon: XCircle,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/40",
      border: "border-rose-200/50 dark:border-rose-800/50",
      badgeVariant: "secondary" as const,
    },
  };

  const config = statusConfig[rule.status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <Card
      key={rule.id}
      className="border-2 border-border/50 overflow-hidden hover:border-border transition-colors"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={() => toggleRule(rule.id)}
        className="w-full text-left p-5 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className={`h-11 w-11 rounded-xl ${config.bg} flex items-center justify-center shrink-0 border ${config.border}`}
          >
            <Icon className={`h-5 w-5 ${config.color}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold text-base">{rule.title}</h3>
              <Badge
                variant={config.badgeVariant}
                className="text-xs font-medium"
              >
                {rule.status}
              </Badge>
              {rule.issues.length > 0 && (
                <Badge variant="outline" className="text-xs font-normal">
                  {rule.issues.length}{" "}
                  {rule.issues.length === 1 ? "issue" : "issues"}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${
                      rule.score >= 8
                        ? "from-emerald-500 to-teal-500"
                        : rule.score >= 5
                        ? "from-amber-500 to-orange-500"
                        : "from-rose-500 to-red-500"
                    }`}
                    style={{ width: `${rule.score * 10}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {rule.score}/10
                </span>
              </div>
            </div>
          </div>

          <div
            className={`shrink-0 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Why It Matters */}
          <div className="pt-5">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
              <Lightbulb className="h-4 w-4 text-primary" />
              Why It Matters
            </h4>
            <ul className="space-y-2 pl-6">
              {rule.whyItMatters.map((reason: string, idx: number) => (
                <li
                  key={idx}
                  className="text-sm text-muted-foreground list-disc"
                >
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* How To Fix */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
              <Wrench className="h-4 w-4 text-primary" />
              How To Fix
            </h4>
            <ul className="space-y-2 pl-6">
              {rule.howToFix.map((fix: string, idx: number) => (
                <li
                  key={idx}
                  className="text-sm text-muted-foreground list-disc"
                >
                  {fix}
                </li>
              ))}
            </ul>
          </div>

          {/* Issues */}
          {rule.issues.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                <Code className="h-4 w-4 text-primary" />
                Issues Found
              </h4>
              <div className="space-y-2">
                {rule.issues.map((issue: RuleIssue, idx: number) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${config.border} ${config.bg}`}
                  >
                    <div className="font-mono text-xs text-muted-foreground mb-2 break-all bg-background/50 px-2 py-1 rounded inline-block">
                      {issue.selector}
                    </div>
                    <div className="text-sm">{issue.issue}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default IndividualScoreCard;
