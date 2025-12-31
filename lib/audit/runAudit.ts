import * as cheerio from "cheerio";
import checkSingleH1 from "./rules/checkSingleH1";
import checkAltText from "./rules/checkAltText";

export default function runAudit(html: string) {
  const $ = cheerio.load(html);

  const results = [];

  results.push(checkSingleH1($));
  results.push(checkAltText($));

  return results;
}
