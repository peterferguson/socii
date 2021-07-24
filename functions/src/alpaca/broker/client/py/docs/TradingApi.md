# broker_client.TradingApi

All URIs are relative to *https://broker-api.sandbox.alpaca.markets/v1*

| Method                                           | HTTP request                                                | Description                                                                                                                  |
| ------------------------------------------------ | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [**delete_order**](TradingApi.md#delete_order)   | **DELETE** /trading/accounts/{account_id}/orders/{order_id} | Attempts to cancel an open order.                                                                                            |
| [**delete_orders**](TradingApi.md#delete_orders) | **DELETE** /trading/accounts/{account_id}/orders            | Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.            |
| [**get_order**](TradingApi.md#get_order)         | **GET** /trading/accounts/{account_id}/orders/{order_id}    | Retrieves a single order for the given order_id.                                                                             |
| [**get_orders**](TradingApi.md#get_orders)       | **GET** /trading/accounts/{account_id}/orders               | Retrieves a list of orders for the account, filtered by the supplied query parameters.                                       |
| [**patch_order**](TradingApi.md#patch_order)     | **PATCH** /trading/accounts/{account_id}/orders/{order_id}  | Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order. |
| [**post_orders**](TradingApi.md#post_orders)     | **POST** /trading/accounts/{account_id}/orders              | Create an order for an account.                                                                                              |

# **delete_order**

> delete_order(account_id, order_id)

Attempts to cancel an open order.

Attempts to cancel an open order.

### Example

```python
from __future__ import print_function
import time
import broker_client
from broker_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = broker_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = broker_client.TradingApi(broker_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
order_id = 'order_id_example' # str | Order identifier.

try:
    # Attempts to cancel an open order.
    api_instance.delete_order(account_id, order_id)
except ApiException as e:
    print("Exception when calling TradingApi->delete_order: %s\n" % e)
```

### Parameters

| Name           | Type           | Description         | Notes |
| -------------- | -------------- | ------------------- | ----- |
| **account_id** | [**str**](.md) | Account identifier. |
| **order_id**   | **str**        | Order identifier.   |

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_orders**

> list[InlineResponse207] delete_orders(account_id)

Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.

Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.

### Example

```python
from __future__ import print_function
import time
import broker_client
from broker_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = broker_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = broker_client.TradingApi(broker_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.

try:
    # Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.
    api_response = api_instance.delete_orders(account_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling TradingApi->delete_orders: %s\n" % e)
```

### Parameters

| Name           | Type           | Description         | Notes |
| -------------- | -------------- | ------------------- | ----- |
| **account_id** | [**str**](.md) | Account identifier. |

### Return type

[**list[InlineResponse207]**](InlineResponse207.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_order**

> OrderObject get_order(account_id, order_id)

Retrieves a single order for the given order_id.

Retrieves a single order for the given order_id.

### Example

```python
from __future__ import print_function
import time
import broker_client
from broker_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = broker_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = broker_client.TradingApi(broker_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
order_id = 'order_id_example' # str | Order identifier.

try:
    # Retrieves a single order for the given order_id.
    api_response = api_instance.get_order(account_id, order_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling TradingApi->get_order: %s\n" % e)
```

### Parameters

| Name           | Type           | Description         | Notes |
| -------------- | -------------- | ------------------- | ----- |
| **account_id** | [**str**](.md) | Account identifier. |
| **order_id**   | **str**        | Order identifier.   |

### Return type

[**OrderObject**](OrderObject.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_orders**

> list[OrderObject] get_orders(account_id, status=status, limit=limit, after=after, until=until, direction=direction, nested=nested, symbols=symbols)

Retrieves a list of orders for the account, filtered by the supplied query parameters.

Retrieves a list of orders for the account, filtered by the supplied query parameters.

### Example

```python
from __future__ import print_function
import time
import broker_client
from broker_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = broker_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = broker_client.TradingApi(broker_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
status = 'status_example' # str | Status of the orders to list. (optional)
limit = 56 # int | The maximum number of orders in response. (optional)
after = '2013-10-20T19:20:30+01:00' # datetime | The response will include only ones submitted after this timestamp (exclusive.) (optional)
until = '2013-10-20T19:20:30+01:00' # datetime | The response will include only ones submitted until this timestamp (exclusive.) (optional)
direction = 'direction_example' # str | The chronological order of response based on the submission time. asc or desc. Defaults to desc. (optional)
nested = true # bool | If true, the result will roll up multi-leg orders under the legs field of primary order. (optional)
symbols = 'symbols_example' # str | A comma-separated list of symbols to filter by. (optional)

try:
    # Retrieves a list of orders for the account, filtered by the supplied query parameters.
    api_response = api_instance.get_orders(account_id, status=status, limit=limit, after=after, until=until, direction=direction, nested=nested, symbols=symbols)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling TradingApi->get_orders: %s\n" % e)
```

### Parameters

| Name           | Type           | Description                                                                                      | Notes      |
| -------------- | -------------- | ------------------------------------------------------------------------------------------------ | ---------- |
| **account_id** | [**str**](.md) | Account identifier.                                                                              |
| **status**     | **str**        | Status of the orders to list.                                                                    | [optional] |
| **limit**      | **int**        | The maximum number of orders in response.                                                        | [optional] |
| **after**      | **datetime**   | The response will include only ones submitted after this timestamp (exclusive.)                  | [optional] |
| **until**      | **datetime**   | The response will include only ones submitted until this timestamp (exclusive.)                  | [optional] |
| **direction**  | **str**        | The chronological order of response based on the submission time. asc or desc. Defaults to desc. | [optional] |
| **nested**     | **bool**       | If true, the result will roll up multi-leg orders under the legs field of primary order.         | [optional] |
| **symbols**    | **str**        | A comma-separated list of symbols to filter by.                                                  | [optional] |

### Return type

[**list[OrderObject]**](OrderObject.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **patch_order**

> PortfolioHistory patch_order(body, account_id, order_id)

Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.

Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.

### Example

```python
from __future__ import print_function
import time
import broker_client
from broker_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = broker_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = broker_client.TradingApi(broker_client.ApiClient(configuration))
body = broker_client.PatchOrder() # PatchOrder |
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
order_id = 'order_id_example' # str | Order identifier.

try:
    # Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.
    api_response = api_instance.patch_order(body, account_id, order_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling TradingApi->patch_order: %s\n" % e)
```

### Parameters

| Name           | Type                            | Description         | Notes |
| -------------- | ------------------------------- | ------------------- | ----- |
| **body**       | [**PatchOrder**](PatchOrder.md) |                     |
| **account_id** | [**str**](.md)                  | Account identifier. |
| **order_id**   | **str**                         | Order identifier.   |

### Return type

[**PortfolioHistory**](PortfolioHistory.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_orders**

> OrderObject post_orders(body, account_id)

Create an order for an account.

Create an order for an account.

### Example

```python
from __future__ import print_function
import time
import broker_client
from broker_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = broker_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = broker_client.TradingApi(broker_client.ApiClient(configuration))
body = broker_client.CreateOrder() # CreateOrder |
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.

try:
    # Create an order for an account.
    api_response = api_instance.post_orders(body, account_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling TradingApi->post_orders: %s\n" % e)
```

### Parameters

| Name           | Type                              | Description         | Notes |
| -------------- | --------------------------------- | ------------------- | ----- |
| **body**       | [**CreateOrder**](CreateOrder.md) |                     |
| **account_id** | [**str**](.md)                    | Account identifier. |

### Return type

[**OrderObject**](OrderObject.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
