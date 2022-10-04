from django.db import models

from siwe_auth.models import validate_ethereum_address

class Badge(models.Model):
    is_active = models.BooleanField(default=False)

    name = models.CharField(max_length=128, blank=False, default=None)
    description = models.TextField()

    token_id = models.PositiveIntegerField(default=0)
    image_hash = models.CharField(max_length=256, blank=False, default=None)
    token_uri = models.CharField(max_length=256, blank=False, default=None)

    delegates = models.ManyToManyField('siwe_auth.Wallet', related_name='delegates', blank=True)
    users = models.ManyToManyField('siwe_auth.Wallet', blank=True)

    signer_ethereum_address = models.CharField(max_length=50, blank=False, default=None, validators=[validate_ethereum_address])

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def organization(self):
        from organization.models import Organization
        return Organization.objects.filter(badges__in=[self]).first()

    class Meta:
        ordering = ['-created']