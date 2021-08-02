# OpenAPI Generated Alpaca Broker API

- [OpenAPI Generated Alpaca Broker API](#openapi-generated-alpaca-broker-api)
  - [Changes that need to be made on regeneration](#changes-that-need-to-be-made-on-regeneration)
    - [Replace `btoa` for base64 encoding the authorization header](#replace-btoa-for-base64-encoding-the-authorization-header)
    - [Add the config instantiation](#add-the-config-instantiation)
    - [Add json method to all models](#add-json-method-to-all-models)
    - [Update the use of `url-parse` to `URL` in `http.ts`](#update-the-use-of-url-parse-to-url-in-httpts)
    - [Converting some exports to types](#converting-some-exports-to-types)
    - [Incorrect(?) typing in constructor of `TransferData.ts`](#incorrect-typing-in-constructor-of-transferdatats)
    - [Similarly for `TransferResource.ts`](#similarly-for-transferresourcets)
    - [ObjectSerialiser serialize & deserialize methods need to coalesce nulls in data](#objectserialiser-serialize--deserialize-methods-need-to-coalesce-nulls-in-data)

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
    if (json) {
      for (const { baseName, name } of this.attributeTypeMap) {
        if (baseName !== name && !(name in json)) {
          Object.assign(json, { [name]: json[baseName] })
          delete json[baseName]
        }
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

---

### Converting some exports to types

The index file re-exports some interfaces, these need to be exported as types

```ts
export { Configuration } from "./configuration"
export { PromiseMiddleware as Middleware } from "./middleware"
```

becomes

```ts
export type { Configuration } from "./configuration"
export type { PromiseMiddleware as Middleware } from "./middleware"
```

---

### Incorrect(?) typing in constructor of `TransferData.ts`

`this.transferType` is being set as `"TransferData"` however its an enum `TransferDataTransferTypeEnum` of only two options

```ts
export type TransferDataTransferTypeEnum = "ach" | "wire"
```

Thus simply remove it from the constructor

```ts
public constructor() {
    this.transferType = "TransferData";
}
```

becomes

```ts
public constructor() {}
```

---

### Similarly for `TransferResource.ts`

```ts
public constructor() {
    this.type = "TransferResource"
}
```

becomes

```ts
public constructor() {}
```

---

### ObjectSerialiser serialize & deserialize methods need to coalesce nulls in data

Add coalescing for empty data keys

```ts
instance[attributeType.baseName] = ObjectSerializer.serialize(
  data[attributeType.name],
  attributeType.type,
  attributeType.format
)
```

becomes

```ts
instance[attributeType.baseName] = ObjectSerializer.serialize(
  data[attributeType.name] ?? data[attributeType.baseName],
  attributeType.type,
  attributeType.format
)
```

and also

```ts
instance[attributeType.baseName] = ObjectSerializer.serialize(
  data[attributeType.baseName],
  attributeType.type,
  attributeType.format
)
```

becomes

```ts
instance[attributeType.name] = ObjectSerializer.deserialize(
  data[attributeType.baseName] ?? data[attributeType.name],
  attributeType.type,
  attributeType.format
)
```
