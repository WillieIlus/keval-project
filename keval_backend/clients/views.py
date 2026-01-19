from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Client
from .serializers import ClientSerializer


class ClientListView(generics.ListCreateAPIView):  # ← Changed from ListAPIView
    queryset = Client.objects.filter(is_featured=True).order_by('order')
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]  