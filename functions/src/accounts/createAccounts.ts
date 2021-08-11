
import { logger } from "firebase-functions" 
import {firestore} from "../index.js"
import { 
    config, 
    AccountsApi, 
    AccountCreationObject,
    ACHRelationshipData,
} from "../alpaca/broker/client/ts/index"

export const createAccounts = async (user, username) => {
  logger.log("started creat accounts")
    let alpacaAccount;
    let achRelationship;
    const usernameStr:string = username

    try{
      // create an alpaca account
      const accountsClient = new AccountsApi(config)
      const testAccount = {
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
          given_name: (user.name).split(" ")[0], 
          family_name: (user.name).split(" ")[1]? (user.name).split(" ")[1] : "na",
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
            signed_at: "2020-09-11T18:09:33Z",
            ip_address: "185.13.21.99",
          },
          {
            agreement: "account_agreement",
            signed_at: "2020-09-11T18:13:44Z",
            ip_address: "185.13.21.99",
          },
          {
            agreement: "customer_agreement",
            signed_at: "2020-09-11T18:13:44Z",
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
        trusted_contact: {
          given_name: "Jame",
          family_name: "Doe",
          email_address: "jane.doe@example.com",
        },
      }
      alpacaAccount = await accountsClient.accountsPost(
        AccountCreationObject.from(testAccount)
      )
      logger.log("alpaca created ", alpacaAccount.id)
      // create ACH relationship
      const testACH = {
          accountOwnerName: user.name + " " + user.family_name,
          bankAccountType: "SAVINGS",
          bankAccountNumber: "32132231abc",
          bankRoutingNumber: "121000359",
          nickname: "FUNDING MONEY",
        }
      achRelationship = await accountsClient.postAchRelationships(
        alpacaAccount.id,
        ACHRelationshipData.from(testACH)
      )
      logger.log("ach created ", achRelationship.id)
      
      // create user in firebase
      const userRef = firestore.collection(`users`).doc(user.uid)
      logger.log("after userref", usernameStr)
      const usernameRef = firestore.collection(`usernames`).doc(usernameStr)
      logger.log("creating fb docs ")
      const batch = firestore.batch()
      batch.set(userRef, { 
        username: usernameStr, 
        alpacaAccountID: alpacaAccount.id, 
        alpacaACH: achRelationship.id },
        {merge: true}
      )
      batch.set(usernameRef, { uid: user.uid })
      batch.commit().then(() => {
          logger.log("User Created")
          return true
    })
    } catch (error){
      logger.error(error)
      return false
    }
}
