from django.db import models
from django.utils.text import slugify

class ServiceCategory(models.Model):
    """
    This handles your 7 main service areas and their sub-categories.
    Root examples: 'Design', 'Commercial & Paper Printing', 'Garment Printing'
    Sub-category examples: 'Business Cards', 'T-Shirts'
    """
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True, 
        related_name='subcategories',
        help_text="Leave blank if this is a Main Service (e.g., Garment Printing). Select a parent if this is a sub-category (e.g., T-Shirts)."
    )
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    icon = models.ImageField(
        upload_to='services/icons/', 
        blank=True, 
        help_text="Icon for the service (e.g., specific to 'Design' or 'Large Format')."
    )
    cover_image = models.ImageField(
        upload_to='services/covers/', 
        blank=True,
        help_text="Main background image for this service page."
    )
    description = models.TextField(blank=True, help_text="Short intro about this service.")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Service / Category"
        verbose_name_plural = "Services / Categories"
        ordering = ['order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        # Displays hierarchy: "Garment Printing > T-Shirts"
        if self.parent:
            return f"{self.parent.name} > {self.name}"
        return self.name


class Project(models.Model):
    """
    The actual portfolio items (images/jobs) inside the categories.
    """
    category = models.ForeignKey(
        ServiceCategory, 
        on_delete=models.CASCADE, 
        related_name='projects'
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True) 
    client = models.CharField(max_length=200, blank=True, help_text="Who was this job for?")
    description = models.TextField(help_text="Details about the project specs.")
    
    # Technical Specs fields (as requested previously)
    print_method = models.CharField(max_length=100, blank=True)
    material_used = models.CharField(max_length=100, blank=True)
    
    date_completed = models.DateField(null=True, blank=True)
    finishing = models.CharField(
        max_length=200, 
        blank=True, 
        help_text="e.g., Matte Lamination, Spot UV, Die Cut"
    )
    
    is_featured = models.BooleanField(default=False, help_text="Show on home page gallery.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_completed', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    """
    Multiple images for a single project.
    """
    project = models.ForeignKey(
        Project, 
        on_delete=models.CASCADE, 
        related_name='images'
    )
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    is_cover = models.BooleanField(
        default=False, 
        help_text="Use this image as the thumbnail/cover for the project."
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-is_cover', 'order']

    def save(self, *args, **kwargs):
        # Ensure only one cover image per project
        if self.is_cover:
            ProjectImage.objects.filter(project=self.project, is_cover=True).update(is_cover=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Image for {self.project.title}"