from django.http import JsonResponse
from django.conf import settings

from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.decorators import action

from tempfile import NamedTemporaryFile
from pinatapy import PinataPy

from .models import BadgeSet, Badge
from .serializers import BadgeSetSerializer, BadgeSerializer

pinata = PinataPy(settings.PINATA_API_KEY, settings.PINATA_API_SECRET_KEY)

class BadgeSetViewSet(viewsets.ModelViewSet):
    queryset = BadgeSet.objects.all()
    serializer_class = BadgeSetSerializer
    permission_classes = (AllowAny,)

    @action(methods=["post"], detail=False)
    def new_set(self, request):
        if request.method != 'POST':
            return JsonResponse({'success': False})

        imgFile = request.FILES.get("file", None)
        imgName = request.POST.get("fileName", None)
        setName = request.POST.get("name", None)
        setDesc = request.POST.get("desc", None)
        creator_address = request.POST.get("creator_address", None)

        if imgFile.size > 2000000:
            return JsonResponse({'success': False, 'error':'File too large.'})

        ## pin collection image
        with NamedTemporaryFile(suffix=".gif", delete=True) as temp_file:
            # convert uploaded file to temp file in order to upload.
            temp_file.write(imgFile.read())
            pin_response = pinata.pin_file_to_ipfs(temp_file.name, imgName)

        print(pin_response)

        ipfs_img_hash = pin_response['IpfsHash']
        created_at = pin_response['Timestamp']
        ## pin contract uri
        contract_uri = {
            "name": setName,
            "description": setDesc,
            "image": f'https://badger.mypinata.cloud/ipfs/{ipfs_img_hash}'
        }
        pin_response = pinata.pin_json_to_ipfs(contract_uri, options={'pinataMetadata': {'name': f'{setName}contracturi'}})
        print(pin_response)
        ## build response
            # contract uri hash
            # cleaned and formatted description?

        response = {
            'contract_uri_hash': 'fff',
            'description': 'blahblah',
            'success': True
        }

        return JsonResponse(response)

    def pin_image(self, image):

        return

    def pin_contract_metadata(self, request):

        return