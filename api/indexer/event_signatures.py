# Indexes the activity within the Badger Network
import json

from web3 import Web3

EVENT_TOPICS = [
    "OrganizationCreated(address indexed,address indexed,address indexed)",
    "OwnershipTransferred(address indexed,address indexed)",
    "VersionUpdated(address indexed,tuple(address,bytes32,uint256,bool) indexed)",
    "ApprovalForAll(address indexed,address indexed,bool)",
    "BadgeForfeited(tuple(uint256,string,tuple(bytes32,uint256)) indexed,uint256 indexed,bytes indexed)",
    "BadgeUpdated(tuple(uint256,string,tuple(bytes32,uint256)) indexed)",
    "DelegateUpdated(tuple(uint256,string,tuple(bytes32,uint256)) indexed,address indexed,bool indexed)",
    "Initialized(uint8)",
    "OrganizationUpdated(string)",
    "OwnershipTransferred(address indexed,address indexed)",
    "PaymentTokenDeposited(tuple(uint256,string,tuple(bytes32,uint256)) indexed,address indexed,uint256 indexed)",
    "TransferBatch(address indexed,address indexed,address indexed,uint256[],uint256[])",
    "TransferSingle(address indexed,address indexed,address indexed,uint256,uint256)",
    "URI(string,uint256 indexed)",
]

def hex_signature(string):
    return Web3.keccak(text=string).hex()

TOPIC_SIGNATURES = {topic: hex_signature(topic) for topic in EVENT_TOPICS}

# print formatted json
print(json.dumps(TOPIC_SIGNATURES, indent=4, sort_keys=True))