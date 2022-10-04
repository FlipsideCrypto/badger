from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from django_apscheduler import util

from badge.models import Badge
from organization.models import Organization

from .listeners import ContractListenerManager
from .models import ContractListener

scheduler = BackgroundScheduler()
listener_manager = ContractListenerManager()

scheduled_jobs_map = {}


@util.close_old_connections
def delete_old_job_executions(max_age=60 * 60):
    DjangoJobExecution.objects.delete_old_job_executions(max_age)


@util.close_old_connections
def schedule_contract_listeners(max_age=604_800, *args, **kwargs):
    contract_listeners = get_listeners_to_schedule()
    for listener in contract_listeners:
        add_listener_if_applicable(listener, scheduler)


def get_listeners_to_schedule():
    return ContractListener.objects.filter(is_active=True)


def add_listener_if_applicable(listener, scheduler):
    listener_id = f"listener_manager_sync_contract_{listener.pk}"
    # If the job is not already running and is active, start it
    if (listener_id not in scheduled_jobs_map):
        scheduled_jobs_map[listener_id] = listener

        # Add the job that will track the contract listener
        scheduler.add_job(
            lambda: listener_manager.sync_contract(listener),
            CronTrigger.from_crontab(
                listener.cron_expression,
                timezone='UTC',
            ),
            id=listener_id,
            max_instances=1,
            replace_existing=False
        )

        print(f"Added: `{listener_id}`")


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

        # Schedule the contract listeners
        # This enables the ability to setup Factory listeners in the database
        # and then the backend will automatically take care of filling in the holes
        # from there.
        scheduler.add_job(
            schedule_contract_listeners,
            trigger=CronTrigger(minute="*/1"),
            id="schedule_contract_listeners",
            max_instances=1,
            replace_existing=True,
        )
        print("Added: `schedule_contract_listeners`")

        try:
            print("Starting scheduler...")
            scheduler.start()
        except KeyboardInterrupt:
            print("Stopping scheduler...")
            scheduler.shutdown()
            print("Scheduler shut down successfully!")
