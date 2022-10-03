from rest_framework import viewsets
from rest_framework.permissions import (
    IsAuthenticated,
)

from siwe_auth.models import Wallet

from api.permissions import CanManageWallet

from .serializers import WalletSerializer

class WalletViewSet(viewsets.ModelViewSet):
    serializer_class = WalletSerializer
    queryset = Wallet.objects.all()

    permission_classes = [IsAuthenticated, CanManageWallet]

    def get_serializer_context(self):
        context = super(WalletViewSet, self).get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_queryset(self):
        if self.request.user.is_staff:
            return Wallet.objects.all()
        return Wallet.objects.filter(ethereum_address=self.request.user.ethereum_address)