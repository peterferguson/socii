from fastapi import APIRouter

from api.v1.alpaca.events import trades, transfers, accounts, journals, nta

alpaca_router = APIRouter()

alpaca_router.include_router(trades.router, prefix="/trades", tags=["trades"])
alpaca_router.include_router(journals.router, prefix="/journals", tags=["journals"])
alpaca_router.include_router(accounts.router, prefix="/accounts", tags=["accounts"])
alpaca_router.include_router(transfers.router, prefix="/transfers", tags=["transfers"])
alpaca_router.include_router(nta.router, prefix="/nta", tags=["nta"])
