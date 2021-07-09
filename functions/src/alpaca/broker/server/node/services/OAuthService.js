/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Issue a code.
* The operation issues an OAuth code which can be used in the OAuth code flow. 
*
* inlineObject1 InlineObject1 
* returns inline_response_200_8
* */
const oauthAuthorizePOST = ({ inlineObject1 }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        inlineObject1,
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
* Returns an OAuth client.
* The endpoint returns the details of OAuth client to display in the authorization page. 
*
* clientUnderscoreid UUID 
* responseUnderscoretype String  (optional)
* redirectUnderscoreuri String  (optional)
* scope String  (optional)
* returns inline_response_200_6
* */
const oauthClientsClientIdGET = ({ clientUnderscoreid, responseUnderscoretype, redirectUnderscoreuri, scope }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        clientUnderscoreid,
        responseUnderscoretype,
        redirectUnderscoreuri,
        scope,
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
* Issue a token.
* This operation issues an access token for an account. 
*
* inlineObject InlineObject 
* returns inline_response_200_7
* */
const oauthTokenPOST = ({ inlineObject }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        inlineObject,
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
  oauthAuthorizePOST,
  oauthClientsClientIdGET,
  oauthTokenPOST,
};
