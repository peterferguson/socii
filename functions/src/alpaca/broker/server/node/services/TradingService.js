/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Attempts to cancel an open order.
* Attempts to cancel an open order.
*
* accountUnderscoreid UUID Account identifier.
* orderUnderscoreid String Order identifier.
* no response value expected for this operation
* */
const delete_order = ({ accountUnderscoreid, orderUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        orderUnderscoreid,
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
* Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
* Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
*
* accountUnderscoreid UUID Account identifier.
* returns List
* */
const delete_orders = ({ accountUnderscoreid }) => new Promise(
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
* Retrieves a single order for the given order_id.
* Retrieves a single order for the given order_id.
*
* accountUnderscoreid UUID Account identifier.
* orderUnderscoreid String Order identifier.
* returns OrderObject
* */
const get_order = ({ accountUnderscoreid, orderUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        orderUnderscoreid,
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
* Retrieves a list of orders for the account, filtered by the supplied query parameters.
* Retrieves a list of orders for the account, filtered by the supplied query parameters.
*
* accountUnderscoreid UUID Account identifier.
* status String Status of the orders to list. (optional)
* limit Integer The maximum number of orders in response. (optional)
* after Date The response will include only ones submitted after this timestamp (exclusive.) (optional)
* until Date The response will include only ones submitted until this timestamp (exclusive.) (optional)
* direction String The chronological order of response based on the submission time. asc or desc. Defaults to desc. (optional)
* nested Boolean If true, the result will roll up multi-leg orders under the legs field of primary order. (optional)
* symbols String A comma-separated list of symbols to filter by. (optional)
* returns List
* */
const get_orders = ({ accountUnderscoreid, status, limit, after, until, direction, nested, symbols }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        status,
        limit,
        after,
        until,
        direction,
        nested,
        symbols,
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
* List open positions for an account
*
* accountUnderscoreid UUID Account identifier.
* returns List
* */
const get_positions = ({ accountUnderscoreid }) => new Promise(
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
* Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
* Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
*
* accountUnderscoreid UUID Account identifier.
* orderUnderscoreid String Order identifier.
* patchOrder PatchOrder 
* returns OrderObject
* */
const patch_order = ({ accountUnderscoreid, orderUnderscoreid, patchOrder }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        orderUnderscoreid,
        patchOrder,
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
* Create an order for an account.
* Create an order for an account.
*
* accountUnderscoreid UUID Account identifier.
* createOrder CreateOrder 
* returns OrderObject
* */
const post_orders = ({ accountUnderscoreid, createOrder }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        accountUnderscoreid,
        createOrder,
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
  delete_order,
  delete_orders,
  get_order,
  get_orders,
  get_positions,
  patch_order,
  post_orders,
};
