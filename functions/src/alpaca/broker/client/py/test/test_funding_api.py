# coding: utf-8

"""
    Alpaca Broker API

    Open brokerage accounts, enable commission-free trading, and manage the ongoing user experience with Alpaca Broker API  # noqa: E501

    OpenAPI spec version: 1.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

from __future__ import absolute_import

import unittest

import swagger_client
from swagger_client.api.funding_api import FundingApi  # noqa: E501
from swagger_client.rest import ApiException


class TestFundingApi(unittest.TestCase):
    """FundingApi unit test stubs"""

    def setUp(self):
        self.api = FundingApi()  # noqa: E501

    def tearDown(self):
        pass

    def test_delete_ach_relationship(self):
        """Test case for delete_ach_relationship

        Delete an existing ACH relationship  # noqa: E501
        """
        pass

    def test_delete_recipient_bank(self):
        """Test case for delete_recipient_bank

        Delete a Bank Relationship for an account  # noqa: E501
        """
        pass

    def test_delete_transfer(self):
        """Test case for delete_transfer

        Request to close a transfer  # noqa: E501
        """
        pass

    def test_get_ach_relationships(self):
        """Test case for get_ach_relationships

        Retrieve ACH Relationships for an account  # noqa: E501
        """
        pass

    def test_get_recipient_banks(self):
        """Test case for get_recipient_banks

        Retrieve bank relationships for an account  # noqa: E501
        """
        pass

    def test_get_transfers(self):
        """Test case for get_transfers

        Return a list of transfers for an account.  # noqa: E501
        """
        pass

    def test_post_ach_relationships(self):
        """Test case for post_ach_relationships

        Create an ACH Relationship  # noqa: E501
        """
        pass

    def test_post_recipient_banks(self):
        """Test case for post_recipient_banks

        Create a Bank Relationship for an account  # noqa: E501
        """
        pass

    def test_post_transfers(self):
        """Test case for post_transfers

        Request a new transfer  # noqa: E501
        """
        pass


if __name__ == '__main__':
    unittest.main()
