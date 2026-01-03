import { RuleResult, RuleStatus } from "@/types";
import { CheerioAPI } from "cheerio";
import {
  AUDIT_RULES,
  NATIVE_ELEMENT_ROLES,
  VALID_ARIA_ROLES,
} from "@/constants/audit";
import getElementSelector from "@/lib/getElementSelector";
import determineScore from "../determineScore";
import determineStatus from "../determineStatus";

const checkAriaRoleMisuse = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.ARIA_USAGE,
    score: 0,
    status: RuleStatus.FAIL,
    issues: [],
  };

  const elements = $("[role]");
  if (elements.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
    return auditResult;
  }

  elements.each((_, el) => {
    const element = $(el);
    const role = element.attr("role")?.trim().toLowerCase();

    if (!role) return;

    if (!VALID_ARIA_ROLES.includes(role)) {
      auditResult.issues.push({
        selector: getElementSelector($, el) || "",
        issue: `Invalid ARIA role: ${role}.`,
      });
    } else {
      const tagName = el.tagName.trim().toLowerCase();
      if (NATIVE_ELEMENT_ROLES[tagName]?.includes(role)) {
        auditResult.issues.push({
          selector: getElementSelector($, el) || "",
          issue: `ARIA role is redundant for native element: ${tagName}.`,
        });
      }
    }
  });

  if (auditResult.issues.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
  } else {
    auditResult.score = determineScore(
      elements.length,
      auditResult.issues.length
    );
    auditResult.status = determineStatus(auditResult.score);
  }

  return auditResult;
};

export default checkAriaRoleMisuse;
