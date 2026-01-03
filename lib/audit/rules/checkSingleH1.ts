import { CheerioAPI } from "cheerio";
import { RuleResult, RuleStatus } from "@/types/audit";
import { AUDIT_RULES } from "@/constants/audit";

const checkSingleH1 = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.SINGLE_H1,
    score: 0,
    status: RuleStatus.FAIL,
    issues: [],
  };

  const count = $("h1").length;

  if (count !== 1) {
    auditResult.issues.push({
      selector: "h1",
      issue:
        count > 1
          ? "Page has multiple h1 elements, but should have exactly 1."
          : "Page has no h1 element.",
    });
  } else {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
  }

  return auditResult;
};

export default checkSingleH1;
