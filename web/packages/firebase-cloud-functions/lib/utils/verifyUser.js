"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const index_js_1 = require("../index.js");
const verifyUser = (context) => {
    // * Checking that the user is authenticated.
    if (!context.auth) {
        throw new index_js_1.HttpsError("failed-precondition", "This function must be called while authenticated.");
    }
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=verifyUser.js.map