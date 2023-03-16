from rest_framework import viewsets

from .models import Organization
from .serializers import OrganizationSerializer

class OrganizationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer