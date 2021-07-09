/**
 * The JournalsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/JournalsService');
const delete_journal = async (request, response) => {
  await Controller.handleRequest(request, response, service.delete_journal);
};

const eventsJournalsStatusGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.eventsJournalsStatusGET);
};

const get_journals = async (request, response) => {
  await Controller.handleRequest(request, response, service.get_journals);
};

const post_journals = async (request, response) => {
  await Controller.handleRequest(request, response, service.post_journals);
};

const post_journals_batch = async (request, response) => {
  await Controller.handleRequest(request, response, service.post_journals_batch);
};


module.exports = {
  delete_journal,
  eventsJournalsStatusGET,
  get_journals,
  post_journals,
  post_journals_batch,
};
