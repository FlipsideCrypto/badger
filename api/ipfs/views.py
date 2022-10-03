from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .utils import pin_image, pin_json


class IPFSViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='pin-image', url_name='pin-image')
    def upload_image(self, request):
        # Get the image from the request
        image = request.data.get('image', None)

        # If the image is not in the request, return an error
        if not image:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Pin the image to IPFS
        pin_response = pin_image(image, image.name)

        # If the pinning was successful, return the hash
        if pin_response['status'] == 'success':
            return Response({'hash': pin_response['IpfsHash']}, status=status.HTTP_200_OK)

        # If the pinning was not successful, return an error
        return Response({'error': pin_response['message']}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='pin-json', url_name='pin-json')
    def upload_json(self, request):
        # Get the data from the request
        data = request.data.get('data', None)

        # If the data is not in the request, return an error
        if not data:
            return Response({'error': 'No data provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Pin the data to IPFS
        pin_response = pin_json(data)

        # If the pinning was successful, return the hash
        if pin_response['status'] == 'success':
            return Response({'hash': pin_response['IpfsHash']}, status=status.HTTP_200_OK)

        # If the pinning was not successful, return an error
        return Response({'error': pin_response['message']}, status=status.HTTP_400_BAD_REQUEST)
