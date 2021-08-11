import { firestore } from "../firebase-admin";

// - Get the latest event_id from each events collection

export async function getLatestEventId(type: string): Promise<string> {
  const eventsRef = firestore.collection(`${type}Events`);
  const query = eventsRef.orderBy("event_id", "desc").limit(1);
  const eventDoc = (await query.get()).docs?.[0];
  return eventDoc.id;
}
