# OpenAPI Generated Alpaca Broker API

- [OpenAPI Generated Alpaca Broker API](#openapi-generated-alpaca-broker-api)
  - [Changes that need to be made on regeneration](#changes-that-need-to-be-made-on-regeneration)
    - [Replace `btoa` for base64 encoding the authorization header](#replace-btoa-for-base64-encoding-the-authorization-header)
    - [Add the config instantiation](#add-the-config-instantiation)
    - [Add json method to all models](#add-json-method-to-all-models)
    - [Update the use of `url-parse` to `URL` in `http.ts`](#update-the-use-of-url-parse-to-url-in-httpts)

---

Using the `openapi.yaml` file from the [bkdocs github](https://github.com/alpacahq/bkdocs/blob/master/assets/openapi.yaml) using the [openapi-generator](https://openapi-generator.tech) cli command:

```zsh
openapi-generator generate -g typescript -o app/alpaca/ -i functions/src/alpaca/broker/openapi.yaml -p platform=node,snapshot=true,supportsES6=true                         ─╯
```

## Changes that need to be made on regeneration

---

### Replace `btoa` for base64 encoding the authorization header

The `applySecurityAuthentication` method of the `BasicAuthAuthentication` class

```ts
/**
 * Applies http authentication to the request context.
 */
export class BasicAuthAuthentication implements SecurityAuthentication {
  /**
   * Configures the http authentication with the required details.
   *
   * @param username username for http basic authentication
   * @param password password for http basic authentication
   */
  public constructor(private username: string, private password: string) {}

  public getName(): string {
    return "BasicAuth"
  }

  public applySecurityAuthentication(context: RequestContext) {
    let comb = this.username + ":" + this.password
    context.setHeaderParam("Authorization", "Basic " + btoa(comb))
  }
}
```

is replaced with

```ts
  public applySecurityAuthentication(context: RequestContext) {
    let comb = this.username + ":" + this.password
    context.setHeaderParam(
      "Authorization",
      "Basic " + Buffer.from(comb).toString("base64")
    )
  }
```

---

### Add the config instantiation

Add the following config to the `configuration.ts` file

```ts
export const config = createConfiguration({
  authMethods: {
    BasicAuth: {
      username: process.env.ALPACA_KEY ?? "",
      password: process.env.ALPACA_SECRET ?? "",
    },
  },
})
```

---

### Add json method to all models

All models get the following static method added to them to all them to be instantiated directly
from JSON

```ts
  static from(json) {
    // - convert baseName to name
    for (const { baseName, name } of this.attributeTypeMap) {
      if (baseName !== name) {
        Object.assign(json, { [name]: json[baseName] })
        delete json[baseName]
      }
    }
    return Object.assign(new this(), json)
  }
```

---

### Update the use of `url-parse` to `URL` in `http.ts`

- Remove `url-parse` import
- Replace all instances of `URLParse` with `URL`
- Replace `setQueryParam` method with:
  ```ts
  public setQueryParam(name: string, value: string) {
    this.url.searchParams.append(name, value)
  }
  ```
