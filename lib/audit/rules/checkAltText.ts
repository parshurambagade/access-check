import { RuleResult, RuleStatus } from "@/types";
import { CheerioAPI } from "cheerio";
import { AUDIT_RULES } from "@/constants/audit";
import determineStatus from "../determineStatus";
import determineScore from "../determineScore";

const checkAltText = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.IMG_ALT,
    status: RuleStatus.FAIL,
    score: 0,
    issues: [],
  };

  const images = $("img");

  if (images.length === 0) {
    auditResult.status = RuleStatus.PASS;
    auditResult.score = 10;
    return auditResult;
  }

  const imagesWithoutAlt = images.filter((index, element) => {
    const img = $(element);
    const alt = img.attr("alt");
    return !alt;
  });

  // if all images have alt text, return pass
  if (imagesWithoutAlt.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
    return auditResult;
  }

  // if some images have alt text, return warning || fail
  auditResult.score = determineScore(images.length, imagesWithoutAlt.length);
  auditResult.status = determineStatus(auditResult.score);
  imagesWithoutAlt.each((_, element) => {
    const img = $(element);
    auditResult.issues.push({
      selector: img.attr("src") || "",
      issue: "Image missing alt text.",
    });
  });

  return auditResult;
};

export default checkAltText;
