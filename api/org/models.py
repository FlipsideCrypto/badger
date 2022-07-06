from django.db import models

class OrgFile(models.Model):
    ipfs_hash = models.CharField(max_length=256)

class Org(models.Model):
    name = models.CharField(max_length=256, unique=True)
    creator_address = models.CharField(max_length=256)
    contract_address = models.CharField(max_length=256)

    files = models.ManyToManyField(OrgFile)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def upload_file_to_ipfs(self, file):
        # upload to ipfs
        file_ipfs_hash = ""

        org_file_obj = OrgFile.objects.create(ipfs_hash=file_ipfs_hash)

        self.files.add(org_file_obj)
        self.save()

    class Meta:
        ordering = ['name'] 