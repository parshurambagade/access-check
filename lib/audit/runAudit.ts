import * as cheerio from "cheerio";

export default function runAudit(html: string) {
  const $ = cheerio.load(html);

  return [];
}

//
