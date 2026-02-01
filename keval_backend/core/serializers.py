from rest_framework import serializers
from core.models import Banner, CoreValue, WhyChooseUs, ContactSubmission, TeamMember
from clients.models import Client
from testimonials.models import Testimonial

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ['id', 'title', 'subtitle', 'image', 'cta_text', 'cta_link', 'order', 'is_active']

    def validate_cta_link(self, value):
        if not value:
            return '/'
        if value.startswith('http://') or value.startswith('https://'):
            raise serializers.ValidationError("Use an internal path like '/contact'.")
        if not value.startswith('/'):
            raise serializers.ValidationError("CTA link must start with '/'.")
        if value.startswith('//'):
            raise serializers.ValidationError("CTA link must be a single '/' path.")
        return value

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'logo', 'website', 'is_featured', 'order'] 

class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = ['id', 'title', 'description', 'icon', 'order'] 

class WhyChooseUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUs
        fields = ['id', 'title', 'description', 'icon', 'order']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'client_name', 'company', 'position', 'avatar', 'content', 'rating', 'created_at']


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'phone', 'service_interest', 'message', 'submitted_at']
        read_only_fields = ['submitted_at', 'is_read'] # User shouldn't set these

    def validate_email(self, value):
        """
        Example custom validation: Ensure it's a real email format if needed.
        (Django's EmailField handles basic regex, but you can add business logic here).
        """
        return value.lower()
    

class TeamMemberSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = TeamMember
        fields = [
            'id', 'name', 'title', 'bio', 'image', 
            'department', 'linkedin', 'twitter', 
            'email', 'order', 'is_active'
        ]