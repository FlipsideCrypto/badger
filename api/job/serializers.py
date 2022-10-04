from rest_framework import serializers

from .models import ContractListener

class ContractListenerSerializer(serializers.ModelSerializer):
    abi = serializers.SerializerMethodField()

    def get_abi(self, obj):
        return obj.abi

    class Meta:
        model = ContractListener
        fields = (
            'is_active', 
            'chain',
            'ethereum_address', 
            'event', 
            'event_abi',
            'abi',
            'last_block'
        )