from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='clients/logos/')
    website = models.URLField(blank=True, help_text="Optional link to client's site.")
    description = models.TextField(
        blank=True,
        help_text="Short description or summary for the client modal."
    )
    project_type = models.CharField(
        max_length=200,
        blank=True,
        help_text="e.g. Branding, Business Cards, Packaging"
    )
    is_featured = models.BooleanField(
        default=True,
        help_text="Show on the home page."
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name