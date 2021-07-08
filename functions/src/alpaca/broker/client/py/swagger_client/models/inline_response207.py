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

class InlineResponse207(object):
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
        'id': 'str',
        'status': 'int',
        'body': 'OrderObject'
    }

    attribute_map = {
        'id': 'id',
        'status': 'status',
        'body': 'body'
    }

    def __init__(self, id=None, status=None, body=None):  # noqa: E501
        """InlineResponse207 - a model defined in Swagger"""  # noqa: E501
        self._id = None
        self._status = None
        self._body = None
        self.discriminator = None
        if id is not None:
            self.id = id
        if status is not None:
            self.status = status
        if body is not None:
            self.body = body

    @property
    def id(self):
        """Gets the id of this InlineResponse207.  # noqa: E501


        :return: The id of this InlineResponse207.  # noqa: E501
        :rtype: str
        """
        return self._id

    @id.setter
    def id(self, id):
        """Sets the id of this InlineResponse207.


        :param id: The id of this InlineResponse207.  # noqa: E501
        :type: str
        """

        self._id = id

    @property
    def status(self):
        """Gets the status of this InlineResponse207.  # noqa: E501


        :return: The status of this InlineResponse207.  # noqa: E501
        :rtype: int
        """
        return self._status

    @status.setter
    def status(self, status):
        """Sets the status of this InlineResponse207.


        :param status: The status of this InlineResponse207.  # noqa: E501
        :type: int
        """

        self._status = status

    @property
    def body(self):
        """Gets the body of this InlineResponse207.  # noqa: E501


        :return: The body of this InlineResponse207.  # noqa: E501
        :rtype: OrderObject
        """
        return self._body

    @body.setter
    def body(self, body):
        """Sets the body of this InlineResponse207.


        :param body: The body of this InlineResponse207.  # noqa: E501
        :type: OrderObject
        """

        self._body = body

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
        if issubclass(InlineResponse207, dict):
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
        if not isinstance(other, InlineResponse207):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other