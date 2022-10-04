import json

from django.conf import settings
from django.db import models

from siwe_auth.models import validate_ethereum_address

from utils.web3 import CHAINS, ETHEREUM

from .abis import get_abis

class ContractListener(models.Model):
    FACTORY = "FACTORY"
    ORGANIZATION = "ORGANIZATION"
    CONTRACT_TYPE_CHOICES = (
        (FACTORY, "Factory"),
        (ORGANIZATION, "Organization"),
    )

    is_active = models.BooleanField(default=False)

    chain = models.CharField(max_length=255, choices=CHAINS, default=ETHEREUM)
    ethereum_address = models.CharField(max_length=50, blank=False, default=None, validators=[validate_ethereum_address])
    # name of the event that is being tracked for this contract
    event = models.CharField(max_length=50, blank=False, default=None)
    event_abi = models.TextField(blank=False, choices=CONTRACT_TYPE_CHOICES, default=FACTORY)

    # cron expression to run every 2 seconds
    cron_expression = models.CharField(max_length=50, default="*/2 * * * * *")

    # the last block the listener has processed
    last_block = models.IntegerField(default=0)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.ethereum_address

    @property
    def abi(self):
        print(get_abis())
        return json.loads(get_abis()[self.event_abi])