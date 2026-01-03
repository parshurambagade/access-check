"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useState } from "react"

interface ReportData {
  url: string
  overallScore: number
  summary: {
    pass: number
    warning: number
    fail: number
  }
  rules: Array<{
    id: string
    title: string
    whyItMatters: string[]
    howToFix: string[]
    score: number
    status: "PASS" | "WARNING" | "FAIL"
    issues: Array<{
      selector: string
      issue: string
    }>
  }>
}

interface AccessibilityReportProps {
  data: ReportData
}

export function AccessibilityReport({ data }: AccessibilityReportProps) {
  const [expandedRules, setExpandedRules] = useState<Set<string>>(new Set())

  const toggleRule = (ruleId: string) => {
    const newExpanded = new Set(expandedRules)
    if (newExpanded.has(ruleId)) {
      newExpanded.delete(ruleId)
    } else {
      newExpanded.add(ruleId)
    }
    setExpandedRules(newExpanded)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-500"
    if (score >= 60) return "text-yellow-600 dark:text-yellow-500"
    return "text-red-600 dark:text-red-500"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50 dark:bg-green-950/30"
    if (score >= 60) return "bg-yellow-50 dark:bg-yellow-950/30"
    return "bg-red-50 dark:bg-red-950/30"
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Overall Score Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <CardTitle className="text-2xl">Accessibility Report</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ExternalLink className="h-3.5 w-3.5" />
                <a href={data.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {data.url}
                </a>
              </div>
            </div>

            <div className={`flex items-center gap-6 p-6 rounded-lg ${getScoreBgColor(data.overallScore)}`}>
              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreColor(data.overallScore)}`}>{data.overallScore}</div>
                <div className="text-sm font-medium text-muted-foreground mt-1">Overall Score</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-500">{data.summary.pass}</div>
                <div className="text-sm font-medium text-muted-foreground">Passed</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900">
              <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">{data.summary.warning}</div>
                <div className="text-sm font-medium text-muted-foreground">Warnings</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-500">{data.summary.fail}</div>
                <div className="text-sm font-medium text-muted-foreground">Failed</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rules List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Detailed Results</h2>

        {data.rules.map((rule) => {
          const isExpanded = expandedRules.has(rule.id)
          const statusConfig = {
            PASS: {
              icon: CheckCircle2,
              color: "text-green-600 dark:text-green-500",
              bg: "bg-green-50 dark:bg-green-950/30",
              border: "border-green-200 dark:border-green-900",
            },
            WARNING: {
              icon: AlertTriangle,
              color: "text-yellow-600 dark:text-yellow-500",
              bg: "bg-yellow-50 dark:bg-yellow-950/30",
              border: "border-yellow-200 dark:border-yellow-900",
            },
            FAIL: {
              icon: XCircle,
              color: "text-red-600 dark:text-red-500",
              bg: "bg-red-50 dark:bg-red-950/30",
              border: "border-red-200 dark:border-red-900",
            },
          }

          const config = statusConfig[rule.status]
          const Icon = config.icon

          return (
            <Card key={rule.id} className="border-2 overflow-hidden">
              <button
                onClick={() => toggleRule(rule.id)}
                className="w-full text-left p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-full ${config.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{rule.title}</h3>
                      <Badge variant={rule.status === "PASS" ? "default" : "secondary"} className="font-medium">
                        {rule.status}
                      </Badge>
                      {rule.issues.length > 0 && (
                        <Badge variant="outline" className="font-normal">
                          {rule.issues.length} {rule.issues.length === 1 ? "issue" : "issues"}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">Score: {rule.score}/10</div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 space-y-6 border-t">
                  {/* Why It Matters */}
                  <div className="pt-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">Why It Matters</h4>
                    <ul className="space-y-2">
                      {rule.whyItMatters.map((reason, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-foreground mt-0.5">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How To Fix */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">How To Fix</h4>
                    <ul className="space-y-2">
                      {rule.howToFix.map((fix, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-foreground mt-0.5">•</span>
                          <span>{fix}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Issues */}
                  {rule.issues.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Issues Found</h4>
                      <div className="space-y-2">
                        {rule.issues.map((issue, idx) => (
                          <div key={idx} className={`p-4 rounded-lg border ${config.border} ${config.bg}`}>
                            <div className="font-mono text-xs text-muted-foreground mb-2 break-all">
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
          )
        })}
      </div>
    </div>
  )
}
