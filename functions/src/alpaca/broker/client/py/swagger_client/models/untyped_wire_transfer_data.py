# coding: utf-8

"""
    Alpaca Broker API

    Open brokerage accounts, enable commission-free trading, and manage the ongoing user experience with Alpaca Broker API  # noqa: E501

    OpenAPI spec version: 1.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

import pprint
import re  # noqa: F401

import six
from swagger_client.models.untyped_transfer_data import UntypedTransferData  # noqa: F401,E501

class UntypedWireTransferData(UntypedTransferData):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    """
    Attributes:
      swagger_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    swagger_types = {
        'additional_information': 'str',
        'bank_id': 'str'
    }
    if hasattr(UntypedTransferData, "swagger_types"):
        swagger_types.update(UntypedTransferData.swagger_types)

    attribute_map = {
        'additional_information': 'additional_information',
        'bank_id': 'bank_id'
    }
    if hasattr(UntypedTransferData, "attribute_map"):
        attribute_map.update(UntypedTransferData.attribute_map)

    def __init__(self, additional_information=None, bank_id=None, *args, **kwargs):  # noqa: E501
        """UntypedWireTransferData - a model defined in Swagger"""  # noqa: E501
        self._additional_information = None
        self._bank_id = None
        self.discriminator = None
        if additional_information is not None:
            self.additional_information = additional_information
        self.bank_id = bank_id
        UntypedTransferData.__init__(self, *args, **kwargs)

    @property
    def additional_information(self):
        """Gets the additional_information of this UntypedWireTransferData.  # noqa: E501


        :return: The additional_information of this UntypedWireTransferData.  # noqa: E501
        :rtype: str
        """
        return self._additional_information

    @additional_information.setter
    def additional_information(self, additional_information):
        """Sets the additional_information of this UntypedWireTransferData.


        :param additional_information: The additional_information of this UntypedWireTransferData.  # noqa: E501
        :type: str
        """

        self._additional_information = additional_information

    @property
    def bank_id(self):
        """Gets the bank_id of this UntypedWireTransferData.  # noqa: E501


        :return: The bank_id of this UntypedWireTransferData.  # noqa: E501
        :rtype: str
        """
        return self._bank_id

    @bank_id.setter
    def bank_id(self, bank_id):
        """Sets the bank_id of this UntypedWireTransferData.


        :param bank_id: The bank_id of this UntypedWireTransferData.  # noqa: E501
        :type: str
        """
        if bank_id is None:
            raise ValueError("Invalid value for `bank_id`, must not be `None`")  # noqa: E501

        self._bank_id = bank_id

    def to_dict(self):
        """Returns the model properties as a dict"""
        result = {}

        for attr, _ in six.iteritems(self.swagger_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(map(
                    lambda x: x.to_dict() if hasattr(x, "to_dict") else x,
                    value
                ))
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(map(
                    lambda item: (item[0], item[1].to_dict())
                    if hasattr(item[1], "to_dict") else item,
                    value.items()
                ))
            else:
                result[attr] = value
        if issubclass(UntypedWireTransferData, dict):
            for key, value in self.items():
                result[key] = value

        return result

    def to_str(self):
        """Returns the string representation of the model"""
        return pprint.pformat(self.to_dict())

    def __repr__(self):
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        """Returns true if both objects are equal"""
        if not isinstance(other, UntypedWireTransferData):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other
