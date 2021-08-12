import { config, FundingApi, TransferData } from "@alpaca/index"
import { arrayUnion, firestore } from "@lib/firebase/server/firebase-admin"
import dayjs from "dayjs"
import { NextApiRequest, NextApiResponse } from "next"

/* 
  ! This NEEDS to run within 10 seconds!
*/

// TODO: move to firebase function

/*
 * Funds alpaca accounts based on the date of creation of a group.
 *
 * If a user has any groups that where created modulo one month of the current date,
 * their alpaca account will be funded with the total of all the groups subscriptions.
 *
 * This api route is called once a day at 7am utc by a cron job from the github action in
 * `.github/workflows/alpaca-fund.yaml`
 *
 * This function is very temporary and will be removed once the real functionality is
 * implemented. For many reasons, some examples:
 *
 * - The cron job in github actions must run ins under 30 seconds
 * - The code doesn't handle batches higher than 500 transactions a day
 *
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    headers: { authorization },
    method,
  } = req

  switch (method) {
    case "GET":
      try {
        if (authorization !== `Bearer ${process.env.NEXT_PUBLIC_FIREBASE_KEY}`) {
          res.status(401).json({ message: "The request is not authorized" })
          break
        }
        const oneMonthAgo = dayjs().subtract(1, "month")
        // - path: users/{uid}/funding/{groupName}
        const needsFunded = (
          await firestore
            .collectionGroup("funding")
            .where("startDate", ">", oneMonthAgo.subtract(1, "day").toDate())
            .where("startDate", "<", oneMonthAgo.add(1, "day").toDate())
            .get()
        ).docs.map((doc) => ({
          uid: doc.ref.path.split("/")[1],
          groupName: doc.id,
          amount: doc.data()?.subscriptionAmount,
        }))

        if (needsFunded.length === 0) res.status(200).end("No Accounts Needed Funded!")

        const accountsWithMissingDetails = []
        const erroredTransfers = []
        const fundClient = new FundingApi(
          config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
        )

        const accountsToFund = {}
        for (const { uid, ...rest } of needsFunded) {
          if (!(uid in accountsToFund)) accountsToFund[uid] = []
          accountsToFund[uid].push(rest)
        }

        console.log(`Funding ${Object.keys(accountsToFund).length} accounts`)

        const batch = firestore.batch()
        // FIXME: Handle batch getting larger than 500 entries
        for (const uid in accountsToFund) {
          const totalAmount = accountsToFund[uid].reduce(
            (acc, { amount }) => acc + amount,
            0
          )
          console.log(`Funding account with uid ${uid} with $${totalAmount}`)

          const userRef = firestore.doc(`users/${uid}`)
          const { alpacaAccountId, alpacaACH } = (await userRef.get()).data()

          if (!alpacaAccountId || !alpacaACH) {
            accountsWithMissingDetails.push(uid)
            continue
          }
          try {
            const postTransfer = await fundClient.postTransfers(
              alpacaAccountId,
              TransferData.from({
                transferType: "ach",
                relationshipId: alpacaACH,
                amount: totalAmount,
                direction: "INCOMING",
              })
            )

            for (const { groupName, amount } of accountsToFund[uid]) {
              batch.update(firestore.doc(`users/${uid}/funding/${groupName}`), {
                deposits: arrayUnion({
                  amount,
                  date: postTransfer.createdAt,
                  id: postTransfer.id,
                  direction: postTransfer.direction,
                }),
              })
            }
          } catch (error) {
            console.error(error)
            erroredTransfers.push(uid)
          }
          batch.commit()

          const failedCount =
            accountsWithMissingDetails.length + erroredTransfers.length
          const successCount = Object.keys(accountsToFund).length - failedCount
          
          if (successCount > 0)
            res.status(200).json({
              message: `Completed ${successCount} transfers with ${failedCount} failed. `,
              accountsWithMissingDetails,
              erroredTransfers,
            })
          else
            res.status(400).json({
              message: "Accounts Failed To Be Funded!",
              accountsWithMissingDetails,
            })
        }
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
      break
    default: {
      res.setHeader("Allow", "GET")
      res.status(405).json({ message: `Method ${method} Not Allowed` })
    }
  }
}
