from rest_framework import routers

from django.contrib import admin
from django.urls import include, path

from user.urls import router as users_router
from badge.urls import router as badges_router
from organization.urls import router as organizations_router

router = routers.DefaultRouter()
router.registry.extend(users_router.registry)
router.registry.extend(badges_router.registry)
router.registry.extend(organizations_router.registry)

urlpatterns = router.urls + [
    path('admin/', admin.site.urls),
    path("api/auth/", include("siwe_auth.urls")),
]
