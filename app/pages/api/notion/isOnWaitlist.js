import { notion } from "@utils/notion"

export default async function (req, res) {
  try {
    const queryResponse = await notion.databases.query({
      database_id: `${process.env.NOTION_INVITEE_DB}`,
      filter: {
        property: "Email",
        text: {
          equals: req.query.email,
        },
      },
    })
    const { results } = queryResponse
    if (results.length > 0) return res.status(200).json({ isOnWaitlist: true })
    return res.status(200).json({ isOnWaitlist: false })
  } catch (err) {
    console.log("Error", err)
    return res.status(500).json({ message: err.message })
  }
}
