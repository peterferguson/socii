import { firestore } from "."
import { collection, getDocs } from "firebase/firestore"

export async function getInvestorsUIDs(groupName: string): Promise<string[]> {
  const investorRef = collection(firestore, `groups/${groupName}/investors`)
  const investorDocs = (await getDocs(investorRef)).docs

  return Promise.all(
    investorDocs.map(
      async (doc) => doc.data().uid
    )
  )
}
