import { notion } from "@utils/notion"

export default async function (req, res) {
  try {
    await notion.pages.create({
      parent: { database_id: `${process.env.NOTION_INVITEE_DB}` },
      properties: {
        Email: {
          title: [
            {
              text: {
                content: `${req.body.email}`,
              },
            },
          ],
        },
        "Sign Up Date": {
          date: {
            start: new Date().toISOString(),
            end: null,
          },
        },
        "Is Invited": {
          select: {
            name: `${req.body.isInvited}`,
          },
        },
      },
    })
  } catch (err) {
    console.log("Error", err)
  }

  return res.status(200).json({ status: "success" })
}
