from rest_framework import viewsets

from .models import User 
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        address = self.request.query_params.get('address', None)
        if address is not None:
            queryset = queryset.filter(address=address)
        return queryset