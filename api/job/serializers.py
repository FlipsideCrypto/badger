from rest_framework import serializers

from .models import ContractListener

class ContractListenerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractListener
        fields = (
            'is_active', 
            'ethereum_address', 
            'event', 
            'event_abi',
            'last_block'
        )