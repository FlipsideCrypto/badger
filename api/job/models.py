from django.db import models

from siwe_auth.models import validate_ethereum_address

from utils.web3 import CHAINS, POLYGON

class ContractListener(models.Model):
    is_active = models.BooleanField(default=False)

    chain = models.CharField(max_length=255, choices=CHAINS, default=POLYGON)
    ethereum_address = models.CharField(max_length=50, blank=False, default=None, validators=[validate_ethereum_address])

    # name of the event that is being tracked for this contract
    abi = models.TextField(blank=True, null=True)

    # the last block the listener has processed
    last_block = models.IntegerField(default=0)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.ethereum_address