
export const getInitials = (slug: string) => {
  return slug
    ?.split(" ")
    .map((word: string) => word?.[0])
    .join("");
};
