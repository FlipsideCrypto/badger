from rest_framework import routers
from rest_framework.schemas import get_schema_view

from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

from badge.urls import router as badges_router
from ipfs.urls import router as ipfs_router
from module.urls import router as modules_router
from organization.urls import router as organizations_router
from wallet.urls import router as wallets_router

router = routers.DefaultRouter()
router.registry.extend(badges_router.registry)
router.registry.extend(ipfs_router.registry)
router.registry.extend(modules_router.registry)
router.registry.extend(organizations_router.registry)
router.registry.extend(wallets_router.registry)

schema_view = get_schema_view(
    title="Badger",
    description="Badger is a primitive driving seamless onchain creation of Organizations and Badges that can be used to turbocharge the granular power of onchain access for every member. With a unique model in place, an Organization can mint Badges that act as keys to access all of the existing Web3 gates and locks using a forward-looking and secure access policy implementation.",
    version="6.0",
    public=True,
)

urlpatterns = router.urls + [
    # Admin urls
    path("admin/", admin.site.urls),
    # Authentication urls
    path("api/auth/", include("siwe_auth.urls")),
    # Documentation urls
    path('api/docs/', TemplateView.as_view(
        template_name='docs.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='docs'),
    path('api/openapi', schema_view, name='openapi-schema'),
]
