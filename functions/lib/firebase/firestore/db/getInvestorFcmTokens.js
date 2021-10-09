"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvestorFcmTokens = void 0;
const index_1 = require("../../index");
async function getInvestorFcmTokens(groupName) {
    const investorRef = index_1.firestore.collection(`groups/${groupName}/investors`);
    const investorDocs = (await investorRef.get()).docs;
    const investorUids = investorDocs.map((doc) => doc.data().uid);
    return Promise.all(investorUids.map(async (uid) => (await index_1.firestore.doc(`users/${uid}`).get()).data().fcmToken));
}
exports.getInvestorFcmTokens = getInvestorFcmTokens;
//# sourceMappingURL=getInvestorFcmTokens.js.map