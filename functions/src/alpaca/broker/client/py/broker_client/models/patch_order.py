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

class PatchOrder(object):
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
        'qty': 'str',
        'time_in_force': 'str',
        'limit_price': 'str',
        'stop_price': 'str',
        'trail': 'str',
        'client_order_id': 'str',
        'created_at': 'datetime',
        'updated_at': 'datetime'
    }

    attribute_map = {
        'qty': 'qty',
        'time_in_force': 'time_in_force',
        'limit_price': 'limit_price',
        'stop_price': 'stop_price',
        'trail': 'trail',
        'client_order_id': 'client_order_id',
        'created_at': 'created_at',
        'updated_at': 'updated_at'
    }

    def __init__(self, qty=None, time_in_force=None, limit_price=None, stop_price=None, trail=None, client_order_id=None, created_at=None, updated_at=None):  # noqa: E501
        """PatchOrder - a model defined in Swagger"""  # noqa: E501
        self._qty = None
        self._time_in_force = None
        self._limit_price = None
        self._stop_price = None
        self._trail = None
        self._client_order_id = None
        self._created_at = None
        self._updated_at = None
        self.discriminator = None
        if qty is not None:
            self.qty = qty
        if time_in_force is not None:
            self.time_in_force = time_in_force
        if limit_price is not None:
            self.limit_price = limit_price
        if stop_price is not None:
            self.stop_price = stop_price
        if trail is not None:
            self.trail = trail
        if client_order_id is not None:
            self.client_order_id = client_order_id
        self.created_at = created_at
        self.updated_at = updated_at

    @property
    def qty(self):
        """Gets the qty of this PatchOrder.  # noqa: E501


        :return: The qty of this PatchOrder.  # noqa: E501
        :rtype: str
        """
        return self._qty

    @qty.setter
    def qty(self, qty):
        """Sets the qty of this PatchOrder.


        :param qty: The qty of this PatchOrder.  # noqa: E501
        :type: str
        """

        self._qty = qty

    @property
    def time_in_force(self):
        """Gets the time_in_force of this PatchOrder.  # noqa: E501


        :return: The time_in_force of this PatchOrder.  # noqa: E501
        :rtype: str
        """
        return self._time_in_force

    @time_in_force.setter
    def time_in_force(self, time_in_force):
        """Sets the time_in_force of this PatchOrder.


        :param time_in_force: The time_in_force of this PatchOrder.  # noqa: E501
        :type: str
        """
        allowed_values = ["day", "gtc", "opg", "cls", "ioc", "fok"]  # noqa: E501
        if time_in_force not in allowed_values:
            raise ValueError(
                "Invalid value for `time_in_force` ({0}), must be one of {1}"  # noqa: E501
                .format(time_in_force, allowed_values)
            )

        self._time_in_force = time_in_force

    @property
    def limit_price(self):
        """Gets the limit_price of this PatchOrder.  # noqa: E501


        :return: The limit_price of this PatchOrder.  # noqa: E501
        :rtype: str
        """
        return self._limit_price

    @limit_price.setter
    def limit_price(self, limit_price):
        """Sets the limit_price of this PatchOrder.


        :param limit_price: The limit_price of this PatchOrder.  # noqa: E501
        :type: str
        """

        self._limit_price = limit_price

    @property
    def stop_price(self):
        """Gets the stop_price of this PatchOrder.  # noqa: E501


        :return: The stop_price of this PatchOrder.  # noqa: E501
        :rtype: str
        """
        return self._stop_price

    @stop_price.setter
    def stop_price(self, stop_price):
        """Sets the stop_price of this PatchOrder.


        :param stop_price: The stop_price of this PatchOrder.  # noqa: E501
        :type: str
        """

        self._stop_price = stop_price

    @property
    def trail(self):
        """Gets the trail of this PatchOrder.  # noqa: E501


        :return: The trail of this PatchOrder.  # noqa: E501
        :rtype: str
        """
        return self._trail

    @trail.setter
    def trail(self, trail):
        """Sets the trail of this PatchOrder.


        :param trail: The trail of this PatchOrder.  # noqa: E501
        :type: str
        """

        self._trail = trail

    @property
    def client_order_id(self):
        """Gets the client_order_id of this PatchOrder.  # noqa: E501


        :return: The client_order_id of this PatchOrder.  # noqa: E501
        :rtype: str
        """
        return self._client_order_id

    @client_order_id.setter
    def client_order_id(self, client_order_id):
        """Sets the client_order_id of this PatchOrder.


        :param client_order_id: The client_order_id of this PatchOrder.  # noqa: E501
        :type: str
        """

        self._client_order_id = client_order_id

    @property
    def created_at(self):
        """Gets the created_at of this PatchOrder.  # noqa: E501


        :return: The created_at of this PatchOrder.  # noqa: E501
        :rtype: datetime
        """
        return self._created_at

    @created_at.setter
    def created_at(self, created_at):
        """Sets the created_at of this PatchOrder.


        :param created_at: The created_at of this PatchOrder.  # noqa: E501
        :type: datetime
        """
        if created_at is None:
            raise ValueError("Invalid value for `created_at`, must not be `None`")  # noqa: E501

        self._created_at = created_at

    @property
    def updated_at(self):
        """Gets the updated_at of this PatchOrder.  # noqa: E501


        :return: The updated_at of this PatchOrder.  # noqa: E501
        :rtype: datetime
        """
        return self._updated_at

    @updated_at.setter
    def updated_at(self, updated_at):
        """Sets the updated_at of this PatchOrder.


        :param updated_at: The updated_at of this PatchOrder.  # noqa: E501
        :type: datetime
        """
        if updated_at is None:
            raise ValueError("Invalid value for `updated_at`, must not be `None`")  # noqa: E501

        self._updated_at = updated_at

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
        if issubclass(PatchOrder, dict):
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
        if not isinstance(other, PatchOrder):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other