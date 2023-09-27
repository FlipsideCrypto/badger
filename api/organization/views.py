from rest_framework import filters, viewsets

from .models import Organization
from .serializers import OrganizationSerializer


class OrganizationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Organization.objects.filter(
        is_active=True,
        image_hash__isnull=False,
        name__isnull=False,
    ).exclude(image_hash=" ")
    serializer_class = OrganizationSerializer

    filter_backends = (filters.SearchFilter,)
    search_fields = (
        "name",
        "description",
        "owner__ethereum_address",
        "modules__ethereum_address",
        "badges__users__ethereum_address",
        "badges__name",
    )
