from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    company = models.CharField(max_length=100, blank=True)
    position = models.CharField(max_length=100, blank=True, help_text="e.g., Marketing Director")
    avatar = models.ImageField(
        upload_to='testimonials/', 
        blank=True, 
        null=True
    )
    content = models.TextField(help_text="The testimonial text.")
    rating = models.PositiveSmallIntegerField(
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Star rating from 1 to 5."
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.client_name} - {self.company}"