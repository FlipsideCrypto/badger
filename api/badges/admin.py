from django.contrib import admin

from .models import BadgeSet, Badge, User

class BadgeSetAdmin(admin.ModelAdmin):
    list_display = ('name', 'contract_address')

class BadgeAdmin(admin.ModelAdmin):
    list_display = ('name', 'token_id')

admin.site.register(Badge, BadgeAdmin)
admin.site.register(BadgeSet, BadgeSetAdmin)