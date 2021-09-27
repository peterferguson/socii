import { firestore } from "."
import { doc, getDoc } from "firebase/firestore"

export async function getInvestorsPhotos(groupMembers: string[]): Promise<string[]> {

  const docRefs = groupMembers.map((uid)=> doc(firestore, `users/${uid}` ))
  const docDatas = docRefs.map((d)=> getDoc(d) )
  const res = Promise.all(
    docDatas.map(async (r)=> (await r).data().photoUrl)
  )
  return  await res
}
