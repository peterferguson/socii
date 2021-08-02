import { firestore, serverTimestamp } from "./firebase-admin"

/*
!
! This file is for functions which perform CRUD operations on Firebase
! That occur only on the server.
!
*/

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
    console.log(`Storing event ${event_id}`)
    console.log(since_id)

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

// - Get the latest event_id from each events collection
export async function getLatestEventId(type: string): Promise<string> {
  const eventsRef = firestore.collection(`${type}Events`)
  const query = eventsRef.orderBy("event_id", "desc").limit(1)
  const eventDoc = (await query.get()).docs?.[0]
  return eventDoc.id
}
