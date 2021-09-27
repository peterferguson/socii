import { Queue } from "quirrel/next"
import { config, FundingApi, TransferData } from "@socii/shared/alpaca/index"
import { arrayUnion, firestore } from "@lib/firebase/server/firebase-admin"
import dayjs from "dayjs"

/* 
  ! This NEEDS to run within 10 seconds!
*/

// TODO: move to firebase function

export default Queue("api/queues/funding", async (time: string) => {
  console.log(`Funding Accounts at ${time}`)

  const { failedCount, successCount, accountsWithMissingDetails, erroredTransfers } =
    await fundAccounts()

  if (successCount > 0)
    return console.log({
      message: `Completed ${successCount} transfers with ${failedCount} failed. `,
      accountsWithMissingDetails,
      erroredTransfers,
    })
  else
    return console.log({
      message: "Accounts Failed To Be Funded!",
      accountsWithMissingDetails,
    })
})

const fundAccounts = async () => {
  const oneMonthAgo = dayjs().subtract(1, "month")
  // - path: users/{uid}/funding/{groupName}
  console.log(
    `Getting accounts that were created between ${oneMonthAgo
      .subtract(1, "day")
      .toDate()} and ${oneMonthAgo.add(1, "day").toDate()}`
  )
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

  if (needsFunded.length === 0) {
    console.log("No Accounts Needed Funded!")
    return {
      failedCount: 0,
      successCount: 0,
      accountsWithMissingDetails: 0,
      erroredTransfers: 0,
    }
  }

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
    const totalAmount = accountsToFund[uid].reduce((acc, { amount }) => acc + amount, 0)
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
  }
  const failedCount = accountsWithMissingDetails.length + erroredTransfers.length
  const successCount = Object.keys(accountsToFund).length - failedCount

  return { failedCount, successCount, accountsWithMissingDetails, erroredTransfers }
}
