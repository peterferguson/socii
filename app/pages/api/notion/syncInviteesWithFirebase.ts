import { notion } from "@utils/notion"
import { serverTimestamp, firestore } from "@lib/firebase/server/firebase-admin"

// ! The task of inviting users falls to bis dev.
// ! So we will keep notion as the source of truth.

export default async function (req, res) {
  try {
    const db = await notion.databases.query({
      database_id: `${process.env.NOTION_INVITEE_DB}`,
    })
    const invitees = db.results.map(notionInviteesToFirebaseSchema)
    await Promise.all(invitees.map(notionInviteesToFirebase))
    res.status(200).json({ status: "success" })
  } catch (err) {
    console.log("Error", err)
    res.status(400).json({ status: "failed", data: err })
  }
}

// - param is `Page` from notion. Causing type issues but code works.
const notionInviteesToFirebaseSchema = ({
  properties,
  created_time,
  last_edited_time,
  url,
}) => ({
  id: url.split("/").pop(),
  lastEditTime: last_edited_time,
  createdTime: created_time,
  isInvited: properties["Is Invited"].select.name === "yes",
  email: properties["Email"].title.pop().plain_text,
})

const notionInviteesToFirebase = ({
  id,
  lastEditTime,
  createdTime,
  isInvited,
  email,
}) => {
  const inviteeRef = firestore.doc(`invitees/${id}`)

  return inviteeRef.set(
    {
      lastEditTime,
      createdTime,
      isInvited,
      email,
      lastSynced: serverTimestamp(),
    },
    { merge: true }
  )
}
