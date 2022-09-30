from django.db import models

from user.models import User 

class Badge(models.Model):
    token_id = models.PositiveIntegerField(default=0)

    name = models.CharField(max_length=128, blank=False, default=None)
    image_hash = models.CharField(max_length=256, blank=False, default=None)

    description = models.TextField()

    delegates = models.ManyToManyField(User, related_name='delegates', blank=True)
    users = models.ManyToManyField(User, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def delegate(self, delegate):
        if delegate is None:
            raise ValueError("Delegate cannot be None")
        if self.delegates.filter(pk=delegate.pk).exists():
            raise ValueError("Delegate already exists")            

        self.delegates.add(delegate)
        self.save()

    def undelegate(self, delegate):
        if delegate is None:
            raise ValueError("Delegate cannot be None")
        if not self.delegates.filter(pk=delegate.pk).exists():
            raise ValueError("Delegate does not exist")

        self.delegates.remove(delegate)
        self.save()

    class Meta:
        ordering = ['-created_at']