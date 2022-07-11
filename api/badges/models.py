from django.db import models

class Badge(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField(max_length=4000)
    token_id = models.PositiveIntegerField(blank=False, null=False)
    image_hash = models.CharField(max_length=256)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['token_id'] 

class BadgeSet(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField(max_length=4000)
    image_hash = models.CharField(max_length=256, blank=True, null=True)
    contract_uri_hash = models.CharField(max_length=256, blank=True, null=True)
    
    creator_address = models.CharField(max_length=50, blank=False, null=False)
    # admin_addresses -- need a modeltomodel field maybe?

    chain = models.CharField(max_length=50, blank=True, null=True)
    contract_address = models.CharField(max_length=50, blank=True, null=True)

    contract_initialized = models.BooleanField(default=False, null=True)
    badges = models.ManyToManyField(Badge)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['created_at'] 


# class OrgFile(models.Model):
#     ipfs_hash = models.CharField(max_length=256)

# class Org(models.Model):
#     name = models.CharField(max_length=256, unique=True)
#     creator_address = models.CharField(max_length=256)
#     contract_address = models.CharField(max_length=256)

#     files = models.ManyToManyField(OrgFile)

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.name

#     def upload_file_to_ipfs(self, file):
#         # upload to ipfs
#         file_ipfs_hash = ""

#         org_file_obj = OrgFile.objects.create(ipfs_hash=file_ipfs_hash)

#         self.files.add(org_file_obj)
#         self.save()

#     class Meta:
#         ordering = ['name'] 