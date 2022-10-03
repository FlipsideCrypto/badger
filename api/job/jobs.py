from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from django_apscheduler import util

from badge.models import Badge
from organization.models import Organization

from .listeners import ContractListener

listener = ContractListener()

# @util.close_old_connections
# def sync_contract_events(max_age=604_800):
#     for contract in ContractListener.objects.all():
#         listener.sync_contract(contract, 2)

# @util.close_old_connections
# def add_badge_jobs(max_age=604_800):
#     # Get all the badges that have not been updated in the last week
#     badges = Badge.objects.filter(updated__lt=max_age)

#     # Add the jobs for the badges
#     for badge in badges:
#         listener.add_badge_jobs(badge)

@util.close_old_connections
def add_organization_jobs(max_age=604_800):
    # Get all the organizations that have not been updated in the last week
    organizations = Organization.objects.filter(updated__lt=max_age)

    # Add the jobs for the organizations
    for organization in organizations:
        listener.add_organization_jobs(organization)

@util.close_old_connections
def delete_old_job_executions(max_age=604_800):
    DjangoJobExecution.objects.delete_old_job_executions(max_age)


class JobManager:
    def ready(self, *args, **options):
        scheduler = BackgroundScheduler()
        scheduler.add_jobstore(DjangoJobStore(), "default")

        scheduler.add_job(
            delete_old_job_executions,
            trigger=CronTrigger(
                day_of_week="mon", hour="00", minute="00"
            ),  # Midnight on Monday, before start of the next work week.
            id="delete_old_job_executions",
            max_instances=1,
            replace_existing=True,
        )
        print(
            "Added weekly job: 'delete_old_job_executions'."
        )

        try:
            print("Starting scheduler...")
            scheduler.start()
        except KeyboardInterrupt:
            print("Stopping scheduler...")
            scheduler.shutdown()
            print("Scheduler shut down successfully!")
