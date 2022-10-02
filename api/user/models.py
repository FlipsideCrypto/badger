from django.contrib.auth.models import AbstractUser
from django.db import models

from siwe_auth.models import Wallet 

from utils.web3 import verify_signature

from badge.models import Badge
from organization.models import Organization

class User(Wallet):
    address = models.CharField(max_length=72, unique=True, blank=False, default=None)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # internal cache for active organizations
    _organizations = None
    _badges = None
    _tutorial_state = None

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

    @property
    def organizations(self): 
        return self._get_organizations()

    @property
    def badges(self):
        return self._get_badges() 

    @property
    def tutorial_state(self):
        return self._get_tutorial_state()

    def __str__(self):
        return self.address

    def get_organizations(self):
        return (
            Organization.objects.filter(owner__address=self.pk) | 
            Organization.objects.filter(delegates__address__contains=self.pk)
        ).filter(active=True).distinct()

    def get_badges(self):
        return Badge.objects.filter(users__id=self.id)

    def get_tutorial_state(self):
        if not self.organizations.exists():
            return 0
        if not self.badges.exists():
            return 1
        return 2
    
    def verify_signature(self, signature):
        return verify_signature(self.address, signature)
