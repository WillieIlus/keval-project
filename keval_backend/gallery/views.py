from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import ServiceCategory, Project
from .serializers import ServiceCategorySerializer, ProjectSerializer


class CategoryListView(generics.ListAPIView):
    """
    Returns the full tree: Categories -> Subcategories -> Projects -> Images
    """
    queryset = ServiceCategory.objects.filter(parent__isnull=True)
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """Allow POST to work the same as GET"""
        return self.list(request, *args, **kwargs)


class ProjectDetailView(generics.RetrieveAPIView):
    """
    Fetch a single project by its ID or Slug
    """
    queryset = Project.objects.filter(is_featured=True)
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def post(self, request, *args, **kwargs):
        """Allow POST to work the same as GET"""
        return self.retrieve(request, *args, **kwargs)