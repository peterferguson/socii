# swagger_client.AccountsApi

All URIs are relative to *https://broker-api.sandbox.alpaca.markets/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**accounts_account_id_documents_upload_post**](AccountsApi.md#accounts_account_id_documents_upload_post) | **POST** /accounts/{account_id}/documents/upload | Upload a document to an already existing account
[**accounts_activities_activity_type_get**](AccountsApi.md#accounts_activities_activity_type_get) | **GET** /accounts/activities/{activity_type} | Retrieve specific account activities
[**accounts_activities_get**](AccountsApi.md#accounts_activities_get) | **GET** /accounts/activities | Retrieve account activities
[**accounts_get**](AccountsApi.md#accounts_get) | **GET** /accounts | Retrieve all accounts
[**accounts_post**](AccountsApi.md#accounts_post) | **POST** /accounts | Create an account
[**delete_account**](AccountsApi.md#delete_account) | **DELETE** /accounts/{account_id} | Request to close an account
[**delete_ach_relationship**](AccountsApi.md#delete_ach_relationship) | **DELETE** /accounts/{account_id}/ach_relationships/{ach_relationship_id} | Delete an existing ACH relationship
[**delete_recipient_bank**](AccountsApi.md#delete_recipient_bank) | **DELETE** /accounts/{account_id}/recipient_banks/{bank_id} | Delete a Bank Relationship for an account
[**delete_transfer**](AccountsApi.md#delete_transfer) | **DELETE** /accounts/{account_id}/transfers/{transfer_id} | Request to close a transfer
[**events_accounts_status_get**](AccountsApi.md#events_accounts_status_get) | **GET** /events/accounts/status | Subscribe to account status events (SSE).
[**get_account**](AccountsApi.md#get_account) | **GET** /accounts/{account_id} | Retrieve an account.
[**get_ach_relationships**](AccountsApi.md#get_ach_relationships) | **GET** /accounts/{account_id}/ach_relationships | Retrieve ACH Relationships for an account
[**get_recipient_banks**](AccountsApi.md#get_recipient_banks) | **GET** /accounts/{account_id}/recipient_banks | Retrieve bank relationships for an account
[**get_trading_account**](AccountsApi.md#get_trading_account) | **GET** /trading/accounts/{account_id}/account | Retrieve trading details for an account.
[**get_transfers**](AccountsApi.md#get_transfers) | **GET** /accounts/{account_id}/transfers | Return a list of transfers for an account.
[**patch_account**](AccountsApi.md#patch_account) | **PATCH** /accounts/{account_id} | Update an account
[**post_ach_relationships**](AccountsApi.md#post_ach_relationships) | **POST** /accounts/{account_id}/ach_relationships | Create an ACH Relationship
[**post_recipient_banks**](AccountsApi.md#post_recipient_banks) | **POST** /accounts/{account_id}/recipient_banks | Create a Bank Relationship for an account
[**post_transfers**](AccountsApi.md#post_transfers) | **POST** /accounts/{account_id}/transfers | Request a new transfer

# **accounts_account_id_documents_upload_post**
> accounts_account_id_documents_upload_post(body, account_id)

Upload a document to an already existing account

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
body = swagger_client.DocumentUpload() # DocumentUpload | 
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.

try:
    # Upload a document to an already existing account
    api_instance.accounts_account_id_documents_upload_post(body, account_id)
except ApiException as e:
    print("Exception when calling AccountsApi->accounts_account_id_documents_upload_post: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**DocumentUpload**](DocumentUpload.md)|  | 
 **account_id** | [**str**](.md)| Account identifier. | 

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **accounts_activities_activity_type_get**
> InlineResponse20010 accounts_activities_activity_type_get(activity_type)

Retrieve specific account activities

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
activity_type = 'activity_type_example' # str | 

try:
    # Retrieve specific account activities
    api_response = api_instance.accounts_activities_activity_type_get(activity_type)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->accounts_activities_activity_type_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activity_type** | [**str**](.md)|  | 

### Return type

[**InlineResponse20010**](InlineResponse20010.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **accounts_activities_get**
> InlineResponse20010 accounts_activities_get(activity_type=activity_type, _date=_date, until=until)

Retrieve account activities

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
activity_type = 'activity_type_example' # str | The type of activity you wish to query (optional)
_date = '_date_example' # str |  (optional)
until = 'until_example' # str |  (optional)

try:
    # Retrieve account activities
    api_response = api_instance.accounts_activities_get(activity_type=activity_type, _date=_date, until=until)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->accounts_activities_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activity_type** | [**str**](.md)| The type of activity you wish to query | [optional] 
 **_date** | **str**|  | [optional] 
 **until** | **str**|  | [optional] 

### Return type

[**InlineResponse20010**](InlineResponse20010.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **accounts_get**
> list[Account] accounts_get(query=query)

Retrieve all accounts

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
query = 'query_example' # str | The query supports partial match of account number, names, emails, etc.. Items can be space delimited.  (optional)

try:
    # Retrieve all accounts
    api_response = api_instance.accounts_get(query=query)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->accounts_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **query** | **str**| The query supports partial match of account number, names, emails, etc.. Items can be space delimited.  | [optional] 

### Return type

[**list[Account]**](Account.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **accounts_post**
> Account accounts_post(body)

Create an account

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
body = swagger_client.AccountCreationObject() # AccountCreationObject | 

try:
    # Create an account
    api_response = api_instance.accounts_post(body)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->accounts_post: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AccountCreationObject**](AccountCreationObject.md)|  | 

### Return type

[**Account**](Account.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_account**
> delete_account(account_id)

Request to close an account

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.

try:
    # Request to close an account
    api_instance.delete_account(account_id)
except ApiException as e:
    print("Exception when calling AccountsApi->delete_account: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_id** | [**str**](.md)| Account identifier. | 

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_ach_relationship**
> delete_ach_relationship(account_id, ach_relationship_id)

Delete an existing ACH relationship

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
ach_relationship_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | ACH relationship identifier

try:
    # Delete an existing ACH relationship
    api_instance.delete_ach_relationship(account_id, ach_relationship_id)
except ApiException as e:
    print("Exception when calling AccountsApi->delete_ach_relationship: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_id** | [**str**](.md)| Account identifier. | 
 **ach_relationship_id** | [**str**](.md)| ACH relationship identifier | 

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
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
bank_id = 'bank_id_example' # str | 

try:
    # Delete a Bank Relationship for an account
    api_instance.delete_recipient_bank(account_id, bank_id)
except ApiException as e:
    print("Exception when calling AccountsApi->delete_recipient_bank: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_id** | [**str**](.md)| Account identifier. | 
 **bank_id** | **str**|  | 

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
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
account_id = 'account_id_example' # str | 
transfer_id = 'transfer_id_example' # str | 

try:
    # Request to close a transfer
    api_instance.delete_transfer(account_id, transfer_id)
except ApiException as e:
    print("Exception when calling AccountsApi->delete_transfer: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_id** | **str**|  | 
 **transfer_id** | **str**|  | 

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **events_accounts_status_get**
> InlineResponse2005 events_accounts_status_get(since=since, until=until, since_id=since_id, until_id=until_id)

Subscribe to account status events (SSE).

Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200) 

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
since = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
until = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
since_id = 56 # int |  (optional)
until_id = 56 # int |  (optional)

try:
    # Subscribe to account status events (SSE).
    api_response = api_instance.events_accounts_status_get(since=since, until=until, since_id=since_id, until_id=until_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->events_accounts_status_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **since** | **datetime**|  | [optional] 
 **until** | **datetime**|  | [optional] 
 **since_id** | **int**|  | [optional] 
 **until_id** | **int**|  | [optional] 

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_account**
> AccountExtended get_account(account_id)

Retrieve an account.

The response is an Account model.

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.

try:
    # Retrieve an account.
    api_response = api_instance.get_account(account_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->get_account: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_id** | [**str**](.md)| Account identifier. | 

### Return type

[**AccountExtended**](AccountExtended.md)

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
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
statuses = 'statuses_example' # str | Comma-separated status values (optional)

try:
    # Retrieve ACH Relationships for an account
    api_response = api_instance.get_ach_relationships(account_id, statuses=statuses)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->get_ach_relationships: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_id** | [**str**](.md)| Account identifier. | 
 **statuses** | **str**| Comma-separated status values | [optional] 

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
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | 
status = 'status_example' # str |  (optional)
bank_name = 'bank_name_example' # str |  (optional)

try:
    # Retrieve bank relationships for an account
    api_response = api_instance.get_recipient_banks(account_id, status=status, bank_name=bank_name)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->get_recipient_banks: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_id** | [**str**](.md)|  | 
 **status** | **str**|  | [optional] 
 **bank_name** | **str**|  | [optional] 

### Return type

[**list[BankResource]**](BankResource.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_trading_account**
> InlineResponse200 get_trading_account(account_id)

Retrieve trading details for an account.

The response is a Trading Account model.

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.

try:
    # Retrieve trading details for an account.
    api_response = api_instance.get_trading_account(account_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->get_trading_account: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_id** | [**str**](.md)| Account identifier. | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

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
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | 
direction = 'direction_example' # str |  (optional)
limit = 1.2 # float |  (optional)
offset = 1.2 # float |  (optional)

try:
    # Return a list of transfers for an account.
    api_response = api_instance.get_transfers(account_id, direction=direction, limit=limit, offset=offset)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->get_transfers: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_id** | [**str**](.md)|  | 
 **direction** | **str**|  | [optional] 
 **limit** | **float**|  | [optional] 
 **offset** | **float**|  | [optional] 

### Return type

[**list[TransferResource]**](TransferResource.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **patch_account**
> Account patch_account(body, account_id)

Update an account

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
body = swagger_client.AccountUpdate() # AccountUpdate | 
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.

try:
    # Update an account
    api_response = api_instance.patch_account(body, account_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->patch_account: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AccountUpdate**](AccountUpdate.md)|  | 
 **account_id** | [**str**](.md)| Account identifier. | 

### Return type

[**Account**](Account.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_ach_relationships**
> ACHRelationshipResource post_ach_relationships(body, account_id)

Create an ACH Relationship

### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
body = swagger_client.ACHRelationshipData() # ACHRelationshipData | 
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.

try:
    # Create an ACH Relationship
    api_response = api_instance.post_ach_relationships(body, account_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->post_ach_relationships: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ACHRelationshipData**](ACHRelationshipData.md)|  | 
 **account_id** | [**str**](.md)| Account identifier. | 

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
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
body = swagger_client.BankData() # BankData | 
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.

try:
    # Create a Bank Relationship for an account
    api_response = api_instance.post_recipient_banks(body, account_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->post_recipient_banks: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**BankData**](BankData.md)|  | 
 **account_id** | [**str**](.md)| Account identifier. | 

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
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# Configure HTTP basic authorization: BasicAuth
configuration = swagger_client.Configuration()
configuration.username = 'YOUR_USERNAME'
configuration.password = 'YOUR_PASSWORD'

# create an instance of the API class
api_instance = swagger_client.AccountsApi(swagger_client.ApiClient(configuration))
body = swagger_client.TransferData() # TransferData | 
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | 

try:
    # Request a new transfer
    api_response = api_instance.post_transfers(body, account_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AccountsApi->post_transfers: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**TransferData**](TransferData.md)|  | 
 **account_id** | [**str**](.md)|  | 

### Return type

[**TransferResource**](TransferResource.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

