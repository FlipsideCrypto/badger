from django.db import models

from siwe_auth.models import validate_ethereum_address

from badge.models import Badge
from utils.web3 import CHAINS, POLYGON


class Organization(models.Model):
    is_active = models.BooleanField(default=False)

    chain = models.CharField(max_length=50, choices=CHAINS, default=POLYGON)
    ethereum_address = models.CharField(
        max_length=50, blank=False, default=None, validators=[validate_ethereum_address])

    name = models.CharField(max_length=128, blank=True, null=True)
    symbol = models.CharField(max_length=52, blank=True, null=True)
    description = models.TextField(max_length=4000, blank=True, null=True)

    owner = models.ForeignKey('siwe_auth.Wallet', on_delete=models.CASCADE,
                              related_name='organization_owner', null=True)
    delegates = models.ManyToManyField(
        'siwe_auth.Wallet', blank=True, related_name='organization_delegates')
    badges = models.ManyToManyField(Badge, blank=True)

    # Contract metadata
    image_hash = models.CharField(max_length=256, blank=True, null=True)
    contract_uri_hash = models.CharField(max_length=256, blank=True, null=True)

    # the last block the listener has processed
    last_block = models.IntegerField(default=0)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.ethereum_address

    class Meta:
        ordering = ['-created']
