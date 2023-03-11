from django.db import models

from badge.models import Badge

class Balance(models.Model):
    badge = models.ForeignKey(Badge, blank=True, null=True, related_name='balances', on_delete=models.CASCADE)

    user = models.ForeignKey('siwe_auth.Wallet', related_name='balances', on_delete=models.CASCADE)

    amount = models.BigIntegerField(default=0)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created']
        unique_together = ('badge', 'user')

class Transaction(models.Model):
    balance = models.ForeignKey(Balance, related_name='transactions', on_delete=models.CASCADE)    

    tx_hash = models.CharField(max_length=255, blank=True, null=True)
    log_index = models.CharField(max_length=255, blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']
        unique_together = ('tx_hash', 'log_index')