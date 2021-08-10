import { logger } from "firebase-functions" 
import { error } from "firebase-functions/lib/logger"
import {
  firestore,
  serverTimestamp,
  increment,
  arrayUnion,
} from "../index.js"
import {
  singleLineTemplateString,
  iexClient,
  streamClient,
  currencySymbols,
} from "../utils/helper.js"
import { 
  config, 
  TradingApi, 
  CreateOrder 
} from "../alpaca/broker/client/ts/index"
import { updateHolding } from "./updateHolding.js"
import { journalShares } from "./journalShares.js"

/*
- tradeConfirmation
1. Add the uid/username/alpacaID of the agreesToTrade array
2. Once trade is agreed (agreesToTrade.len() === investors.len()) then we can update 
2. holdings and send confirmation message with the price at which the asset was purchased 
*/

export const tradeConfirmation = async (change, context) => {
      // - document at groups/{groupName}/trades/{messageId} 
      const { groupName, messageId } = context.params
      const tradeData = await change.after.data()

      // TODO add executed = pending to all orders as they are sent..
      // can be: success, pending, failed
      if (tradeData.executionStatus!=="pending") return  // - do nothing
    
    
      const tradeClient = new TradingApi(config)
      const ALPACA_FIRM_ACCOUNT = process.env.ALPACA_FIRM_ACCOUNT
    
      const groupRef = await firestore.collection("groups").doc(groupName)
      let { cashBalance, investorCount } = (await groupRef.get()).data()
    
      const ISIN = tradeData.assetRef.split("/").pop()
      tradeData.assetRef = firestore.doc(tradeData.assetRef)
     
      ////////// TODO reinstate this when testing in hours
    // //   const { latestPrice, isUSMarketOpen } = await iexClient.quote(
    // //     tradeData.tickerSymbol,
    // //     {
    // //       filter: "latestPrice,isUSMarketOpen",
    // //     }
    // //   )
    const latestPrice = 713.20
    logger.log("latest", latestPrice, "and price: ",tradeData.price)
    //   // // // - do nothing if market is closed
    //   // if (!isUSMarketOpen) {
    //   //   // 2. send a message with the finalised price
    //   //   const channel = streamClient.channel("messaging", groupName)
    //   //   await channel.sendMessage(await marketClosedMessage(tradeData.assetRef))
    //   //   return
    //   // }
    ///////// TODO reinstate this


      // TODO: Fix price checking
      // ! Now asset price & currency is available along with cost & execution currency this should be simple
      // ! As stated below I think this should be a client-side check though
    
      if (tradeData.qty * latestPrice > cashBalance && !isSell(tradeData.type)) {
        // - Accept a smaller share amount if the cashBalance gets us close to the original share amount
        // - A small variation should be somewhat enforced on the client-side.
        // - Assuming no massive jump in stock price.
        // TODO: Implement a client-side check on the cost vs cashBalance.
        // TODO: Need to distinguish shares bought by cost & those by share amount
    
        tradeData.qty = (cashBalance / latestPrice) * 0.975
    
        // - drop share amount to within 2.5% of total cashBalance.
        // ! This is arbitrary & maybe be another threshold decided upon by the group.
        // TODO: Create a group settings page which lists the thresholds that can be tinkered
      }
    
      if (
        (latestPrice - tradeData.price) / tradeData.price > 0.025 &&
        !isSell(tradeData.type)
      ) {
        logger.log(`The price has risen more than 2.5% since the price was agreed`)
        /* 
         ! Add user setting to allow for an acceptable price variation between latestPrice and 
         ! agreed price (tradeData.price).
         *
         *
         * Possible failure mechanisms/things to think aboout if this fails
         1. If this fails we may need to send a new message warning the group of the new price.
         ?. This may be too slow for a highly beta stock. Imagine GME or any squeeze
         2. Allowing a user an option to set a new threshold on each purchase if it is high beta
         */
      } else {
        tradeData.price = latestPrice
      }
    
      if (investorCount == 1 || tradeData.agreesToTrade.length === investorCount - 1) {
        // ! Execute Trade
    
        logger.log(    
            ALPACA_FIRM_ACCOUNT,           
            tradeData.symbol,
             tradeData.side,
             tradeData.timeInForce,
             tradeData.qty,
             tradeData.type,
             tradeData.price,
             tradeData.messageId,
             tradeData.executionStatus,)

        try{
          //breakdown message into alpaca form and send to broker
          var postOrder = await tradeClient.postOrders(
            ALPACA_FIRM_ACCOUNT,
            CreateOrder.from({
              symbol: tradeData.symbol,
              side: tradeData.side,
              timeInForce: tradeData.timeInForce,
              qty: tradeData.qty,
              type: tradeData.type,
              limitPrice: tradeData.limitPrice ? tradeData.limitPrice : null ,
              client_order_id: `${groupName}|${tradeData.messageId}`
            })
          )
          const determineStatus =(responseStatus) => {
            const status = ["cancelled" , "expired" , "rejected" ,"suspended" ].includes(responseStatus) ? "failed" :
                            ["new", "done_for_day", "pending_cancel", "pending_replace",  "pending_new", "accepted_for_bidding", "stopped", "calculated", "accepted", "replaced" ].includes(responseStatus) ? "pending" :
                             ["filled" ].includes(responseStatus) ? "success" : null
                return status
            }
          var executionStatus = determineStatus(postOrder.status)
        }
        catch (err) {
            logger.log(error(err))
            executionStatus = "failed"
        }  
        
        const channel = streamClient.channel("messaging", groupName)

          // TODO
          // - maybe the below is heavy on wirtes?
          // writing to the holding ref when pending then updating a field when executed
          // could be reduced by just writing when success, but may lose info

          switch (executionStatus) {
            case "success":
              // 1. Batch update holdings.
              // if profit was set for a sell, update the document with the returned value
              const updateInformation = await updateHolding({groupName, messageId , tradeData, executionStatus})
              const tradeUpdateInfo = updateInformation.pnlPercentage? updateInformation: {executionStatus: "failed"}
              
              // 2. Send a message with the finalised price
              await channel.sendMessage(investmentReceiptMML(tradeData))
              
              // 3. Journal funds to individual alpaca accounts for holding
              journalShares(tradeData.agreesToTrade, tradeData.qty)

              return change.after.ref.update(tradeUpdateInfo)
              break
    
            case "pending":
              // 1. Withold balance or shares until pending order is resolved 
              if(tradeData.side=="buy"){
              groupRef.update({ cashBalance: cashBalance - tradeData.qty * latestPrice })}
              if(tradeData.side=="sell"){
                const holdingDocRef = firestore.collection(`groups/${groupName}/holdings`).doc(ISIN)
                const holdingDataShares = (await holdingDocRef.get()).data().shares
                holdingDocRef.update({shares: holdingDataShares - tradeData.qty})
              }
              // 3. send a message to inform about pending order
              // TODO display more useful message  
              await channel.sendMessage(investmentPendingMML(tradeData))
              break

            case "failed":
              await channel.sendMessage(investmentFailedMML(tradeData))
              return change.after.ref.update({executionStatus: "failed"})
              break
            // - Catch all commands sent by user not by action
            default:
              // - Error on missing command args
    
          }
    
        }

    }
    
    /*
     * Helper Functions
     */
    
    const investmentReceiptMML = (tradeData) => {
      const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`
      const mmlmessage = {
        user_id: "socii",
        text: singleLineTemplateString`
        ${tradeData.qty} shares of $${tradeData.symbol} ${
          isSell(tradeData.side) ? "sold" : "purchased"
        } for ${currencySymbols[tradeData.assetCurrency]}${tradeData.price} per share.
        For a cost of ${currencySymbols[tradeData.executionCurrency]}${tradeData.price}
        `,
        attachments: [
          {
            type: "receipt",
            mml: mmlstring,
            tickerSymbol: tradeData.symbol,
          },
        ],
      }
      return mmlmessage
    }
    const investmentPendingMML = (tradeData) => {
      const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`
      const mmlmessage = {
        user_id: "socii",
        text: singleLineTemplateString`
        ${tradeData.qty} shares of $${tradeData.symbol} ${
          isSell(tradeData.side) ? "sale" : "purchase"
        } for ${currencySymbols[tradeData.assetCurrency]}${tradeData.price} per share.
        For a cost of ${currencySymbols[tradeData.executionCurrency]}${tradeData.price} IS PENDING
        `,
        attachments: [
          {
            type: "receipt",
            mml: mmlstring,
            tickerSymbol: tradeData.symbol,
          },
        ],
      }
      return mmlmessage
    }
    const investmentFailedMML = (tradeData) => {
      const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`
      const mmlmessage = {
        user_id: "socii",
        text: singleLineTemplateString`
        ${tradeData.qty} shares of $${tradeData.symbol} ${
          isSell(tradeData.side) ? "sale" : "purchase"
        } has failed and will not be executed
        `,
        attachments: [
          {
            type: "receipt",
            mml: mmlstring,
            tickerSymbol: tradeData.symbol,
          },
        ],
      }
      return mmlmessage
    }
    
    const marketClosedMessage = async (assetRef) => {
      const assetData = await (await assetRef.get()).data()
      return {
        user_id: "socii",
        text: singleLineTemplateString`
        Sorry the ${assetData.exchange} is not currently open!
        `,
      }
    }
    
    const isSell = (orderType) => orderType.toLowerCase().includes("sell")
    
    