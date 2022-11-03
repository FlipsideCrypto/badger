from django.conf import settings

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from django_apscheduler import util

from indexer.backfill.backfill import Backfill

scheduler = BackgroundScheduler()

scheduled_jobs_map = {}

backfill = Backfill()

def backfill_factories(max_age=86400):
    backfill.backfill_factories()
    backfill.backfill_organizations()

@util.close_old_connections
def delete_old_job_executions(max_age=60 * 60):
    DjangoJobExecution.objects.delete_old_job_executions(max_age)

class JobManager:
    def ready(self, *args, **options):
        scheduler.add_jobstore(DjangoJobStore(), "default")

        # Clean up the dead jobs at the end of every hour
        scheduler.add_job(
            delete_old_job_executions,
            trigger=CronTrigger(hour="*", minute="*/59"),
            id="delete_old_job_executions",
            max_instances=1,
            replace_existing=True,
        )
        print("Added: `delete_old_job_executions`")

        # Backfill factories every minute
        # Is running on a minute timer as this is a backfill job and 
        # not a listener job

        minutes = "*/2"
        if settings.DEBUG:
            minutes = "*/59"
        scheduler.add_job(
            backfill_factories,
            trigger=CronTrigger(minute=minutes),
            id="backfill_factories",
            max_instances=1,
            replace_existing=True,
        )

        try:
            print("Starting scheduler...")
            scheduler.start()
        except KeyboardInterrupt:
            print("Stopping scheduler...")
            scheduler.shutdown()
            print("Scheduler shut down successfully!")
