import json
import os

from django.apps import AppConfig
from django.conf import settings

class JobConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "job"

    def ready(self):
        if os.environ.get('RUN_MAIN'):
            from .jobs import JobManager
            from .models import ContractListener

            # Make sure that the ContractListener for the primary Factory always exists and is setup
            stringified_abi = json.dumps(settings.FACTORY_ABI)

            ContractListener.objects.get_or_create(
                chain="Polygon",
                ethereum_address=settings.FACTORY_ADDRESS,
                abi=stringified_abi
            )

            manager = JobManager()

            manager.ready()
