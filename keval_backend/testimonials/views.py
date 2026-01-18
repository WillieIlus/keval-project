from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """Allow POST to work the same as GET"""
        return self.list(request, *args, **kwargs)