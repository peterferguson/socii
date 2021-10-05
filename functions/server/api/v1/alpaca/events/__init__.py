from fastapi import APIRouter

from api.v1.alpaca.events import trades, transfers, accounts, journals, nta

events_router = APIRouter()

events_router.include_router(trades.router, prefix="/trades", tags=["trades"])
events_router.include_router(journals.router, prefix="/journals", tags=["journals"])
events_router.include_router(accounts.router, prefix="/accounts", tags=["accounts"])
events_router.include_router(transfers.router, prefix="/transfers", tags=["transfers"])
events_router.include_router(nta.router, prefix="/nta", tags=["nta"])
