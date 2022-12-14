from django.contrib.auth import get_user_model
from rest_framework import serializers

from badge.models import Badge
from badge.serializers import BadgeSerializer
from organization.models import Organization
from organization.serializers import OrganizationSerializer

User = get_user_model()

class WalletSerializer(serializers.ModelSerializer):
    organizations = serializers.SerializerMethodField(read_only=True)
    badges = serializers.SerializerMethodField(read_only=True)
    tutorial_state = serializers.SerializerMethodField(read_only=True)

    # internal cache for active organizations
    _organizations = None
    _badges = None
    _tutorial_state = None

    def get_serializer_context(self):
        return {'request': self.request}

    def _get_organizations(self, obj):
        if self._organizations is None:
            # Get all the badges that the user is a delegate of
            badges = Badge.objects.filter(delegates__ethereum_address__contains=obj.ethereum_address)

            # Get all the organizations that the user is a delegate of
            organizations = Organization.objects.filter(badges__in=badges)

            # Append with all the organizations they are the owner of
            self._organizations = (
                Organization.objects.filter(owner__ethereum_address=obj.ethereum_address) | 
                organizations
            ).filter(is_active=True).distinct()
        return self._organizations

    def _get_badges(self, obj):
        if self._badges is None:
            # Get all the badges that the user is a delegate of
            badges = Badge.objects.filter(delegates__ethereum_address__contains=obj.ethereum_address)

            # Append delegates badges with badges this user owns
            self._badges = (
                Badge.objects.filter(users__ethereum_address__contains=obj.ethereum_address) | 
                badges
            ).filter(is_active=True).distinct()
        return self._badges

    def get_organizations(self, obj):
        return OrganizationSerializer(
            self._get_organizations(obj), 
            many=True, 
            context={'request': self.context.get('request')}
        ).data

    def get_badges(self, obj):
        return BadgeSerializer(
            self._get_badges(obj), 
            many=True, 
            context={'request': self.context.get('request')}
        ).data

    def get_tutorial_state(self, obj):
        if not self._organizations:
            return 0
        if not self._badges:
            return 1
        return 2

    class Meta:
        model = User
        fields = (
            'url',
            'ethereum_address',
            'organizations',
            'badges',
            'tutorial_state',
            'last_login',
            'ens_name',
            'ens_avatar',
            'is_active',
            'is_superuser',
            'is_admin',
            'groups',
            'user_permissions',
            'created',
        )