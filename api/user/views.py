from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.permissions import generator 

from .models import User 
from .serializers import (
    # LogInSerializer,
    UserSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # permission_classes = []
    # def get_permissions(self):
        # return generator(self.permission_classes)        

    @action(detail=False, methods=['get'], url_path='by-address/(?P<address>[^/.]+)')
    def by_address(self, request, pk=None, *args, **kwargs):
        user = User.objects.filter(address=kwargs['address'])
        serializer = UserSerializer(user, context={'request': request}, many=True)
        return Response(serializer.data)