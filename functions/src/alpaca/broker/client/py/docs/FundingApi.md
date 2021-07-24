# broker_client.FundingApi

All URIs are relative to *https://broker-api.sandbox.alpaca.markets/v1*

| Method                                                               | HTTP request                                                              | Description                                |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------ |
| [**delete_ach_relationship**](FundingApi.md#delete_ach_relationship) | **DELETE** /accounts/{account_id}/ach_relationships/{ach_relationship_id} | Delete an existing ACH relationship        |
| [**delete_recipient_bank**](FundingApi.md#delete_recipient_bank)     | **DELETE** /accounts/{account_id}/recipient_banks/{bank_id}               | Delete a Bank Relationship for an account  |
| [**delete_transfer**](FundingApi.md#delete_transfer)                 | **DELETE** /accounts/{account_id}/transfers/{transfer_id}                 | Request to close a transfer                |
| [**get_ach_relationships**](FundingApi.md#get_ach_relationships)     | **GET** /accounts/{account_id}/ach_relationships                          | Retrieve ACH Relationships for an account  |
| [**get_recipient_banks**](FundingApi.md#get_recipient_banks)         | **GET** /accounts/{account_id}/recipient_banks                            | Retrieve bank relationships for an account |
| [**get_transfers**](FundingApi.md#get_transfers)                     | **GET** /accounts/{account_id}/transfers                                  | Return a list of transfers for an account. |
| [**post_ach_relationships**](FundingApi.md#post_ach_relationships)   | **POST** /accounts/{account_id}/ach_relationships                         | Create an ACH Relationship                 |
| [**post_recipient_banks**](FundingApi.md#post_recipient_banks)       | **POST** /accounts/{account_id}/recipient_banks                           | Create a Bank Relationship for an account  |
| [**post_transfers**](FundingApi.md#post_transfers)                   | **POST** /accounts/{account_id}/transfers                                 | Request a new transfer                     |

# **delete_ach_relationship**

> delete_ach_relationship(account_id, ach_relationship_id)

Delete an existing ACH relationship

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
api_instance = broker_client.FundingApi(broker_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
ach_relationship_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | ACH relationship identifier

try:
    # Delete an existing ACH relationship
    api_instance.delete_ach_relationship(account_id, ach_relationship_id)
except ApiException as e:
    print("Exception when calling FundingApi->delete_ach_relationship: %s\n" % e)
```

### Parameters

| Name                    | Type           | Description                 | Notes |
| ----------------------- | -------------- | --------------------------- | ----- |
| **account_id**          | [**str**](.md) | Account identifier.         |
| **ach_relationship_id** | [**str**](.md) | ACH relationship identifier |

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_recipient_bank**

> delete_recipient_bank(account_id, bank_id)

Delete a Bank Relationship for an account

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
api_instance = broker_client.FundingApi(broker_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
bank_id = 'bank_id_example' # str |

try:
    # Delete a Bank Relationship for an account
    api_instance.delete_recipient_bank(account_id, bank_id)
except ApiException as e:
    print("Exception when calling FundingApi->delete_recipient_bank: %s\n" % e)
```

### Parameters

| Name           | Type           | Description         | Notes |
| -------------- | -------------- | ------------------- | ----- |
| **account_id** | [**str**](.md) | Account identifier. |
| **bank_id**    | **str**        |                     |

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_transfer**

> delete_transfer(account_id, transfer_id)

Request to close a transfer

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
api_instance = broker_client.FundingApi(broker_client.ApiClient(configuration))
account_id = 'account_id_example' # str |
transfer_id = 'transfer_id_example' # str |

try:
    # Request to close a transfer
    api_instance.delete_transfer(account_id, transfer_id)
except ApiException as e:
    print("Exception when calling FundingApi->delete_transfer: %s\n" % e)
```

### Parameters

| Name            | Type    | Description | Notes |
| --------------- | ------- | ----------- | ----- |
| **account_id**  | **str** |             |
| **transfer_id** | **str** |             |

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_ach_relationships**

> list[ACHRelationshipResource] get_ach_relationships(account_id, statuses=statuses)

Retrieve ACH Relationships for an account

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
api_instance = broker_client.FundingApi(broker_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
statuses = 'statuses_example' # str | Comma-separated status values (optional)

try:
    # Retrieve ACH Relationships for an account
    api_response = api_instance.get_ach_relationships(account_id, statuses=statuses)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling FundingApi->get_ach_relationships: %s\n" % e)
```

### Parameters

| Name           | Type           | Description                   | Notes      |
| -------------- | -------------- | ----------------------------- | ---------- |
| **account_id** | [**str**](.md) | Account identifier.           |
| **statuses**   | **str**        | Comma-separated status values | [optional] |

### Return type

[**list[ACHRelationshipResource]**](ACHRelationshipResource.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_recipient_banks**

> list[BankResource] get_recipient_banks(account_id, status=status, bank_name=bank_name)

Retrieve bank relationships for an account

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
api_instance = broker_client.FundingApi(broker_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str |
status = 'status_example' # str |  (optional)
bank_name = 'bank_name_example' # str |  (optional)

try:
    # Retrieve bank relationships for an account
    api_response = api_instance.get_recipient_banks(account_id, status=status, bank_name=bank_name)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling FundingApi->get_recipient_banks: %s\n" % e)
```

### Parameters

| Name           | Type           | Description | Notes      |
| -------------- | -------------- | ----------- | ---------- |
| **account_id** | [**str**](.md) |             |
| **status**     | **str**        |             | [optional] |
| **bank_name**  | **str**        |             | [optional] |

### Return type

[**list[BankResource]**](BankResource.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_transfers**

> list[TransferResource] get_transfers(account_id, direction=direction, limit=limit, offset=offset)

Return a list of transfers for an account.

You can filter requested transfers by values such as direction and status.

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
api_instance = broker_client.FundingApi(broker_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str |
direction = 'direction_example' # str |  (optional)
limit = 1.2 # float |  (optional)
offset = 1.2 # float |  (optional)

try:
    # Return a list of transfers for an account.
    api_response = api_instance.get_transfers(account_id, direction=direction, limit=limit, offset=offset)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling FundingApi->get_transfers: %s\n" % e)
```

### Parameters

| Name           | Type           | Description | Notes      |
| -------------- | -------------- | ----------- | ---------- |
| **account_id** | [**str**](.md) |             |
| **direction**  | **str**        |             | [optional] |
| **limit**      | **float**      |             | [optional] |
| **offset**     | **float**      |             | [optional] |

### Return type

[**list[TransferResource]**](TransferResource.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_ach_relationships**

> ACHRelationshipResource post_ach_relationships(body, account_id)

Create an ACH Relationship

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
api_instance = broker_client.FundingApi(broker_client.ApiClient(configuration))
body = broker_client.ACHRelationshipData() # ACHRelationshipData |
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.

try:
    # Create an ACH Relationship
    api_response = api_instance.post_ach_relationships(body, account_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling FundingApi->post_ach_relationships: %s\n" % e)
```

### Parameters

| Name           | Type                                              | Description         | Notes |
| -------------- | ------------------------------------------------- | ------------------- | ----- |
| **body**       | [**ACHRelationshipData**](ACHRelationshipData.md) |                     |
| **account_id** | [**str**](.md)                                    | Account identifier. |

### Return type

[**ACHRelationshipResource**](ACHRelationshipResource.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_recipient_banks**

> BankResource post_recipient_banks(body, account_id)

Create a Bank Relationship for an account

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
api_instance = broker_client.FundingApi(broker_client.ApiClient(configuration))
body = broker_client.BankData() # BankData |
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.

try:
    # Create a Bank Relationship for an account
    api_response = api_instance.post_recipient_banks(body, account_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling FundingApi->post_recipient_banks: %s\n" % e)
```

### Parameters

| Name           | Type                        | Description         | Notes |
| -------------- | --------------------------- | ------------------- | ----- |
| **body**       | [**BankData**](BankData.md) |                     |
| **account_id** | [**str**](.md)              | Account identifier. |

### Return type

[**BankResource**](BankResource.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_transfers**

> TransferResource post_transfers(body, account_id)

Request a new transfer

This operation allows you to fund an account with virtual money in the sandbox environment.

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
api_instance = broker_client.FundingApi(broker_client.ApiClient(configuration))
body = broker_client.TransferData() # TransferData |
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str |

try:
    # Request a new transfer
    api_response = api_instance.post_transfers(body, account_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling FundingApi->post_transfers: %s\n" % e)
```

### Parameters

| Name           | Type                                | Description | Notes |
| -------------- | ----------------------------------- | ----------- | ----- |
| **body**       | [**TransferData**](TransferData.md) |             |
| **account_id** | [**str**](.md)                      |             |

### Return type

[**TransferResource**](TransferResource.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
