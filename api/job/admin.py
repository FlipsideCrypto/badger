from django.contrib import admin

from .models import ContractListener

@admin.register(ContractListener)
class ContractListenerAdmin(admin.ModelAdmin):
    list_display = ('ethereum_address', 'event', 'last_block')
    list_display_links = ('ethereum_address', 'event', 'last_block')