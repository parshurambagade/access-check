export async function fetchHtml(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      throw new Error("Unable to fetch HTML");
    }

    return res.text();
  } catch (error) {
    throw new Error(`Unable to fetch HTML: ${error}`);
  }
}
