from django.db import models

class Badge(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField(max_length=4000)
    token_id = models.PositiveIntegerField(default=0)
    image_hash = models.CharField(max_length=256)
    parent_address = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.parent_address}:{self.token_id}"

    class Meta:
        ordering = ['-created_at'] 

class BadgeSet(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField(max_length=4000)
    image_hash = models.CharField(max_length=256, blank=True, null=True)
    contract_uri_hash = models.CharField(max_length=256, blank=True, null=True)
    
    creator_address = models.CharField(max_length=50, blank=False, null=False)
    # admin_addresses -- need a manytomany field maybe?
    chain = models.CharField(max_length=50, blank=True, null=True)
    contract_address = models.CharField(max_length=50, blank=True, null=True)

    badges = models.ManyToManyField(Badge, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']

class User(models.Model):
    address = models.CharField(max_length=50, blank=False, null=False)
    admin_for = models.ManyToManyField(BadgeSet, blank=True)
    badges_owned = models.ManyToManyField(Badge, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address