import { JournalsApi, config, JournalData } from "@alpaca/index"
import { ObjectSerializer } from "@alpaca/models/ObjectSerializer"
import { NextApiResponse, NextApiRequest } from "next"

const journalApi = new JournalsApi(config)

export async function handleJournal(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req
  switch (method) {
    case "GET":
      try {
        const { after, before, status, entryType, toAccountfromAccount } = body
        const getResponse = await journalApi.getJournals(
          after,
          before,
          status,
          entryType,
          toAccountfromAccount
        )
        res
          .status(200)
          .json(ObjectSerializer.deserialize(getResponse, "Array<JournalResource>", ""))
      } catch (error) {
        res.status(400).end(`Failed to get journal entries with error: ${error}`)
      }
      break
    case "POST":
      try {
        // const { entryType, fromAccount, toAccount, amount, symbol, qty } = body
        const journal: JournalData = JournalData.from(body)
        const postResponse = await journalApi.postJournals(journal)
        res
          .status(200)
          .json(ObjectSerializer.deserialize(postResponse, "JournalResource", ""))
      } catch (error) {
        res.status(400).end(`Failed to post journal entry with error: ${error}`)
      }
      break
    case "DELETE":
      try {
        const { journalId } = body
        const deleteResponse = await journalApi.deleteJournal(journalId)
        res.status(200).end(`Delete journal entry with id ${journalId}`)
      } catch (error) {
        res.status(400).end(`Failed to delete journal entry with error: ${error}`)
      }
      break

    default:
      break
  }
}
