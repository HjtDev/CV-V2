from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Message


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display   = ['name', 'email', 'created_at', 'is_read']
    list_editable  = ['is_read']
    list_filter    = ['is_read']
    search_fields  = ['name', 'email', 'message']
    readonly_fields = ['name', 'email', 'message', 'created_at']
    ordering       = ['-created_at']

    fieldsets = (
        (_('Sender'), {
            'fields': ('name', 'email'),
        }),
        (_('Message'), {
            'fields': ('message', 'created_at', 'is_read'),
        }),
    )
