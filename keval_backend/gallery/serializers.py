from rest_framework import serializers
from gallery.models import ServiceCategory, Project, ProjectImage
# serializers.py
from rest_framework import serializers
from gallery.models import ServiceCategory, Project, ProjectImage


class ProjectImageSerializer(serializers.ModelSerializer):
    """
    Serializes individual gallery images.
    """
    class Meta:
        model = ProjectImage
        fields = ['id', 'project', 'image', 'caption', 'is_cover', 'order']


class ProjectImageUploadSerializer(serializers.ModelSerializer):
    """
    For uploading multiple images at once.
    """
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'is_cover', 'order']


class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializes the Project and nests its images.
    """
    images = ProjectImageSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'client', 'description',
            'print_method', 'material_used', 'finishing', 'date_completed',
            'is_featured', 'category', 'category_name', 'images', 'created_at'
        ]

class ServiceCategorySerializer(serializers.ModelSerializer):
    """
    Serializes Categories. 
    It is 'Recursive' to handle sub-categories (Parent -> Child).
    """
    # 1. Nest projects directly inside this category
    projects = ProjectSerializer(many=True, read_only=True) 
    
    # 2. Nest sub-categories (Self-referential serialization)
    subcategories = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCategory
        fields = [
            'id', 'name', 'icon', 'cover_image', 
            'description', 'parent', 'subcategories', 'projects'
        ] 

    def get_subcategories(self, obj):
        """
        Recursively serialize children categories.
        """
        children = obj.subcategories.all()
        return ServiceCategorySerializer(children, many=True, context=self.context).data