import firebase from "@lib/firebase"

// const getStripeRole = async () => {
//   await firebase.auth().currentUser.getIdToken(true);
//   const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
//   return decodedToken.claims.stripeRole || 'free';
// };

export const formatUser = async (user: firebase.User) => {
  // const token = await user.getIdToken(/* forceRefresh */ true);
  const decodedToken = await user.getIdTokenResult(/*forceRefresh*/ true)
  const { token, expirationTime } = decodedToken
  if (process.env.NODE_ENV !== "production") console.log(token)
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    token,
    expirationTime,
    // stripeRole: await getStripeRole(),
  }
}
