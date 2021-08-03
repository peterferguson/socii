import FirebaseUser from "@models/FirebaseUser";

/**
 * Get first name from firebase user
 * @param  {string} ticker
 */

export const userFirstName = (user: FirebaseUser) => user?.displayName?.split(" ")?.[0] ?? "";
