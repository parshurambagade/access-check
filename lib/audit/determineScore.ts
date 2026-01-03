const determineScore = (total: number, failed: number) => {
  return Math.floor((10 * (total - failed)) / total);
};

export default determineScore;
