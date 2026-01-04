import { Accessibility, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 mt-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-primary to-primary/80 flex items-center justify-center">
              <Accessibility className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">AccessCheck</span>
          </div>

          {/* Tagline */}
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Making the web accessible for everyone
          </p>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AccessCheck
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
