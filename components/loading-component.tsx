import { Loader2 } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div className="mt-8 sm:mt-12 flex flex-col items-center gap-3 sm:gap-4 animate-in fade-in">
      <div className="relative">
        <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-spin" />
        </div>
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-primary/20 animate-pulse-ring" />
      </div>
      <div className="text-center">
        <p className="font-medium text-sm sm:text-base">
          Analyzing your website...
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          This may take a few seconds
        </p>
      </div>
    </div>
  );
};

export default LoadingComponent;
