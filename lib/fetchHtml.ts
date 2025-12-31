const fetchHtml = async (url: string): Promise<string | null> => {
  try {
    if (!url) {
      throw new Error("URL is required");
    }
    // Ensure URL has a protocol
    let normalizedUrl = url.trim();
    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://")
    ) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const res = await fetch(normalizedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      // Add timeout and redirect handling
      redirect: "follow",
    });

    if (!res.ok) {
      throw new Error(`Unable to fetch HTML: ${res.status} ${res.statusText}`);
    }

    const html = await res.text();

    return html;
  } catch (error) {
    // More detailed error logging
    if (error instanceof Error) {
      console.error(`Unable to fetch HTML: ${error.name}: ${error.message}`);
      if (error.cause) {
        console.error("Error cause:", error.cause);
      }
    } else {
      console.error(`Unable to fetch HTML:`, error);
    }
    return null;
  }
};
export default fetchHtml;
