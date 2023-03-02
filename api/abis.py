import json
import os

FACTORY_ABI = None
ORGANIZATION_ABI = None

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the JSON ABI for the Factory and Organization contracts
with open(os.path.join(BASE_DIR, "abis", "Badger.json")) as f:
    FACTORY_ABI = json.load(f)

with open(os.path.join(BASE_DIR, "abis", "BadgerOrganization.json")) as f:
    ORGANIZATION_ABI = json.load(f)

# Establish the events that we are watching for
FACTORY_EVENTS = [event for event in FACTORY_ABI if event.startswith("event")]

ORGANIZATION_EVENTS = [event for event in ORGANIZATION_ABI if event.startswith("event")]