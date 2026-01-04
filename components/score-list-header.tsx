import { Badge } from "./ui/badge";
import { ReportData } from "@/types";

interface ScoreListHeaderProps {
  data: ReportData;
  expandAll: () => void;
  collapseAll: () => void;
}

const ScoreListHeader = ({
  data,
  expandAll,
  collapseAll,
}: ScoreListHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
      <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
        <span>Detailed Results</span>
        <Badge variant="outline" className="font-normal text-xs sm:text-sm">
          {data.rules.length} rules
        </Badge>
      </h2>
      <div className="flex gap-2 text-xs sm:text-sm">
        <button
          onClick={expandAll}
          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Expand all
        </button>
        <span className="text-muted-foreground">·</span>
        <button
          onClick={collapseAll}
          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Collapse all
        </button>
      </div>
    </div>
  );
};

export default ScoreListHeader;
