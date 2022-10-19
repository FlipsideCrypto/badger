from django.contrib import admin

from .models import ContractListener

@admin.register(ContractListener)
class ContractListenerAdmin(admin.ModelAdmin):
    list_display = ('chain', 'ethereum_address', 'last_block')
    list_display_links = ('chain', 'ethereum_address', 'last_block')