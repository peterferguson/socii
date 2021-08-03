# broker_client.JournalsApi

All URIs are relative to *https://broker-api.sandbox.alpaca.markets/v1*

| Method                                                                      | HTTP request                      | Description                          |
| --------------------------------------------------------------------------- | --------------------------------- | ------------------------------------ |
| [**delete_journal**](JournalsApi.md#delete_journal)                         | **DELETE** /journals/{journal_id} | Cancel a pending journal.            |
| [**events_journals_status_get**](JournalsApi.md#events_journals_status_get) | **GET** /events/journals/status   | Subscribe to journal events (SSE).   |
| [**get_journals**](JournalsApi.md#get_journals)                             | **GET** /journals                 | Return a list of requested journals. |
| [**post_journals**](JournalsApi.md#post_journals)                           | **POST** /journals                | Request a journal.                   |

# **delete_journal**

> delete_journal(journal_id)

Cancel a pending journal.

You can cancel journals while they are in the pending status. An attempt to cancel already-executed journals will return an error.

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
api_instance = broker_client.JournalsApi(broker_client.ApiClient(configuration))
journal_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str |

try:
    # Cancel a pending journal.
    api_instance.delete_journal(journal_id)
except ApiException as e:
    print("Exception when calling JournalsApi->delete_journal: %s\n" % e)
```

### Parameters

| Name           | Type           | Description | Notes |
| -------------- | -------------- | ----------- | ----- |
| **journal_id** | [**str**](.md) |             |

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

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
api_instance = broker_client.JournalsApi(broker_client.ApiClient(configuration))
since = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
until = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
since_id = 56 # int |  (optional)
until_id = 56 # int |  (optional)

try:
    # Subscribe to journal events (SSE).
    api_response = api_instance.events_journals_status_get(since=since, until=until, since_id=since_id, until_id=until_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling JournalsApi->events_journals_status_get: %s\n" % e)
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

# **get_journals**

> list[JournalResource] get_journals(after=after, before=before, status=status, entry_type=entry_type, to_account=to_account, from_account=from_account)

Return a list of requested journals.

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
api_instance = broker_client.JournalsApi(broker_client.ApiClient(configuration))
after = '2013-10-20' # date | by settle_date (optional)
before = '2013-10-20' # date | by settle_date (optional)
status = 'status_example' # str |  (optional)
entry_type = 'entry_type_example' # str |  (optional)
to_account = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str |  (optional)
from_account = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str |  (optional)

try:
    # Return a list of requested journals.
    api_response = api_instance.get_journals(after=after, before=before, status=status, entry_type=entry_type, to_account=to_account, from_account=from_account)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling JournalsApi->get_journals: %s\n" % e)
```

### Parameters

| Name             | Type           | Description    | Notes      |
| ---------------- | -------------- | -------------- | ---------- |
| **after**        | **date**       | by settle_date | [optional] |
| **before**       | **date**       | by settle_date | [optional] |
| **status**       | **str**        |                | [optional] |
| **entry_type**   | **str**        |                | [optional] |
| **to_account**   | [**str**](.md) |                | [optional] |
| **from_account** | [**str**](.md) |                | [optional] |

### Return type

[**list[JournalResource]**](JournalResource.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_journals**

> JournalResource post_journals(body)

Request a journal.

A journal can be JNLC (move cash) or JNLS (move shares), dictated by `entry_type`. Generally, journal requests are subject to approval and starts from the `pending` status. The status changes are propagated through the Event API. Under certain conditions agreed for the partner, such journal transactions that meet the criteria are executed right away.

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
api_instance = broker_client.JournalsApi(broker_client.ApiClient(configuration))
body = broker_client.JournalData() # JournalData |

try:
    # Request a journal.
    api_response = api_instance.post_journals(body)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling JournalsApi->post_journals: %s\n" % e)
```

### Parameters

| Name     | Type                              | Description | Notes |
| -------- | --------------------------------- | ----------- | ----- |
| **body** | [**JournalData**](JournalData.md) |             |

### Return type

[**JournalResource**](JournalResource.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
