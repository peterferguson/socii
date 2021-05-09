export { ChannelInfoIcon } from "./ChannelInfoIcon";
export { ChannelSaveIcon } from "./ChannelSaveIcon";
export { CloseThreadIcon } from "./CloseThreadIcon";
export { XButton } from "./XButton";
export { XButtonBackground } from "./XButtonBackground";

export const getRandomImage = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const firstInitial = alphabet[Math.floor(Math.random() * 26)].toUpperCase();
  const secondInitial = alphabet[Math.floor(Math.random() * 26)].toUpperCase();
  return `https://getstream.imgix.net/images/random_svg/${firstInitial}${secondInitial}.png`;
};

export const getCleanImage = (member) => {
  if (!member?.user.image) return getRandomImage();
  return member.user.image;
};
