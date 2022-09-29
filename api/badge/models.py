from django.db import models

class Badge(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField(max_length=4000)

    token_id = models.PositiveIntegerField(default=0)

    image_hash = models.CharField(max_length=256)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at'] 