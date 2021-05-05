export { ChannelInfoIcon } from "./ChannelInfoIcon";
export { ChannelSaveIcon } from "./ChannelSaveIcon";
export { CloseThreadIcon } from "./CloseThreadIcon";
export { CommandIcon } from "./CommandIcon";
export { CreateChannelIcon } from "./CreateChannelIcon";
export { EmojiIcon } from "./EmojiIcon";
export { HamburgerIcon } from "./HamburgerIcon";
export { LightningBoltSmall } from "./LightningBoltSmall";
export { SendIcon } from "./SendIcon";
export { XButton } from "./XButton";
export { XButtonBackground } from "./XButtonBackground";

export const getRandomImage = () => {
  alphabet = "abcdefghijklmnopqrstuvwxyz";
  const firstInitial = alphabet[Math.floor(Math.random() * 26)].toUpperCase();
  const secondInitial = alphabet[Math.floor(Math.random() * 26)].toUpperCase();
  return `https://getstream.imgix.net/images/random_svg/${firstInitial}${secondInitial}.png`;
};

export const getCleanImage = (member) => {
  if (!member?.user.image) return getRandomImage();
  return member.user.image;
};
