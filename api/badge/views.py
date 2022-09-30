from rest_framework import viewsets

from api.permissions import generator 

from .models import Badge
from .serializers import BadgeSerializer

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

    # permission_classes = [] 
    # def get_permissions(self):
        # return generator(self.permission_classes)