import { urlSchema } from "@/schemas/url.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = urlSchema.safeParse(body);

    if (!parsedBody.success) {
      return new Response(
        JSON.stringify({ error: parsedBody.error.flatten() }),
        {
          status: 400,
        }
      );
    }

    const { url } = parsedBody.data;

    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ url }), { status: 200 });
  } catch {
    return new Response(null, { status: 500 });
  }
}
