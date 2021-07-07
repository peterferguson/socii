from typing import Sequence, Optional
from alpaca.broker.model import (
    Contact,
    Agreements,
    Disclosures,
    Identity,
    Agreements,
    DocumentUpload,
    TrustedContact,
)


""" 
Example account request body
{
    "contact": {
        "email_address": "cool_alpaca@example.com",
        "phone_number": "555-666-7788",
        "street_address": ["20 N San Mateo Dr"],
        "city": "San Mateo",
        "state": "CA",
        "postal_code": "94401",
        "country": "USA",
    },
    "identity": {
        "given_name": "John",
        "family_name": "Doe",
        "date_of_birth": "1990-01-01",
        "tax_id": "666-55-4321",
        "tax_id_type": "USA_SSN",
        "country_of_citizenship": "USA",
        "country_of_birth": "USA",
        "country_of_tax_residence": "USA",
        "funding_source": ["employment_income"],
    },
    "disclosures": {
        "is_control_person": false,
        "is_affiliated_exchange_or_finra": false,
        "is_politically_exposed": false,
        "immediate_family_exposed": false,
    },
    "agreements": [
        {
            "agreement": "margin_agreement",
            "signed_at": "2020-09-11T18:09:33Z",
            "ip_address": "185.13.21.99",
        },
        {
            "agreement": "account_agreement",
            "signed_at": "2020-09-11T18:13:44Z",
            "ip_address": "185.13.21.99",
        },
        {
            "agreement": "customer_agreement",
            "signed_at": "2020-09-11T18:13:44Z",
            "ip_address": "185.13.21.99",
        },
    ],
    "documents": [
        {
            "document_type": "cip_result",
            "content": "VGhlcmUgYXJlIG5vIHdpbGQgYWxwYWNhcy4=",
            "mime_type": "application/pdf",
        },
        {
            "document_type": "identity_verification",
            "document_sub_type": "passport",
            "content": "QWxwYWNhcyBjYW5ub3QgbGl2ZSBhbG9uZS4=",
            "mime_type": "image/jpeg",
        },
    ],
    "trusted_contact": {
        "given_name": "Jane",
        "family_name": "Doe",
        "email_address": "jane.doe@example.com",
    },
}
"""


class AccountRequest:
    contact: Contact
    identity: Identity
    disclosure: Disclosures
    agreements: Agreements
    documents: Sequence[DocumentUpload]
    trusted_contact: Optional[TrustedContact]

