import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ReportData } from "@/types";

interface OverallScoreCardProps {
  data: ReportData;
  animatedScore: number;
  getScoreGradient: (score: number) => string;
  getScoreColor: (score: number) => string;
  getScoreLabel: (score: number) => string;
}

const OverallScoreCard = ({
  data,
  animatedScore,
  getScoreGradient,
  getScoreColor,
  getScoreLabel,
}: OverallScoreCardProps) => {
  return (
    <Card className="border-2 border-border/50 shadow-xl overflow-hidden gap-6">
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
                    className={`font-bold bg-linear-to-r ${getScoreGradient(
                      data.overallScore
                    )} bg-clip-text text-transparent ${
                      animatedScore === 100 ? "text-3xl" : "text-4xl"
                    }`}
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

      <CardContent className="relative pt-0">
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
  );
};

export default OverallScoreCard;
