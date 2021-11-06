from typing import Optional

from fastapi import APIRouter, BackgroundTasks

from utils.get_events import get_events

router = APIRouter()


@router.get("/")
async def get_nta(
    background_tasks: BackgroundTasks,
    since: Optional[str] = "",
    until: Optional[str] = "",
    since_id: Optional[str] = "",
    until_id: Optional[str] = "",
):
    return await get_events("nta", background_tasks, since, until, since_id, until_id)
