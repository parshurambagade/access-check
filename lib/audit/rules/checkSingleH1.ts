import { CheerioAPI } from "cheerio";
import { RuleResult, RuleStatus } from "@/types/audit";
import { AUDIT_RULES } from "@/constants/audit";

const checkSingleH1 = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.SINGLE_H1,
    status: RuleStatus.FAIL,
    score: 0,
    issues: [],
  };

  const count = $("h1").length;

  if (count !== 1) {
    auditResult.status = RuleStatus.FAIL;
    auditResult.issues.push({
      selector: "h1",
      issue: `Page has ${count} h1 elements, but should have exactly 1.`,
    });
    auditResult.score = 0;
  } else {
    auditResult.status = RuleStatus.PASS;
    auditResult.score = 10;
  }

  return auditResult;
};

export default checkSingleH1;
