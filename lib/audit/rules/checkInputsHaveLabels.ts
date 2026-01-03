import { AUDIT_RULES } from "@/constants/audit";
import { RuleResult, RuleStatus } from "@/types";
import { CheerioAPI } from "cheerio";
import determineScore from "../determineScore";
import determineStatus from "../determineStatus";
import getElementSelector from "@/lib/getElementSelector";

const checkInputsHaveLabels = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.INPUT_LABEL,
    score: 0,
    status: RuleStatus.FAIL,
    issues: [],
  };

  // get all input, textarea, and select elements
  const inputs = $("input, textarea, select");

  // if there are no inputs, return pass
  if (inputs.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
    return auditResult;
  }

  // check if all inputs have a label
  inputs.each((_, element) => {
    const input = $(element);
    const label =
      input.attr("aria-label")?.trim() || input.closest("label").text().trim();
    const ariaLabelledby = input.attr("aria-labelledby");
    let labelledByText = "";
    if (ariaLabelledby) {
      labelledByText = ariaLabelledby
        .split(" ")
        .map((id) => $(`#${id}`).text().trim())
        .join("");
    }
    // if input has no label, add issue
    if (label.length === 0 && labelledByText.length === 0) {
      auditResult.issues.push({
        selector: getElementSelector($, element) || "",
        issue: "Input missing accessible label.",
      });
    }
  });

  if (auditResult.issues.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
  } else if (auditResult.issues.length > 0) {
    auditResult.score = determineScore(
      inputs.length,
      auditResult.issues.length
    );
    auditResult.status = determineStatus(auditResult.score);
  }

  return auditResult;
};

export default checkInputsHaveLabels;
