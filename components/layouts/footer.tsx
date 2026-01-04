import { Accessibility, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 mt-8 sm:mt-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-linear-to-br from-primary to-primary/80 flex items-center justify-center">
              <Accessibility className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm sm:text-base">
              AccessCheck
            </span>
          </div>

          {/* Tagline */}
          <p className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground text-center">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            Making the web accessible for everyone
          </p>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} AccessCheck
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
