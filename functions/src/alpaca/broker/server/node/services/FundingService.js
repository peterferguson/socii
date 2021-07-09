/* eslint-disable no-unused-vars */
const Service = require('./Service');

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
  delete_ach_relationship,
  delete_recipient_bank,
  delete_transfer,
  get_ach_relationships,
  get_recipient_banks,
  get_transfers,
  post_ach_relationships,
  post_recipient_banks,
  post_transfers,
};
