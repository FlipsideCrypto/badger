from django.contrib import admin

from .models import Balance

@admin.register(Balance)
class BalanceAdmin(admin.ModelAdmin):
    list_display = ('badge', 'user', 'amount')
    list_filter = ('organization', 'badge', 'user' )
    search_fields = (
        'organization',
        'badge',
        'user',
    )
    ordering = (
        'organization',
        'badge',
        'user',
    )