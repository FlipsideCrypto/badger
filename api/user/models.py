from django.db import models

class User(models.Model):
    address = models.CharField(max_length=50, blank=False, null=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.address