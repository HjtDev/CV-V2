from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from drf_spectacular.utils import extend_schema
from .models import Project, SiteStatus
from .serializers import ProjectSerializer, SiteStatusSerializer
from shared.cache import drf_cached_response


@extend_schema(responses=ProjectSerializer(many=True))
@api_view(['GET'])
@drf_cached_response(ttl=300, cache_prefix='projects_list', user_aware=False)
def projects_list(request):
    """Returns all active and in-progress projects ordered by display order."""
    projects = Project.objects.exclude(status=Project.Status.ARCHIVED)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)


@extend_schema(responses=SiteStatusSerializer)
@api_view(['GET'])
@drf_cached_response(ttl=60, cache_prefix='site_status', user_aware=False)
def site_status(request):
    """Returns current availability status."""
    status = SiteStatus.get()
    serializer = SiteStatusSerializer(status)
    return Response(serializer.data)
