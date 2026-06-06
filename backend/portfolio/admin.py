from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Project, SiteStatus


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ['name', 'name_fa', 'status', 'order', 'updated_at']
    list_editable = ['status', 'order']
    list_filter   = ['status']
    search_fields = ['name', 'name_fa', 'description', 'description_fa']
    ordering      = ['order', '-created_at']

    fieldsets = (
        (_('🇬🇧 English'), {
            'fields': ('name', 'description', 'url', 'github_url'),
        }),
        (_('🇮🇷 فارسی'), {
            'fields': ('name_fa', 'description_fa'),
        }),
        (_('⚙️ Settings'), {
            'fields': ('tags', 'status', 'order'),
        }),
    )


@admin.register(SiteStatus)
class SiteStatusAdmin(admin.ModelAdmin):
    list_display = ['is_available', 'status_text', 'status_text_fa', 'updated_at']

    fieldsets = (
        (_('🇬🇧 English'), {
            'fields': ('is_available', 'status_text'),
        }),
        (_('🇮🇷 فارسی'), {
            'fields': ('status_text_fa',),
        }),
    )

    def has_add_permission(self, request):
        return not SiteStatus.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
