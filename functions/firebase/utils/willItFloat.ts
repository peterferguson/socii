
export const willItFloat = (str: string): string | number => {
  const lettersRegex = /[a-zA-Z]/;
  if (lettersRegex.test(str))
    return str;
  const parsed = parseFloat(str);
  return isNaN(parsed) ? str : parsed;
};
