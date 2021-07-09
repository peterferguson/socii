/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Query market calendar
*
* start String The first date to retrieve data for. (Inclusive) (optional)
* end String The last date to retrieve data for. (Inclusive) (optional)
* returns inline_response_200_1
* */
const calendarGET = ({ start, end }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        start,
        end,
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
  calendarGET,
};
