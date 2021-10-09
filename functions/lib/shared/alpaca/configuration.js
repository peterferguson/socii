"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.createConfiguration = void 0;
const auth_1 = require("./auth/auth");
const isomorphic_fetch_1 = require("./http/isomorphic-fetch");
const middleware_1 = require("./middleware");
const servers_1 = require("./servers");
/**
 * Configuration factory function
 *
 * If a property is not included in conf, a default is used:
 *    - baseServer: server1
 *    - httpApi: IsomorphicFetchHttpLibrary
 *    - middleware: []
 *    - promiseMiddleware: []
 *    - authMethods: {}
 *
 * @param conf partial configuration
 */
function createConfiguration(conf = {}) {
    const configuration = {
        baseServer: conf.baseServer !== undefined ? conf.baseServer : servers_1.server1,
        httpApi: conf.httpApi || new isomorphic_fetch_1.IsomorphicFetchHttpLibrary(),
        middleware: conf.middleware || [],
        authMethods: (0, auth_1.configureAuthMethods)(conf.authMethods),
    };
    if (conf.promiseMiddleware) {
        conf.promiseMiddleware.forEach((m) => configuration.middleware.push(new middleware_1.PromiseMiddlewareWrapper(m)));
    }
    return configuration;
}
exports.createConfiguration = createConfiguration;
const config = (username, password) => createConfiguration({ authMethods: { BasicAuth: { username, password } } });
exports.config = config;
//# sourceMappingURL=configuration.js.map