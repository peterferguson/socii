# swagger_client.AssetsApi

All URIs are relative to *https://broker-api.sandbox.alpaca.markets/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**assets_asset_id_get**](AssetsApi.md#assets_asset_id_get) | **GET** /assets/{asset_id} | Retrieve an asset by UUID
[**assets_get**](AssetsApi.md#assets_get) | **GET** /assets | Retrieve all assets
[**assets_symbol_get**](AssetsApi.md#assets_symbol_get) | **GET** /assets/{symbol} | Retrieve an asset by symbol

# **assets_asset_id_get**
> assets_asset_id_get(asset_id)

Retrieve an asset by UUID

Returns the requested asset, if found

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
api_instance = swagger_client.AssetsApi(swagger_client.ApiClient(configuration))
asset_id = 'asset_id_example' # str | The UUID of the required asset

try:
    # Retrieve an asset by UUID
    api_instance.assets_asset_id_get(asset_id)
except ApiException as e:
    print("Exception when calling AssetsApi->assets_asset_id_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **asset_id** | **str**| The UUID of the required asset | 

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **assets_get**
> InlineResponse2001 assets_get()

Retrieve all assets

Returns all assets

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
api_instance = swagger_client.AssetsApi(swagger_client.ApiClient(configuration))

try:
    # Retrieve all assets
    api_response = api_instance.assets_get()
    pprint(api_response)
except ApiException as e:
    print("Exception when calling AssetsApi->assets_get: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **assets_symbol_get**
> assets_symbol_get(symbol)

Retrieve an asset by symbol

Returns the requested asset, if found

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
api_instance = swagger_client.AssetsApi(swagger_client.ApiClient(configuration))
symbol = 'symbol_example' # str | The symbol of the required asset

try:
    # Retrieve an asset by symbol
    api_instance.assets_symbol_get(symbol)
except ApiException as e:
    print("Exception when calling AssetsApi->assets_symbol_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **symbol** | **str**| The symbol of the required asset | 

### Return type

void (empty response body)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

