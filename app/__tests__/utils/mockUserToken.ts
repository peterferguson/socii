import { auth as serverAuth } from "@lib/firebase/server/firebase-admin"
import { auth as clientAuth } from "@lib/firebase/client/firebase"
import { signInWithCustomToken } from "firebase/auth"

const sociiUid = "LkYfEBGDGTZqvZavPVZnoss2V4M2"

export const mockUserToken = async () => {
  try {
    const customToken = await serverAuth.createCustomToken(sociiUid, {
      isAdmin: true,
    })

    const { user } = await signInWithCustomToken(clientAuth, customToken)
    return await user.getIdToken()
  } catch (err) {
    console.log(err)
    return
  }
}
