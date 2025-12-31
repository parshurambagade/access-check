import { RuleResult, RuleStatus } from "@/types";
import { CheerioAPI } from "cheerio";
import { AUDIT_RULES } from "@/constants/audit";
import determineStatus from "../determineStatus";

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
    auditResult.score = auditResult.issues.length === 0 ? 10 : 0;
    auditResult.status =
      auditResult.issues.length === 0 ? RuleStatus.PASS : RuleStatus.FAIL;
    return auditResult;
  }

  // if some images have alt text, return warning || fail
  auditResult.score = Math.floor(
    (10 * imagesWithoutAlt.length) / images.length
  );
  auditResult.status = determineStatus(auditResult.score);
  imagesWithoutAlt.each((index, element) => {
    const img = $(element);
    auditResult.issues.push({
      selector: img.attr("src") || "",
      issue: "Image missing alt text.",
    });
  });

  return auditResult;
};

export default checkAltText;
