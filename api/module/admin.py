from django.contrib import admin

from .models import Module 

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('is_active', 'ethereum_address', 'created')
    list_filter = ('is_active', 'ethereum_address', 'created')
    search_fields = ('ethereum_address',)