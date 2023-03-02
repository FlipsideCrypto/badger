import json
import os

from web3 import Web3

FACTORY_ABI = None
ORGANIZATION_ABI = None

FACTORY_ABI_FULL = None
ORGANIZATION_ABI_FULL = None

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the JSON ABI for the Factory and Organization contracts
with open(os.path.join(BASE_DIR, "abis", "Badger.json")) as f:
    FACTORY_ABI = json.load(f)

with open(os.path.join(BASE_DIR, "abis", "BadgerOrganization.json")) as f:
    ORGANIZATION_ABI = json.load(f)

with open(os.path.join(BASE_DIR, "abis/full", "Badger.json")) as f:
    FACTORY_ABI_FULL = json.load(f)

with open(os.path.join(BASE_DIR, "abis/full", "BadgerOrganization.json")) as f:
    ORGANIZATION_ABI_FULL = json.load(f)

# Establish the events that we are watching for
FACTORY_EVENTS = [event for event in FACTORY_ABI if event.startswith("event")]

ORGANIZATION_EVENTS = [event for event in ORGANIZATION_ABI if event.startswith("event")]

def calculate_signatures(EVENTS):
    CLEANED_TOPICS = [
        topic.replace("event ", "").replace(" indexed", "") for topic in EVENTS
    ]

    def hex_signature(string):
        return Web3.keccak(text=string).hex()

    TOPIC_SIGNATURES = {hex_signature(topic): topic for topic in CLEANED_TOPICS}

    return TOPIC_SIGNATURES 

FACTORY_TOPIC_SIGNATURES = calculate_signatures(FACTORY_EVENTS)

ORGANIZATION_TOPIC_SIGNATURES = calculate_signatures(ORGANIZATION_EVENTS)