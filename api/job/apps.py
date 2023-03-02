import json
import os

from django.apps import AppConfig
from django.conf import settings

class JobConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "job"

    def ready(self):
        if os.environ.get('RUN_MAIN') or not settings.DEBUG:
            from .jobs import JobManager
            from .models import ContractListener

            ContractListener.objects.get_or_create(
                ethereum_address=settings.FACTORY_ADDRESS,
                chain="Polygon",
                defaults={
                    'is_active': True,
                }
            )

            manager = JobManager()

            manager.ready()
