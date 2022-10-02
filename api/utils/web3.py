from django.conf import settings
from web3 import HTTPProvider, Web3
from ens import ENS

provider = HTTPProvider(settings.PROVIDER)
w3 = Web3(provider)
ns = ENS.fromWeb3(w3)

def get_ens_name(address):
    if w3.isAddress(address):
        return ns.name(address=address)
    return None

def verify_signature(signature, message, address):
    if w3.isAddress(address):
        return w3.eth.account.recoverHash(message, signature=signature) == address
    return False