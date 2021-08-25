import { User } from "firebase/auth"

// const getStripeRole = async () => {
//   await firebase.auth().currentUser.getIdToken(true);
//   const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
//   return decodedToken.claims.stripeRole || 'free';
// };

export const formatUser = async (user: User) => {
  const decodedToken = await user.getIdTokenResult()
  const { token, expirationTime } = decodedToken
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    providerId: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    token,
    expirationTime,
    // stripeRole: await getStripeRole(),
  }
}
