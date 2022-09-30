from django.db import models

from user.models import User 

class Badge(models.Model):
    token_id = models.PositiveIntegerField(default=0)

    name = models.CharField(max_length=128)
    description = models.TextField(max_length=4000)
    image_hash = models.CharField(max_length=256)

    delegates = models.ManyToManyField(User, related_name='delegates')
    users = models.ManyToManyField(User)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at'] 