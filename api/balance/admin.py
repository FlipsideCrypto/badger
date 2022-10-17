from django.contrib import admin

from .models import Balance

@admin.register(Balance)
class BalanceAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'organization',
        'token_id',
        'amount',
    )
    list_filter = (
        'user',
        'organization',
        'token_id',
    )
    search_fields = (
        'user',
        'organization',
        'token_id',
    )
    ordering = (
        'user',
        'organization',
        'token_id',
    )