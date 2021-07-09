/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Retrieve an asset by UUID
* Returns the requested asset, if found
*
* assetUnderscoreid String The UUID of the required asset
* no response value expected for this operation
* */
const assetsAssetIdGET = ({ assetUnderscoreid }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        assetUnderscoreid,
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
* Retrieve an asset by symbol
* Returns the requested asset, if found
*
* symbol String The symbol of the required asset
* no response value expected for this operation
* */
const assetsSymbolGET = ({ symbol }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        symbol,
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
* Retrieve all assets
* Returns all assets
*
* returns List
* */
const get_assets = () => new Promise(
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
  assetsAssetIdGET,
  assetsSymbolGET,
  get_assets,
};
