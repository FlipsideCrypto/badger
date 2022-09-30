from django.contrib.auth.models import AbstractUser
from django.db import models

from utils.web3 import get_ens_name, verify_signature

from address.models import AddressField
from badge.models import Badge
from organization.models import Organization

class User(AbstractUser):
    address = AddressField(unique=True, blank=False, default=None)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # internal cache for active organizations
    _organizations = None
    _badges = None
    _tutorial_state = None
    _ens_name = None

    def _get_organizations(self):
        if self._organizations is None:
            self._organizations = self.get_organizations()
        return self._organizations

    def _get_badges(self):
        if self._badges is None:
            self._badges = self.get_badges()
        return self._badges

    def _get_tutorial_state(self):
        if self._tutorial_state is None:
            self._tutorial_state = self.get_tutorial_state()
        return self._tutorial_state

    def _get_ens_name(self):
        if self._ens_name is None:
            self._ens_name = self.get_ens_name()
        return self._ens_name

    @property
    def organizations(self): 
        return self._get_organizations()

    @property
    def badges(self):
        return self._get_badges() 

    @property
    def tutorial_state(self):
        return self._get_tutorial_state()

    @property
    def ens_name(self):
        return self._get_ens_name()

    def __str__(self):
        return self.address

    def get_organizations(self):
        return (
            Organization.objects.filter(owner__id=self.id) | 
            Organization.objects.filter(delegates__id__contains=self.id)
        ).filter(active=True).distinct()

    def get_badges(self):
        return Badge.objects.filter(users__id=self.id)

    def get_tutorial_state(self):
        if not self.organizations.exists():
            return 0
        if not self.badges.exists():
            return 1
        return 2
    
    def get_ens_name(self):
        return get_ens_name(self.address)

    def verify_signature(self, signature):
        return verify_signature(self.address, signature)
