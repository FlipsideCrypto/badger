from venv import create
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

        imgFile = request.FILES.get("file", None)
        imgName = request.POST.get("fileName", None)
        setName = request.POST.get("name", None)
        setDesc = request.POST.get("desc", None)
        creator_address = request.POST.get("creator_address", None)

        ## TODO: Clean description and add line break unicode

        # 20MB limit (can be altered tho)
        if imgFile.size > 20000000:
            return JsonResponse({'success': False, 'error':'File too large.'})

        ## pin collection image
        img_pin_response = pin_image(imgFile)

        ipfs_img_hash = img_pin_response['IpfsHash']
        created_at = img_pin_response['Timestamp']

        ## pin contract uri
        contract_uri = {
            "name": setName,
            "description": setDesc,
            "image": f'https://badger.mypinata.cloud/ipfs/{ipfs_img_hash}'
        }

        pin_response = pinata.pin_json_to_ipfs(contract_uri, options={'pinataMetadata': {'name': f'{setName}contracturi'}})
        
        contract_uri_hash = pin_response['IpfsHash']

        response = {
            'contract_uri_hash': contract_uri_hash,
            'image_hash': ipfs_img_hash,
            'description': setDesc,
            'success': True
        }

        badgeSetObj = BadgeSet(
            name=setName,
            description=setDesc,
            creator_address=creator_address,
            image_hash=ipfs_img_hash,
            created_at=created_at,
            contract_uri_hash=contract_uri_hash
        )
        badgeSetObj.save()

        return JsonResponse(response)

    @action(methods=["post"], detail=False)
    def update_set(self, request):
        contract_address = request.POST.get("contract_address", None)
        contract_initialized = request.POST.get("contract_initialized", None)
        badges = request.POST.get("badges", None)
        chain = request.POST.get("chain", None)

        # for values in request update model and save.

        pass

    def pin_image(self, imageFile):
        with NamedTemporaryFile(suffix=".gif", delete=True) as temp_file:
            # convert uploaded file to temp file in order to upload.
            temp_file.write(imageFile.read())
            pin_response = pinata.pin_file_to_ipfs(temp_file.name, '', save_absolute_paths=False)

        return pin_response

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = (AllowAny,)
    
    @action(methods=["post"], detail=False)
    def new_badge(self, request):
        imgFile = request.FILES.get("file", None)
        imgName = request.POST.get("fileName", None)
        badgeName = request.POST.get("name", None)
        badgeDesc = request.POST.get("desc", None)

        ## TODO: Clean description and add line break unicode

        # 20MB limit (can be altered tho)
        if imgFile.size > 20000000:
            return JsonResponse({'success': False, 'error':'File too large.'})

        ## pin collection image
        img_pin_response = pin_image(imgFile)

        ipfs_img_hash = img_pin_response['IpfsHash']
        created_at = img_pin_response['Timestamp']

        ## pin contract uri
        contract_uri = {
            "name": setName,
            "description": setDesc,
            "image": f'https://badger.mypinata.cloud/ipfs/{ipfs_img_hash}'
        }

        pin_response = pinata.pin_json_to_ipfs(contract_uri, options={'pinataMetadata': {'name': f'{setName}contracturi'}})
        
        contract_uri_hash = pin_response['IpfsHash']

        response = {
            'contract_uri_hash': contract_uri_hash,
            'image_hash': ipfs_img_hash,
            'description': setDesc,
            'success': True
        }

        badgeSetObj = BadgeSet(
            name=setName,
            description=setDesc,
            creator_address=creator_address,
            image_hash=ipfs_img_hash,
            created_at=created_at,
            contract_uri_hash=contract_uri_hash
        )
        badgeSetObj.save()

        return JsonResponse(response)
    
def pin_image(self, imageFile):
    with NamedTemporaryFile(suffix=".gif", delete=True) as temp_file:
        # convert uploaded file to temp file in order to upload.
        temp_file.write(imageFile.read())
        pin_response = pinata.pin_file_to_ipfs(temp_file.name, '', save_absolute_paths=False)

    return pin_response
