
export const pnlTextColor = (pctChange: number): string => {
  return pctChange > 0 ? "text-teal-200" : pctChange < 0 ? "text-red-200" : "text-brand";
};
