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

    def _handle_owner_change(self, instance, owner):
        if instance.owner != owner:
            instance.owner = owner
            instance.save()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = kwargs.pop('partial', False)

        owner_address = request.data['owner']['ethereum_address'] or request.data['owner']
        new_owner, _ = Wallet.objects.get_or_create(ethereum_address=owner_address)

        # do the normal update
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)
        self._handle_owner_change(instance, new_owner)

        return Response(serializer.data)
