from rest_framework import viewsets
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser
)

from siwe_auth.models import Wallet

from api.permissions import generator, CanManageWallet

from .serializers import WalletSerializer

class WalletViewSet(viewsets.ModelViewSet):
    serializer_class = WalletSerializer
    queryset = Wallet.objects.all()

    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super(WalletViewSet, self).get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_permissions(self):
        return [AllowAny()]

        if self.action == 'create':
            self.permission_classes += [IsAdminUser]
        elif self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes += [CanManageWallet]

        return generator(self.permission_classes)