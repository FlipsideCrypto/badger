from django.conf import settings
from web3 import HTTPProvider, Web3
from ens import ENS

provider = HTTPProvider(settings.PROVIDER)
w3 = Web3(provider)
ns = ENS.fromWeb3(w3)

ETHEREUM = "Ethereum"
POLYGON = "Polygon"
OPTIMISM = "Optimism"
HARDHAT = "Hardhat"
GNOSIS = "Gnosis"
LOCALHOST = "Localhost"
CHAINS = (
    (ETHEREUM, "Ethereum"),
    (POLYGON, "Polygon"),
    (OPTIMISM, "Optimism"),
    (HARDHAT, "Hardhat"),
    (LOCALHOST, "Localhost"),
    (GNOSIS, "Gnosis"),
)

EVENTS = [
    "TransferSingle(address indexed,address indexed,address indexed,uint256,uint256)",
    "OrganizationCreated(address indexed,address indexed,address indexed)",
    "OrganizationUpdated(string)",
    "BadgeUpdated(uint256 indexed,uint256 indexed,bytes32 indexed,uint256)",
]

def get_ens_name(address):
    if w3.isAddress(address):
        return ns.name(address=address)
    return None

def verify_signature(signature, message, address):
    if w3.isAddress(address):
        return w3.eth.account.recoverHash(message, signature=signature) == address
    return False

def hex_signature(string):
    return Web3.keccak(text=string).hex()

def get_abi(contract_name):
    return settings.ABIS[contract_name]