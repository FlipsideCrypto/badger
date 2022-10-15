from rest_framework import routers

from .views import (
    FeedbackViewSet,
)

router = routers.DefaultRouter()
router.register(r'feedback', FeedbackViewSet)

urlpatterns = router.urls