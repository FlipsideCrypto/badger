from django.contrib import admin

from .models import Balance, Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('tx_hash', 'created')

@admin.register(Balance)
class BalanceAdmin(admin.ModelAdmin):
    list_display = ('badge', 'user', 'amount', 'created')
    list_filter = ('badge', 'user', 'amount')
    search_fields = ('badge', 'user')
    ordering = ('-created',)