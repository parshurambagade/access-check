"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search, AlertCircle } from "lucide-react";
import { AccessibilityReport } from "./accessibility-report";
import { ReportData } from "@/types";

export function AccessibilityChecker() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      setError("Please enter a valid URL");
      return;
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
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Web Accessibility Testing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Test your website for accessibility issues and get detailed
            recommendations to improve WCAG compliance.
          </p>
        </div>

        <div className="mt-12">
          <Card className="border-2">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="url"
                      placeholder="Enter website URL (e.g., https://example.com)"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={isLoading}
                      className="h-12 text-base"
                      aria-label="Website URL"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    size="lg"
                    className="h-12 px-8 font-medium"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Generate Report
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {report && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <AccessibilityReport data={report} />
        </div>
      )}
    </div>
  );
}
