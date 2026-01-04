import { AccessibilityChecker } from "@/components/accessibility-checker";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      {/* Gradient overlay */}
      <div className="fixed inset-0 hero-gradient pointer-events-none" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative min-h-[calc(100vh-10rem)] sm:min-h-[calc(100vh-10rem)] flex items-center justify-center">
        <AccessibilityChecker />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
