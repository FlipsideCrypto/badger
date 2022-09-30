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

    def delegate(self, user):
        if user not in self.delegates.all():
            self.delegates.add(user)
        raise ValueError('User is already a delegate')

    def undelegate(self, user):
        if user in self.delegates.all():
            self.delegates.remove(user)
        raise ValueError('User is not a delegate')  

    class Meta:
        ordering = ['-created_at'] 