"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineAlpacaStatus = void 0;
const determineAlpacaStatus = (responseStatus) => {
    const status = ["cancelled", "expired", "rejected", "suspended"].includes(responseStatus)
        ? "failed"
        : [
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
        ].includes(responseStatus)
            ? "pending"
            : ["filled"].includes(responseStatus)
                ? "success"
                : null;
    return status;
};
exports.determineAlpacaStatus = determineAlpacaStatus;
//# sourceMappingURL=determineAlpacaStatus.js.map