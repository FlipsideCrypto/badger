from django.contrib import admin

from .models import Badge

@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created', 'updated')
    list_filter = ('name', 'description', 'created', 'updated')
    search_fields = ('name', 'description', 'created', 'updated')