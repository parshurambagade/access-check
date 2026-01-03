import { RuleResult, RuleStatus } from "@/types/audit";
import { AUDIT_RULES } from "@/constants/audit";
import { CheerioAPI } from "cheerio";

const checkDocumentLanguage = ($: CheerioAPI): RuleResult => {
  const auditResult: RuleResult = {
    ...AUDIT_RULES.DOCUMENT_LANGUAGE,
    score: 0,
    status: RuleStatus.FAIL,
    issues: [],
  };

  const lang = $("html").attr("lang");
  if (!lang) {
    auditResult.issues.push({
      selector: "html",
      issue:
        'Document language is not defined. Add <html lang="en"> to the document.',
    });
  }

  if (auditResult.issues.length === 0) {
    auditResult.score = 10;
    auditResult.status = RuleStatus.PASS;
  } else {
    auditResult.score = 0;
    auditResult.status = RuleStatus.FAIL;
  }

  return auditResult;
};

export default checkDocumentLanguage;
