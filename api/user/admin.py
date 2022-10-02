from django.contrib import admin

from .models import User 

admin.site.login_template = 'siwe_auth/login.html'

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('address',)
    list_display_links = ('address',)