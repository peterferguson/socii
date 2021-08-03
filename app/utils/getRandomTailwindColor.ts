import { getRandomArrayElement } from "./getRandomArrayElement";


export const getRandomTailwindColor = () => {
  const colors = [
    "blueGray",
    "trueGray",
    "teal",
    "emerald",
    "lightBlue",
    "orange",
    "lime",
    "pink",
  ];
  const range = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  return `${getRandomArrayElement(colors)}-${getRandomArrayElement(range)}`;
};
