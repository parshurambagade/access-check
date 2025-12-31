import { AuditResult, RuleResult, RuleStatus } from "@/types";

const prepareAuditResult = (
  url: string,
  auditTests: RuleResult[]
): AuditResult => {
  return {
    url,
    overallScore: auditTests.reduce((acc, test) => acc + test.score, 0),
    summary: {
      pass: auditTests.filter((test) => test.status === RuleStatus.PASS).length,
      warning: auditTests.filter((test) => test.status === RuleStatus.WARNING)
        .length,
      fail: auditTests.filter((test) => test.status === RuleStatus.FAIL).length,
    },
    rules: auditTests,
    auditedAt: new Date().toISOString(),
  };
};

export default prepareAuditResult;
