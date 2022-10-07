from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import (
    IsAuthenticated,
)

from api.permissions import generator, CanManageOrganization

from .models import Organization
from .serializers import OrganizationSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes += [CanManageOrganization]

        return generator(self.permission_classes)
