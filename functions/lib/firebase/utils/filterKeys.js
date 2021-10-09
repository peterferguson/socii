"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterKeys = void 0;
// - Helper functions
const filterKeys = (obj, keyList) => Object.fromEntries(Object.entries(obj).filter(([k]) => keyList.includes(k)));
exports.filterKeys = filterKeys;
//# sourceMappingURL=filterKeys.js.map