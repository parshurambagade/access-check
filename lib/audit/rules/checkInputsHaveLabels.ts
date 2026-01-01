import { AUDIT_RULES } from "@/constants/audit";
import { RuleResult, RuleStatus } from "@/types";
import { CheerioAPI } from "cheerio";
import determineScore from "../determineScore";
import determineStatus from "../determineStatus";
import getElementSelector from "@/lib/getElementSelector";

const checkInputsHaveLabels = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.INPUT_LABEL,
    status: RuleStatus.FAIL,
    score: 0,
    issues: [],
  };

  // get all input, textarea, and select elements
  const inputs = $("input, textarea, select");

  // if there are no inputs, return pass
  if (inputs.length === 0) {
    auditResult.status = RuleStatus.PASS;
    auditResult.score = 10;
    return auditResult;
  }

  // get all inputs that do not have a label
  const inputsWithoutLabel = inputs.filter((_, element) => {
    const input = $(element);
    // check if input has a label
    const label =
      input.attr("aria-label")?.trim() || input.closest("label").text().trim();

    const lebelledBy = input.attr("aria-labelledby");
    let labelledByText = "";
    if (lebelledBy) {
      labelledByText = lebelledBy
        .split(" ")
        .map((id) => $(`#${id}`).text().trim())
        .join("");
    }

    return label.length === 0 && labelledByText.length === 0;
  });

  // if there are no inputs without a label, return pass
  if (inputsWithoutLabel.length === 0) {
    auditResult.status = RuleStatus.PASS;
    auditResult.score = 10;
    return auditResult;
  }

  // if there are inputs without a label, return fail
  auditResult.score = determineScore(inputs.length, inputsWithoutLabel.length);
  auditResult.status = determineStatus(auditResult.score);
  inputsWithoutLabel.each((_, element) => {
    auditResult.issues.push({
      selector: getElementSelector($, element) || "",
      issue: "Input missing accessible label.",
    });
  });

  return auditResult;
};

export default checkInputsHaveLabels;
