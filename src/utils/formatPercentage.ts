export const formatPercentage = (decimal: number) => {
  const percentage = Number((decimal * 100).toFixed(2));
  return `${percentage}%`;
};
