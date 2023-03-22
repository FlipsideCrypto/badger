from rest_framework import filters, viewsets

from .models import Organization
from .serializers import OrganizationSerializer

class OrganizationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    filter_backends = (filters.SearchFilter,)
    search_fields = (
        'name', 
        'description', 
        'owner__ethereum_address',
        'modules__ethereum_address',
        'badges__users__ethereum_address',
        'badges__name'
    )