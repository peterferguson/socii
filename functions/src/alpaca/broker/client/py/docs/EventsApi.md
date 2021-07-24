# broker_client.EventsApi

All URIs are relative to *https://broker-api.sandbox.alpaca.markets/v1*

| Method                                                                    | HTTP request                    | Description                               |
| ------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------- |
| [**events_accounts_status_get**](EventsApi.md#events_accounts_status_get) | **GET** /events/accounts/status | Subscribe to account status events (SSE). |
| [**events_journals_status_get**](EventsApi.md#events_journals_status_get) | **GET** /events/journals/status | Subscribe to journal events (SSE).        |

# **events_accounts_status_get**

> InlineResponse2005 events_accounts_status_get(since=since, until=until, since_id=since_id, until_id=until_id)

Subscribe to account status events (SSE).

Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)

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
api_instance = broker_client.EventsApi(broker_client.ApiClient(configuration))
since = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
until = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
since_id = 56 # int |  (optional)
until_id = 56 # int |  (optional)

try:
    # Subscribe to account status events (SSE).
    api_response = api_instance.events_accounts_status_get(since=since, until=until, since_id=since_id, until_id=until_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling EventsApi->events_accounts_status_get: %s\n" % e)
```

### Parameters

| Name         | Type         | Description | Notes      |
| ------------ | ------------ | ----------- | ---------- |
| **since**    | **datetime** |             | [optional] |
| **until**    | **datetime** |             | [optional] |
| **since_id** | **int**      |             | [optional] |
| **until_id** | **int**      |             | [optional] |

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **events_journals_status_get**

> InlineResponse2006 events_journals_status_get(since=since, until=until, since_id=since_id, until_id=until_id)

Subscribe to journal events (SSE).

Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)

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
api_instance = broker_client.EventsApi(broker_client.ApiClient(configuration))
since = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
until = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
since_id = 56 # int |  (optional)
until_id = 56 # int |  (optional)

try:
    # Subscribe to journal events (SSE).
    api_response = api_instance.events_journals_status_get(since=since, until=until, since_id=since_id, until_id=until_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling EventsApi->events_journals_status_get: %s\n" % e)
```

### Parameters

| Name         | Type         | Description | Notes      |
| ------------ | ------------ | ----------- | ---------- |
| **since**    | **datetime** |             | [optional] |
| **until**    | **datetime** |             | [optional] |
| **since_id** | **int**      |             | [optional] |
| **until_id** | **int**      |             | [optional] |

### Return type

[**InlineResponse2006**](InlineResponse2006.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
