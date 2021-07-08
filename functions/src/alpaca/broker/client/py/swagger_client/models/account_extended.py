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

class AccountExtended(object):
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
        'account_number': 'str',
        'status': 'AccountStatus',
        'currency': 'str',
        'created_at': 'datetime',
        'last_equity': 'str',
        'kyc_results': 'KycResult',
        'contact': 'Contact',
        'identity': 'Identity',
        'disclosures': 'Disclosures',
        'agreements': 'Agreements',
        'documents': 'list[ApplicationDocument]',
        'trusted_contact': 'TrustedContact'
    }

    attribute_map = {
        'id': 'id',
        'account_number': 'account_number',
        'status': 'status',
        'currency': 'currency',
        'created_at': 'created_at',
        'last_equity': 'last_equity',
        'kyc_results': 'kyc_results',
        'contact': 'contact',
        'identity': 'identity',
        'disclosures': 'disclosures',
        'agreements': 'agreements',
        'documents': 'documents',
        'trusted_contact': 'trusted_contact'
    }

    def __init__(self, id=None, account_number=None, status=None, currency=None, created_at=None, last_equity=None, kyc_results=None, contact=None, identity=None, disclosures=None, agreements=None, documents=None, trusted_contact=None):  # noqa: E501
        """AccountExtended - a model defined in Swagger"""  # noqa: E501
        self._id = None
        self._account_number = None
        self._status = None
        self._currency = None
        self._created_at = None
        self._last_equity = None
        self._kyc_results = None
        self._contact = None
        self._identity = None
        self._disclosures = None
        self._agreements = None
        self._documents = None
        self._trusted_contact = None
        self.discriminator = None
        if id is not None:
            self.id = id
        if account_number is not None:
            self.account_number = account_number
        if status is not None:
            self.status = status
        if currency is not None:
            self.currency = currency
        if created_at is not None:
            self.created_at = created_at
        if last_equity is not None:
            self.last_equity = last_equity
        if kyc_results is not None:
            self.kyc_results = kyc_results
        if contact is not None:
            self.contact = contact
        if identity is not None:
            self.identity = identity
        if disclosures is not None:
            self.disclosures = disclosures
        if agreements is not None:
            self.agreements = agreements
        if documents is not None:
            self.documents = documents
        if trusted_contact is not None:
            self.trusted_contact = trusted_contact

    @property
    def id(self):
        """Gets the id of this AccountExtended.  # noqa: E501


        :return: The id of this AccountExtended.  # noqa: E501
        :rtype: str
        """
        return self._id

    @id.setter
    def id(self, id):
        """Sets the id of this AccountExtended.


        :param id: The id of this AccountExtended.  # noqa: E501
        :type: str
        """

        self._id = id

    @property
    def account_number(self):
        """Gets the account_number of this AccountExtended.  # noqa: E501


        :return: The account_number of this AccountExtended.  # noqa: E501
        :rtype: str
        """
        return self._account_number

    @account_number.setter
    def account_number(self, account_number):
        """Sets the account_number of this AccountExtended.


        :param account_number: The account_number of this AccountExtended.  # noqa: E501
        :type: str
        """

        self._account_number = account_number

    @property
    def status(self):
        """Gets the status of this AccountExtended.  # noqa: E501


        :return: The status of this AccountExtended.  # noqa: E501
        :rtype: AccountStatus
        """
        return self._status

    @status.setter
    def status(self, status):
        """Sets the status of this AccountExtended.


        :param status: The status of this AccountExtended.  # noqa: E501
        :type: AccountStatus
        """

        self._status = status

    @property
    def currency(self):
        """Gets the currency of this AccountExtended.  # noqa: E501

        Always \"USD\"  # noqa: E501

        :return: The currency of this AccountExtended.  # noqa: E501
        :rtype: str
        """
        return self._currency

    @currency.setter
    def currency(self, currency):
        """Sets the currency of this AccountExtended.

        Always \"USD\"  # noqa: E501

        :param currency: The currency of this AccountExtended.  # noqa: E501
        :type: str
        """

        self._currency = currency

    @property
    def created_at(self):
        """Gets the created_at of this AccountExtended.  # noqa: E501


        :return: The created_at of this AccountExtended.  # noqa: E501
        :rtype: datetime
        """
        return self._created_at

    @created_at.setter
    def created_at(self, created_at):
        """Sets the created_at of this AccountExtended.


        :param created_at: The created_at of this AccountExtended.  # noqa: E501
        :type: datetime
        """

        self._created_at = created_at

    @property
    def last_equity(self):
        """Gets the last_equity of this AccountExtended.  # noqa: E501


        :return: The last_equity of this AccountExtended.  # noqa: E501
        :rtype: str
        """
        return self._last_equity

    @last_equity.setter
    def last_equity(self, last_equity):
        """Sets the last_equity of this AccountExtended.


        :param last_equity: The last_equity of this AccountExtended.  # noqa: E501
        :type: str
        """

        self._last_equity = last_equity

    @property
    def kyc_results(self):
        """Gets the kyc_results of this AccountExtended.  # noqa: E501


        :return: The kyc_results of this AccountExtended.  # noqa: E501
        :rtype: KycResult
        """
        return self._kyc_results

    @kyc_results.setter
    def kyc_results(self, kyc_results):
        """Sets the kyc_results of this AccountExtended.


        :param kyc_results: The kyc_results of this AccountExtended.  # noqa: E501
        :type: KycResult
        """

        self._kyc_results = kyc_results

    @property
    def contact(self):
        """Gets the contact of this AccountExtended.  # noqa: E501


        :return: The contact of this AccountExtended.  # noqa: E501
        :rtype: Contact
        """
        return self._contact

    @contact.setter
    def contact(self, contact):
        """Sets the contact of this AccountExtended.


        :param contact: The contact of this AccountExtended.  # noqa: E501
        :type: Contact
        """

        self._contact = contact

    @property
    def identity(self):
        """Gets the identity of this AccountExtended.  # noqa: E501


        :return: The identity of this AccountExtended.  # noqa: E501
        :rtype: Identity
        """
        return self._identity

    @identity.setter
    def identity(self, identity):
        """Sets the identity of this AccountExtended.


        :param identity: The identity of this AccountExtended.  # noqa: E501
        :type: Identity
        """

        self._identity = identity

    @property
    def disclosures(self):
        """Gets the disclosures of this AccountExtended.  # noqa: E501


        :return: The disclosures of this AccountExtended.  # noqa: E501
        :rtype: Disclosures
        """
        return self._disclosures

    @disclosures.setter
    def disclosures(self, disclosures):
        """Sets the disclosures of this AccountExtended.


        :param disclosures: The disclosures of this AccountExtended.  # noqa: E501
        :type: Disclosures
        """

        self._disclosures = disclosures

    @property
    def agreements(self):
        """Gets the agreements of this AccountExtended.  # noqa: E501


        :return: The agreements of this AccountExtended.  # noqa: E501
        :rtype: Agreements
        """
        return self._agreements

    @agreements.setter
    def agreements(self, agreements):
        """Sets the agreements of this AccountExtended.


        :param agreements: The agreements of this AccountExtended.  # noqa: E501
        :type: Agreements
        """

        self._agreements = agreements

    @property
    def documents(self):
        """Gets the documents of this AccountExtended.  # noqa: E501


        :return: The documents of this AccountExtended.  # noqa: E501
        :rtype: list[ApplicationDocument]
        """
        return self._documents

    @documents.setter
    def documents(self, documents):
        """Sets the documents of this AccountExtended.


        :param documents: The documents of this AccountExtended.  # noqa: E501
        :type: list[ApplicationDocument]
        """

        self._documents = documents

    @property
    def trusted_contact(self):
        """Gets the trusted_contact of this AccountExtended.  # noqa: E501


        :return: The trusted_contact of this AccountExtended.  # noqa: E501
        :rtype: TrustedContact
        """
        return self._trusted_contact

    @trusted_contact.setter
    def trusted_contact(self, trusted_contact):
        """Sets the trusted_contact of this AccountExtended.


        :param trusted_contact: The trusted_contact of this AccountExtended.  # noqa: E501
        :type: TrustedContact
        """

        self._trusted_contact = trusted_contact

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
        if issubclass(AccountExtended, dict):
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
        if not isinstance(other, AccountExtended):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other
