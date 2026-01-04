import { ReportData } from "@/types";
import { useEffect, useState } from "react";

const useAccessibilityReport = (data: ReportData) => {
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
  return {
    animatedScore,
    expandedRules,
    toggleRule,
    expandAll,
    collapseAll,
    getScoreColor,
    getScoreGradient,
    getScoreLabel,
  };
};

export default useAccessibilityReport;
