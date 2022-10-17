from django.contrib import admin

from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('feedback_url', 'liked', 'comment', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('feedback_url', 'comment')