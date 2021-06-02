import {
  firestore,
  serverTimestamp,
  increment,
  HttpsError,
  arrayUnion,
} from "./index.js"

/**
 * HTTP Cloud Function to store a purchases data in firebase.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 *
 *                     Request body must include the following attributes:
 *                      executorRef: Firestore reference to the user or group which executed the trade,
 *                      assetRef:   Firestore reference (also gives assetType)
 *                      orderType:  This will be from a set of order types so should ensure it is within those too
 *                      price:      Purchase amount (assumed to be in GBP unless currency is passed explicitly)
 *                      shares:     Float defining proportion of asset aquired
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
const tradeToFirestore = async (req, res) => {
  const requiredArgs = {
    executorRef: null,
    assetRef: null,
    orderType: null,
    price: null,
    shares: null,
  }

  const optionalArgs = {
    executionCurrency: "GBP",
    assetType: "",
    shortName: "",
    tickerSymbol: "",
  }

  // * Check for default args and assign them if they exist else end function with 422
  if (!allKeysContainedIn(requiredArgs, req.body)) {
    res
      .status(422)
      .send(
        `Please ensure request has all of the following keys: ${JSON.stringify(
          Object.keys(requiredArgs)
        )}`
      )
    return
  }

  const assetRef = firestore.doc(req.body.assetRef)
  const assetData = await assetRef.get()

  requiredArgs.assetRef = assetRef
  optionalArgs.assetType = assetData.get("assetType")
  optionalArgs.shortName = assetData.get("shortName")
  optionalArgs.tickerSymbol = assetData.get("tickerSymbol")

  Object.keys(requiredArgs).map((key) => (requiredArgs[key] = req.body[key]))

  // * Add a new trade document with a generated id & update holdings
  const batch = firestore.batch()
  const tradeRef = await firestore
    .collection(`${requiredArgs.executorRef}/trades`)
    .doc()

  let tradeData = {
    ...optionalArgs,
    ...requiredArgs,
    timestamp: serverTimestamp(),
  }

  // * Update the holdings avgPrice & shares
  const holdingRef = firestore
    .collection(`${requiredArgs.executorRef}/holdings`)
    .doc(assetData.get("ISIN"))

  const negativeEquityMultiplier = requiredArgs.orderType.includes("BUY") ? 1 : -1

  // ! We keep holdings which have zero shares in order to easily identify all previous
  // ! holdings of the client without needing to count over trades. This is imposed in the
  // ! firestore rules.

  // ! On selling shares the cost basis is not affected & so only the shares is changed

  const sharesIncrement = negativeEquityMultiplier * requiredArgs.shares

  // * Check if the holding already exists
  const doc = await holdingRef.get()
  if (doc.exists) {
    const currentShares = doc.get("shares")
    const currentAvgPrice = doc.get("avgPrice")
    const newAvgPrice =
      negativeEquityMultiplier + 1
        ? (currentAvgPrice * currentShares + requiredArgs.price * requiredArgs.shares) /
          (currentShares + requiredArgs.shares)
        : currentAvgPrice

    // * Add profit to a sell trade on a current holding
    if (!(negativeEquityMultiplier + 1)) {
      tradeData["pnlPercentage"] =
        (100 * (requiredArgs.price - currentAvgPrice)) / currentAvgPrice
    }

    batch.update(holdingRef, {
      avgPrice: newAvgPrice,
      shares: increment(sharesIncrement),
      lastUpdated: serverTimestamp(),
    })
  } else {
    batch.set(holdingRef, {
      assetRef,
      avgPrice: requiredArgs.price / requiredArgs.shares,
      shares: increment(sharesIncrement),
      tickerSymbol: assetData.get("tickerSymbol"),
      shortName: assetData.get("shortName"),
      lastUpdated: serverTimestamp(),
    })
  }

  batch.set(tradeRef, tradeData)

  const batchResponse = await batch.commit()
  res.status(200).send(`Document written at: ${JSON.stringify(batchResponse)}`)
}

/*
- tradeSubmission
1. Verify that the data has been sent with all the correct keys
2. Add the trade to the trade collection in firestore properties include all of the above
2. and also a agreement list for each investor

- tradeConfirmation
1. Add the uid/username of the agreesToTrade array
2. Once trade is agreed (agreesToTrade.len() === investors.len()) then we can update 
2. holdings and send confirmation message with the price at which the asset was purchased
*/
const tradeSubmission = async (data, context) => {
  verifyUser(context)
  const args = await verifyContent(data, context)
  const { messageId } = data

  // * Create trade document
  const tradeRef = await firestore.collection(`${args.groupRef}/trades`).doc(messageId)

  tradeRef.set({
    ...args,
    agreesToTrade: [args.executorRef],
    timestamp: serverTimestamp(),
  })

  // * Store initial trade data
}

