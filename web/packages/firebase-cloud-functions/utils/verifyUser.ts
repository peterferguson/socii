import { HttpsError } from "../index.js";

export const verifyUser = (context: { auth: any; }) => {
  // * Checking that the user is authenticated.
  if (!context.auth) {
    throw new HttpsError(
      "failed-precondition",
      "This function must be called while authenticated."
    );
  }
};
