import { doc, DocumentData, DocumentSnapshot, onSnapshot } from "firebase/firestore"
import { firestore } from "."

// TODO: Create typing for Trade object
export const subscribeToTrade = (
  groupName: string,
  tradeId: string,
  onNextCallback: (snapshot: DocumentSnapshot<DocumentData>) => void
) => {
  const unsubscribe = onSnapshot(
    doc(firestore, `groups/${groupName}/trades`, tradeId),
    onNextCallback
  )
  return unsubscribe
}
