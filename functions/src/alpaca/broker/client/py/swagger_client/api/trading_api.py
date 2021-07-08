# coding: utf-8

"""
    Alpaca Broker API

    Open brokerage accounts, enable commission-free trading, and manage the ongoing user experience with Alpaca Broker API  # noqa: E501

    OpenAPI spec version: 1.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

from __future__ import absolute_import

import re  # noqa: F401

# python 2 and python 3 compatibility library
import six

from swagger_client.api_client import ApiClient


class TradingApi(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    Ref: https://github.com/swagger-api/swagger-codegen
    """

    def __init__(self, api_client=None):
        if api_client is None:
            api_client = ApiClient()
        self.api_client = api_client

    def delete_order(self, account_id, order_id, **kwargs):  # noqa: E501
        """Attempts to cancel an open order.  # noqa: E501

        Attempts to cancel an open order.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_order(account_id, order_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str order_id: Order identifier. (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.delete_order_with_http_info(account_id, order_id, **kwargs)  # noqa: E501
        else:
            (data) = self.delete_order_with_http_info(account_id, order_id, **kwargs)  # noqa: E501
            return data

    def delete_order_with_http_info(self, account_id, order_id, **kwargs):  # noqa: E501
        """Attempts to cancel an open order.  # noqa: E501

        Attempts to cancel an open order.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_order_with_http_info(account_id, order_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str order_id: Order identifier. (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['account_id', 'order_id']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method delete_order" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `delete_order`")  # noqa: E501
        # verify the required parameter 'order_id' is set
        if ('order_id' not in params or
                params['order_id'] is None):
            raise ValueError("Missing the required parameter `order_id` when calling `delete_order`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501
        if 'order_id' in params:
            path_params['order_id'] = params['order_id']  # noqa: E501

        query_params = []

        header_params = {}

        form_params = []
        local_var_files = {}

        body_params = None
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = ['BasicAuth']  # noqa: E501

        return self.api_client.call_api(
            '/trading/accounts/{account_id}/orders/{order_id}', 'DELETE',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type=None,  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def delete_orders(self, account_id, **kwargs):  # noqa: E501
        """Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.  # noqa: E501

        Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_orders(account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :return: list[InlineResponse207]
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.delete_orders_with_http_info(account_id, **kwargs)  # noqa: E501
        else:
            (data) = self.delete_orders_with_http_info(account_id, **kwargs)  # noqa: E501
            return data

    def delete_orders_with_http_info(self, account_id, **kwargs):  # noqa: E501
        """Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.  # noqa: E501

        Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_orders_with_http_info(account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :return: list[InlineResponse207]
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['account_id']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method delete_orders" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `delete_orders`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501

        query_params = []

        header_params = {}

        form_params = []
        local_var_files = {}

        body_params = None
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = ['BasicAuth']  # noqa: E501

        return self.api_client.call_api(
            '/trading/accounts/{account_id}/orders', 'DELETE',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='list[InlineResponse207]',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def get_order(self, account_id, order_id, **kwargs):  # noqa: E501
        """Retrieves a single order for the given order_id.  # noqa: E501

        Retrieves a single order for the given order_id.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_order(account_id, order_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str order_id: Order identifier. (required)
        :return: OrderObject
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.get_order_with_http_info(account_id, order_id, **kwargs)  # noqa: E501
        else:
            (data) = self.get_order_with_http_info(account_id, order_id, **kwargs)  # noqa: E501
            return data

    def get_order_with_http_info(self, account_id, order_id, **kwargs):  # noqa: E501
        """Retrieves a single order for the given order_id.  # noqa: E501

        Retrieves a single order for the given order_id.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_order_with_http_info(account_id, order_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str order_id: Order identifier. (required)
        :return: OrderObject
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['account_id', 'order_id']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method get_order" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `get_order`")  # noqa: E501
        # verify the required parameter 'order_id' is set
        if ('order_id' not in params or
                params['order_id'] is None):
            raise ValueError("Missing the required parameter `order_id` when calling `get_order`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501
        if 'order_id' in params:
            path_params['order_id'] = params['order_id']  # noqa: E501

        query_params = []

        header_params = {}

        form_params = []
        local_var_files = {}

        body_params = None
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = ['BasicAuth']  # noqa: E501

        return self.api_client.call_api(
            '/trading/accounts/{account_id}/orders/{order_id}', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='OrderObject',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def get_orders(self, account_id, **kwargs):  # noqa: E501
        """Retrieves a list of orders for the account, filtered by the supplied query parameters.  # noqa: E501

        Retrieves a list of orders for the account, filtered by the supplied query parameters.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_orders(account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str status: Status of the orders to list.
        :param int limit: The maximum number of orders in response.
        :param datetime after: The response will include only ones submitted after this timestamp (exclusive.)
        :param datetime until: The response will include only ones submitted until this timestamp (exclusive.)
        :param str direction: The chronological order of response based on the submission time. asc or desc. Defaults to desc.
        :param bool nested: If true, the result will roll up multi-leg orders under the legs field of primary order.
        :param str symbols: A comma-separated list of symbols to filter by.
        :return: list[OrderObject]
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.get_orders_with_http_info(account_id, **kwargs)  # noqa: E501
        else:
            (data) = self.get_orders_with_http_info(account_id, **kwargs)  # noqa: E501
            return data

    def get_orders_with_http_info(self, account_id, **kwargs):  # noqa: E501
        """Retrieves a list of orders for the account, filtered by the supplied query parameters.  # noqa: E501

        Retrieves a list of orders for the account, filtered by the supplied query parameters.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_orders_with_http_info(account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str status: Status of the orders to list.
        :param int limit: The maximum number of orders in response.
        :param datetime after: The response will include only ones submitted after this timestamp (exclusive.)
        :param datetime until: The response will include only ones submitted until this timestamp (exclusive.)
        :param str direction: The chronological order of response based on the submission time. asc or desc. Defaults to desc.
        :param bool nested: If true, the result will roll up multi-leg orders under the legs field of primary order.
        :param str symbols: A comma-separated list of symbols to filter by.
        :return: list[OrderObject]
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['account_id', 'status', 'limit', 'after', 'until', 'direction', 'nested', 'symbols']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method get_orders" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `get_orders`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501

        query_params = []
        if 'status' in params:
            query_params.append(('status', params['status']))  # noqa: E501
        if 'limit' in params:
            query_params.append(('limit', params['limit']))  # noqa: E501
        if 'after' in params:
            query_params.append(('after', params['after']))  # noqa: E501
        if 'until' in params:
            query_params.append(('until', params['until']))  # noqa: E501
        if 'direction' in params:
            query_params.append(('direction', params['direction']))  # noqa: E501
        if 'nested' in params:
            query_params.append(('nested', params['nested']))  # noqa: E501
        if 'symbols' in params:
            query_params.append(('symbols', params['symbols']))  # noqa: E501

        header_params = {}

        form_params = []
        local_var_files = {}

        body_params = None
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = ['BasicAuth']  # noqa: E501

        return self.api_client.call_api(
            '/trading/accounts/{account_id}/orders', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='list[OrderObject]',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def patch_order(self, body, account_id, order_id, **kwargs):  # noqa: E501
        """Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.  # noqa: E501

        Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.patch_order(body, account_id, order_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param PatchOrder body: (required)
        :param str account_id: Account identifier. (required)
        :param str order_id: Order identifier. (required)
        :return: PortfolioHistory
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.patch_order_with_http_info(body, account_id, order_id, **kwargs)  # noqa: E501
        else:
            (data) = self.patch_order_with_http_info(body, account_id, order_id, **kwargs)  # noqa: E501
            return data

    def patch_order_with_http_info(self, body, account_id, order_id, **kwargs):  # noqa: E501
        """Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.  # noqa: E501

        Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.patch_order_with_http_info(body, account_id, order_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param PatchOrder body: (required)
        :param str account_id: Account identifier. (required)
        :param str order_id: Order identifier. (required)
        :return: PortfolioHistory
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['body', 'account_id', 'order_id']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method patch_order" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'body' is set
        if ('body' not in params or
                params['body'] is None):
            raise ValueError("Missing the required parameter `body` when calling `patch_order`")  # noqa: E501
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `patch_order`")  # noqa: E501
        # verify the required parameter 'order_id' is set
        if ('order_id' not in params or
                params['order_id'] is None):
            raise ValueError("Missing the required parameter `order_id` when calling `patch_order`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501
        if 'order_id' in params:
            path_params['order_id'] = params['order_id']  # noqa: E501

        query_params = []

        header_params = {}

        form_params = []
        local_var_files = {}

        body_params = None
        if 'body' in params:
            body_params = params['body']
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # HTTP header `Content-Type`
        header_params['Content-Type'] = self.api_client.select_header_content_type(  # noqa: E501
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = ['BasicAuth']  # noqa: E501

        return self.api_client.call_api(
            '/trading/accounts/{account_id}/orders/{order_id}', 'PATCH',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='PortfolioHistory',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def post_orders(self, body, account_id, **kwargs):  # noqa: E501
        """Create an order for an account.  # noqa: E501

        Create an order for an account.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.post_orders(body, account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param CreateOrder body: (required)
        :param str account_id: Account identifier. (required)
        :return: OrderObject
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.post_orders_with_http_info(body, account_id, **kwargs)  # noqa: E501
        else:
            (data) = self.post_orders_with_http_info(body, account_id, **kwargs)  # noqa: E501
            return data

    def post_orders_with_http_info(self, body, account_id, **kwargs):  # noqa: E501
        """Create an order for an account.  # noqa: E501

        Create an order for an account.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.post_orders_with_http_info(body, account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param CreateOrder body: (required)
        :param str account_id: Account identifier. (required)
        :return: OrderObject
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['body', 'account_id']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method post_orders" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'body' is set
        if ('body' not in params or
                params['body'] is None):
            raise ValueError("Missing the required parameter `body` when calling `post_orders`")  # noqa: E501
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `post_orders`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501

        query_params = []

        header_params = {}

        form_params = []
        local_var_files = {}

        body_params = None
        if 'body' in params:
            body_params = params['body']
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # HTTP header `Content-Type`
        header_params['Content-Type'] = self.api_client.select_header_content_type(  # noqa: E501
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = ['BasicAuth']  # noqa: E501

        return self.api_client.call_api(
            '/trading/accounts/{account_id}/orders', 'POST',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='OrderObject',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)
