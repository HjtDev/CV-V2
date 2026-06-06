from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import ScopedRateThrottle
from drf_spectacular.utils import extend_schema
from .serializers import MessageSerializer


@extend_schema(request=MessageSerializer, responses={201: MessageSerializer})
@api_view(['POST'])
def send_message(request):
    """Accepts contact form submissions."""
    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'detail': 'Message received.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
