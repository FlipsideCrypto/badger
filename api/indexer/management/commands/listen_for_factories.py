from django.core.management.base import BaseCommand

from indexer.listener import Backfill

class Command(BaseCommand):
    def handle(self, **options):
        backfill = Backfill()
        backfill.listen_for_factories()