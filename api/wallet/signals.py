from django.db.models.signals import post_save

from django.dispatch import receiver

from siwe_auth.models import Wallet

from utils.web3 import get_ens

@receiver(post_save, sender=Wallet)
def get_wallet_ens_name(sender, instance, created, **kwargs):
    if created and instance.ethereum_address and not instance.ens_name:
        ens = get_ens(instance.ethereum_address)

        if 'name' in ens:
            instance.ens_name = ens['name']
        
        if 'avatar' in ens:
            instance.ens_avatar = ens['avatar']
