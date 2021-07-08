# swagger_client.DocumentsApi

All URIs are relative to *https://broker-api.sandbox.alpaca.markets/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**accounts_account_id_documents_document_id_download_get**](DocumentsApi.md#accounts_account_id_documents_document_id_download_get) | **GET** /accounts/{account_id}/documents/{document_id}/download | Download a document file that belongs to an account.
[**accounts_account_id_documents_get**](DocumentsApi.md#accounts_account_id_documents_get) | **GET** /accounts/{account_id}/documents | Return a list of account documents.
[**documents_document_id_get**](DocumentsApi.md#documents_document_id_get) | **GET** /documents/{document_id} | Download a document file directly

# **accounts_account_id_documents_document_id_download_get**
> accounts_account_id_documents_document_id_download_get(account_id, document_id)

Download a document file that belongs to an account.

The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found. 

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
api_instance = swagger_client.DocumentsApi(swagger_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
document_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | 

try:
    # Download a document file that belongs to an account.
    api_instance.accounts_account_id_documents_document_id_download_get(account_id, document_id)
except ApiException as e:
    print("Exception when calling DocumentsApi->accounts_account_id_documents_document_id_download_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_id** | [**str**](.md)| Account identifier. | 
 **document_id** | [**str**](.md)|  | 

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **accounts_account_id_documents_get**
> list[InlineResponse2004] accounts_account_id_documents_get(account_id, start_date=start_date, end_date=end_date)

Return a list of account documents.

You can query account documents such as monthly  statements and trade confirms under an account. 

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
api_instance = swagger_client.DocumentsApi(swagger_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
start_date = '2013-10-20' # date | optional date value to filter the list (inclusive). (optional)
end_date = '2013-10-20' # date | optional date value to filter the list (inclusive). (optional)

try:
    # Return a list of account documents.
    api_response = api_instance.accounts_account_id_documents_get(account_id, start_date=start_date, end_date=end_date)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DocumentsApi->accounts_account_id_documents_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_id** | [**str**](.md)| Account identifier. | 
 **start_date** | **date**| optional date value to filter the list (inclusive). | [optional] 
 **end_date** | **date**| optional date value to filter the list (inclusive). | [optional] 

### Return type

[**list[InlineResponse2004]**](InlineResponse2004.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **documents_document_id_get**
> documents_document_id_get(document_id)

Download a document file directly

The operation returns a pre-signed downloadable link as a redirect with HTTP status code 301 if one is found. 

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
api_instance = swagger_client.DocumentsApi(swagger_client.ApiClient(configuration))
document_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | 

try:
    # Download a document file directly
    api_instance.documents_document_id_get(document_id)
except ApiException as e:
    print("Exception when calling DocumentsApi->documents_document_id_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **document_id** | [**str**](.md)|  | 

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

