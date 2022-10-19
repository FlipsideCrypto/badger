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

CLEANED_TOPICS = [
    topic.replace("event ", "").replace(" indexed", "") for topic in EVENT_TOPICS
]

def hex_signature(string):
    return Web3.keccak(text=string).hex()

TOPIC_SIGNATURES = {topic: hex_signature(topic) for topic in CLEANED_TOPICS}

# print formatted json
print(json.dumps(TOPIC_SIGNATURES, indent=4, sort_keys=True))

print(
    "Failed:", not TOPIC_SIGNATURES['TransferSingle(address,address,address,uint256,uint256)'] == "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62")