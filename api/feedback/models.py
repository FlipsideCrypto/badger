from django.db import models

class Feedback(models.Model):
    url = models.CharField(max_length=255)
    liked = models.BooleanField()
    comment = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.url
