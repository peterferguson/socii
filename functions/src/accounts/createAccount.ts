import { logger } from "firebase-functions"
import { firestore, UserInfo } from "../index.js"
import {
  AccountCreationObject,
  Account,
  AccountsApi,
  ACHRelationshipData,
  ACHRelationshipResource,
  config,
} from "../alpaca/broker/client/ts/index"

interface FirebaseUser extends UserInfo {
  provider: string
  emailVerified: boolean
  token: string
  expirationTime: string
  alpacaACH: string
  alpacaAccountId: string
}

export const createAccount = async (data, context) => {
  const { user, username } = data
  logger.log("started creating account")

  let alpacaAccountId: string, alpacaACH: string

  // - create an alpaca account
  try {
    const accountsClient = new AccountsApi(
      config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
    )

    const alpacaAccount = await accountsClient.accountsPost(
      AccountCreationObject.from(mockAlpacaAccountDetails(user))
    )
    logger.log("alpaca created: ", alpacaAccount.id)

    const achRelationship = await accountsClient.postAchRelationships(
      alpacaAccount.id,
      ACHRelationshipData.from(mockACHDetails(user))
    )
    logger.log("ach created: ", achRelationship.id)

    alpacaAccountId = alpacaAccount.id
    alpacaACH = achRelationship.id
  } catch (e) {
    logger.error("Failed to create Alpaca account")
    logger.error(e)
  }

  // - create user in firebase
  try {
    const userRef = firestore.collection(`users`).doc(user.uid)
    const usernameRef = firestore.collection(`usernames`).doc(username)

    logger.log("creating user & username docs ")
    const batch = firestore.batch()
    batch.set(
      userRef,
      {
        ...user,
        username,
        alpacaAccountId: alpacaAccountId || "",
        alpacaACH: alpacaACH || "",
      },
      { merge: true }
    )
    batch.set(usernameRef, { uid: user.uid })
    await batch.commit()
    logger.log(`User created for ${user.displayName}`)
    logger.log(`uid: ${user.uid}`)
    logger.log(`username: ${username}`)

    return { status: "success", message: `Welcome ${username}!` }
  } catch (error) {
    logger.error(error)
    return { status: "error", message: error.message }
  }
}

const mockAlpacaAccountDetails = (user: FirebaseUser) => ({
  contact: {
    email_address: user.email,
    phone_number: "+442137981999",
    street_address: ["123 Social Drive"],
    city: "Belfast",
    state: "",
    postal_code: "BT00AA",
    country: "GBR",
  },
  identity: {
    given_name: user.displayName.split(" ")[0],
    family_name: user.displayName.split(" ")[1] || "N/A",
    date_of_birth: "1995-01-07",
    tax_id: "AA123456C",
    tax_id_type: "GBR_NINO",
    country_of_citizenship: "GBR",
    country_of_birth: "GBR",
    country_of_tax_residence: "GBR",
    funding_source: ["employment_income"],
  },
  disclosures: {
    is_control_person: false,
    is_affiliated_exchange_or_finra: false,
    is_politically_exposed: false,
    immediate_family_exposed: false,
  },
  agreements: [
    {
      agreement: "margin_agreement",
      signed_at: new Date().toISOString(),
      ip_address: "185.13.21.99",
    },
    {
      agreement: "account_agreement",
      signed_at: new Date().toISOString(),
      ip_address: "185.13.21.99",
    },
    {
      agreement: "customer_agreement",
      signed_at: new Date().toISOString(),
      ip_address: "185.13.21.99",
    },
  ],
  documents: [
    {
      document_type: "cip_result",
      content: "VGhlcmUgYXJlIG5vIHdpbGQgYWxwYWNhcy4=",
      mime_type: "application/pdf",
    },
    {
      document_type: "identity_verification",
      document_sub_type: "passport",
      content: "QWxwYWNhcyBjYW5ub3QgbGl2ZSBhbG9uZS4=",
      mime_type: "image/jpeg",
    },
  ],
})

const mockACHDetails = (user: FirebaseUser) => ({
  accountOwnerName: user.displayName,
  bankAccountType: "SAVINGS",
  bankAccountNumber: "32132231abc",
  bankRoutingNumber: "121000359",
  nickname: "FUNDING MONEY",
})
