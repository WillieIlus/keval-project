from rest_framework import serializers
from .models import Testimonial

class TestimonialSerializer(serializers.ModelSerializer):
    # Optional: formatting date for easier frontend display (e.g., "Aug 2024")
    formatted_date = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            'id', 
            'client_name', 
            'company', 
            'position', 
            'avatar', 
            'content', 
            'rating', 
            'created_at',
            'formatted_date'
        ]
    
    def get_formatted_date(self, obj):
        return obj.created_at.strftime("%B %Y")