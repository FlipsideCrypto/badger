from django.db import models

class Badge(models.Model):
    is_active = models.BooleanField(default=True)

    token_id = models.PositiveIntegerField(default=0)

    name = models.CharField(max_length=128, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    image_hash = models.CharField(max_length=256, blank=True, null=True)
    token_uri = models.CharField(max_length=256, blank=True, null=True)

    delegates = models.ManyToManyField('siwe_auth.Wallet', related_name='delegates', blank=True)
    users = models.ManyToManyField('siwe_auth.Wallet')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created']