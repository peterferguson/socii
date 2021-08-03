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

class InlineResponse20010(object):
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
        'account_id': 'str',
        'activity_type': 'str',
        '_date': 'str',
        'net_amount': 'str',
        'description': 'str',
        'status': 'str'
    }

    attribute_map = {
        'id': 'id',
        'account_id': 'account_id',
        'activity_type': 'activity_type',
        '_date': 'date',
        'net_amount': 'net_amount',
        'description': 'description',
        'status': 'status'
    }

    def __init__(self, id=None, account_id=None, activity_type=None, _date=None, net_amount=None, description=None, status=None):  # noqa: E501
        """InlineResponse20010 - a model defined in Swagger"""  # noqa: E501
        self._id = None
        self._account_id = None
        self._activity_type = None
        self.__date = None
        self._net_amount = None
        self._description = None
        self._status = None
        self.discriminator = None
        if id is not None:
            self.id = id
        if account_id is not None:
            self.account_id = account_id
        if activity_type is not None:
            self.activity_type = activity_type
        if _date is not None:
            self._date = _date
        if net_amount is not None:
            self.net_amount = net_amount
        if description is not None:
            self.description = description
        if status is not None:
            self.status = status

    @property
    def id(self):
        """Gets the id of this InlineResponse20010.  # noqa: E501


        :return: The id of this InlineResponse20010.  # noqa: E501
        :rtype: str
        """
        return self._id

    @id.setter
    def id(self, id):
        """Sets the id of this InlineResponse20010.


        :param id: The id of this InlineResponse20010.  # noqa: E501
        :type: str
        """

        self._id = id

    @property
    def account_id(self):
        """Gets the account_id of this InlineResponse20010.  # noqa: E501


        :return: The account_id of this InlineResponse20010.  # noqa: E501
        :rtype: str
        """
        return self._account_id

    @account_id.setter
    def account_id(self, account_id):
        """Sets the account_id of this InlineResponse20010.


        :param account_id: The account_id of this InlineResponse20010.  # noqa: E501
        :type: str
        """

        self._account_id = account_id

    @property
    def activity_type(self):
        """Gets the activity_type of this InlineResponse20010.  # noqa: E501


        :return: The activity_type of this InlineResponse20010.  # noqa: E501
        :rtype: str
        """
        return self._activity_type

    @activity_type.setter
    def activity_type(self, activity_type):
        """Sets the activity_type of this InlineResponse20010.


        :param activity_type: The activity_type of this InlineResponse20010.  # noqa: E501
        :type: str
        """

        self._activity_type = activity_type

    @property
    def _date(self):
        """Gets the _date of this InlineResponse20010.  # noqa: E501


        :return: The _date of this InlineResponse20010.  # noqa: E501
        :rtype: str
        """
        return self.__date

    @_date.setter
    def _date(self, _date):
        """Sets the _date of this InlineResponse20010.


        :param _date: The _date of this InlineResponse20010.  # noqa: E501
        :type: str
        """

        self.__date = _date

    @property
    def net_amount(self):
        """Gets the net_amount of this InlineResponse20010.  # noqa: E501


        :return: The net_amount of this InlineResponse20010.  # noqa: E501
        :rtype: str
        """
        return self._net_amount

    @net_amount.setter
    def net_amount(self, net_amount):
        """Sets the net_amount of this InlineResponse20010.


        :param net_amount: The net_amount of this InlineResponse20010.  # noqa: E501
        :type: str
        """

        self._net_amount = net_amount

    @property
    def description(self):
        """Gets the description of this InlineResponse20010.  # noqa: E501


        :return: The description of this InlineResponse20010.  # noqa: E501
        :rtype: str
        """
        return self._description

    @description.setter
    def description(self, description):
        """Sets the description of this InlineResponse20010.


        :param description: The description of this InlineResponse20010.  # noqa: E501
        :type: str
        """

        self._description = description

    @property
    def status(self):
        """Gets the status of this InlineResponse20010.  # noqa: E501


        :return: The status of this InlineResponse20010.  # noqa: E501
        :rtype: str
        """
        return self._status

    @status.setter
    def status(self, status):
        """Sets the status of this InlineResponse20010.


        :param status: The status of this InlineResponse20010.  # noqa: E501
        :type: str
        """

        self._status = status

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
        if issubclass(InlineResponse20010, dict):
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
        if not isinstance(other, InlineResponse20010):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other
