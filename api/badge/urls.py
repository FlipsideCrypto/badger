from rest_framework import routers

from .views import (
    ArtViewSet,
    BadgeViewSet,
)

router = routers.DefaultRouter()
router.register(r'art', ArtViewSet, basename='art')
router.register(r'badges', BadgeViewSet)