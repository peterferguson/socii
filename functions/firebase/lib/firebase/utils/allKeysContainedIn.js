"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allKeysContainedIn = void 0;
const allKeysContainedIn = (obj, other) => {
    let keys = null;
    switch (typeof obj) {
        case "object":
            if (Array.isArray(obj)) {
                keys = obj;
            }
            else {
                keys = Object.keys(obj);
            }
            break;
    }
    // Ensure that the object has all of the keys in `other`
    return keys.every((key) => key in other);
};
exports.allKeysContainedIn = allKeysContainedIn;
//# sourceMappingURL=allKeysContainedIn.js.map