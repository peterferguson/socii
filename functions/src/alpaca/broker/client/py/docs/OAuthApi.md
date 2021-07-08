# swagger_client.OAuthApi

All URIs are relative to *https://broker-api.sandbox.alpaca.markets/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**oauth_authorize_post**](OAuthApi.md#oauth_authorize_post) | **POST** /oauth/authorize | Issue a code.
[**oauth_clients_client_id_get**](OAuthApi.md#oauth_clients_client_id_get) | **GET** /oauth/clients/{client_id} | Returns an OAuth client.
[**oauth_token_post**](OAuthApi.md#oauth_token_post) | **POST** /oauth/token | Issue a token.

# **oauth_authorize_post**
> InlineResponse2009 oauth_authorize_post(body)

Issue a code.

The operation issues an OAuth code which can be used in the OAuth code flow. 

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
api_instance = swagger_client.OAuthApi(swagger_client.ApiClient(configuration))
body = swagger_client.Body1() # Body1 | 

try:
    # Issue a code.
    api_response = api_instance.oauth_authorize_post(body)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling OAuthApi->oauth_authorize_post: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Body1**](Body1.md)|  | 

### Return type

[**InlineResponse2009**](InlineResponse2009.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **oauth_clients_client_id_get**
> InlineResponse2007 oauth_clients_client_id_get(client_id, response_type=response_type, redirect_uri=redirect_uri, scope=scope)

Returns an OAuth client.

The endpoint returns the details of OAuth client to display in the authorization page. 

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
api_instance = swagger_client.OAuthApi(swagger_client.ApiClient(configuration))
client_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | 
response_type = 'response_type_example' # str |  (optional)
redirect_uri = 'redirect_uri_example' # str |  (optional)
scope = 'scope_example' # str |  (optional)

try:
    # Returns an OAuth client.
    api_response = api_instance.oauth_clients_client_id_get(client_id, response_type=response_type, redirect_uri=redirect_uri, scope=scope)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling OAuthApi->oauth_clients_client_id_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **client_id** | [**str**](.md)|  | 
 **response_type** | **str**|  | [optional] 
 **redirect_uri** | **str**|  | [optional] 
 **scope** | **str**|  | [optional] 

### Return type

[**InlineResponse2007**](InlineResponse2007.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **oauth_token_post**
> InlineResponse2008 oauth_token_post(body)

Issue a token.

This operation issues an access token for an account. 

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
api_instance = swagger_client.OAuthApi(swagger_client.ApiClient(configuration))
body = swagger_client.Body() # Body | 

try:
    # Issue a token.
    api_response = api_instance.oauth_token_post(body)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling OAuthApi->oauth_token_post: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Body**](Body.md)|  | 

### Return type

[**InlineResponse2008**](InlineResponse2008.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

