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
    <div className="text-center space-y-6">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        Free Accessibility Testing
      </div>

      {/* Heading */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
          Make Your Website
          <span className="block mt-2 bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-gradient">
            Accessible to Everyone
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
          Test your website for accessibility issues and get detailed
          recommendations to improve WCAG compliance.
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-6 pt-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-center gap-3 text-sm text-muted-foreground"
          >
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <feature.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">{feature.title}</p>
              <p className="text-xs">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
