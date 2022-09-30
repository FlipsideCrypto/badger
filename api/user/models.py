from django.contrib.auth.models import AbstractUser
from django.db import models

from utils.web3 import get_ens_name, verify_signature

class User(AbstractUser):
    address = models.CharField(max_length=50, blank=False, null=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # internal cache for active organizations
    _organizations = None

    def _get_organizations(self):
        if self._organizations is None:
            self._organizations = self.get_organizations()
        return self._organizations

    def __str__(self):
        return self.address

    @property
    def organizations(self): 
        from organization.models import Organization

        return (
            Organization.objects.filter(owner=self) | 
            Organization.objects.filter(delegates__id__contains=self.id)
        ).filter(active=True).distinct()

    @property
    def tutorial_state(self):
        if self.organizations.count() > 1:
            return 0
        return 1

    @property
    def ens_name(self):
        return get_ens_name(self.address)

    def verify_signature(self, signature):
        return verify_signature(self.address, signature)

    def __str__(self):
        return self.address