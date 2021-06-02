import { firestore, increment } from "./index.js"

// functions.firestore.document('collection/{documentUid}')
// .onWrite(

// ! This is going to be an incrementing function factory where we can increase/decrease
// ! a count in firestore. Returns a funtion that can be used in conjunction with a 
// ! document triggered cloud function. 

// TODO: Update the function to gather the document ref of the document listener

// const incrementFieldDocumentListener =
//   (docRef: string, countField: string) => (change, context) => {
//     const updateObject = {}

//     if (!change.before.exists) {
//       // New document Created : add one to count
//       updateObject[countField] = increment(1)
//     } else if (change.before.exists && change.after.exists) {
//       // Updating existing document : Do nothing
//       return
//     } else if (!change.after.exists) {
//       // Deleting document : subtract one from count
//       updateObject[countField] = increment(-1)
//     }

//     firestore.doc(docRef).update(updateObject)

//     return
//   }
