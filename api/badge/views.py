from rest_framework import status, viewsets
from rest_framework.permissions import (
    IsAuthenticated,
)
from rest_framework.response import Response

from api.permissions import generator, CanManageBadge

from organization.models import Organization 

from .models import Badge
from .serializers import BadgeSerializer

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

    permission_classes = [IsAuthenticated] 

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes += [CanManageBadge]

        return generator(self.permission_classes)

    # on create handle the badge creation and add it to .badges of the organization it is being added to
    def create(self, request, *args, **kwargs):
        # get the organization
        organization = Organization.objects.get(pk=request.data['organization'])

        # confirm the requesting user is the owner or delegate of the organization
        if not (request.user == organization.owner or request.user in organization.delegates.all()):
            return Response(status=status.HTTP_403_FORBIDDEN)

        # create the badge
        serializer = self.get_serializer(data=request.data)

        # TODO: Upload the metadata to IPFS

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # add the badge to the organization
        organization.badges.add(serializer.instance)
        # save the organization
        organization.save()

        # return the badge
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)