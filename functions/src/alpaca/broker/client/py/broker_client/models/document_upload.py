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

class DocumentUpload(object):
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
        'document_type': 'DocumentType',
        'document_sub_type': 'str',
        'content': 'str',
        'mime_type': 'str'
    }

    attribute_map = {
        'document_type': 'document_type',
        'document_sub_type': 'document_sub_type',
        'content': 'content',
        'mime_type': 'mime_type'
    }

    def __init__(self, document_type=None, document_sub_type=None, content=None, mime_type=None):  # noqa: E501
        """DocumentUpload - a model defined in Swagger"""  # noqa: E501
        self._document_type = None
        self._document_sub_type = None
        self._content = None
        self._mime_type = None
        self.discriminator = None
        self.document_type = document_type
        if document_sub_type is not None:
            self.document_sub_type = document_sub_type
        self.content = content
        self.mime_type = mime_type

    @property
    def document_type(self):
        """Gets the document_type of this DocumentUpload.  # noqa: E501


        :return: The document_type of this DocumentUpload.  # noqa: E501
        :rtype: DocumentType
        """
        return self._document_type

    @document_type.setter
    def document_type(self, document_type):
        """Sets the document_type of this DocumentUpload.


        :param document_type: The document_type of this DocumentUpload.  # noqa: E501
        :type: DocumentType
        """
        if document_type is None:
            raise ValueError("Invalid value for `document_type`, must not be `None`")  # noqa: E501

        self._document_type = document_type

    @property
    def document_sub_type(self):
        """Gets the document_sub_type of this DocumentUpload.  # noqa: E501


        :return: The document_sub_type of this DocumentUpload.  # noqa: E501
        :rtype: str
        """
        return self._document_sub_type

    @document_sub_type.setter
    def document_sub_type(self, document_sub_type):
        """Sets the document_sub_type of this DocumentUpload.


        :param document_sub_type: The document_sub_type of this DocumentUpload.  # noqa: E501
        :type: str
        """

        self._document_sub_type = document_sub_type

    @property
    def content(self):
        """Gets the content of this DocumentUpload.  # noqa: E501


        :return: The content of this DocumentUpload.  # noqa: E501
        :rtype: str
        """
        return self._content

    @content.setter
    def content(self, content):
        """Sets the content of this DocumentUpload.


        :param content: The content of this DocumentUpload.  # noqa: E501
        :type: str
        """
        if content is None:
            raise ValueError("Invalid value for `content`, must not be `None`")  # noqa: E501

        self._content = content

    @property
    def mime_type(self):
        """Gets the mime_type of this DocumentUpload.  # noqa: E501


        :return: The mime_type of this DocumentUpload.  # noqa: E501
        :rtype: str
        """
        return self._mime_type

    @mime_type.setter
    def mime_type(self, mime_type):
        """Sets the mime_type of this DocumentUpload.


        :param mime_type: The mime_type of this DocumentUpload.  # noqa: E501
        :type: str
        """
        if mime_type is None:
            raise ValueError("Invalid value for `mime_type`, must not be `None`")  # noqa: E501

        self._mime_type = mime_type

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
        if issubclass(DocumentUpload, dict):
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
        if not isinstance(other, DocumentUpload):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other