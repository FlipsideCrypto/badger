from rest_framework import routers

from .views import ContractListenerViewSet

router = routers.DefaultRouter()
router.register(r'contract-listeners', ContractListenerViewSet)

urlpatterns = router.urls