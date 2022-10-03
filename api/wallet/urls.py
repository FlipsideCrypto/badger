from rest_framework import routers

from .views import WalletViewSet

router=routers.DefaultRouter()
router.register(r'wallets', WalletViewSet)

urlpatterns = router.urls