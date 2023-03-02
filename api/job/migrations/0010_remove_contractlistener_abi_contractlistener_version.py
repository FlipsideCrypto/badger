# Generated by Django 4.1.1 on 2022-11-03 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("job", "0009_alter_contractlistener_chain"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="contractlistener",
            name="abi",
        ),
        migrations.AddField(
            model_name="contractlistener",
            name="version",
            field=models.CharField(default="4.0", max_length=255),
        ),
    ]