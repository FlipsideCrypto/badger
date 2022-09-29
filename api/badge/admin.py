from django.contrib import admin

from .models import Badge

@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at')
    list_filter = ('name', 'description', 'created_at', 'updated_at')
    search_fields = ('name', 'description', 'created_at', 'updated_at')