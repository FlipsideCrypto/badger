from django.core.management.base import BaseCommand

from indexer.backfill.backfill import Backfill

class Command(BaseCommand):
    def handle(self, **options):
        backfill = Backfill()
        backfill.backfill_factories()