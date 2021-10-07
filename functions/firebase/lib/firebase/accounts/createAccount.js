"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = void 0;
const firebase_functions_1 = require("firebase-functions");
const index_js_1 = require("../../shared/alpaca/index.js");
const index_js_2 = require("../index.js");
const createAccount = async (data, context) => {
    const { user, username } = data;
    firebase_functions_1.logger.log("started creating account");
    let alpacaAccountId, alpacaACH;
    const accountsClient = new index_js_1.AccountsApi(index_js_1.config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET));
    // - create an alpaca account
    try {
        const alpacaAccount = await accountsClient.accountsPost(index_js_1.AccountCreationObject.from(mockAlpacaAccountDetails(user)));
        firebase_functions_1.logger.log("alpaca created: ", alpacaAccount.id);
        const achRelationship = await accountsClient.postAchRelationships(alpacaAccount.id, index_js_1.ACHRelationshipData.from(mockACHDetails(user)));
        firebase_functions_1.logger.log("ach created: ", achRelationship.id);
        alpacaAccountId = alpacaAccount.id;
        alpacaACH = achRelationship.id;
    }
    catch (error) {
        firebase_functions_1.logger.error("Failed to create Alpaca account: ", error);
        if (error?.code === 409) {
            try {
                firebase_functions_1.logger.error("Searching for user from alpaca based on email");
                const alpacaUser = (await accountsClient.accountsGet(user.email)).pop();
                if (alpacaUser) {
                    firebase_functions_1.logger.log("Found user in alpaca");
                    alpacaAccountId = alpacaUser.id;
                    firebase_functions_1.logger.log("Getting ACH relationship");
                    const achRelationship = (await accountsClient.getAchRelationships(alpacaAccountId, "APPROVED")).pop();
                    if (achRelationship) {
                        firebase_functions_1.logger.log("Found ACH relationship");
                        alpacaACH = achRelationship.id;
                    }
                }
            }
            catch (error) {
                firebase_functions_1.logger.error("Failed to find Alpaca account: ", error);
            }
        }
    }
    // - create user in firebase
    try {
        const userRef = index_js_2.firestore.collection(`users`).doc(user.uid);
        const usernameRef = index_js_2.firestore.collection(`usernames`).doc(username);
        firebase_functions_1.logger.log("creating user & username docs ");
        const batch = index_js_2.firestore.batch();
        batch.set(userRef, {
            ...user,
            username,
            alpacaAccountId: alpacaAccountId || "",
            alpacaACH: alpacaACH || "",
        }, { merge: true });
        batch.set(usernameRef, { uid: user.uid });
        await batch.commit();
        firebase_functions_1.logger.log(`User created for ${user.displayName}`);
        firebase_functions_1.logger.log(`uid: ${user.uid}`);
        firebase_functions_1.logger.log(`username: ${username}`);
        return { status: "success", message: `Welcome ${username}!` };
    }
    catch (error) {
        firebase_functions_1.logger.error(error);
        return { status: "error", message: error.message };
    }
};
exports.createAccount = createAccount;
const mockAlpacaAccountDetails = (user) => ({
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
});
const mockACHDetails = (user) => ({
    accountOwnerName: user.displayName,
    bankAccountType: "SAVINGS",
    bankAccountNumber: "32132231abc",
    bankRoutingNumber: "121000359",
    nickname: "FUNDING MONEY",
});
//# sourceMappingURL=createAccount.js.map