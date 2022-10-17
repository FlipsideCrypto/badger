from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Feedback(models.Model):
    author = models.ForeignKey(
        'siwe_auth.Wallet',
        on_delete=models.CASCADE,
        related_name='feedbacks',
        null=True
    )

    feedback_url = models.CharField(max_length=255)
    liked = models.BooleanField()
    comment = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.url
