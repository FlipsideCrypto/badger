import json

from django.conf import settings

from tempfile import NamedTemporaryFile
from pinatapy import PinataPy

pinata = PinataPy(
    settings.PINATA_API_KEY, 
    settings.PINATA_API_SECRET_KEY
)

def _on_error(response):
    error = json.loads(response['text'])
    return error['error']['details']

def pin_image(imageFile, imageName):
    suffix = imageName.split('.').pop()

    try:
        with NamedTemporaryFile(suffix=f".{suffix}", delete=True) as temp_file: 
            with open(temp_file.name, 'wb+') as pin_file:
                for chunk in imageFile.chunks():
                    pin_file.write(chunk)

            pin_response = pinata.pin_file_to_ipfs(
                pin_file.name, 
                '', 
                save_absolute_paths=False
            )

            if not "IpfsHash" in pin_response:
                return {
                    'status': 'error',
                    'message': _on_error(pin_response)
                }
                
            return {
                'status': 'success',
                'IpfsHash': pin_response['IpfsHash']
            }
    except:
        return { 
            'status': 'error',
            'message': 'File could not be pinned.'
        }

def pin_json(data, dataName):
    try:
        pin_response = pinata.pin_json_to_ipfs(data, options={
            'pinataMetadata': {
                'name': f'bj-{dataName}'
            }
        })

        if not "IpfsHash" in pin_response: 
            return {
                'status': 'error',
                'message': _on_error(pin_response)
            } 

        return {
            'status': 'success',
            'IpfsHash': pin_response['IpfsHash']
        }
    except:
        return {
            'status': 'error',
            'message': 'Data could not be pinned'
        }