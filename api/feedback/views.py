from rest_framework import viewsets
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser
)

from api.permissions import generator

from .models import Feedback
from .serializers import FeedbackSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not self.request.user.is_admin:
            return self.queryset.filter(author=self.request.user)
        return self.queryset

    def get_permissions(self):
        permission_classes = []
        
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]

        return generator(self.permission_classes + permission_classes)