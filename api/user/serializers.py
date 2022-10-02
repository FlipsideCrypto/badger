from rest_framework import serializers

from organization.serializers import OrganizationSerializer

from .models import User

# class LogInSerializer(TokenObtainPairSerializer):
#     signature = serializers.CharField()
#     address = serializers.CharField()

#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         token['address'] = user.address
#         return token

#     def validate(self, data):
#         address = data.get('address')
#         signature = data.get('signature')
#         message = data.get('message')
#         user = User.objects.filter(address=address).first()
#         if not user:
#             raise serializers.ValidationError('User not found')
#         if not user.verify_signature(signature, message):
#             raise serializers.ValidationError('Invalid signature')
#         return data


class UserSerializer(serializers.ModelSerializer):
    organizations = OrganizationSerializer(many=True, read_only=True)
    tutorial_state = serializers.SerializerMethodField(read_only=True)

    def get_tutorial_state(self, obj):
        return obj.tutorial_state

    class Meta:
        model = User
        fields = (
            'url',
            'address',
            'organizations',
            'tutorial_state',
        )
        depth = 1
