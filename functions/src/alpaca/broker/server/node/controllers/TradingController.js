/**
 * The TradingController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/TradingService');
const delete_order = async (request, response) => {
  await Controller.handleRequest(request, response, service.delete_order);
};

const delete_orders = async (request, response) => {
  await Controller.handleRequest(request, response, service.delete_orders);
};

const get_order = async (request, response) => {
  await Controller.handleRequest(request, response, service.get_order);
};

const get_orders = async (request, response) => {
  await Controller.handleRequest(request, response, service.get_orders);
};

const get_positions = async (request, response) => {
  await Controller.handleRequest(request, response, service.get_positions);
};

const patch_order = async (request, response) => {
  await Controller.handleRequest(request, response, service.patch_order);
};

const post_orders = async (request, response) => {
  await Controller.handleRequest(request, response, service.post_orders);
};


module.exports = {
  delete_order,
  delete_orders,
  get_order,
  get_orders,
  get_positions,
  patch_order,
  post_orders,
};
