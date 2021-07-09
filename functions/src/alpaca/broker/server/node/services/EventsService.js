/* eslint-disable no-unused-vars */
const Service = require('./Service');

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
* Subscribe to journal events (SSE).
* Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200) 
*
* since Date  (optional)
* until Date  (optional)
* sinceUnderscoreid Integer  (optional)
* untilUnderscoreid Integer  (optional)
* returns inline_response_200_5
* */
const eventsJournalsStatusGET = ({ since, until, sinceUnderscoreid, untilUnderscoreid }) => new Promise(
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

module.exports = {
  eventsAccountsStatusGET,
  eventsJournalsStatusGET,
};
