from django.db import models

from badge.models import Badge

class Transaction(models.Model):
    tx_hash = models.CharField(max_length=66, unique=True)

class Balance(models.Model):
    badge = models.ForeignKey(Badge, blank=True, null=True, related_name='balances', on_delete=models.CASCADE)

    user = models.ForeignKey('siwe_auth.Wallet', related_name='balances', on_delete=models.CASCADE)

    amount = models.BigIntegerField(default=0)

    transactions = models.ManyToManyField(Transaction)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)