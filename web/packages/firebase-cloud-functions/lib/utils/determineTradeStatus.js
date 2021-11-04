"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineTradeStatus = exports.successStatuses = exports.pendingStatuses = exports.failedStatuses = void 0;
exports.failedStatuses = ["cancelled", "expired", "rejected", "suspended"];
exports.pendingStatuses = [
    "new",
    "done_for_day",
    "pending_cancel",
    "pending_replace",
    "pending_new",
    "accepted_for_bidding",
    "stopped",
    "calculated",
    "accepted",
    "replaced",
];
exports.successStatuses = ["filled", "partially_filled"];
// TODO: add better handling for individual statuses
// ! this code is copied in the app/lib/constants.ts
const determineTradeStatus = (responseStatus) => {
    const status = exports.failedStatuses.includes(responseStatus)
        ? "failed"
        : exports.pendingStatuses.includes(responseStatus)
            ? "pending"
            : exports.successStatuses.includes(responseStatus)
                ? "success"
                : null;
    return status;
};
exports.determineTradeStatus = determineTradeStatus;
//# sourceMappingURL=determineTradeStatus.js.map