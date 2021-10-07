"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.willItFloat = void 0;
const willItFloat = (str) => {
    const lettersRegex = /[a-zA-Z]/;
    if (lettersRegex.test(str))
        return str;
    const parsed = parseFloat(str);
    return isNaN(parsed) ? str : parsed;
};
exports.willItFloat = willItFloat;
//# sourceMappingURL=willItFloat.js.map