import { getRandomImage } from "./getRandomImage";


export const getCleanImage = (member: { user: { image: any; }; }) => {
  if (!member?.user.image)
    return getRandomImage();
  return member.user.image;
};
