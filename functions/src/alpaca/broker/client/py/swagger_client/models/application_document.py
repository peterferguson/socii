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

class ApplicationDocument(object):
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
        'document_type': 'DocumentType',
        'document_sub_type': 'str',
        'mime_type': 'str',
        'created_at': 'datetime'
    }

    attribute_map = {
        'id': 'id',
        'document_type': 'document_type',
        'document_sub_type': 'document_sub_type',
        'mime_type': 'mime_type',
        'created_at': 'created_at'
    }

    def __init__(self, id=None, document_type=None, document_sub_type=None, mime_type=None, created_at=None):  # noqa: E501
        """ApplicationDocument - a model defined in Swagger"""  # noqa: E501
        self._id = None
        self._document_type = None
        self._document_sub_type = None
        self._mime_type = None
        self._created_at = None
        self.discriminator = None
        self.id = id
        self.document_type = document_type
        if document_sub_type is not None:
            self.document_sub_type = document_sub_type
        self.mime_type = mime_type
        self.created_at = created_at

    @property
    def id(self):
        """Gets the id of this ApplicationDocument.  # noqa: E501


        :return: The id of this ApplicationDocument.  # noqa: E501
        :rtype: str
        """
        return self._id

    @id.setter
    def id(self, id):
        """Sets the id of this ApplicationDocument.


        :param id: The id of this ApplicationDocument.  # noqa: E501
        :type: str
        """
        if id is None:
            raise ValueError("Invalid value for `id`, must not be `None`")  # noqa: E501

        self._id = id

    @property
    def document_type(self):
        """Gets the document_type of this ApplicationDocument.  # noqa: E501


        :return: The document_type of this ApplicationDocument.  # noqa: E501
        :rtype: DocumentType
        """
        return self._document_type

    @document_type.setter
    def document_type(self, document_type):
        """Sets the document_type of this ApplicationDocument.


        :param document_type: The document_type of this ApplicationDocument.  # noqa: E501
        :type: DocumentType
        """
        if document_type is None:
            raise ValueError("Invalid value for `document_type`, must not be `None`")  # noqa: E501

        self._document_type = document_type

    @property
    def document_sub_type(self):
        """Gets the document_sub_type of this ApplicationDocument.  # noqa: E501


        :return: The document_sub_type of this ApplicationDocument.  # noqa: E501
        :rtype: str
        """
        return self._document_sub_type

    @document_sub_type.setter
    def document_sub_type(self, document_sub_type):
        """Sets the document_sub_type of this ApplicationDocument.


        :param document_sub_type: The document_sub_type of this ApplicationDocument.  # noqa: E501
        :type: str
        """

        self._document_sub_type = document_sub_type

    @property
    def mime_type(self):
        """Gets the mime_type of this ApplicationDocument.  # noqa: E501


        :return: The mime_type of this ApplicationDocument.  # noqa: E501
        :rtype: str
        """
        return self._mime_type

    @mime_type.setter
    def mime_type(self, mime_type):
        """Sets the mime_type of this ApplicationDocument.


        :param mime_type: The mime_type of this ApplicationDocument.  # noqa: E501
        :type: str
        """
        if mime_type is None:
            raise ValueError("Invalid value for `mime_type`, must not be `None`")  # noqa: E501

        self._mime_type = mime_type

    @property
    def created_at(self):
        """Gets the created_at of this ApplicationDocument.  # noqa: E501


        :return: The created_at of this ApplicationDocument.  # noqa: E501
        :rtype: datetime
        """
        return self._created_at

    @created_at.setter
    def created_at(self, created_at):
        """Sets the created_at of this ApplicationDocument.


        :param created_at: The created_at of this ApplicationDocument.  # noqa: E501
        :type: datetime
        """
        if created_at is None:
            raise ValueError("Invalid value for `created_at`, must not be `None`")  # noqa: E501

        self._created_at = created_at

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
        if issubclass(ApplicationDocument, dict):
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
        if not isinstance(other, ApplicationDocument):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other