import { Loader2 } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div className="mt-12 flex flex-col items-center gap-4 animate-in fade-in">
      <div className="relative">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulse-ring" />
      </div>
      <div className="text-center">
        <p className="font-medium">Analyzing your website...</p>
        <p className="text-sm text-muted-foreground">
          This may take a few seconds
        </p>
      </div>
    </div>
  );
};

export default LoadingComponent;
