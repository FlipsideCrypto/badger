from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from django_apscheduler import util

from web3 import Web3

from .models import ContractListener

scheduler = BackgroundScheduler()

scheduled_jobs_map = {}

# TODO: Index clocks that need to be running
# Factory listener for when a new Organization is created
# Organization listener for when a Badge is updated

mainnet = Web3(Web3.WebsocketProvider(
    "wss://eth-mainnet.g.alchemy.com/v2/7hOvTTdNWW7ngDBuxt0RI4h91giaqhxP"))
polygon = Web3(Web3.WebsocketProvider(
    "wss://polygon-mainnet.g.alchemy.com/v2/7hOvTTdNWW7ngDBuxt0RI4h91giaqhxP"))
optimism = Web3(Web3.WebsocketProvider(
    "wss://optimism-mainnet.g.alchemy.com/v2/7hOvTTdNWW7ngDBuxt0RI4h91giaqhxP"))

ADDRESS_MAPPING = {
    '0x0': 'FACTORY',
}

topicLists = [
    ['abi', {'list of addresses with this event'}]
]


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

        # # Loop through all the contracts and add them to the scheduler
        # for contract in ContractListener.objects.all():
        #     scheduler.add_job(
        #         listener_manager.sync_organizations_created,
        #         trigger=CronTrigger(second="*/2"),
        #         id=f"factory_listener_{contract.ethereum_address}",
        #         max_instances=1,
        #         replace_existing=False,  # this maintains the provider cache so we can slam endpoints 
        #     )
        #     print(
        #         f"Added: `OrganizationCreated_{contract.ethereum_address}`")

        try:
            print("Starting scheduler...")
            scheduler.start()
        except KeyboardInterrupt:
            print("Stopping scheduler...")
            scheduler.shutdown()
            print("Scheduler shut down successfully!")
