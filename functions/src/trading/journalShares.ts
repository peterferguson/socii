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
  data: { agreesToTrade?: []; qty?: any; direction?: string; symbol?: string},
  context?: any
) => {
  const { agreesToTrade, qty , direction, symbol} = data

  const journalQty = qty / agreesToTrade.length
  const ALPACA_FIRM_ACCOUNT = process.env.ALPACA_FIRM_ACCOUNT

  // default values to journal from firm to accounts (in case of BUY)
  let alpacaId = ""
  let fromAccount = ALPACA_FIRM_ACCOUNT
  let toAccount = alpacaId

  // if shares should be moved from accounts to firm (in case of SELL)
  if(direction=="toFirm"){
    fromAccount = alpacaId
    toAccount = ALPACA_FIRM_ACCOUNT
  }

  for (let item in agreesToTrade) {
    ////////////
    // TODO replace this section by directly including the alpadaID of each user who agrees to trade
    // this should be done in tradeSubmission and InvestmentConfirmatioAttachement files
    let tmpUid = item.split("/")[1]

    await firestore
      .collection(`users`)
      .doc(tmpUid)
      .get()
      .then((doc) => {
        alpacaId = doc.data().alpacaID
      })
    ////////////

    const journal = await JournalData.from({
      entry_type: "JNLS",
      from_account: fromAccount,
      to_account: toAccount,
      qty: journalQty,
      symbol: symbol
    })

    journals.postJournals(journal).then(console.log).catch(console.error)
  }
}
