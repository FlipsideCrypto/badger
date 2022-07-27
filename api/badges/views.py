import json
from multiprocessing import dummy

from venv import create
from django.http import JsonResponse
from django.conf import settings
from django.utils import timezone

from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.decorators import action

from tempfile import NamedTemporaryFile
from pinatapy import PinataPy

from .models import BadgeSet, Badge, User
from .serializers import BadgeSetSerializer, BadgeSerializer, UserSerializer

pinata = PinataPy(settings.PINATA_API_KEY, settings.PINATA_API_SECRET_KEY)
# pinata = PinataPy('safasfasf', settings.PINATA_API_SECRET_KEY)

class BadgeSetViewSet(viewsets.ModelViewSet):
    queryset = BadgeSet.objects.all()
    serializer_class = BadgeSetSerializer
    permission_classes = (AllowAny,)

    @action(methods=["get"], detail=False)
    def get_badges(self, request):
        print(request.query_params)
        contract_address = self.request.query_params.get('contract_address')
        
        badge_set = self.get_queryset().get(contract_address=contract_address)
        for badge in badge_set.badges.all():
            print(badge.image_hash)
        return JsonResponse({'success': True})

    ## TODO: Clean description -- add line breaks if necessary
    @action(methods=['post'], detail=False)
    def ipfs_pin(self, request):
        set_name = request.data.get('set_name')
        set_desc = request.data.get('set_desc')
        set_img = request.data.get('set_img')
        badge_imgs = request.data.getlist('badge_imgs')
        
        max_file_size = 20000000 # 20MB
        
        ## TODO: does the \r\n\r\n work in the uri?
        # set_desc = set_desc.replace('\r\n\r\n', '\\n')
        # print('replaced set_desc', set_desc)

        # dummy_response = {
        #     'success':True, 
        #     'set_hash': 'asfasf', 
        #     'set_img_hash': 'asfasf', 
        #     'badge_img_hashes': ['1', '2', '3'],
        #     'deployment_args': {'contract_uri_hash': '12412412412412', 'description': set_desc}
        # }
        # return JsonResponse(dummy_response)
        
        
        try:
            if set_img.size > max_file_size:
                raise Exception('File {imgName} too large. Max {max_file_size / 1000000}MB')

            # pin contract image
            img_pin_response = pin_image(set_img, set_img.name)
            if 'status' in img_pin_response:
                print('Error pinning Set image', img_pin_response)
                error_msg = json.loads(img_pin_response['text'])
                error_msg = error_msg['error']['details']
                raise Exception(error_msg)

            set_img_hash = img_pin_response['IpfsHash']

            contract_uri = {
                "name": set_name,
                "description": set_desc,
                "image": f'https://badger.mypinata.cloud/ipfs/{set_img_hash}'
            }

            # pin contract uri
            uri_pin_response = pinata.pin_json_to_ipfs(contract_uri, options={'pinataMetadata': {'name': f'{set_name}-contracturi'}})
            if 'status' in uri_pin_response:
                print('Error pinning URI', uri_pin_response)
                error_msg = json.loads(uri_pin_response['text'])
                error_msg = error_msg['error']['details']
                raise Exception(error_msg)
            contract_uri_hash = uri_pin_response['IpfsHash']

            # Pin all badge images
            badge_img_hashes = []
            for image in badge_imgs:
                if image.size > max_file_size:
                    raise Exception('File {imgName} too large. Max {max_file_size / 1000000}MB')
                
                img_pin_response = pin_image(image, image.name)
                if 'status' in img_pin_response:
                    print('Error pinning Badge', image.name, img_pin_response)
                    error_msg = json.loads(img_pin_response['text'])
                    error_msg = error_msg['error']['details']
                    raise Exception(error_msg)
                badge_img_hashes.append(img_pin_response['IpfsHash'])

        except Exception as error:
            return JsonResponse({'success': False, 'error': str(error)})

        response = {
            'success': True, 
            'set_hash': contract_uri_hash, 
            'set_img_hash': set_img_hash, 
            'badge_img_hashes': badge_img_hashes,
            'deployment_args': {'contract_uri_hash': contract_uri_hash, 'description': set_desc}
        }

        print('Response: ', response)
        return JsonResponse(response)
    
    @action(methods=["post"], detail=False)
    def new_set(self, request):
        badges_data = request.data.get("badges_data", None)

        set_data = {
            'name': request.data.get("set_name", None),
            'description': request.data.get("set_desc", None),
            'image_hash': request.data.get("set_img_hash", None),
            'contract_address': request.data.get("set_contract_address", None),
            'creator_address': request.data.get("set_creator", None),
            'contract_uri_hash': request.data.get("set_contract_uri_hash", None),
            'chain': request.data.get("chain", None),
        }


        try:
            user_data = {
                'address': set_data['creator_address'],
            }
            user_serializer = UserSerializer(data=user_data)
            user_serializer.is_valid(raise_exception=True)
            user = user_serializer.save()

            badges_data = json.loads(badges_data)
            badge_serializer = BadgeSerializer(data=badges_data, many=True)
            badge_serializer.is_valid(raise_exception=True)

            set_data['badges'] = badge_serializer.data

            set_serializer = self.get_serializer(data=set_data)
            set_serializer.is_valid(raise_exception=True)
            badge_set = set_serializer.save()

            user.admin_for.add(badge_set)

        except Exception as error:
            return JsonResponse({'success': False, 'error': str(error)})

        return JsonResponse({'success': True})

    # TODO: Test this
    @action(methods=["post"], detail=False)
    def new_badges(self, request):
        badges_data = request.data.get("badges_data", None)
        set_address = request.data.get('set_address', None)

        try:
            badge_set = self.get_queryset().filter(contract_address=set_address)
            
            badges_data = json.loads(badges_data)
            badge_serializer = BadgeSerializer(data=badges_data, many=True)
            badge_serializer.is_valid(raise_exception=True)

            badge_set.badges.add(*badge_serializer.data)

        except Exception as error:
            return JsonResponse({'success': False, 'error': error})


        return JsonResponse({'success': True})

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = (AllowAny,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    @action(methods=["post"], detail=False)
    def new_mints(self, request):
        badge_ids = request.data.get("badge_ids", None)
        addresses = request.data.get("addresses", None)
        set_address = request.data.get('set_address', None)
        addresses = json.loads(addresses)
        badge_ids = json.loads(badge_ids)
        
        try:
            # Finding how many unique token_ids
            unique_badge_ids = []
            for token_id in badge_ids:
                if token_id not in unique_badge_ids:
                    unique_badge_ids.append(token_id)

            # Getting just one instance of each Badge
            badge_objs = {}
            for token_id in unique_badge_ids:
                badgeObj = Badge.objects.get(parent_address=set_address, token_id=token_id)
                badge_objs[token_id] = badgeObj

            for index, address in enumerate(addresses):
                userObj, created = self.get_queryset().get_or_create(address=address)
                badge_id = badge_ids[index]
                userObj.badges_owned.add(badge_objs[badge_id])
        except Exception as error:
            return JsonResponse({'success': False, 'error': error})

        return JsonResponse({'success': True})


    
def pin_image(imageFile, imageName):
    suffix = imageName.split('.').pop()

    with NamedTemporaryFile(suffix=f".{suffix}", delete=True) as temp_file:
        # convert uploaded file to temp file in order to upload.
        temp_file.write(imageFile.read())
        pin_response = pinata.pin_file_to_ipfs(temp_file.name, '', save_absolute_paths=False)

    print('Pin Response', pin_response)
    return pin_response