const tradeConfirmation = async (data, context) => {
  verifyUser(context)

  const { messageId } = data

  const groupRef = await firestore.collection(`${data.groupRef}`)
  const tradesRef = await firestore.collection(`${data.groupRef}/trades`).doc(messageId)

  const { cashBalance, investorCount } = await groupRef.get()
  const tradeData = await tradesRef.get()

  const ISIN = tradeData.assetRef.split("/")[-1]

  if (tradeData.agreesToTrade.length === investorCount - 1) {
    // ! Execute Trade
    // 1. Batch update holdings

    const holdingDocRef = firestore.collection(`${groupRef}/holdings`).doc(ISIN)
    const batch = firestore.batch()
    const { type, holdingData, updateTradeData } = await upsertHolding({
      holdingDocRef,
      tradeData,
    })

    switch (type) {
      case "update": {
        batch.update(holdingDocRef, holdingData)
      }
      case "set": {
        batch.set(holdingDocRef, holdingData)
      }
    }

    batch.update(tradesRef, {
      agreesToTrade: arrayUnion(context.auth.uid),
      ...updateTradeData,
    })

    await batch.commit()
    // 2. send a message with the finalised price
  } else {
    tradesRef.update({ agreesToTrade: arrayUnion(context.auth.uid) })
  }
}

/*
 * Helper Functions
 */

const upsertHolding = async ({ holdingDocRef, tradeData }) => {
  const { orderType, shares, price, assetRef, tickerSymbol, shortName } = tradeData

  // TODO: get latest price and execute as close as possible to the total number of
  // TODO: shares and cost based on the available cash of the group 
  // TODO: Ensure price is within a specificied range of the original price agreed
  // TODO: Allow this to be set as a group level setting

  const negativeEquityMultiplier = orderType.toLowerCase().includes("buy") ? 1 : -1

  // - Assumptions:
  // 1. We keep zero share holdings to easily identify all previous holdings.
  // ? Could this be imposed in the firestore rules.
  // 2: On selling shares the cost basis is not affected & so only the shares is changed

  const sharesIncrement = negativeEquityMultiplier * shares

  // * Check if the holding already exists
  const holding = await holdingDocRef.get()
  const outputData = { type: "", holdingData: {}, updateTradeData: {} }

  if (holding.exists) {
    const currentShares = holding.get("shares")
    const currentAvgPrice = holding.get("avgPrice")
    const newAvgPrice =
      negativeEquityMultiplier + 1
        ? (currentAvgPrice * currentShares + price * shares) / (currentShares + shares)
        : currentAvgPrice

    // * Add profit to a sell trade on a current holding
    if (!(negativeEquityMultiplier + 1)) {
      outputData.tradeData = {
        pnlPercentage: (100 * (price - currentAvgPrice)) / currentAvgPrice,
      }
    }

    outputData.type = "update"
    outputData.holdingData = {
      avgPrice: newAvgPrice,
      shares: increment(sharesIncrement),
      lastUpdated: serverTimestamp(),
    }
  } else {
    outputData.type = "set"

    outputData.holdingData = {
      assetRef,
      tickerSymbol,
      shortName,
      avgPrice: price / shares,
      shares: increment(sharesIncrement),
      lastUpdated: serverTimestamp(),
    }
  }
  return outputData
}

const verifyUser = (context) => {
  // * Checking that the user is authenticated.
  if (!context.auth) {
    throw new HttpsError(
      "failed-precondition",
      "This function must be called while authenticated."
    )
  }
}

const verifyContent = async (data, context) => {
  const requiredArgs = {
    groupRef: "",
    assetRef: "",
    orderType: "",
    price: 0,
    shares: 0,
    // This will allow us to track whether the trade has already been submitted
    // (until epheremal messages work). Also we can use a collectionGroup query
    // to find the particular trade in question for each message.
    messageId: "",
    //
    executionCurrency: "GBP",
    executorRef: context.auth.uid,
  }

  const optionalArgs = {
    assetType: "",
    shortName: "",
    tickerSymbol: "",
  }

  // * Check for default args and assign them if they exist
  if (!allKeysContainedIn(requiredArgs, data)) {
    throw new HttpsError(
      "invalid-argument",
      `Please ensure request has all of the following keys: ${JSON.stringify(
        Object.keys(requiredArgs)
      )}`
    )
  }

  const assetRef = firestore.doc(data.assetRef)
  const assetData = await assetRef.get()

  requiredArgs.assetRef = assetRef
  optionalArgs.assetType = assetData.get("assetType")
  optionalArgs.shortName = assetData.get("shortName")
  optionalArgs.tickerSymbol = assetData.get("tickerSymbol")

  // * Inject data into requiredArgs
  Object.keys(requiredArgs).map((key) => (requiredArgs[key] = data[key]))

  return { ...requiredArgs, ...optionalArgs }
}

const allKeysContainedIn = (object, other) => {
  let keys = null

  switch (typeof object) {
    case "object":
      if (Array.isArray(object)) {
        keys = object
      } else {
        keys = Object.keys(object)
      }
      break
  }

  // Ensure that the object has all of the keys in `other`
  return keys.every((key) => key in other)
}

module.exports = tradeToFirestore
