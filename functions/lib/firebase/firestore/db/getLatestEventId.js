"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestEventId = void 0;
const index_1 = require("../../index");
// - Get the latest event_id from each events collection
async function getLatestEventId(type) {
    const eventsRef = index_1.firestore.collection(`${type}Events`);
    const query = eventsRef.orderBy("event_id", "desc").limit(1);
    const eventDoc = (await query.get()).docs?.[0];
    return eventDoc.id;
}
exports.getLatestEventId = getLatestEventId;
//# sourceMappingURL=getLatestEventId.js.map