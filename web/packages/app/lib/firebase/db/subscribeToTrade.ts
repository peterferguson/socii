import { doc, DocumentData, DocumentSnapshot, onSnapshot } from "firebase/firestore"
import { db } from ".."

// TODO: Create typing for Trade object
export const subscribeToTrade = (
  groupName: string,
  tradeId: string,
  onNextCallback: (snapshot: DocumentSnapshot<DocumentData>) => void
) => {
  const unsubscribe = onSnapshot(
    doc(db, `groups/${groupName}/trades`, tradeId),
    onNextCallback
  )
  return unsubscribe
}
