from rest_framework import routers

from .views import (
    ModuleViewSet
)

router = routers.DefaultRouter()
router.register(r'modules', ModuleViewSet)

urlpatterns = router.urls