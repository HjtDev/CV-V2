from rest_framework import serializers
from .models import Project, SiteStatus


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Project
        fields = [
            'id', 'name', 'name_fa',
            'description', 'description_fa',
            'url', 'github_url', 'tags', 'status', 'order',
        ]


class SiteStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SiteStatus
        fields = ['is_available', 'status_text', 'status_text_fa', 'updated_at']
