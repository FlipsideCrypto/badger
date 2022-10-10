## Badger API

The API serves and stores related ownership of Orgs and Badgers to users, as well as any custom tags applied to a user by the Owner of an Org.

Authentication is gated to a wallet address with the use of Sign In With Ethereum. In order for any access to data related to a User's Organizations or Badges, the front end client must have used SIWE to prove their ownership of that address. If ownership of an address is not confirmed, that client will have no access to any data stored in the database.

### Dev Environment
#### Environment Variables
``ALCHEMY_API_KEY=""``
``PINATA_API_KEY=""``
``PINATA_API_SECRET_KEY=""``

#### Running the API
First, set up your virtual environment with:
``python3 -m venv venv``
Mac: 
``source venv/bin/activate``
Windows: 
``venv/bin/activate``
Install requirements:
``pip install -r requirements.txt``

Once the local PostgreSQL is running and the virtual environment is activated, run 
``python manage.py migrate``
to apply the data tables to the database, before finally running ``python manage.py runserver``
to get the API up.

#### PostgreSQL Setup
In order to run the API locally, a local PostgreSQL server must be present. For ease of access, I recommend [pgAdmin](https://www.pgadmin.org/download/) and a local installation of [PostgreSQL](https://www.postgresql.org/download/).

The default database configuration for the API is below. However, any local settings can be passed in by the .env within the api sub directory.

 - PGDATABASE="badger"
 - PGUSER="badger"
 - PGPASSWORD="badger"
 - PGHOST="localhost"
 - PGPORT="5432"

If using pgAdmin, first find "Login/Group Roles", and right click to create a new role. General/Name and Definition/Password can be set to "badger" to match the default config. Before saving, ensure "Can login?" and "Superuser?" are set to true.

Next, find "Databases" and right click it, "Create" -> "Database". Name the database "badger", and set the owner as the badger user you created in the previous step. Save it, and then before running the server, run "python manage.py migrate" to apply the data tables.