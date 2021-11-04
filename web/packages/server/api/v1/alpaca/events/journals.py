from typing import Optional

from fastapi import APIRouter, BackgroundTasks

from utils.get_events import get_events

router = APIRouter()


@router.get("/")
async def get_journals(
    background_tasks: BackgroundTasks,
    since: Optional[str] = "",
    until: Optional[str] = "",
    since_id: Optional[str] = "",
    until_id: Optional[str] = "",
):
    return await get_events(
        "journals", background_tasks, since, until, since_id, until_id
    )
