from fastapi import APIRouter
from src.config import settings

router = APIRouter(prefix="/api", tags=["Health"])


@router.get("/health")
@router.head("/health", include_in_schema=False)
def health_check():
    return {
        "status": "ok",
        "app": settings.app_name,
        "version": settings.app_version,
    }