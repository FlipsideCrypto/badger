# Badger API

The interface backend of Badger is driven by Django, Redis and Postgres. The database is prepared to support simple HTTP requests and WebSockets.

## The Indexer Checking The Chain

There are many types of EVM listeners available, each with their own purpose. Badger includes 2 key types of listeners:
* `backfill` - A one-time listener that will backfill the database with all events of a given type.
* `listen_for` - A listener that will listen for new events of a given type.

A `backfill` is used to populate/seed the database with all events of a given type. For Badger, in the local configuration this is not required as the node will always start at block `0`. In a production environment, backfill should be ran on a regular basis to ensure that even when blocks are missed, the database will be up to date.

Given a long horizon, a backfill can take a long time to complete. To mitigate this, the `backfill` command is designed to be run in parallel. The `backfill` command will spawn a number of processes equal to the number of cores on the machine. Each process will listen for events of a given type and write them to the database. The `backfill` command will not exit until all processes have completed.

The `listen_for` command is designed to be run in a long-running process. It will listen for new events of a given type and write them to the database. The `listen_for` command will not exit until the process is killed and if it crashes, it will be restarted by Docker.

By default, everything is configured for you in the `docker-compose.yml` file.

**When using management commands, the available types are:**

* `organization`
* `badge`

in place of the `<type>`

```bash
docker-compose run --rm badger_server python manage.py backfill_<type>
```

```bash
docker-compose run --rm badger_server python manage.py listen_for_<type>
```