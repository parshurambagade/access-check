import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search, AlertCircle, Globe, ArrowRight } from "lucide-react";

interface SearchCardProps {
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  error: string | null;
  generateReport: (e: React.FormEvent) => void;
}
const SearchCard = ({
  url,
  setUrl,
  isLoading,
  error,
  generateReport,
}: SearchCardProps) => {
  return (
    <div className="mt-12">
      <Card className="border-2 border-border/50 shadow-xl shadow-primary/5 overflow-hidden p-0">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <CardContent className="relative p-8">
          <form onSubmit={generateReport}>
            <div className="flex flex-col gap-4">
              {/* Input row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Globe className="h-4 w-4" />
                  </div>
                  <Input
                    type="url"
                    placeholder="Enter website URL (e.g., https://example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isLoading}
                    className="h-12 pl-12 text-base bg-background border-2 focus:border-primary focus:ring-primary/20 transition-all"
                    aria-label="Website URL"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="h-12 px-6 font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">Try:</span>
                {["https://google.com", "https://github.com"].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setUrl(suggestion)}
                      className="px-3 py-1 rounded-full bg-muted hover:bg-accent text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
                    >
                      {suggestion.replace("https://", "")}
                    </button>
                  )
                )}
              </div>
            </div>

            {error && (
              <Alert
                variant="destructive"
                className="mt-4 border-2 animate-in fade-in slide-in-from-top-2"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchCard;
