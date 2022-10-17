# Indexes the activity within the Badger Network
import json

from web3 import Web3

EVENT_TOPICS = [
    "event OrganizationCreated(address indexed,address indexed,address indexed)",
    "event OwnershipTransferred(address indexed,address indexed)",
    "event VersionUpdated(address indexed,address indexed,bytes32 indexed,uint256,bool)",
    "event BadgeUpdated(uint256 indexed,uint256 indexed,bytes32 indexed,uint256)",
    "event BadgeForfeited(uint256 indexed,uint256 indexed,bytes indexed)",
    "event DelegateUpdated(uint256 indexed,address indexed,bool indexed)",
    "event OrganizationUpdated(string)",
    "event OwnershipTransferred(address indexed,address indexed)",
    "event PaymentTokenDeposited(uint256 indexed,address indexed,uint256 indexed)",
    "event TransferBatch(address indexed,address indexed,address indexed,uint256[],uint256[])",
    "event TransferSingle(address indexed,address indexed,address indexed,uint256,uint256)",
    "event URI(string,uint256 indexed)",
]

def hex_signature(string):
    return Web3.keccak(text=string).hex()

TOPIC_SIGNATURES = {topic: hex_signature(topic) for topic in EVENT_TOPICS}

# print formatted json
print(json.dumps(TOPIC_SIGNATURES, indent=4, sort_keys=True))