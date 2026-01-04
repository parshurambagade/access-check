"use client";

import { ReportData, RuleResult } from "@/types";
import useAccessibilityReport from "@/hooks/useAccessibilityReport";
import OverallScoreCard from "./overall-score-card";
import IndividualScoreCard from "./individual-score-card";
import ScoreListHeader from "./score-list-header";

interface AccessibilityReportProps {
  data: ReportData;
}

export function AccessibilityReport({ data }: AccessibilityReportProps) {
  const {
    animatedScore,
    expandedRules,
    toggleRule,
    expandAll,
    collapseAll,
    getScoreColor,
    getScoreGradient,
    getScoreLabel,
  } = useAccessibilityReport(data);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Overall Score Card */}
      <OverallScoreCard
        data={data}
        animatedScore={animatedScore}
        getScoreGradient={getScoreGradient}
        getScoreColor={getScoreColor}
        getScoreLabel={getScoreLabel}
      />

      {/* Rules List */}
      <div className="space-y-3 sm:space-y-4">
        {/* Score List Header */}
        <ScoreListHeader
          data={data}
          expandAll={expandAll}
          collapseAll={collapseAll}
        />

        {/* Individual Score Cards */}
        <div className="space-y-2 sm:space-y-3">
          {data.rules.map((rule, index) => (
            <IndividualScoreCard
              key={index}
              rule={rule as RuleResult}
              toggleRule={(ruleId: string) => toggleRule(ruleId)}
              index={index}
              expandedRules={expandedRules}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
