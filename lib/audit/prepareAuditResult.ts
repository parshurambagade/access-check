import { AuditResult, RuleResult, RuleStatus } from "@/types";

const prepareAuditResult = (
  url: string,
  auditTests: RuleResult[]
): AuditResult => {
  const passedTests = auditTests.filter(
    (test) => test.status === RuleStatus.PASS
  );
  const warningTests = auditTests.filter(
    (test) => test.status === RuleStatus.WARNING
  );
  const failedTests = auditTests.filter(
    (test) => test.status === RuleStatus.FAIL
  );

  const totalTests = auditTests.length;

  // calculate overall score
  const overallScore = Math.floor(
    (passedTests.length * 100 +
      warningTests.length * 50 +
      failedTests.length * 0) /
      totalTests
  );

  return {
    url,
    overallScore,
    summary: {
      pass: passedTests.length,
      warning: warningTests.length,
      fail: failedTests.length,
    },
    rules: auditTests,
    auditedAt: new Date().toISOString(),
  };
};

export default prepareAuditResult;
