import { AUDIT_RULES } from "@/constants/audit";
import { RuleResult, RuleStatus } from "@/types";
import { CheerioAPI } from "cheerio";
import determineStatus from "../determineStatus";
import getElementSelector from "@/lib/getElementSelector";
import determineScore from "../determineScore";

const checkBtnAccessibleNames = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.BUTTON_NAME,
    score: 0,
    status: RuleStatus.FAIL,
    issues: [],
  };
  const buttons = $("button, [role='button']");

  if (buttons.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
    return auditResult;
  }

  // check if all buttons have accessible names
  buttons.each((_, element) => {
    const button = $(element);
    const text = button.text().trim();
    const ariaLabel = button.attr("aria-label")?.trim();
    const ariaLabelledby = button.attr("aria-labelledby");
    let labelledByText = "";
    if (ariaLabelledby) {
      labelledByText = ariaLabelledby
        .split(" ")
        .map((id) => $(`#${id}`).text().trim())
        .join("");
    }
    if (
      text.length === 0 &&
      (!ariaLabel || ariaLabel.length === 0) &&
      labelledByText.length === 0
    ) {
      auditResult.issues.push({
        selector: getElementSelector($, element) || "",
        issue: "Button missing accessible name.",
      });
    }
  });

  if (auditResult.issues.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
  } else if (auditResult.issues.length > 0) {
    auditResult.score = determineScore(
      buttons.length,
      auditResult.issues.length
    );
    auditResult.status = determineStatus(auditResult.score);
  }

  return auditResult;
};

export default checkBtnAccessibleNames;
