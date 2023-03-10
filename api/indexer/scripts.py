import django

from apscheduler.events import EVENT_JOB_ERROR
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from django_apscheduler import util

from .listener import Backfill

backfill = Backfill()
scheduler = BackgroundScheduler()

def listener(event):
    print(f'Job {event.job_id} raised {event.exception.__class__.__name__}')

@util.close_old_connections
def backfill_factories():
    backfill.backfill_factories()

@util.close_old_connections
def backfill_organizations():
    backfill.backfill_organizations()

@util.close_old_connections
def listen_for_factories():
    backfill.listen_for_factories()

def listen_for_organizations():
    backfill.listen_for_organizations()

@util.close_old_connections
# max age of 5 minutes
def delete_old_job_executions(max_age=60 * 60):
    DjangoJobExecution.objects.delete_old_job_executions(max_age)

class JobManager:
    def ready(self, *args, **options):
        scheduler.add_jobstore(DjangoJobStore(), "default")

        for job in scheduler.get_jobs():
            job.remove()

        jobs = [[
            delete_old_job_executions,
            CronTrigger(hour="*", minute="*/59"),
            "delete_old_job_executions",
        ], [
            backfill_factories,
            CronTrigger(hour="0", minute="0"),
            "backfill_factories",
        ], [
            backfill_organizations,
            CronTrigger(hour="0", minute="0"),
            "backfill_organizations",
        ], [
            listen_for_factories,
            CronTrigger(second="*/30"), 
            "listen_for_factories",
        ], [
            listen_for_organizations,
            CronTrigger(second="*/30"),
            "listen_for_organizations",
        ]]

        for job in jobs:
            # If job does not exist, add it
            try:
                if not scheduler.get_job(job[2], "default"):
                    scheduler.add_job(
                        job[0],
                        job[1],
                        id=job[2],
                        max_instances=1,
                        replace_existing=True,
                        jobstore="default"
                    )

                    print("Added: `{}`".format(job[2]))
            except Exception as e:
                print("Error adding job: `{}`".format(job[2]))
                print(e)

        try:
            scheduler.add_listener(listener, EVENT_JOB_ERROR)
            print("Starting scheduler...")
            scheduler.start()
        except (Exception, KeyboardInterrupt, SystemExit) as e:
            print("Stopping scheduler...")
            scheduler.shutdown()
            print("Scheduler shut down successfully!")