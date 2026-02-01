# views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from .models import ServiceCategory, Project, ProjectImage
from .serializers import (
    ServiceCategorySerializer, 
    ProjectSerializer, 
    ProjectImageSerializer,
    ProjectImageUploadSerializer
)


class CategoryListView(generics.ListCreateAPIView):
    queryset = ServiceCategory.objects.filter(parent__isnull=True)
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]


class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.filter(is_featured=True)
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

class ProjectAdminListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    parser_classes = [MultiPartParser, FormParser]

class ProjectAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]


# ========== IMAGE VIEWS ==========

class ProjectImageListCreateView(generics.ListCreateAPIView):
    """
    GET: List all images for a specific project
    POST: Add a single image to a project
    """
    serializer_class = ProjectImageSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return ProjectImage.objects.filter(project_id=project_id).order_by('order')

    def perform_create(self, serializer):
        project_id = self.kwargs['project_id']
        project = Project.objects.get(id=project_id)
        serializer.save(project=project)

class ProjectImageAdminListCreateView(generics.ListCreateAPIView):
    queryset = ProjectImage.objects.all().order_by('order')
    serializer_class = ProjectImageSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]


class ProjectImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET/PUT/PATCH/DELETE a single image
    """
    queryset = ProjectImage.objects.all()
    serializer_class = ProjectImageSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]


class ProjectMultipleImageUploadView(APIView):
    """
    Upload multiple images to a project at once
    """
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        images = request.FILES.getlist('images')
        captions = request.POST.getlist('captions', [])
        
        created_images = []
        for i, image in enumerate(images):
            caption = captions[i] if i < len(captions) else ''
            project_image = ProjectImage.objects.create(
                project=project,
                image=image,
                caption=caption,
                order=i
            )
            created_images.append(project_image)
        
        serializer = ProjectImageSerializer(created_images, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
