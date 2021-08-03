# coding: utf-8

"""
    Alpaca Broker API

    Open brokerage accounts, enable commission-free trading, and manage the ongoing user experience with Alpaca Broker API  # noqa: E501

    OpenAPI spec version: 1.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

from __future__ import absolute_import

import unittest

import broker_client
from broker_client.api.trading_api import TradingApi  # noqa: E501
from broker_client.rest import ApiException


class TestTradingApi(unittest.TestCase):
    """TradingApi unit test stubs"""

    def setUp(self):
        self.api = TradingApi()  # noqa: E501

    def tearDown(self):
        pass

    def test_delete_order(self):
        """Test case for delete_order

        Attempts to cancel an open order.  # noqa: E501
        """
        pass

    def test_delete_orders(self):
        """Test case for delete_orders

        Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled.  # noqa: E501
        """
        pass

    def test_get_order(self):
        """Test case for get_order

        Retrieves a single order for the given order_id.  # noqa: E501
        """
        pass

    def test_get_orders(self):
        """Test case for get_orders

        Retrieves a list of orders for the account, filtered by the supplied query parameters.  # noqa: E501
        """
        pass

    def test_patch_order(self):
        """Test case for patch_order

        Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order.  # noqa: E501
        """
        pass

    def test_post_orders(self):
        """Test case for post_orders

        Create an order for an account.  # noqa: E501
        """
        pass


if __name__ == "__main__":
    unittest.main()
