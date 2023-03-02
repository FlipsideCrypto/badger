import json
import os

FACTORY = None
ORGANIZATION = None

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the JSON ABI for the Factory and Organization contracts
with open(os.path.join(BASE_DIR, "abis", "Badger.json")) as f:
    FACTORY = json.load(f)

with open(os.path.join(BASE_DIR, "abis", "BadgerOrganization.json")) as f:
    ORGANIZATION = json.load(f)

# Establish the events that we are watching for
FACTORY_EVENTS = [
    "event OrganizationCreated(address indexed,address indexed,address indexed)",
    "event VersionUpdated(address indexed,address indexed,bytes32 indexed,uint256,bool)"
]

ORGANIZATION_EVENTS = [
    "event BadgeUpdated(uint256 indexed,uint256 indexed,bytes32 indexed,uint256)",
    "event BadgeForfeited(uint256 indexed,uint256 indexed,bytes indexed)",
    "event DelegateUpdated(uint256 indexed,address indexed,bool indexed)",
    "event OrganizationUpdated(string)",
    "event OwnershipTransferred(address indexed,address indexed)",
    "event PaymentTokenDeposited(uint256 indexed,address indexed,uint256 indexed)",
    "event TransferBatch(address indexed,address indexed,address indexed,uint256[],uint256[])",
    "event TransferSingle(address indexed,address indexed,address indexed,uint256,uint256)",
    "event URI(string,uint256 indexed)"
]