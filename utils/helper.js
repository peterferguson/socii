export const pnlColour = (pctChange) => {
  return pctChange > 0
    ? "bg-teal-200"
    : pctChange < 0
    ? "bg-red-200"
    : "bg-gray-200";
};

export const logoUrl = (isin) =>
  `https://storage.googleapis.com/sociiinvest.appspot.com/logos/${isin}.png`;

export const handleEnterKeyDown = (event, callback) => {
    if (event.key === 'Enter') {
      callback()
    }
  }