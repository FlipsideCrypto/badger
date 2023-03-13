from rest_framework import viewsets
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser
)
from rest_framework.response import Response
from rest_framework.decorators import action

from siwe_auth.models import Wallet

from api.permissions import generator, CanManageWallet

from .serializers import WalletSerializer

class WalletViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = WalletSerializer
    queryset = Wallet.objects.all()

    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super(WalletViewSet, self).get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAdminUser]
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [CanManageWallet]
        elif self.action == 'authentication_status':
            permission_classes = [AllowAny]

        return generator(self.permission_classes + permission_classes)

    @action(
        detail=False, 
        methods=['get'], 
        url_name='authentication_status', 
        url_path='authentication-status/(?P<ethereum_address>[a-zA-Z0-9]+)'
    )
    def authentication_status(self, request, **kwargs):
        address = kwargs.get('ethereum_address', None)
        
        try:
            authenticated = request.user.ethereum_address == address 

            if address and authenticated:
                return Response({
                    'authenticated': True,
                    'user': WalletSerializer(
                        request.user,
                        context={
                            'request': request
                        }
                    ).data
                })
        except:
            pass

        return Response(
            {
                'authenticated': False,
                'user': None
            }
        ) 