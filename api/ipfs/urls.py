from rest_framework import routers

from .views import IPFSViewSet

router = routers.DefaultRouter()
router.register(r'ipfs', IPFSViewSet, basename='ipfs')

urlpatterns = router.urls