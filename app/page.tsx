import { AccessibilityChecker } from "@/components/accessibility-checker";
import { CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">AccessCheck</span>
          </div>
        </div>
      </header>

      <main>
        <AccessibilityChecker />
      </main>

      <footer className="border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 AccessCheck. Making the web accessible for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
