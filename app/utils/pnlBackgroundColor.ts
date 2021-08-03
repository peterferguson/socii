
export const pnlBackgroundColor = (pctChange: string | number) => {
  return pctChange > 0 ? "bg-teal-200" : pctChange < 0 ? "bg-red-200" : "bg-gray-200";
};
