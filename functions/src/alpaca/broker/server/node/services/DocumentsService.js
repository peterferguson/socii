/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Download a document file that belongs to an account.
* The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found. 
*
* accountUnderscoreid UUID Account identifier.
* documentUnderscoreid UUID 
* no response value expected for this operation
* */
const accountsAccountIdDocumentsDocumentIdDownloadGET = ({ accountUnderscoreid, documentUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        documentUnderscoreid,
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
* Return a list of account documents.
* You can query account documents such as monthly  statements and trade confirms under an account. 
*
* accountUnderscoreid UUID Account identifier.
* startUnderscoredate date optional date value to filter the list (inclusive). (optional)
* endUnderscoredate date optional date value to filter the list (inclusive). (optional)
* returns List
* */
const accountsAccountIdDocumentsGET = ({ accountUnderscoreid, startUnderscoredate, endUnderscoredate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        startUnderscoredate,
        endUnderscoredate,
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
* Download a document file directly
* The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found. 
*
* documentUnderscoreid UUID 
* no response value expected for this operation
* */
const documentsDocumentIdGET = ({ documentUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        documentUnderscoreid,
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
  accountsAccountIdDocumentsDocumentIdDownloadGET,
  accountsAccountIdDocumentsGET,
  documentsDocumentIdGET,
};
