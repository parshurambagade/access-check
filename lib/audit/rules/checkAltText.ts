import { RuleResult, RuleStatus } from "@/types";
import { CheerioAPI } from "cheerio";
import { AUDIT_RULES } from "@/constants/audit";
import determineStatus from "../determineStatus";
import determineScore from "../determineScore";

const checkAltText = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.IMG_ALT,
    score: 0,
    status: RuleStatus.FAIL,
    issues: [],
  };

  const images = $("img");

  if (images.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
    return auditResult;
  }

  // check if all images have alt text
  images.each((_, element) => {
    const img = $(element);
    const alt = img.attr("alt");
    if (!alt) {
      // if image has no alt text, add issue
      auditResult.issues.push({
        selector: img.attr("src") || "",
        issue: "Image missing alt text.",
      });
    }
  });

  if (auditResult.issues.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
  } else if (auditResult.issues.length > 0) {
    auditResult.score = determineScore(
      images.length,
      auditResult.issues.length
    );
    auditResult.status = determineStatus(auditResult.score);
  }
  return auditResult;
};

export default checkAltText;
