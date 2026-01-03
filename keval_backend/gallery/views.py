from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import ServiceCategory, Project
from .serializers import ServiceCategorySerializer, ProjectSerializer

class CategoryListView(generics.ListAPIView):
    """
    Returns the full tree: Categories -> Subcategories -> Projects -> Images
    """
    # Only fetch top-level categories (parents), the serializer handles the children
    queryset = ServiceCategory.objects.filter(parent__isnull=True)
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]

class ProjectDetailView(generics.RetrieveAPIView):
    """
    Fetch a single project by its ID or Slug
    """
    queryset = Project.objects.filter(is_featured=True) # Or all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug' # Allows fetching by /projects/branding-campaign-2024/
    