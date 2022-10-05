from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import (
    IsAuthenticated,
)

from api.permissions import generator, CanManageOrganization

from .models import Organization
from .serializers import OrganizationSerializer

class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    permission_classes = [IsAuthenticated]

    # def create(self, request):
    #     try:
    #         print('request data', request.data)
    #         serializer = self.get_serializer(data=request.data)
    #         print('serializer', serializer)
    #         serializer.is_valid(raise_exception=True)
    #         self.perform_create(serializer)
    #         headers = self.get_success_headers(serializer.data)
    #     except Exception as e:
    #         print('error', e)
    #         return Response(
    #             {'error': str(e)},
    #             status=status.HTTP_400_BAD_REQUEST
    #         )
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    # def create(self, request):
    #     print(request)
    #     print('post', request.POST)
    #     print('data', request.data)
    #     return Response({'status': 'ok'})

    def get_permissions(self): 
        if self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes += [CanManageOrganization]

        return generator(self.permission_classes)