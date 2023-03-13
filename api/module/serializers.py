from rest_framework import serializers

from .models import Module

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = "__all__"
        read_only_fields = (
            'is_active',
            'ethereum_address',
            'module_type',
            'module_key',
            'created',
            'updated',
        )