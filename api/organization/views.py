from rest_framework import viewsets
from rest_framework.permissions import (
    IsAuthenticated,
)

from api.permissions import generator, CanManageOrganization

from .models import Organization
from .serializers import OrganizationSerializer
from siwe_auth.models import Wallet
from rest_framework.response import Response

class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    permission_classes = [IsAuthenticated]

    def get_permissions(self): 
        permission_classes = []
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes += [CanManageOrganization]

        return generator(self.permission_classes + permission_classes)
