"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanJsonResponse = void 0;
const willItFloat_1 = require("./willItFloat");
const camelCase_1 = require("./camelCase");
const cleanJsonResponse = (response) => {
    const keys = Object.keys(response);
    let cleaned = {};
    for (const key of keys) {
        cleaned[camelCase_1.camelCase(key)] =
            response[key] === "None" ? null : willItFloat_1.willItFloat(response[key]);
    }
    return cleaned;
};
exports.cleanJsonResponse = cleanJsonResponse;
//# sourceMappingURL=cleanJsonResponse.js.map