from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Client
from .serializers import ClientSerializer
from accounts.permissions import IsSuperuserOrReadOnly


class ClientListView(generics.ListCreateAPIView):
    queryset = Client.objects.filter(is_featured=True).order_by('order')
    serializer_class = ClientSerializer
    permission_classes = [IsSuperuserOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]  

class ClientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsSuperuserOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]