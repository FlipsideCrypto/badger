from rest_framework import viewsets
from django.conf import settings

from .models import User 
from .serializers import UserSerializer

from web3 import HTTPProvider
from ens import ENS

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_ens_name(self, address):
        provider = HTTPProvider(f'https://eth-mainnet.g.alchemy.com/v2/{settings.ALCHEMY_API_KEY}')
        ns = ENS.fromWeb3(provider)
        return ns.name(address)