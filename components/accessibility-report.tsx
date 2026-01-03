"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ExternalLink,
  Lightbulb,
  Wrench,
  Code,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ReportData } from "@/types";

interface AccessibilityReportProps {
  data: ReportData;
}

export function AccessibilityReport({ data }: AccessibilityReportProps) {
  const [expandedRules, setExpandedRules] = useState<Set<string>>(new Set());
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate the score on mount
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = data.overallScore / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= data.overallScore) {
        setAnimatedScore(data.overallScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [data.overallScore]);

  const toggleRule = (ruleId: string) => {
    const newExpanded = new Set(expandedRules);
    if (newExpanded.has(ruleId)) {
      newExpanded.delete(ruleId);
    } else {
      newExpanded.add(ruleId);
    }
    setExpandedRules(newExpanded);
  };

  const expandAll = () => {
    setExpandedRules(new Set(data.rules.map((r) => r.id)));
  };

  const collapseAll = () => {
    setExpandedRules(new Set());
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80)
      return "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400";
    if (score >= 60)
      return "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400";
    return "from-rose-500 to-red-500 dark:from-rose-400 dark:to-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Good";
    if (score >= 60) return "Needs Work";
    return "Poor";
  };

  return (
    <div className="space-y-8">
      {/* Overall Score Card */}
      <Card className="border-2 border-border/50 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <CardHeader className="relative pb-0">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* Left side - Title and URL */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Accessibility Report</h2>
                  <p className="text-sm text-muted-foreground">
                    Generated just now
                  </p>
                </div>
              </div>
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-accent text-sm font-medium transition-colors group"
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="truncate max-w-xs">{data.url}</span>
              </a>
            </div>

            {/* Right side - Score */}
            <div className="flex items-center gap-6">
              <div className="relative">
                {/* Score circle background */}
                <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center">
                  {/* Progress ring */}
                  <svg className="absolute inset-0 h-32 w-32 -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#scoreGradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${(animatedScore / 100) * 352} 352`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient
                        id="scoreGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          className={
                            data.overallScore >= 80
                              ? "text-emerald-500"
                              : data.overallScore >= 60
                              ? "text-amber-500"
                              : "text-rose-500"
                          }
                          stopColor="currentColor"
                        />
                        <stop
                          offset="100%"
                          className={
                            data.overallScore >= 80
                              ? "text-teal-500"
                              : data.overallScore >= 60
                              ? "text-orange-500"
                              : "text-red-500"
                          }
                          stopColor="currentColor"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Score number */}
                  <div className="text-center z-10">
                    <span
                      className={`text-4xl font-bold bg-linear-to-r ${getScoreGradient(
                        data.overallScore
                      )} bg-clip-text text-transparent`}
                    >
                      {animatedScore}
                    </span>
                    <span className="text-lg text-muted-foreground">/100</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <Badge
                  variant="secondary"
                  className={`text-sm font-semibold ${getScoreColor(
                    data.overallScore
                  )}`}
                >
                  {getScoreLabel(data.overallScore)}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative pt-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Passed */}
            <div className="relative overflow-hidden p-5 rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/50 group hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {data.summary.pass}
                  </div>
                  <div className="text-sm font-medium text-emerald-700/70 dark:text-emerald-300/70">
                    Passed
                  </div>
                </div>
              </div>
            </div>

            {/* Warnings */}
            <div className="relative overflow-hidden p-5 rounded-xl bg-linear-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20 border border-amber-200/50 dark:border-amber-800/50 group hover:shadow-lg hover:shadow-amber-500/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                    {data.summary.warning}
                  </div>
                  <div className="text-sm font-medium text-amber-700/70 dark:text-amber-300/70">
                    Warnings
                  </div>
                </div>
              </div>
            </div>

            {/* Failed */}
            <div className="relative overflow-hidden p-5 rounded-xl bg-linear-to-br from-rose-50 to-rose-100/50 dark:from-rose-950/40 dark:to-rose-900/20 border border-rose-200/50 dark:border-rose-800/50 group hover:shadow-lg hover:shadow-rose-500/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <XCircle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                    {data.summary.fail}
                  </div>
                  <div className="text-sm font-medium text-rose-700/70 dark:text-rose-300/70">
                    Failed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rules List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>Detailed Results</span>
            <Badge variant="outline" className="font-normal">
              {data.rules.length} rules
            </Badge>
          </h2>
          <div className="flex gap-2">
            <button
              onClick={expandAll}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Expand all
            </button>
            <span className="text-muted-foreground">·</span>
            <button
              onClick={collapseAll}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Collapse all
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {data.rules.map((rule, index) => {
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

            const config = statusConfig[rule.status];
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
                        <h3 className="font-semibold text-base">
                          {rule.title}
                        </h3>
                        <Badge
                          variant={config.badgeVariant}
                          className="text-xs font-medium"
                        >
                          {rule.status}
                        </Badge>
                        {rule.issues.length > 0 && (
                          <Badge
                            variant="outline"
                            className="text-xs font-normal"
                          >
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
                        {rule.whyItMatters.map((reason, idx) => (
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
                        {rule.howToFix.map((fix, idx) => (
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
                          {rule.issues.map((issue, idx) => (
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
          })}
        </div>
      </div>
    </div>
  );
}
