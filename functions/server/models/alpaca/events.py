# generated by datamodel-codegen: Using examples of events from https://alpaca.markets/docs/broker/api-references/events/
#   filename:  events.json
#   timestamp: 2021-09-10T14:48:29+00:00

from __future__ import annotations

from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class Indeterminate(BaseModel):
    TAX_IDENTIFICATION: Dict[str, Any]


class KycResult(BaseModel):
    reject: Any
    accept: Any
    indeterminate: Indeterminate


class Account(BaseModel):
    account_id: str
    account_number: str
    at: str
    event_id: int
    kyc_results: Optional[KycResult]
    status_from: str
    status_to: str


class Order(BaseModel):
    asset_class: str
    asset_id: str
    canceled_at: Any
    client_order_id: str
    commission: str
    created_at: str
    expired_at: Any
    extended_hours: bool
    failed_at: Any
    filled_at: Any
    filled_avg_price: Any
    filled_qty: str
    hwm: Any
    id: str
    legs: Any
    limit_price: Any
    notional: str
    order_class: str
    order_type: str
    qty: Any
    replaced_at: Any
    replaced_by: Any
    replaces: Any
    side: str
    status: str
    stop_price: Any
    submitted_at: str
    symbol: str
    time_in_force: str
    trail_percent: Any
    trail_price: Any
    type: str
    updated_at: str


class Trade(BaseModel):
    account_id: str
    at: str
    event: str
    event_id: int
    execution_id: str
    order: Order


class JournalItem(BaseModel):
    at: str
    entry_type: str
    event_id: int
    journal_id: str
    status_from: str
    status_to: str


class Transfer(BaseModel):
    account_id: str
    at: str
    event_id: int
    status_from: str
    status_to: str
    transfer_id: str


class NtaItem(BaseModel):
    account_id: str
    at: str
    description: str
    entry_type: str
    event_id: int
    id: str
    net_amount: int
    per_share_amount: Any
    price: str
    qty: int
    settle_date: str
    status: str
    symbol: str
    system_date: str


class Model(BaseModel):
    accounts: List[Account]
    trades: List[Trade]
    journal: List[JournalItem]
    transfers: List[Transfer]
    nta: List[NtaItem]


class Event(
    Account,
    Trade,
    JournalItem,
    Transfer,
    NtaItem,
):
    pass
