import { AUDIT_RULES } from "@/constants/audit";
import { RuleResult, RuleStatus } from "@/types";
import { CheerioAPI } from "cheerio";

const checkMainLandmark = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.MAIN_LANDMARK,
    score: 0,
    status: RuleStatus.FAIL,
    issues: [],
  };

  const main = $("main, [role='main']");
  if (main.length !== 1) {
    auditResult.issues.push({
      selector: "main",
      issue: main.length > 1 ? "Main landmark should be exactly one." : "Main landmark missing.",
    });
  }

  if (auditResult.issues.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
  }

  return auditResult;
};

export default checkMainLandmark;
