# load in json files from auto-created abis in contracts/abis
import json

from django.conf import settings

from pathlib import Path

abis_to_watch = {
    'BadgerHouse': 'FACTORY',
    'BadgerSash': 'ORGANIZATION',
}

# The final output of this dict will be a dict of with keys as the values of the abis_to_watch dict
abis = {}

for file in Path(settings.BASE_DIR).glob("contracts/abis/*.json"):
    # if this abi is found in the list
    if any(abi_name in file.name for abi_name in abis_to_watch):
        # determine which abi was used here
        abi_name = None
        for abi_name in abis_to_watch:
            if abi_name in file.name:
                abi_name = abi_name
                break

        # open the file
        with open(file, 'r') as abi_file:
            # stringify the json
            abis[abis_to_watch[abi_name]] = json.dumps(json.load(abi_file))