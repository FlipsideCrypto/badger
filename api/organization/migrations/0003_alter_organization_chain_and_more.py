# Generated by Django 4.1.1 on 2022-09-30 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("organization", "0002_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="organization",
            name="chain",
            field=models.CharField(default=None, max_length=50),
        ),
        migrations.AlterField(
            model_name="organization",
            name="contract_address",
            field=models.CharField(default=None, max_length=50),
        ),
        migrations.AlterField(
            model_name="organization",
            name="name",
            field=models.CharField(default=None, max_length=128),
        ),
    ]
