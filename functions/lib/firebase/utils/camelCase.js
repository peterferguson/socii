"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCase = void 0;
const isUpperCase_1 = require("./isUpperCase");
const camelCase = (str) => {
    if ((0, isUpperCase_1.isUpperCase)(str))
        return str;
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (/\s+/.test(match))
            return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};
exports.camelCase = camelCase;
//# sourceMappingURL=camelCase.js.map