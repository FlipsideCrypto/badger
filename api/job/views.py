from rest_framework import viewsets
from rest_framework.permissions import (
    IsAdminUser
)

from .models import ContractListener

from .serializers import ContractListenerSerializer

class ContractListenerViewSet(viewsets.ModelViewSet):
    queryset = ContractListener.objects.all()
    serializer_class = ContractListenerSerializer

    permission_classes = [IsAdminUser]