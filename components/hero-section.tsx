import { Zap, Shield, FileCheck } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get results in seconds",
  },
  {
    icon: Shield,
    title: "WCAG Guidelines",
    description: "Based on accessibility standards",
  },
  {
    icon: FileCheck,
    title: "Detailed Reports",
    description: "Actionable recommendations",
  },
];

const HeroSection = () => {
  return (
    <div className="text-center space-y-4 sm:space-y-6">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium border border-primary/20">
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary"></span>
        </span>
        Free Accessibility Testing
      </div>

      {/* Heading */}
      <div className="space-y-3 sm:space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.15] sm:leading-[1.1]">
          Make Your Website
          <span className="block mt-1 sm:mt-2 bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-gradient">
            Accessible to Everyone
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed px-2">
          Test your website for accessibility issues and get detailed
          recommendations to improve WCAG compliance.
        </p>
      </div>

      {/* Features - Stack on mobile, row on larger screens */}
      <div className="hidden sm:flex flex-col items-center sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 pt-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-center gap-2.5 sm:gap-3 text-sm text-muted-foreground bg-muted/50 sm:bg-transparent rounded-lg p-2.5 sm:p-0 w-max sm:w-auto"
          >
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <feature.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground text-sm">
                {feature.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
