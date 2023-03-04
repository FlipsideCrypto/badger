from django.core.management.commands.runserver import Command as IndexerCommand

from indexer.listener import Backfill

class Command(IndexerCommand):
    def handle(self, *args, **options):
        backfill = Backfill()
        backfill.listen_for_factories()