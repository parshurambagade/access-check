import { AUDIT_RULES } from "@/constants/audit";
import { RuleResult, RuleStatus } from "@/types";
import { CheerioAPI } from "cheerio";
import determineStatus from "../determineStatus";
import getElementSelector from "@/lib/getElementSelector";
import determineScore from "../determineScore";

const checkBtnAccessibleNames = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.BUTTON_NAME,
    status: RuleStatus.FAIL,
    score: 0,
    issues: [],
  };
  const buttons = $("button, [role='button']");

  if (buttons.length === 0) {
    auditResult.status = RuleStatus.PASS;
    auditResult.score = 10;
    return auditResult;
  }

  const buttonsWithoutAccessibleName = buttons.filter((_, element) => {
    const button = $(element);

    // check if button has text
    const text = button.text().trim();
    // check if button has aria-label
    const ariaLabel = button.attr("aria-label")?.trim();

    // check if button has aria-labelledby
    const ariaLabelledby = button.attr("aria-labelledby");
    let labelledByText = "";

    // check if button has aria-labelledby and get the text of the elements referenced by the aria-labelledby attribute
    if (ariaLabelledby) {
      labelledByText = ariaLabelledby
        .split(" ") // create an array of the ids
        .map((id) => $(`#${id}`).text().trim()) // get the text of the elements referenced by the aria-labelledby attribute
        .join(""); // join the text of the elements referenced by the aria-labelledby attribute
    }

    return (
      text.length === 0 &&
      (!ariaLabel || ariaLabel.length === 0) &&
      labelledByText.length === 0
    );
  });

  console.log(buttonsWithoutAccessibleName.length, buttons.length);
  // calculate the score
  auditResult.score = determineScore(
    buttons.length,
    buttonsWithoutAccessibleName.length
  );

  auditResult.status = determineStatus(auditResult.score);
  buttonsWithoutAccessibleName.each((index, element) => {
    auditResult.issues.push({
      selector: getElementSelector($, element) || "",
      issue: "Button missing accessible name.",
    });
  });

  return auditResult;
};

export default checkBtnAccessibleNames;
