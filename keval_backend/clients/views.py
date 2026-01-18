from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Client
from .serializers import ClientSerializer


class ClientListView(generics.ListAPIView):
    queryset = Client.objects.filter(is_featured=True).order_by('order')
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """Allow POST to work the same as GET"""
        return self.list(request, *args, **kwargs)