from rest_framework import viewsets
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser
)

from .models import Feedback
from .serializers import FeedbackSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()

    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action != 'create':
            return [IsAdminUser]

        return super().get_permissions()