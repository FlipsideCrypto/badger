from django.db import models

from badge.models import Badge
from organization.models import Organization

class Transaction(models.Model):
    tx_hash = models.CharField(max_length=66, unique=True)

class Balance(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name='balances'
    )

    badge = models.ForeignKey(
        Badge,
        on_delete=models.CASCADE,
        related_name='balances',
        blank=True,
        null=True
    )

    user = models.ForeignKey(
        'siwe_auth.Wallet',
        on_delete=models.CASCADE,
        related_name='balances'
    )

    amount = models.BigIntegerField(default=0)

    transactions = models.ManyToManyField(
        Transaction
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)