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

import { logger } from "firebase-functions"
import { config, JournalData, JournalsApi } from "../alpaca/broker/client/ts/index"
import { functionConfig } from "../index.js"


export const journalShares = async (
  data: { agreesToTrade?: []; qty?: any; direction?: string; symbol?: string},
  context?: any
) => {

  const journals = new JournalsApi(
    config(functionConfig.alpaca.key, functionConfig.alpaca.secret)
  )

  logger.log("journal data" , data)
  const { agreesToTrade, qty , direction, symbol} = data
  const journalQty = qty / agreesToTrade.length
  const ALPACA_FIRM_ACCOUNT = functionConfig.alpaca.firm_account

  // default values to journal from firm to accounts (in case of BUY)
  let alpacaId = ""
  let fromAccount = ALPACA_FIRM_ACCOUNT
  let toAccount = alpacaId

  // if shares should be moved from accounts to firm (in case of SELL)
  if(direction=="toFirm"){
    fromAccount = alpacaId
    toAccount = ALPACA_FIRM_ACCOUNT
  }

  for (let item of agreesToTrade) {

    let alpacaId = String(item).split("/")[2]

    const journal = await JournalData.from({
      entry_type: "JNLS",
      from_account: fromAccount,
      to_account: alpacaId,
      qty: journalQty,
      symbol: symbol
    })

    journals.postJournals(journal).then(console.log)
    
  }
  return
}
