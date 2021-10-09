"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureAuthMethods = exports.BasicAuthAuthentication = void 0;
/**
 * Applies http authentication to the request context.
 */
class BasicAuthAuthentication {
    username;
    password;
    /**
     * Configures the http authentication with the required details.
     *
     * @param username username for http basic authentication
     * @param password password for http basic authentication
     */
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    getName() {
        return "BasicAuth";
    }
    applySecurityAuthentication(context) {
        let comb = this.username + ":" + this.password;
        context.setHeaderParam("Authorization", "Basic " + Buffer.from(comb).toString("base64"));
    }
}
exports.BasicAuthAuthentication = BasicAuthAuthentication;
/**
 * Creates the authentication methods from a swagger description.
 *
 */
function configureAuthMethods(config) {
    let authMethods = {};
    if (!config) {
        return authMethods;
    }
    if (config["BasicAuth"]) {
        authMethods["BasicAuth"] = new BasicAuthAuthentication(config["BasicAuth"]["username"], config["BasicAuth"]["password"]);
    }
    return authMethods;
}
exports.configureAuthMethods = configureAuthMethods;
//# sourceMappingURL=auth.js.map