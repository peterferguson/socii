"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserData = void 0;
const index_1 = require("../index");
/*
 * Update user document at users/{uid} with passed data.
 * @param  {string} uid
 * @param  {any} data
 */
// TODO make generic for all userdata
const usernameUpdate = async (uid, updateData) => {
    var usernameRef = index_1.firestore.collection('usernames').where("uid", "==", uid).limit(1);
    let docData;
    usernameRef.get().then((snap) => {
        snap.forEach(async (doc) => {
            docData = doc.data();
            // saves to new username doc
            await index_1.firestore.collection('usernames').doc(updateData.username).set(docData);
            // deletes old doc
            await doc.ref.delete();
        });
    });
};
async function updateUserData(data, context) {
    const { uid, updateData } = data;
    const userRef = index_1.firestore.collection('users').doc(uid);
    if (Object.keys(updateData).includes("username"))
        (await usernameUpdate(uid, updateData));
    userRef.set({ ...updateData }, { merge: true });
    return { status: "success" };
}
exports.updateUserData = updateUserData;
//# sourceMappingURL=updateUserData.js.map