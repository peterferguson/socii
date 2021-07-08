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


class FundingApi(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    Ref: https://github.com/swagger-api/swagger-codegen
    """

    def __init__(self, api_client=None):
        if api_client is None:
            api_client = ApiClient()
        self.api_client = api_client

    def delete_ach_relationship(self, account_id, ach_relationship_id, **kwargs):  # noqa: E501
        """Delete an existing ACH relationship  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_ach_relationship(account_id, ach_relationship_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str ach_relationship_id: ACH relationship identifier (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.delete_ach_relationship_with_http_info(account_id, ach_relationship_id, **kwargs)  # noqa: E501
        else:
            (data) = self.delete_ach_relationship_with_http_info(account_id, ach_relationship_id, **kwargs)  # noqa: E501
            return data

    def delete_ach_relationship_with_http_info(self, account_id, ach_relationship_id, **kwargs):  # noqa: E501
        """Delete an existing ACH relationship  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_ach_relationship_with_http_info(account_id, ach_relationship_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str ach_relationship_id: ACH relationship identifier (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['account_id', 'ach_relationship_id']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method delete_ach_relationship" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `delete_ach_relationship`")  # noqa: E501
        # verify the required parameter 'ach_relationship_id' is set
        if ('ach_relationship_id' not in params or
                params['ach_relationship_id'] is None):
            raise ValueError("Missing the required parameter `ach_relationship_id` when calling `delete_ach_relationship`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501
        if 'ach_relationship_id' in params:
            path_params['ach_relationship_id'] = params['ach_relationship_id']  # noqa: E501

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
            '/accounts/{account_id}/ach_relationships/{ach_relationship_id}', 'DELETE',
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

    def delete_recipient_bank(self, account_id, bank_id, **kwargs):  # noqa: E501
        """Delete a Bank Relationship for an account  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_recipient_bank(account_id, bank_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str bank_id: (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.delete_recipient_bank_with_http_info(account_id, bank_id, **kwargs)  # noqa: E501
        else:
            (data) = self.delete_recipient_bank_with_http_info(account_id, bank_id, **kwargs)  # noqa: E501
            return data

    def delete_recipient_bank_with_http_info(self, account_id, bank_id, **kwargs):  # noqa: E501
        """Delete a Bank Relationship for an account  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_recipient_bank_with_http_info(account_id, bank_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str bank_id: (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['account_id', 'bank_id']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method delete_recipient_bank" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `delete_recipient_bank`")  # noqa: E501
        # verify the required parameter 'bank_id' is set
        if ('bank_id' not in params or
                params['bank_id'] is None):
            raise ValueError("Missing the required parameter `bank_id` when calling `delete_recipient_bank`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501
        if 'bank_id' in params:
            path_params['bank_id'] = params['bank_id']  # noqa: E501

        query_params = []

        header_params = {}

        form_params = []
        local_var_files = {}

        body_params = None
        # Authentication setting
        auth_settings = ['BasicAuth']  # noqa: E501

        return self.api_client.call_api(
            '/accounts/{account_id}/recipient_banks/{bank_id}', 'DELETE',
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

    def delete_transfer(self, account_id, transfer_id, **kwargs):  # noqa: E501
        """Request to close a transfer  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_transfer(account_id, transfer_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: (required)
        :param str transfer_id: (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.delete_transfer_with_http_info(account_id, transfer_id, **kwargs)  # noqa: E501
        else:
            (data) = self.delete_transfer_with_http_info(account_id, transfer_id, **kwargs)  # noqa: E501
            return data

    def delete_transfer_with_http_info(self, account_id, transfer_id, **kwargs):  # noqa: E501
        """Request to close a transfer  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_transfer_with_http_info(account_id, transfer_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: (required)
        :param str transfer_id: (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['account_id', 'transfer_id']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method delete_transfer" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `delete_transfer`")  # noqa: E501
        # verify the required parameter 'transfer_id' is set
        if ('transfer_id' not in params or
                params['transfer_id'] is None):
            raise ValueError("Missing the required parameter `transfer_id` when calling `delete_transfer`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501
        if 'transfer_id' in params:
            path_params['transfer_id'] = params['transfer_id']  # noqa: E501

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
            '/accounts/{account_id}/transfers/{transfer_id}', 'DELETE',
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

    def get_ach_relationships(self, account_id, **kwargs):  # noqa: E501
        """Retrieve ACH Relationships for an account  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_ach_relationships(account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str statuses: Comma-separated status values
        :return: list[ACHRelationshipResource]
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.get_ach_relationships_with_http_info(account_id, **kwargs)  # noqa: E501
        else:
            (data) = self.get_ach_relationships_with_http_info(account_id, **kwargs)  # noqa: E501
            return data

    def get_ach_relationships_with_http_info(self, account_id, **kwargs):  # noqa: E501
        """Retrieve ACH Relationships for an account  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_ach_relationships_with_http_info(account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: Account identifier. (required)
        :param str statuses: Comma-separated status values
        :return: list[ACHRelationshipResource]
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['account_id', 'statuses']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method get_ach_relationships" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `get_ach_relationships`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501

        query_params = []
        if 'statuses' in params:
            query_params.append(('statuses', params['statuses']))  # noqa: E501

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
            '/accounts/{account_id}/ach_relationships', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='list[ACHRelationshipResource]',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def get_recipient_banks(self, account_id, **kwargs):  # noqa: E501
        """Retrieve bank relationships for an account  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_recipient_banks(account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: (required)
        :param str status:
        :param str bank_name:
        :return: list[BankResource]
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.get_recipient_banks_with_http_info(account_id, **kwargs)  # noqa: E501
        else:
            (data) = self.get_recipient_banks_with_http_info(account_id, **kwargs)  # noqa: E501
            return data

    def get_recipient_banks_with_http_info(self, account_id, **kwargs):  # noqa: E501
        """Retrieve bank relationships for an account  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_recipient_banks_with_http_info(account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: (required)
        :param str status:
        :param str bank_name:
        :return: list[BankResource]
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['account_id', 'status', 'bank_name']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method get_recipient_banks" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `get_recipient_banks`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501

        query_params = []
        if 'status' in params:
            query_params.append(('status', params['status']))  # noqa: E501
        if 'bank_name' in params:
            query_params.append(('bank_name', params['bank_name']))  # noqa: E501

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
            '/accounts/{account_id}/recipient_banks', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='list[BankResource]',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def get_transfers(self, account_id, **kwargs):  # noqa: E501
        """Return a list of transfers for an account.  # noqa: E501

        You can filter requested transfers by values such as direction and status.   # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_transfers(account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: (required)
        :param str direction:
        :param float limit:
        :param float offset:
        :return: list[TransferResource]
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.get_transfers_with_http_info(account_id, **kwargs)  # noqa: E501
        else:
            (data) = self.get_transfers_with_http_info(account_id, **kwargs)  # noqa: E501
            return data

    def get_transfers_with_http_info(self, account_id, **kwargs):  # noqa: E501
        """Return a list of transfers for an account.  # noqa: E501

        You can filter requested transfers by values such as direction and status.   # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_transfers_with_http_info(account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str account_id: (required)
        :param str direction:
        :param float limit:
        :param float offset:
        :return: list[TransferResource]
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['account_id', 'direction', 'limit', 'offset']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method get_transfers" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `get_transfers`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account_id' in params:
            path_params['account_id'] = params['account_id']  # noqa: E501

        query_params = []
        if 'direction' in params:
            query_params.append(('direction', params['direction']))  # noqa: E501
        if 'limit' in params:
            query_params.append(('limit', params['limit']))  # noqa: E501
        if 'offset' in params:
            query_params.append(('offset', params['offset']))  # noqa: E501

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
            '/accounts/{account_id}/transfers', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='list[TransferResource]',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def post_ach_relationships(self, body, account_id, **kwargs):  # noqa: E501
        """Create an ACH Relationship  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.post_ach_relationships(body, account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param ACHRelationshipData body: (required)
        :param str account_id: Account identifier. (required)
        :return: ACHRelationshipResource
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.post_ach_relationships_with_http_info(body, account_id, **kwargs)  # noqa: E501
        else:
            (data) = self.post_ach_relationships_with_http_info(body, account_id, **kwargs)  # noqa: E501
            return data

    def post_ach_relationships_with_http_info(self, body, account_id, **kwargs):  # noqa: E501
        """Create an ACH Relationship  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.post_ach_relationships_with_http_info(body, account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param ACHRelationshipData body: (required)
        :param str account_id: Account identifier. (required)
        :return: ACHRelationshipResource
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
                    " to method post_ach_relationships" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'body' is set
        if ('body' not in params or
                params['body'] is None):
            raise ValueError("Missing the required parameter `body` when calling `post_ach_relationships`")  # noqa: E501
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `post_ach_relationships`")  # noqa: E501

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
            '/accounts/{account_id}/ach_relationships', 'POST',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='ACHRelationshipResource',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def post_recipient_banks(self, body, account_id, **kwargs):  # noqa: E501
        """Create a Bank Relationship for an account  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.post_recipient_banks(body, account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param BankData body: (required)
        :param str account_id: Account identifier. (required)
        :return: BankResource
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.post_recipient_banks_with_http_info(body, account_id, **kwargs)  # noqa: E501
        else:
            (data) = self.post_recipient_banks_with_http_info(body, account_id, **kwargs)  # noqa: E501
            return data

    def post_recipient_banks_with_http_info(self, body, account_id, **kwargs):  # noqa: E501
        """Create a Bank Relationship for an account  # noqa: E501

        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.post_recipient_banks_with_http_info(body, account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param BankData body: (required)
        :param str account_id: Account identifier. (required)
        :return: BankResource
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
                    " to method post_recipient_banks" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'body' is set
        if ('body' not in params or
                params['body'] is None):
            raise ValueError("Missing the required parameter `body` when calling `post_recipient_banks`")  # noqa: E501
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `post_recipient_banks`")  # noqa: E501

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
            '/accounts/{account_id}/recipient_banks', 'POST',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='BankResource',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def post_transfers(self, body, account_id, **kwargs):  # noqa: E501
        """Request a new transfer  # noqa: E501

        This operation allows you to fund an account with virtual money in the sandbox environment.   # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.post_transfers(body, account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param TransferData body: (required)
        :param str account_id: (required)
        :return: TransferResource
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.post_transfers_with_http_info(body, account_id, **kwargs)  # noqa: E501
        else:
            (data) = self.post_transfers_with_http_info(body, account_id, **kwargs)  # noqa: E501
            return data

    def post_transfers_with_http_info(self, body, account_id, **kwargs):  # noqa: E501
        """Request a new transfer  # noqa: E501

        This operation allows you to fund an account with virtual money in the sandbox environment.   # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.post_transfers_with_http_info(body, account_id, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param TransferData body: (required)
        :param str account_id: (required)
        :return: TransferResource
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
                    " to method post_transfers" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'body' is set
        if ('body' not in params or
                params['body'] is None):
            raise ValueError("Missing the required parameter `body` when calling `post_transfers`")  # noqa: E501
        # verify the required parameter 'account_id' is set
        if ('account_id' not in params or
                params['account_id'] is None):
            raise ValueError("Missing the required parameter `account_id` when calling `post_transfers`")  # noqa: E501

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
            '/accounts/{account_id}/transfers', 'POST',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='TransferResource',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)