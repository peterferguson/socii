import { firestore } from "../../index"

export async function getInvestorFcmTokens(groupName: string): Promise<string[]> {
  const investorRef = firestore.collection(`groups/${groupName}/investors`)
  const investorDocs = (await investorRef.get()).docs

  const investorUids = investorDocs.map((doc) => doc.data().uid)

  return Promise.all(
    investorUids.map(
      async (uid) => (await firestore.doc(`users/${uid}`).get()).data().fcmToken
    )
  )
}
