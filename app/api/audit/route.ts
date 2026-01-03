import { urlSchema } from "@/schemas/url.schema";
import { NextRequest } from "next/server";
import fetchHtml from "@/lib/fetchHtml";
import runAudit from "@/lib/audit/runAudit";
import { AuditResult } from "@/types";
import prepareAuditResult from "@/lib/audit/prepareAuditResult";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = urlSchema.safeParse(body);

    if (!parsedBody.success) {
      return Response.json(
        { error: parsedBody.error.flatten() },
        { status: 400 }
      );
    }

    const { url } = parsedBody.data;

    // fetch html content from url
    const html = await fetchHtml(url);

    if (!html) {
      return Response.json(
        { error: "Unable to fetch HTML from the provided URL" },
        { status: 500 }
      );
    }

    const auditTests = runAudit(html);
    const result: AuditResult = prepareAuditResult(url, auditTests);

    return Response.json(result, { status: 200 });
  } catch (error) {
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return Response.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Handle other errors
    if (error instanceof Error) {
      return Response.json(
        { error: error.message || "Internal server error" },
        { status: 500 }
      );
    }

    // Fallback for unknown error types
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
