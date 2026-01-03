import * as cheerio from "cheerio";
import checkSingleH1 from "./rules/checkSingleH1";
import checkAltText from "./rules/checkAltText";
import checkBtnAccessibleNames from "./rules/checkBtnAccessibleNames";
import checkInputsHaveLabels from "./rules/checkInputsHaveLabels";
import checkHeadingsOrder from "./rules/checkHeadingsOrder";
import checkMainLandmark from "./rules/checkMainLandmark";
import checkLinkText from "./rules/checkLinkText";

export default function runAudit(html: string) {
  const $ = cheerio.load(html);

  const results = [];

  results.push(checkSingleH1($));
  results.push(checkAltText($));
  results.push(checkBtnAccessibleNames($));
  results.push(checkInputsHaveLabels($));
  results.push(checkHeadingsOrder($));
  results.push(checkMainLandmark($));
  results.push(checkLinkText($));

  return results;
}
