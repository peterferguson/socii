/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Query market clock
*
* returns inline_response_200_2
* */
const clockGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
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
  clockGET,
};
