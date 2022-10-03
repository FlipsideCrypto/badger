from django.db import models

class Badge(models.Model):
    token_id = models.PositiveIntegerField(default=0)

    name = models.CharField(max_length=128, blank=False, default=None)
    image_hash = models.CharField(max_length=256, blank=False, default=None)

    description = models.TextField()

    delegates = models.ManyToManyField('siwe_auth.Wallet', related_name='delegates', blank=True)
    users = models.ManyToManyField('siwe_auth.Wallet', blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']