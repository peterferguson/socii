/**
 * Get first name from firebase user
 * @param  {string} displayName
 */

export const userFirstName = (displayName: string) => displayName.split(" ")?.[0] ?? ""
