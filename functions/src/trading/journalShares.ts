/*
 * Called after trade is filled and holding is updated:
 *  Transfers the shares to the individual alpaca accounts
 *
 *
 *
 * @param data
 * @param context
 * @returns
 */

import { config, JournalData, JournalsApi } from "../alpaca/broker/client/ts/index"
import { firestore } from "../index.js"

const journals = new JournalsApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

export const journalShares = async (
  data: { agreesToTrade?: []; qty?: any },
  context?: any
) => {
  const { agreesToTrade, qty } = data

  const journalQty = qty / agreesToTrade.length

  for (let item in agreesToTrade) {
    ////////////
    // TODO replace this section by directly including the alpadaID of each user who agrees to trade
    // this should be done in tradeSubmission and InvestmentConfirmatioAttachement files
    let tmpUid = item.split("/")[1]

    let alpacaID = await firestore
      .collection(`users`)
      .doc(tmpUid)
      .get()
      .then((doc) => {
        doc.data().alpacaID
      })
    ////////////

    const journal = await JournalData.from({
      entry_type: "JNLS",
      from_account: process.env.ALPACA_FIRM_ACCOUNT,
      to_account: alpacaID,
      amount: journalQty,
    })

    journals.postJournals(journal).then(console.log).catch(console.error)
  }
}
