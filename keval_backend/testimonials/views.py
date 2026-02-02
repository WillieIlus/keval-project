from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Testimonial
from .serializers import TestimonialSerializer
from accounts.permissions import CanManageTestimonials


class TestimonialListView(generics.ListCreateAPIView):
    queryset = Testimonial.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = TestimonialSerializer
    permission_classes = [CanManageTestimonials]
    parser_classes = [MultiPartParser, FormParser]

class TestimonialDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [CanManageTestimonials]
    parser_classes = [MultiPartParser, FormParser]