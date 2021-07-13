
export const getInitials = (slug: string) => {
  return slug
    ?.split(" ")
    .map((word: any[]) => word?.[0])
    .join("");
};
