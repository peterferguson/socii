const admin = require("firebase-admin");
const serviceAccount = require("/Users/peter/Projects/socii/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Helper prototype methods for checking http request constraints
const allKeysContainedIn = (object, other) => {
  var keys = null;

  switch (typeof object) {
    case "object":
      if (Array.isArray(object)) {
        keys = object;
      } else {
        keys = Object.keys(object);
      }
      break;
  }

  // Ensure that the object has all of the keys in `other`
  return keys.every((key) => key in other);
};

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
  const firestore = admin.firestore();

  const requiredArgs = {
    executorRef: null,
    assetRef: null,
    orderType: null,
    price: null,
    shares: null,
  };

  const optionalArgs = {
    executionCurrency: "GBP",
    assetType: "",
    shortName: "",
    tickerSymbol: "",
  };

  // * Check for default args and assign them if they exist else end function with 422
  if (!allKeysContainedIn(requiredArgs, req.body)) {
    res
      .status(422)
      .send(
        `Please ensure request has all of the following keys: ${JSON.stringify(
          Object.keys(requiredArgs)
        )}`
      );
    return;
  }

  const assetRef = firestore.doc(req.body.assetRef);
  const assetData = await assetRef.get();

  requiredArgs.assetRef = assetRef;
  optionalArgs.assetType = assetData.get("assetType");
  optionalArgs.shortName = assetData.get("shortName");
  optionalArgs.tickerSymbol = assetData.get("tickerSymbol");

  Object.keys(requiredArgs).map((key) => (requiredArgs[key] = req.body[key]));

  // * Add a new trade document with a generated id & update holdings
  const batch = firestore.batch();
  const tradeRef = await firestore
    .collection(`${requiredArgs.executorRef}/trades`)
    .doc();

  var tradeData = {
    ...optionalArgs,
    ...requiredArgs,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };

  // * Update the holdings avgPrice & shares
  const holdingRef = firestore
    .collection(`${requiredArgs.executorRef}/holdings`)
    .doc(assetData.get("ISIN"));

  const negativeEquityMultiplier = requiredArgs.orderType.includes("BUY")
    ? 1
    : -1;

  // ! We keep holdings which have zero shares in order to easily identify all previous
  // ! holdings of the client without needing to count over trades. This is imposed in the
  // ! firestore rules.

  // ! On selling shares the cost basis is not affected & so only the shares is changed

  const sharesIncrement = negativeEquityMultiplier * requiredArgs.shares;

  // * Check if the holding already exists
  const doc = await holdingRef.get();
  if (doc.exists) {
    const currentShares = doc.get("shares");
    const currentAvgPrice = doc.get("avgPrice");
    const newAvgPrice =
      negativeEquityMultiplier + 1
        ? (currentAvgPrice * currentShares +
            requiredArgs.price * requiredArgs.shares) /
          (currentShares + requiredArgs.shares)
        : currentAvgPrice;

    // * Add profit to a sell trade on a current holding
    if (!(negativeEquityMultiplier + 1)) {
      tradeData["pnlPercentage"] =
        (100 * (requiredArgs.price - currentAvgPrice)) / currentAvgPrice;
    }

    batch.update(holdingRef, {
      avgPrice: newAvgPrice,
      shares: admin.firestore.FieldValue.increment(sharesIncrement),
      lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
    });
  } else {
    // functions.logger.log("Adding a new holding!");
    batch.set(holdingRef, {
      assetRef,
      avgPrice: requiredArgs.price / requiredArgs.shares,
      shares: admin.firestore.FieldValue.increment(sharesIncrement),
      shortName: assetData.get("shortName"),
      lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  batch.set(tradeRef, tradeData);

  const batchResponse = await batch.commit();
  res.status(200).send(`Document written at: ${JSON.stringify(batchResponse)}`);
};

module.exports = tradeToFirestore;
