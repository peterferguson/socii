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

from broker_client.api_client import ApiClient


class EventsApi(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    Ref: https://github.com/swagger-api/swagger-codegen
    """

    def __init__(self, api_client=None):
        if api_client is None:
            api_client = ApiClient()
        self.api_client = api_client

    def events_accounts_status_get(self, **kwargs):  # noqa: E501
        """Subscribe to account status events (SSE).  # noqa: E501

        Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)   # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.events_accounts_status_get(async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param datetime since:
        :param datetime until:
        :param int since_id:
        :param int until_id:
        :return: InlineResponse2005
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs["_return_http_data_only"] = True
        if kwargs.get("async_req"):
            return self.events_accounts_status_get_with_http_info(
                **kwargs
            )  # noqa: E501
        else:
            (data) = self.events_accounts_status_get_with_http_info(
                **kwargs
            )  # noqa: E501
            return data

    def events_accounts_status_get_with_http_info(self, **kwargs):  # noqa: E501
        """Subscribe to account status events (SSE).  # noqa: E501

        Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)   # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.events_accounts_status_get_with_http_info(async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param datetime since:
        :param datetime until:
        :param int since_id:
        :param int until_id:
        :return: InlineResponse2005
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ["since", "until", "since_id", "until_id"]  # noqa: E501
        all_params.append("async_req")
        all_params.append("_return_http_data_only")
        all_params.append("_preload_content")
        all_params.append("_request_timeout")

        params = locals()
        for key, val in six.iteritems(params["kwargs"]):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method events_accounts_status_get" % key
                )
            params[key] = val
        del params["kwargs"]

        collection_formats = {}

        path_params = {}

        query_params = []
        if "since" in params:
            query_params.append(("since", params["since"]))  # noqa: E501
        if "until" in params:
            query_params.append(("until", params["until"]))  # noqa: E501
        if "since_id" in params:
            query_params.append(("since_id", params["since_id"]))  # noqa: E501
        if "until_id" in params:
            query_params.append(("until_id", params["until_id"]))  # noqa: E501

        header_params = {}

        form_params = []
        local_var_files = {}

        body_params = None
        # HTTP header `Accept`
        header_params["Accept"] = self.api_client.select_header_accept(
            ["application/json"]
        )  # noqa: E501

        # Authentication setting
        auth_settings = ["BasicAuth"]  # noqa: E501

        return self.api_client.call_api(
            "/events/accounts/status",
            "GET",
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type="InlineResponse2005",  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get("async_req"),
            _return_http_data_only=params.get("_return_http_data_only"),
            _preload_content=params.get("_preload_content", True),
            _request_timeout=params.get("_request_timeout"),
            collection_formats=collection_formats,
        )

    def events_journals_status_get(self, **kwargs):  # noqa: E501
        """Subscribe to journal events (SSE).  # noqa: E501

        Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)   # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.events_journals_status_get(async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param datetime since:
        :param datetime until:
        :param int since_id:
        :param int until_id:
        :return: InlineResponse2006
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs["_return_http_data_only"] = True
        if kwargs.get("async_req"):
            return self.events_journals_status_get_with_http_info(
                **kwargs
            )  # noqa: E501
        else:
            (data) = self.events_journals_status_get_with_http_info(
                **kwargs
            )  # noqa: E501
            return data

    def events_journals_status_get_with_http_info(self, **kwargs):  # noqa: E501
        """Subscribe to journal events (SSE).  # noqa: E501

        Query Params Rules: - `since` required if `until` specified - `since_id` required if `until_id` specified - `since` and `since_id` can’t be used at the same time Behavior: - if `since` or `since_id` not specified this will not return any historic data - if `until` or `until_id` reached stream will end (status 200)   # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.events_journals_status_get_with_http_info(async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param datetime since:
        :param datetime until:
        :param int since_id:
        :param int until_id:
        :return: InlineResponse2006
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ["since", "until", "since_id", "until_id"]  # noqa: E501
        all_params.append("async_req")
        all_params.append("_return_http_data_only")
        all_params.append("_preload_content")
        all_params.append("_request_timeout")

        params = locals()
        for key, val in six.iteritems(params["kwargs"]):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method events_journals_status_get" % key
                )
            params[key] = val
        del params["kwargs"]

        collection_formats = {}

        path_params = {}

        query_params = []
        if "since" in params:
            query_params.append(("since", params["since"]))  # noqa: E501
        if "until" in params:
            query_params.append(("until", params["until"]))  # noqa: E501
        if "since_id" in params:
            query_params.append(("since_id", params["since_id"]))  # noqa: E501
        if "until_id" in params:
            query_params.append(("until_id", params["until_id"]))  # noqa: E501

        header_params = {}

        form_params = []
        local_var_files = {}

        body_params = None
        # HTTP header `Accept`
        header_params["Accept"] = self.api_client.select_header_accept(
            ["application/json"]
        )  # noqa: E501

        # Authentication setting
        auth_settings = ["BasicAuth"]  # noqa: E501

        return self.api_client.call_api(
            "/events/journals/status",
            "GET",
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type="InlineResponse2006",  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get("async_req"),
            _return_http_data_only=params.get("_return_http_data_only"),
            _preload_content=params.get("_preload_content", True),
            _request_timeout=params.get("_request_timeout"),
            collection_formats=collection_formats,
        )
