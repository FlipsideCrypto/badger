from django.contrib.auth import get_user_model
from rest_framework import serializers

from badge.models import Badge
from balance.models import Balance
from organization.models import Organization

from badge.serializers import BadgeUserSerializer
from organization.serializers import OrganizationSerializer

User = get_user_model()

class WalletBadgeSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        # get the value of wallet
        self.wallet = kwargs.pop('wallet', None)

    id = serializers.IntegerField(read_only=True)
    delegates = BadgeUserSerializer(many=True, read_only=True)
    users = BadgeUserSerializer(many=True, read_only=True)

    balance = serializers.SerializerMethodField()

    def get_balance(self, obj):
        if self.wallet and Balance.objects.filter(
            organization=obj.organization, 
            token_id=obj.token_id,
            user=self.wallet
        ).exists():
            return Balance.objects.filter(
                organization=obj.organization, 
                token_id=obj.token_id,
                user=self.wallet
            ).first().amount

        return 0

    class Meta:
        model = Badge
        fields = (
            'id',
            'url',
            'is_active',
            'name',
            'description',
            'token_id',
            'image_hash',
            'token_uri',
            'delegates',
            'account_bound',
            'signer_ethereum_address',
            'users',
            'balance',
            'created',
            'updated'
        )

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
        print('has badges', self._get_badges(obj))
        return WalletBadgeSerializer(
            self._get_badges(obj), 
            many=True, 
            context={'request': self.context.get('request')},
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