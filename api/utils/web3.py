from django.conf import settings
from web3 import HTTPProvider, Web3
from ens import ENS

provider = HTTPProvider(f'https://eth-mainnet.g.alchemy.com/v2/{settings.ALCHEMY_API_KEY}')
w3 = Web3(provider)
ns = ENS.fromWeb3(w3)

def get_ens_name(address):
    if w3.isAddress(address):
        return ns.name(address=address)
    return None