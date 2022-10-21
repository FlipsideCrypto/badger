from django.contrib import admin

from .models import Organization 

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'owner', 'created', 'updated')
    list_filter = ('name', 'description', 'created', 'updated')
    search_fields = ('name', 'description', 'created', 'updated')