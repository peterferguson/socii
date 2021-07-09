/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Cancel a pending journal.
* You can cancel journals while they are in the pending status. An attempt to cancel already-executed journals will return an error. 
*
* journalUnderscoreid UUID 
* no response value expected for this operation
* */
const delete_journal = ({ journalUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        journalUnderscoreid,
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
/**
* Return a list of requested journals.
*
* after date by settle_date (optional)
* before date by settle_date (optional)
* status String  (optional)
* entryUnderscoretype String  (optional)
* toUnderscoreaccount UUID  (optional)
* fromUnderscoreaccount UUID  (optional)
* returns List
* */
const get_journals = ({ after, before, status, entryUnderscoretype, toUnderscoreaccount, fromUnderscoreaccount }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        after,
        before,
        status,
        entryUnderscoretype,
        toUnderscoreaccount,
        fromUnderscoreaccount,
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
* Request a journal.
* A journal can be JNLC (move cash) or JNLS (move shares), dictated by `entry_type`. Generally, journal requests are subject to approval and starts from the `pending` status. The status changes are propagated through the Event API. Under certain conditions agreed for the partner, such journal transactions that meet the criteria are executed right away. 
*
* journalData JournalData 
* returns JournalResource
* */
const post_journals = ({ journalData }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        journalData,
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
* Create a batch journal
*
* batchJournalRequest BatchJournalRequest 
* returns List
* */
const post_journals_batch = ({ batchJournalRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        batchJournalRequest,
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
  delete_journal,
  eventsJournalsStatusGET,
  get_journals,
  post_journals,
  post_journals_batch,
};
