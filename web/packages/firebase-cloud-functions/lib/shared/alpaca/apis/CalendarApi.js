"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarApiResponseProcessor = exports.CalendarApiRequestFactory = void 0;
const http_1 = require("../http/http");
const ObjectSerializer_1 = require("../models/ObjectSerializer");
const util_1 = require("../util");
const baseapi_1 = require("./baseapi");
const exception_1 = require("./exception");
/**
 * no description
 */
class CalendarApiRequestFactory extends baseapi_1.BaseAPIRequestFactory {
    /**
     * Query market calendar
     * @param start The first date to retrieve data for. (Inclusive)
     * @param end The last date to retrieve data for. (Inclusive)
     */
    async calendarGet(start, end, options) {
        let config = options || this.configuration;
        // Path Params
        const localVarPath = "/calendar";
        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        // Query Params
        if (start !== undefined) {
            requestContext.setQueryParam("start", ObjectSerializer_1.ObjectSerializer.serialize(start, "string", ""));
        }
        if (end !== undefined) {
            requestContext.setQueryParam("end", ObjectSerializer_1.ObjectSerializer.serialize(end, "string", ""));
        }
        // Header Params
        // Form Params
        // Body Params
        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["BasicAuth"];
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }
        return requestContext;
    }
}
exports.CalendarApiRequestFactory = CalendarApiRequestFactory;
class CalendarApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to calendarGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    async calendarGet(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if ((0, util_1.isCodeInRange)("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<MarketDay>", "");
            return body;
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "Array<MarketDay>", "");
            return body;
        }
        let body = (await response.body.text()) || "";
        throw new exception_1.ApiException(response.httpStatusCode, 'Unknown API Status Code!\nBody: "' + body + '"');
    }
}
exports.CalendarApiResponseProcessor = CalendarApiResponseProcessor;
//# sourceMappingURL=CalendarApi.js.map