import logging

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from django.conf import settings

from .listener import Listener
from .references import ListenerReference

if settings.DEBUG:
    logging.basicConfig()
    logging.getLogger('apscheduler').setLevel(logging.DEBUG)

class JobManager(ListenerReference):
    def __init__(self):
        self.listener = Listener()

        self.scheduler_config = {
            "apscheduler.jobstores.default": {
                "type": "memory"
            },
            "apscheduler.executors.default": {
                "class": "apscheduler.executors.pool:ThreadPoolExecutor",
                "max_workers": "20"
            },
            "apscheduler.job_defaults.coalesce": "true",
            "apscheduler.job_defaults.max_instances": "1",
            "apscheduler.job_defaults.replace_existing": "true",
            "apscheduler.timezone": "UTC",
        }

        self.scheduler = BackgroundScheduler(self.scheduler_config)

        self.init_jobs = [[
            self.backfill_factories,
            CronTrigger(hour="0", minute="0"),
            "backfill_factories",
        ], [
            self.backfill_organizations,
            CronTrigger(hour="0", minute="0"),
            "backfill_organizations",
        ], [
            self.listen_for_factories,
            CronTrigger(second="*/30"), 
            "listen_for_factories",
        ], [
            self.listen_for_organizations,
            CronTrigger(second="*/30"),
            "listen_for_organizations",
        ]]

    def backfill_factories(self):
        self.listener.backfill_factories()

    def backfill_organizations(self):
        self.listener.backfill_organizations()

    def listen_for_factories(self):
        self.listener.listen_for_factories()

    def listen_for_organizations(self):
        self.listener.listen_for_organizations()

    def ready(self, *args, **options):
        for job in self.init_jobs:
            self.scheduler.add_job(
                job[0],
                job[1],
                id=job[2],
            )

            print("Added: `{}`".format(job[2]))

        try:
            print("Starting scheduler...")
            self.scheduler.start()
        except (Exception, KeyboardInterrupt, SystemExit) as e:
            print("Stopping scheduler...")

            for job in self.init_jobs:
                self.scheduler.remove_job(job[2], "default")

            self.scheduler.shutdown()
            print("Scheduler shut down successfully!")
