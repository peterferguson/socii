import { firestore } from "../../../index"
import { serverTimestamp } from "../index"

export async function storeEvents(
  eventType: string,
  eventData: string,
  since_id?: number
) {
  const eventsRef = firestore.collection(`${eventType}Events`)

  const events = eventData
    .split("\n")
    .slice(1)
    .filter((e) => e !== "")
    .map((e) => JSON.parse(e.slice(6)))

  // - store in event log
  let batch = firestore.batch()
  for (const [i, event] of events.entries()) {
    if ((i + 1) % 500 === 0) {
      // - commit every 500 events
      await batch.commit()
      batch = firestore.batch()
    }
    const event_id = event.event_id

    if (since_id == event_id) continue
    const docRef = eventsRef.doc(event.event_id.toString())
    batch.set(docRef, {
      type: eventType,
      ...event,
      insertTimestamp: serverTimestamp(),
    })
  }

  await batch.commit()
}
