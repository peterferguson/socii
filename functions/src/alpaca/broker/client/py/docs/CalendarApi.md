# swagger_client.CalendarApi

All URIs are relative to *https://broker-api.sandbox.alpaca.markets/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**calendar_get**](CalendarApi.md#calendar_get) | **GET** /calendar | Query market calendar

# **calendar_get**
> InlineResponse2002 calendar_get(start=start, end=end)

Query market calendar

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
api_instance = swagger_client.CalendarApi(swagger_client.ApiClient(configuration))
start = 'start_example' # str | The first date to retrieve data for. (Inclusive) (optional)
end = 'end_example' # str | The last date to retrieve data for. (Inclusive) (optional)

try:
    # Query market calendar
    api_response = api_instance.calendar_get(start=start, end=end)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling CalendarApi->calendar_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **start** | **str**| The first date to retrieve data for. (Inclusive) | [optional] 
 **end** | **str**| The last date to retrieve data for. (Inclusive) | [optional] 

### Return type

[**InlineResponse2002**](InlineResponse2002.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

