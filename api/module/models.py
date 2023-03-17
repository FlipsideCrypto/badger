from django.db import models

from siwe_auth.models import validate_ethereum_address

class Module(models.Model):
    MANAGER = 'manager'
    HOOK = 'hook'
    MODULE_TYPE_CHOICES = (
        (MANAGER, 'Manager'),
        (HOOK, 'Hook'),
    )

    is_active = models.BooleanField(default=True)

    ethereum_address = models.CharField(max_length=50, blank=False, default=None, validators=[validate_ethereum_address])

    module_type = models.CharField(max_length=10, choices=MODULE_TYPE_CHOICES, default=MANAGER)
    module_key = models.CharField(max_length=128, blank=False, default=None)
    module_config = models.TextField(null=True, blank=True, default=None)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.ethereum_address

    class Meta:
        ordering = ['-created']