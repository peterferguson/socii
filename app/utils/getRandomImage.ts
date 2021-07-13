import { randomLetter } from "./randomLetter";


export const getRandomImage = (letters = "") => {
  const baseUrl = "https://getstream.imgix.net/images/random_svg/";
  const extension = ".png";

  if (!letters) {
    letters = randomLetter() + randomLetter();
  }
  return `${baseUrl}${(letters.length > 2
    ? letters[0]
    : letters
  ).toUpperCase()}${extension}`;
};
