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
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <span>Detailed Results</span>
        <Badge variant="outline" className="font-normal">
          {data.rules.length} rules
        </Badge>
      </h2>
      <div className="flex gap-2">
        <button
          onClick={expandAll}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Expand all
        </button>
        <span className="text-muted-foreground">·</span>
        <button
          onClick={collapseAll}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Collapse all
        </button>
      </div>
    </div>
  );
};

export default ScoreListHeader;
