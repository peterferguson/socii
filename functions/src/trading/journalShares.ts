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
import {firestore,} from "../index.js"
import { config, JournalData, JournalsApi } from "../alpaca/broker/client/ts/index"

const journals = new JournalsApi(config)

export const journalShares = async (
    data: {agreesToTrade?: [] ; qty?: any},
    context?: any
    ) => {

    const {agreesToTrade, qty} = data

    const journalQty = qty / agreesToTrade.length
    // TODO replace with config var when Socii Test Broker shared
    const ALPACA_FIRM_ACCOUNT = "83af97bb-aa1b-37cd-9807-f76eec49fd1c"

    for (var item in agreesToTrade){

        ////////////
        // TODO replace this section by directly including the alpadaID of each user who agrees to trade
        // this should be done in tradeSubmission and InvestmentConfirmatioAttachement files
        var tmpUid = item.split("/")[1]

        var alpacaID = await firestore
          .collection(`users`).doc(tmpUid).get()
          .then((doc) => {doc.data().alpacaID})
        ////////////

        const journal = await JournalData.from({
          entry_type: "JNLS",
          from_account: ALPACA_FIRM_ACCOUNT,
          to_account: alpacaID,
          amount: journalQty,
        })

        journals.postJournals(journal).then(console.log).catch(console.error)
    }


    }