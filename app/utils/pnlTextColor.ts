
export const pnlTextColor = (pctChange: number): string => {
  return pctChange > 0 ? "text-teal-300" : pctChange < 0 ? "text-red-300" : "text-brand";
};
