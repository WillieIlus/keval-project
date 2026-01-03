from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.core.mail import EmailMessage
from django.conf import settings



from .models import Banner, CoreValue, WhyChooseUs, TeamMember, ContactSubmission
from .serializers import (
    BannerSerializer, CoreValueSerializer, 
    WhyChooseUsSerializer, TeamMemberSerializer, ContactSubmissionSerializer
)

class BannerListView(generics.ListAPIView):
    queryset = Banner.objects.filter(is_active=True).order_by('order')
    serializer_class = BannerSerializer
    permission_classes = [AllowAny]

class CoreValueListView(generics.ListAPIView):
    queryset = CoreValue.objects.all().order_by('order')
    serializer_class = CoreValueSerializer
    permission_classes = [AllowAny]

class WhyChooseUsListView(generics.ListAPIView):
    queryset = WhyChooseUs.objects.all().order_by('order')
    serializer_class = WhyChooseUsSerializer
    permission_classes = [AllowAny]

class TeamMemberListView(generics.ListAPIView):
    serializer_class = TeamMemberSerializer
    
    def get_queryset(self):
        # Only show active members, sorted by your 'order' field
        return TeamMember.objects.filter(is_active=True).order_by('order')

class ContactSubmissionCreateView(generics.CreateAPIView):
    """
    Handles POST requests from the 'Get in Touch' form.
    Triggers an email notification on successful save.
    """
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        submission = serializer.save()
        
        # --- EMAIL NOTIFICATION LOGIC ---
        # Ensure you have EMAIL_HOST_USER configured in settings.py
        subject = f"New Lead: {submission.name} - {submission.service_interest}"
        message = (
            f"You have a new inquiry from Keval.co.ke:\n\n"
            f"Name: {submission.name}\n"
            f"Email: {submission.email}\n"
            f"Phone: {submission.phone}\n"
            f"Service: {submission.service_interest}\n"
            f"Message:\n{submission.message}"
        )
        
# 2. Create Email Object
        email = EmailMessage(
            subject=subject,
            body=message,
            from_email=settings.EMAIL_HOST_USER, # Must be your authenticated email
            to=[settings.EMAIL_HOST_USER],       # Send to yourself
            reply_to=[submission.email]          # Reply to the client
        )

        # 3. Send
        try:
            email.send(fail_silently=False)
            print("Email sent successfully")
        except Exception as e:
            print(f"Failed to send email: {e}") 
            # Note: We don't stop the save() even if email fails, 
            # so the data is safely stored in the database.