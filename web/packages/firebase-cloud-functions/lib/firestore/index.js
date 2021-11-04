"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeEvents = exports.getLatestEventId = exports.arrayUnion = exports.Timestamp = exports.serverTimestamp = exports.increment = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// * Exportable utils
exports.increment = firebase_admin_1.default.firestore.FieldValue.increment;
exports.serverTimestamp = firebase_admin_1.default.firestore.FieldValue.serverTimestamp;
exports.Timestamp = firebase_admin_1.default.firestore.Timestamp;
exports.arrayUnion = firebase_admin_1.default.firestore.FieldValue.arrayUnion;
var getLatestEventId_1 = require("./db/getLatestEventId");
Object.defineProperty(exports, "getLatestEventId", { enumerable: true, get: function () { return getLatestEventId_1.getLatestEventId; } });
var storeEvents_1 = require("./db/storeEvents");
Object.defineProperty(exports, "storeEvents", { enumerable: true, get: function () { return storeEvents_1.storeEvents; } });
//# sourceMappingURL=index.js.map