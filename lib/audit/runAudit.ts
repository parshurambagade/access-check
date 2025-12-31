import * as cheerio from "cheerio";
import checkSingleH1 from "./rules/checkSingleH1";

export default function runAudit(html: string) {
  const $ = cheerio.load(html);

  const results = [];

  results.push(checkSingleH1($));

  return results;
}
