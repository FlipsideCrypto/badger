# Generated by Django 4.1.1 on 2022-09-30 23:33

import address.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0003_alter_user_address"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="address",
            field=address.models.AddressField(default=None, unique=True),
        ),
    ]
