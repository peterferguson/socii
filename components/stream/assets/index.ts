export { ChannelInfoIcon } from "./ChannelInfoIcon";
export { ChannelSaveIcon } from "./ChannelSaveIcon";
export { CloseThreadIcon } from "./CloseThreadIcon";
export { XButton } from "./XButton";
export { XButtonBackground } from "./XButtonBackground";
import { getRandomImage } from "@utils/helper";

export const getCleanImage = (member) => {
  if (!member?.user.image) return getRandomImage();
  return member.user.image;
};
