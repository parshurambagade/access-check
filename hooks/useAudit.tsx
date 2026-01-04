import { ReportData } from "@/types";
import { useState } from "react";

const useAudit = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    let sanitizedUrl = url.trim().toLowerCase();

    if (!sanitizedUrl) {
      setError("Please enter a valid URL");
      return;
    }

    if (!sanitizedUrl.startsWith("https://")) {
      sanitizedUrl = "https://" + sanitizedUrl;
    }

    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: sanitizedUrl }),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to generate report. Please try again."
        );
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { url, setUrl, isLoading, report, error, generateReport };
};

export default useAudit;
