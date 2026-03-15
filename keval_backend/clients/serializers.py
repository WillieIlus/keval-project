from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            'id',
            'name',
            'logo',
            'website',
            'description',
            'project_type',
            'is_featured',
            'order'
        ]