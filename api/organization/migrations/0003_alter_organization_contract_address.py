# Generated by Django 4.1.1 on 2022-10-03 02:45

from django.db import migrations, models
import siwe_auth.models


class Migration(migrations.Migration):

    dependencies = [
        ("organization", "0002_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="organization",
            name="contract_address",
            field=models.CharField(
                default=None,
                max_length=50,
                validators=[siwe_auth.models.validate_ethereum_address],
            ),
        ),
    ]
