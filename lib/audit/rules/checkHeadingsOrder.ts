import { AUDIT_RULES } from "@/constants/audit";
import { RuleResult, RuleStatus } from "@/types";
import { CheerioAPI } from "cheerio";
import determineScore from "../determineScore";
import determineStatus from "../determineStatus";

const checkHeadingsOrder = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.HEADING_ORDER,
    score: 0,
    status: RuleStatus.FAIL,
    issues: [],
  };

  // get all headings
  const headings = $("h1, h2, h3, h4, h5, h6");

  // if there are no headings, return pass
  if (headings.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
    return auditResult;
  }

  let previousLevel = 0;

  // check if all the headings are in order
  headings.each((_, element) => {
    const tagName = element.tagName;
    const currentLevel = Number(tagName.replace("h", ""));

    if (previousLevel !== 0 && currentLevel > previousLevel + 1) {
      auditResult.issues.push({
        selector: tagName,
        issue: `Heading level is not in order. Expected ${
          previousLevel + 1
        }, but got ${currentLevel}.`,
      });
    }

    previousLevel = currentLevel;
  });

  // if there are no issues, return pass
  if (auditResult.issues.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
  } // if there are issues, return warning or fail
  else if (auditResult.issues.length > 0) {
    auditResult.score = determineScore(
      headings.length,
      auditResult.issues.length
    );
    auditResult.status = determineStatus(auditResult.score);
  }

  return auditResult;
};

export default checkHeadingsOrder;
