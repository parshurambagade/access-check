import { CheerioAPI } from "cheerio";
import { RuleResult, RuleStatus } from "@/types";
import { AUDIT_RULES, GENERIC_LINK_TEXTS } from "@/constants/audit";
import determineScore from "../determineScore";
import determineStatus from "../determineStatus";
import getElementSelector from "@/lib/getElementSelector";

const checkLinkText = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.LINK_TEXT,
    score: 0,
    status: RuleStatus.FAIL,
    issues: [],
  };

  const links = $("a");

  if (links.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
    return auditResult;
  }

  // check if all links have meaningful text
  links.each((_, element) => {
    const link = $(element);
    const text = link.text().trim().toLowerCase();
    if (GENERIC_LINK_TEXTS.includes(text)) {
      auditResult.issues.push({
        selector: link.attr("href") || getElementSelector($, element),
        issue: `Link text is generic: ${text}.`,
      });
    }

    const ariaLabel = link.attr("aria-label")?.trim().toLowerCase();
    if (ariaLabel && GENERIC_LINK_TEXTS.includes(ariaLabel)) {
      auditResult.issues.push({
        selector: link.attr("href") || getElementSelector($, element),
        issue: `Link aria-label is generic: ${ariaLabel}.`,
      });
    }
  });

  if (auditResult.issues.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
  } else if (auditResult.issues.length > 0) {
    auditResult.score = determineScore(links.length, auditResult.issues.length);
    auditResult.status = determineStatus(auditResult.score);
  }

  return auditResult;
};

export default checkLinkText;
