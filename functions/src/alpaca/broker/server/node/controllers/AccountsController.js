/**
 * The AccountsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/AccountsService');
const accountsAccountIdDocumentsUploadPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.accountsAccountIdDocumentsUploadPOST);
};

const accountsActivitiesActivityTypeGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.accountsActivitiesActivityTypeGET);
};

const accountsActivitiesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.accountsActivitiesGET);
};

const accountsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.accountsGET);
};

const accountsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.accountsPOST);
};

const delete_account = async (request, response) => {
  await Controller.handleRequest(request, response, service.delete_account);
};

const delete_ach_relationship = async (request, response) => {
  await Controller.handleRequest(request, response, service.delete_ach_relationship);
};

const delete_recipient_bank = async (request, response) => {
  await Controller.handleRequest(request, response, service.delete_recipient_bank);
};

const delete_transfer = async (request, response) => {
  await Controller.handleRequest(request, response, service.delete_transfer);
};

const eventsAccountsStatusGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.eventsAccountsStatusGET);
};

const get_account = async (request, response) => {
  await Controller.handleRequest(request, response, service.get_account);
};

const get_ach_relationships = async (request, response) => {
  await Controller.handleRequest(request, response, service.get_ach_relationships);
};

const get_recipient_banks = async (request, response) => {
  await Controller.handleRequest(request, response, service.get_recipient_banks);
};

const get_trading_account = async (request, response) => {
  await Controller.handleRequest(request, response, service.get_trading_account);
};

const get_transfers = async (request, response) => {
  await Controller.handleRequest(request, response, service.get_transfers);
};

const patch_account = async (request, response) => {
  await Controller.handleRequest(request, response, service.patch_account);
};

const post_ach_relationships = async (request, response) => {
  await Controller.handleRequest(request, response, service.post_ach_relationships);
};

const post_recipient_banks = async (request, response) => {
  await Controller.handleRequest(request, response, service.post_recipient_banks);
};

const post_transfers = async (request, response) => {
  await Controller.handleRequest(request, response, service.post_transfers);
};


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
