from rest_framework import routers

from .views import (
    BadgeViewSet,
)

router = routers.DefaultRouter()
router.register(r'badges', BadgeViewSet)