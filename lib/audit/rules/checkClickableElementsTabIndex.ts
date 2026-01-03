import { CheerioAPI } from "cheerio";
import { RuleResult, RuleStatus } from "@/types";
import { AUDIT_RULES } from "@/constants/audit";
import getElementSelector from "@/lib/getElementSelector";
import determineScore from "../determineScore";
import determineStatus from "../determineStatus";

const checkClickableElementsTabIndex = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.KEYBOARD_FOCUS,
    score: 0,
    status: RuleStatus.FAIL,
    issues: [],
  };

  const clickableElements = $("[onclick], [role='button']");

  if (clickableElements.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
    return auditResult;
  }

  // check if all clickable elements have a tabindex
  clickableElements.each((_, element) => {
    const tagName = element.tagName;

    if (tagName === "button" || tagName === "a") {
      return;
    }

    const clickableElement = $(element);

    const tabindex = clickableElement.attr("tabindex");
    if (!tabindex) {
      auditResult.issues.push({
        selector: getElementSelector($, element) || "",
        issue: "Clickable element missing tabindex.",
      });
    } else if (Number(tabindex) !== 0) {
      auditResult.issues.push({
        selector: getElementSelector($, element) || "",
        issue:
          Number(tabindex) > 0
            ? "Tabindex is greater than 0, which breaks keyboard navigation."
            : "Tabindex is not 0, which breaks keyboard navigation.",
      });
    }
  });

  if (auditResult.issues.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
  } else if (auditResult.issues.length > 0) {
    auditResult.score = determineScore(
      clickableElements.length,
      auditResult.issues.length
    );
    auditResult.status = determineStatus(auditResult.score);
  }

  return auditResult;
};

export default checkClickableElementsTabIndex;
