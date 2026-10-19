from fastapi import APIRouter
from src.config import settings

router = APIRouter(prefix="/api", tags=["Health"])


@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "app": settings.app_name,
        "version": settings.app_version,
    }