"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeEvents = void 0;
const index_1 = require("../../index");
const index_2 = require("../index");
async function storeEvents(eventType, eventData, since_id) {
    const eventsRef = index_1.firestore.collection(`${eventType}Events`);
    const events = eventData
        .split("\n")
        .slice(1)
        .filter((e) => e !== "")
        .map((e) => JSON.parse(e.slice(6)));
    // - store in event log
    let batch = index_1.firestore.batch();
    for (const [i, event] of events.entries()) {
        if ((i + 1) % 500 === 0) {
            // - commit every 500 events
            await batch.commit();
            batch = index_1.firestore.batch();
        }
        const event_id = event.event_id;
        if (since_id == event_id)
            continue;
        const docRef = eventsRef.doc(event.event_id.toString());
        batch.set(docRef, {
            type: eventType,
            ...event,
            insertTimestamp: index_2.serverTimestamp(),
        });
    }
    await batch.commit();
}
exports.storeEvents = storeEvents;
//# sourceMappingURL=storeEvents.js.map