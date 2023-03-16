from rest_framework import viewsets

from siwe_auth.models import Wallet

from .serializers import WalletSerializer

class WalletViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = WalletSerializer
    queryset = Wallet.objects.all()

    def get_serializer_context(self):
        context = super(WalletViewSet, self).get_serializer_context()
        context.update({"request": self.request})
        return context