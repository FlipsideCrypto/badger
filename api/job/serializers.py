from rest_framework import serializers

from .models import ContractListener

class ContractListenerSerializer(serializers.ModelSerializer):
    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields

    abi = serializers.SerializerMethodField()

    def get_abi(self, obj):
        return obj.abi

    class Meta:
        model = ContractListener
        fields = (
            'is_active', 
            'version',
            'chain',
            'ethereum_address', 
            'abi',
            'last_block',
            'created',
            'updated'
        )