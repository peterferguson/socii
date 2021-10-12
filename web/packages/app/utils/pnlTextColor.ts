export const pnlTextColor = (pctChange: number): string => {
  return pctChange > 0
    ? "text-emerald-500"
    : pctChange < 0
    ? "text-red-500"
    : "text-gray-600"
}
