from django.urls import include, path

from rest_framework import routers

from . import views

router = routers.DefaultRouter(views.OrgViewSet)

urlpatterns = [
    path('api/', include(router.urls))
]

