from rest_framework import routers

from django.contrib import admin
from django.urls import include, path

from badge.urls import router as badges_router
from feedback.urls import router as feedback_router
from ipfs.urls import router as ipfs_router
from job.urls import router as jobs_router
from organization.urls import router as organizations_router
from wallet.urls import router as wallets_router
from .views import get_nonce

router = routers.DefaultRouter()
router.registry.extend(badges_router.registry)
router.registry.extend(feedback_router.registry)
router.registry.extend(ipfs_router.registry)
router.registry.extend(jobs_router.registry)
router.registry.extend(organizations_router.registry)
router.registry.extend(wallets_router.registry)

urlpatterns = router.urls + [
    path('admin/', admin.site.urls),
    path("api/auth/", include("siwe_auth.urls")),
    path('api/auth/get-nonce', get_nonce, name="get-nonce")
]
