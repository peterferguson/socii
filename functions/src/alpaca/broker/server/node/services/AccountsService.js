/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Upload a document to an already existing account
*
* accountUnderscoreid UUID Account identifier.
* documentUpload DocumentUpload 
* no response value expected for this operation
* */
const accountsAccountIdDocumentsUploadPOST = ({ accountUnderscoreid, documentUpload }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        documentUpload,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Retrieve specific account activities
*
* activityUnderscoretype String 
* date String  (optional)
* until String  (optional)
* after String  (optional)
* direction String  (optional)
* accountUnderscoreid UUID  (optional)
* pageUnderscoresize Integer  (optional)
* pageUnderscoretoken String  (optional)
* returns List
* */
const accountsActivitiesActivityTypeGET = ({ activityUnderscoretype, date, until, after, direction, accountUnderscoreid, pageUnderscoresize, pageUnderscoretoken }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        activityUnderscoretype,
        date,
        until,
        after,
        direction,
        accountUnderscoreid,
        pageUnderscoresize,
        pageUnderscoretoken,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Retrieve account activities
*
* date String  (optional)
* until String  (optional)
* after String  (optional)
* direction String  (optional)
* accountUnderscoreid UUID  (optional)
* pageUnderscoresize Integer  (optional)
* pageUnderscoretoken String  (optional)
* returns List
* */
const accountsActivitiesGET = ({ date, until, after, direction, accountUnderscoreid, pageUnderscoresize, pageUnderscoretoken }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        date,
        until,
        after,
        direction,
        accountUnderscoreid,
        pageUnderscoresize,
        pageUnderscoretoken,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Retrieve all accounts
*
* query String The query supports partial match of account number, names, emails, etc.. Items can be space delimited.  (optional)
* returns List
* */
const accountsGET = ({ query }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        query,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create an account
*
* accountCreationObject AccountCreationObject 
* returns Account
* */
const accountsPOST = ({ accountCreationObject }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountCreationObject,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Request to close an account
*
* accountUnderscoreid UUID Account identifier.
* no response value expected for this operation
* */
const delete_account = ({ accountUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete an existing ACH relationship
*
* accountUnderscoreid UUID Account identifier.
* achUnderscorerelationshipUnderscoreid UUID ACH relationship identifier
* no response value expected for this operation
* */
const delete_ach_relationship = ({ accountUnderscoreid, achUnderscorerelationshipUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        achUnderscorerelationshipUnderscoreid,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete a Bank Relationship for an account
*
* accountUnderscoreid UUID Account identifier.
* bankUnderscoreid String 
* no response value expected for this operation
* */
const delete_recipient_bank = ({ accountUnderscoreid, bankUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        bankUnderscoreid,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Request to close a transfer
*
* accountUnderscoreid String 
* transferUnderscoreid String 
* no response value expected for this operation
* */
const delete_transfer = ({ accountUnderscoreid, transferUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        transferUnderscoreid,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Subscribe to account status events (SSE).
* Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200) 
*
* since Date  (optional)
* until Date  (optional)
* sinceUnderscoreid Integer  (optional)
* untilUnderscoreid Integer  (optional)
* returns inline_response_200_4
* */
const eventsAccountsStatusGET = ({ since, until, sinceUnderscoreid, untilUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        since,
        until,
        sinceUnderscoreid,
        untilUnderscoreid,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Retrieve an account.
* The response is an Account model.
*
* accountUnderscoreid UUID Account identifier.
* returns AccountExtended
* */
const get_account = ({ accountUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Retrieve ACH Relationships for an account
*
* accountUnderscoreid UUID Account identifier.
* statuses String Comma-separated status values (optional)
* returns List
* */
const get_ach_relationships = ({ accountUnderscoreid, statuses }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        statuses,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Retrieve bank relationships for an account
*
* accountUnderscoreid UUID 
* status String  (optional)
* bankUnderscorename String  (optional)
* returns List
* */
const get_recipient_banks = ({ accountUnderscoreid, status, bankUnderscorename }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        status,
        bankUnderscorename,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Retrieve trading details for an account.
* The response is a Trading Account model.
*
* accountUnderscoreid UUID Account identifier.
* returns inline_response_200
* */
const get_trading_account = ({ accountUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Return a list of transfers for an account.
* You can filter requested transfers by values such as direction and status. 
*
* accountUnderscoreid UUID 
* direction String  (optional)
* limit BigDecimal  (optional)
* offset BigDecimal  (optional)
* returns List
* */
const get_transfers = ({ accountUnderscoreid, direction, limit, offset }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        direction,
        limit,
        offset,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update an account
*
* accountUnderscoreid UUID Account identifier.
* accountUpdate AccountUpdate 
* returns Account
* */
const patch_account = ({ accountUnderscoreid, accountUpdate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        accountUpdate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create an ACH Relationship
*
* accountUnderscoreid UUID Account identifier.
* aCHRelationshipData ACHRelationshipData 
* returns ACHRelationshipResource
* */
const post_ach_relationships = ({ accountUnderscoreid, aCHRelationshipData }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        aCHRelationshipData,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create a Bank Relationship for an account
*
* accountUnderscoreid UUID Account identifier.
* bankData BankData 
* returns BankResource
* */
const post_recipient_banks = ({ accountUnderscoreid, bankData }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        bankData,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Request a new transfer
* This operation allows you to fund an account with virtual money in the sandbox environment. 
*
* accountUnderscoreid UUID 
* transferData TransferData 
* returns TransferResource
* */
const post_transfers = ({ accountUnderscoreid, transferData }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        transferData,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  accountsAccountIdDocumentsUploadPOST,
  accountsActivitiesActivityTypeGET,
  accountsActivitiesGET,
  accountsGET,
  accountsPOST,
  delete_account,
  delete_ach_relationship,
  delete_recipient_bank,
  delete_transfer,
  eventsAccountsStatusGET,
  get_account,
  get_ach_relationships,
  get_recipient_banks,
  get_trading_account,
  get_transfers,
  patch_account,
  post_ach_relationships,
  post_recipient_banks,
  post_transfers,
};
