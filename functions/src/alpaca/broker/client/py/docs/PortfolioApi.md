# broker_client.PortfolioApi

All URIs are relative to *https://broker-api.sandbox.alpaca.markets/v1*

| Method                                                             | HTTP request                                                     | Description                                                                                      |
| ------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [**get_portfolio_history**](PortfolioApi.md#get_portfolio_history) | **GET** /trading/accounts/{account_id}/account/portfolio/history | Returns timeseries data about equity and profit/loss (P/L) of the account in requested timespan. |

# **get_portfolio_history**

> PortfolioHistory get_portfolio_history(account_id, period=period, timeframe=timeframe, date_end=date_end, extended_hours=extended_hours)

Returns timeseries data about equity and profit/loss (P/L) of the account in requested timespan.

Returns timeseries data about equity and profit/loss (P/L) of the account in requested timespan.

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
api_instance = broker_client.PortfolioApi(broker_client.ApiClient(configuration))
account_id = '38400000-8cf0-11bd-b23e-10b96e4ef00d' # str | Account identifier.
period = 'period_example' # str | The duration of the data in number + unit, such as `1D`, where unit; can be `D` for day, `W` for week, `M` for month and `A` for year. Defaults to `1M` (optional)
timeframe = 'timeframe_example' # str | The resolution of time window. `1Min`, `5Min`, `15Min`, `1H`, or `1D`. If omitted, `1Min` for less than 7 days period, `15Min` for less than 30 days, or otherwise `1D`. (optional)
date_end = '2013-10-20' # date | The date the data is returned up to, in \"YYYY-MM-DD\" format. Defaults to the current market date (rolls over at the market open if `extended_hours` is false, otherwise at 7am ET) (optional)
extended_hours = true # bool | If true, include extended hours in the result. This is effective only for timeframe less than `1D`. (optional)

try:
    # Returns timeseries data about equity and profit/loss (P/L) of the account in requested timespan.
    api_response = api_instance.get_portfolio_history(account_id, period=period, timeframe=timeframe, date_end=date_end, extended_hours=extended_hours)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling PortfolioApi->get_portfolio_history: %s\n" % e)
```

### Parameters

| Name               | Type           | Description                                                                                                                                                                                                                                              | Notes      |
| ------------------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **account_id**     | [**str**](.md) | Account identifier.                                                                                                                                                                                                                                      |
| **period**         | **str**        | The duration of the data in number + unit, such as &#x60;1D&#x60;, where unit; can be &#x60;D&#x60; for day, &#x60;W&#x60; for week, &#x60;M&#x60; for month and &#x60;A&#x60; for year. Defaults to &#x60;1M&#x60;                                      | [optional] |
| **timeframe**      | **str**        | The resolution of time window. &#x60;1Min&#x60;, &#x60;5Min&#x60;, &#x60;15Min&#x60;, &#x60;1H&#x60;, or &#x60;1D&#x60;. If omitted, &#x60;1Min&#x60; for less than 7 days period, &#x60;15Min&#x60; for less than 30 days, or otherwise &#x60;1D&#x60;. | [optional] |
| **date_end**       | **date**       | The date the data is returned up to, in \&quot;YYYY-MM-DD\&quot; format. Defaults to the current market date (rolls over at the market open if &#x60;extended_hours&#x60; is false, otherwise at 7am ET)                                                 | [optional] |
| **extended_hours** | **bool**       | If true, include extended hours in the result. This is effective only for timeframe less than &#x60;1D&#x60;.                                                                                                                                            | [optional] |

### Return type

[**PortfolioHistory**](PortfolioHistory.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
