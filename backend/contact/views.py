from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import ScopedRateThrottle
from drf_spectacular.utils import extend_schema
from .serializers import MessageSerializer


class SendMessageView(APIView):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    @extend_schema(request=MessageSerializer, responses={201: MessageSerializer})
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'detail': 'Message received.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
