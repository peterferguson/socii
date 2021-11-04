"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredError = exports.BaseAPIRequestFactory = exports.COLLECTION_FORMATS = void 0;
/**
 *
 * @export
 */
exports.COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};
/**
 *
 * @export
 * @class BaseAPI
 */
class BaseAPIRequestFactory {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
}
exports.BaseAPIRequestFactory = BaseAPIRequestFactory;
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
class RequiredError extends Error {
    field;
    name = "RequiredError";
    constructor(field, msg) {
        super(msg);
        this.field = field;
    }
}
exports.RequiredError = RequiredError;
//# sourceMappingURL=baseapi.js.map