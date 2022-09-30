from django.db import models

from badge.models import Badge 

class Organization(models.Model):
    active = models.BooleanField(default=False)

    chain = models.CharField(max_length=50, blank=False, default=None)
    contract_address = models.CharField(max_length=50, blank=False, default=None)

    image_hash = models.CharField(max_length=256, blank=True, null=True)

    name = models.CharField(max_length=128, blank=False, default=None)
    description = models.TextField(max_length=4000, blank=True, null=True)

    contract_uri_hash = models.CharField(max_length=256, blank=True, null=True)

    owner = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='organization_owner', null=True)
    delegates = models.ManyToManyField('user.User', blank=True, related_name='organization_delegates')
    badges = models.ManyToManyField(Badge)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']