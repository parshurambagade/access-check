import { RuleStatus } from "@/types";

const determineStatus = (score: number): RuleStatus => {
  if (score === 10) {
    return RuleStatus.PASS;
  } else if (score < 6) {
    return RuleStatus.FAIL;
  } else {
    return RuleStatus.WARNING;
  }
};

export default determineStatus;
