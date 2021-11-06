"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingApi = exports.PortfolioApi = exports.OAuthApi = exports.JournalsApi = exports.FundingApi = exports.EventsApi = exports.DocumentsApi = exports.ClockApi = exports.CalendarApi = exports.AssetsApi = exports.AccountsApi = void 0;
__exportStar(require("./apis/exception"), exports);
__exportStar(require("./auth/auth"), exports);
__exportStar(require("./configuration"), exports);
__exportStar(require("./http/http"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./servers"), exports);
var PromiseAPI_1 = require("./types/PromiseAPI");
Object.defineProperty(exports, "AccountsApi", { enumerable: true, get: function () { return PromiseAPI_1.PromiseAccountsApi; } });
Object.defineProperty(exports, "AssetsApi", { enumerable: true, get: function () { return PromiseAPI_1.PromiseAssetsApi; } });
Object.defineProperty(exports, "CalendarApi", { enumerable: true, get: function () { return PromiseAPI_1.PromiseCalendarApi; } });
Object.defineProperty(exports, "ClockApi", { enumerable: true, get: function () { return PromiseAPI_1.PromiseClockApi; } });
Object.defineProperty(exports, "DocumentsApi", { enumerable: true, get: function () { return PromiseAPI_1.PromiseDocumentsApi; } });
Object.defineProperty(exports, "EventsApi", { enumerable: true, get: function () { return PromiseAPI_1.PromiseEventsApi; } });
Object.defineProperty(exports, "FundingApi", { enumerable: true, get: function () { return PromiseAPI_1.PromiseFundingApi; } });
Object.defineProperty(exports, "JournalsApi", { enumerable: true, get: function () { return PromiseAPI_1.PromiseJournalsApi; } });
Object.defineProperty(exports, "OAuthApi", { enumerable: true, get: function () { return PromiseAPI_1.PromiseOAuthApi; } });
Object.defineProperty(exports, "PortfolioApi", { enumerable: true, get: function () { return PromiseAPI_1.PromisePortfolioApi; } });
Object.defineProperty(exports, "TradingApi", { enumerable: true, get: function () { return PromiseAPI_1.PromiseTradingApi; } });
//# sourceMappingURL=index.js.map