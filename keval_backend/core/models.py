from django.db import models
from django.core.validators import MaxLengthValidator, RegexValidator


class Banner(models.Model):
    title = models.CharField(
        max_length=50,
        help_text="Main heading. Restricted to 50 characters."
    )
    subtitle = models.CharField(
        max_length=100,
        blank=True,
        help_text="Sub-heading. Restricted to 100 characters."
    )
    image = models.ImageField(
        upload_to='banners/',
        help_text="High-resolution banner image (e.g., 1920x600)."
    )
    cta_text = models.CharField(
        max_length=20, 
        blank=True, 
        help_text="Text for the button (e.g., 'View Work')."
    )
    cta_link = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        default='/',
        validators=[
            RegexValidator(
                regex=r'^/[^\\s]*$',
                message="CTA link must be an internal path starting with '/'."
            )
        ],
        help_text="Internal URL path (e.g., '/contact'). Leave blank for homepage."
    )
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(
        default=0, 
        help_text="Lower numbers appear first."
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.cta_link:
            self.cta_link = '/'
        super().save(*args, **kwargs)
    

# --- 2. Core Values ---
class CoreValue(models.Model):
    title = models.CharField(
        max_length=50, 
        help_text="e.g., 'Integrity', 'Quality'"
    )
    description = models.TextField(
        validators=[MaxLengthValidator(300)],
        help_text="Short explanation of this value (Max 300 chars)."
    )
    icon = models.ImageField(upload_to='core_values/', help_text="Icon representing the value.")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.title

# --- 3. Why Choose Us ---
class WhyChooseUs(models.Model):
    title = models.CharField(
        max_length=100, 
        help_text="e.g., '20 Years Experience', 'Eco-Friendly Inks'"
    )
    description = models.TextField()
    icon = models.ImageField(upload_to='why_choose_us/', blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Why Choose Us Item"
        verbose_name_plural = "Why Choose Us Items"
        ordering = ['order']

    def __str__(self):
        return self.title
    
from django.db import models


# --- 4. ---
class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100, help_text="e.g. Creative Director")
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to='team/')
    
    # Department grouping
    DEPARTMENT_CHOICES = [
        ('management', 'Management'),
        ('design', 'Design & Print'),
        ('sales', 'Sales & Marketing'),
        ('operations', 'Operations'),
    ]
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES, default='management')
    
    # Social Links (Optional)
    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    
    # Robustness fields
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Team Member"

    def __str__(self):
        return f"{self.name} - {self.title}"

# --- 5. Get In Touch (Contact Form) ---
class ContactSubmission(models.Model):
    """
    Stores 'Get in Touch' form submissions from the frontend.
    """
    service_interest = models.CharField(
        max_length=100, 
        blank=True, 
        help_text="Which service are they interested in?"
    )
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.name} ({self.submitted_at.date()})"